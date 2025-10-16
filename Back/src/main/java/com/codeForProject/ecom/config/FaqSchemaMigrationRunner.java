package com.codeForProject.ecom.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class FaqSchemaMigrationRunner implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Value("${spring.datasource.url}")
    private String datasourceUrl;

    public FaqSchemaMigrationRunner(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) {
        try {
            String schema = extractSchemaName(datasourceUrl);
            Integer colExists = jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'faq' AND COLUMN_NAME = 'product_id'",
                    Integer.class, schema
            );

            if (colExists != null && colExists > 0) {
                // Drop any foreign key constraints referencing product_id
                var fkNames = jdbcTemplate.queryForList(
                        "SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'faq' AND COLUMN_NAME = 'product_id' AND REFERENCED_TABLE_NAME IS NOT NULL",
                        String.class, schema
                );
                for (String fk : fkNames) {
                    jdbcTemplate.execute("ALTER TABLE faq DROP FOREIGN KEY " + fk);
                    System.out.println("FAQ schema migration: dropped FK '" + fk + "'");
                }
                // Drop the column product_id entirely
                jdbcTemplate.execute("ALTER TABLE faq DROP COLUMN product_id");
                System.out.println("FAQ schema migration: dropped column product_id");
            }
        } catch (Exception e) {
            System.out.println("FAQ schema migration skipped: " + e.getMessage());
        }
    }

    private String extractSchemaName(String url) {
        // Example: jdbc:mysql://localhost:3306/ecom_code_for_project
        if (url == null) return "";
        int slash = url.lastIndexOf('/');
        if (slash == -1) return url;
        String afterSlash = url.substring(slash + 1);
        int params = afterSlash.indexOf('?');
        return params == -1 ? afterSlash : afterSlash.substring(0, params);
    }
}
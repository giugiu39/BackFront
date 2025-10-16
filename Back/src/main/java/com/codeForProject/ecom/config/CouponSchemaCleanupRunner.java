package com.codeForProject.ecom.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CouponSchemaCleanupRunner implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Value("${spring.datasource.url}")
    private String datasourceUrl;

    public CouponSchemaCleanupRunner(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) {
        try {
            String schema = extractSchemaName(datasourceUrl);

            // Drop FKs referencing coupon/coupons tables and drop related columns
            dropForeignKeysReferencing(schema, "coupon");
            dropForeignKeysReferencing(schema, "coupons");

            // Finally drop the coupon tables if present
            jdbcTemplate.execute("DROP TABLE IF EXISTS coupon");
            jdbcTemplate.execute("DROP TABLE IF EXISTS coupons");
            System.out.println("Coupon schema cleanup: dropped table coupon/coupons if existed.");
        } catch (Exception e) {
            System.out.println("Coupon schema cleanup skipped: " + e.getMessage());
        }
    }

    private void dropForeignKeysReferencing(String schema, String referencedTable) {
        try {
            List<FkInfo> fks = jdbcTemplate.query(
                    "SELECT CONSTRAINT_NAME, TABLE_NAME, COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE " +
                            "WHERE TABLE_SCHEMA = ? AND REFERENCED_TABLE_NAME = ?",
                    (rs, rowNum) -> new FkInfo(rs.getString(1), rs.getString(2), rs.getString(3)),
                    schema, referencedTable
            );

            for (FkInfo fk : fks) {
                try {
                    jdbcTemplate.execute("ALTER TABLE " + fk.table + " DROP FOREIGN KEY " + fk.name);
                    System.out.println("Coupon schema cleanup: dropped FK '" + fk.name + "' on table '" + fk.table + "'.");
                } catch (Exception ignore) {
                    // Continue even if FK already removed
                }

                // Drop the referencing column if it still exists (e.g., coupon_id)
                try {
                    Integer colExists = jdbcTemplate.queryForObject(
                            "SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?",
                            Integer.class, schema, fk.table, fk.column
                    );
                    if (colExists != null && colExists > 0) {
                        jdbcTemplate.execute("ALTER TABLE " + fk.table + " DROP COLUMN " + fk.column);
                        System.out.println("Coupon schema cleanup: dropped column '" + fk.column + "' from table '" + fk.table + "'.");
                    }
                } catch (Exception ignore) {
                    // Column might already be gone; continue
                }
            }
        } catch (Exception e) {
            System.out.println("Coupon schema cleanup: no FKs referencing '" + referencedTable + "' or error: " + e.getMessage());
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

    private record FkInfo(String name, String table, String column) {}
}
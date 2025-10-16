package db.migration;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class V2__DropFaqProductId extends BaseJavaMigration {

    @Override
    public void migrate(Context context) throws Exception {
        Connection conn = context.getConnection();

        String schema = conn.getCatalog();
        if (schema == null || schema.isEmpty()) {
            try (Statement st = conn.createStatement();
                 ResultSet rs = st.executeQuery("SELECT DATABASE()")) {
                if (rs.next()) schema = rs.getString(1);
            }
        }

        boolean columnExists = false;
        try (PreparedStatement ps = conn.prepareStatement(
                "SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'faq' AND COLUMN_NAME = 'product_id'")) {
            ps.setString(1, schema);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) columnExists = rs.getInt(1) > 0;
            }
        }

        if (!columnExists) {
            System.out.println("Flyway: FAQ.product_id column not found; nothing to drop.");
            return;
        }

        try (PreparedStatement ps = conn.prepareStatement(
                "SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'faq' AND COLUMN_NAME = 'product_id' AND REFERENCED_TABLE_NAME IS NOT NULL")) {
            ps.setString(1, schema);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    String constraintName = rs.getString(1);
                    String dropFkSql = "ALTER TABLE faq DROP FOREIGN KEY " + constraintName;
                    try (Statement st = conn.createStatement()) {
                        st.execute(dropFkSql);
                        System.out.println("Flyway: Dropped FK '" + constraintName + "' on faq.product_id");
                    }
                }
            }
        }

        try (Statement st = conn.createStatement()) {
            st.execute("ALTER TABLE faq DROP COLUMN product_id");
            System.out.println("Flyway: Dropped column faq.product_id");
        }
    }
}
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import entity.PromoCode;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Huiyan
 */
public class PromoCodeDAO {

    public PromoCode getPromoCodeById(int id) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        PromoCode p = null;

        String sql = "SELECT * FROM promo_code where promo_code_id=?";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, id);
            rs = stmt.executeQuery();

            while (rs.next()) {

                String promoName = rs.getString("PROMO_NAME");
                String promoType = rs.getString("PROMO_TYPE");
                double promoValue = rs.getDouble("PROMO_VALUE");
                double minPurchase = rs.getDouble("MIN_PURCAHSE");
                double discount = rs.getDouble("MAX_DISCOUNT");
                int quota = rs.getInt("QUOTA");
                int counter = rs.getInt("COUNTER");
                Date start_date = rs.getDate("START_DATE");
                Date end_date = rs.getDate("END_DATE");
                p = new PromoCode(id, promoName, promoType, promoValue, minPurchase, discount, quota, counter, start_date, end_date);

            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return p;

    }

}

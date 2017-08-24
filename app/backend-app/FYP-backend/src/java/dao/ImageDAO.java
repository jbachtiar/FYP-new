/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import entity.Colour;
import entity.Image;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author Huiyan
 */
public class ImageDAO {

    public Image[] getImagesById(int productId) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ArrayList<Image> images = new ArrayList<Image>();

        String sql = "SELECT * FROM product_image where product_id=?";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, productId);
            rs = stmt.executeQuery();

            while (rs.next()) {

                int imageId = rs.getInt("image_id");
                String imageUrl = rs.getString("image_url");
                images.add(new Image(imageId, imageUrl));

            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return images.toArray(new Image[images.size()]);

    }

}

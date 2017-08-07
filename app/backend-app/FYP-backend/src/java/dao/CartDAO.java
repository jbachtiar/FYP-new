/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import entity.Cart;
import entity.Product;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author Huiyan
 */
public class CartDAO {
     public static Cart[] getCartsByCartId(String cartId) throws SQLException{
    
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        ArrayList<Cart> carts= new ArrayList();
        
        String sql = "SELECT * FROM  cart_details  where cart_id=?"; 
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, cartId);
            rs = stmt.executeQuery();
        
            
            while (rs.next()) {
                
              
                String product_sku = rs.getString("product_sku");
                double qty= rs.getDouble("quantity");
                Product p= ProductDAO.retrieveProductById(product_sku);
                Cart c = new Cart(qty, p);
                carts.add(c);
                
                
                
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return carts.toArray(new Cart[carts.size()]);
   
    }
}

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
     
     public static void clearCarts() {
        Connection conn = null;
        PreparedStatement stmt = null;
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("TRUNCATE cart_details");
            stmt.execute();
        } catch (SQLException e) {
            System.out.println(e);
        } finally {
            ConnectionManager.close(conn, stmt, null);
        }
    }
     
    public static void deleteCartItem(String cartId, int qty, String productId) throws SQLException{
    
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        String sql = "DELETE from cart_details where cart_id=? and product_sku=? and quantity=?"; 
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, cartId);
            stmt.setString(2, productId);
            stmt.setInt(3, qty);
            
            stmt.executeUpdate();    
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }
     
     
     
     public static void updateCartDetails(String cartId, String productId, int qty) throws SQLException{
    
        Connection conn = null;
        PreparedStatement stmt= null;
      
        ResultSet rs = null;
        
        String sql = "update cart_details set quantity=? where cart_id=? and product_sku=?"; 
       
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, qty);
            stmt.setString(2, cartId);
            stmt.setString(3, productId);
            
         
            stmt.executeUpdate();    
       
        } finally {
            ConnectionManager.close(conn, stmt, rs);
       
        }
    }
      public static void updateCart(String price, String date, String cart_id) throws SQLException{
    
        Connection conn = null;
        PreparedStatement stmt= null;
      
        ResultSet rs = null;
        
        String sql = "update cart set price=? , date=? where cart_id=?"; 
       
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, price);
            stmt.setString(2, date);
            stmt.setString(3, cart_id);
            
         
            stmt.executeUpdate();    
       
        } finally {
            ConnectionManager.close(conn, stmt, rs);
       
        }
    }
    
    
}

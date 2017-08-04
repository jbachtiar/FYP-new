/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author JeremyBachtiar
 */
public class CartDAO {
    
    public static String newCartIdByDate(){
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        
        String latestCartId = "";
        
        String sql = "SELECT cart_id FROM `cart` WHERE DATE = '20170803' ORDER BY cart_id desc limit 1 ";
        
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                
                latestCartId = rs.getString("cart_id");
                
              
            }

        }catch (SQLException ex) {
            
           handleSQLException(ex, sql);
            
        } 
        
        finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        long newCartId = Long.parseLong(latestCartId);
        
        
        
        return ""+ newCartId;
    }
    
    public static String addNewCart(String cartId, String customerId, String totalPrice){
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        String sql = "INSERT INTO CART VALUES (?,?,?)";
        
        try {
            
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, cartId);
            stmt.setString(2, customerId);
            stmt.setString(3, totalPrice);
            
            stmt.executeUpdate();

        } catch (SQLException ex) {
            
           handleSQLException(ex, sql);
            
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        
        
        
        return "Success";
    }
    
    private static void handleSQLException(SQLException ex, String sql, String... parameters) {
        String msg = "Unable to access data; SQL=" + sql + "\n";
        for (String parameter : parameters) {
            msg += "," + parameter;
        }
        Logger.getLogger(CustomerDAO.class.getName()).log(Level.SEVERE, msg, ex);
    }
    
}

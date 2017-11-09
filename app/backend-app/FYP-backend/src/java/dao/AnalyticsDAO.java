/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Ong Yi Xuan
 */
public class AnalyticsDAO {
    
    //this method is used, when the custId*productId does not exist in the db
    public void add(int custId, int productId, int preference) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
       
        String sql = "INSERT INTO USER_PREFERENCES (USER_ID, PRODUCT_ID, PREFERENCE) VALUES (?,?,?)";
        
        //casting
        BigDecimal custIdBd = new BigDecimal(custId);
        BigDecimal productIdBd = new BigDecimal(productId);
        Float prefFloat = (float) preference;
           
            try {
                
                conn = ConnectionManager.getConnection();
                stmt = conn.prepareStatement(sql);
                stmt.setBigDecimal(1, custIdBd);
                stmt.setBigDecimal(2, productIdBd);
                stmt.setFloat(3, prefFloat);                
                stmt.executeUpdate();
                
            } finally {
                ConnectionManager.close(conn, stmt, rs);
            }
        
    }
    
    //this method is used, when the custId*productId already exist in the db
    public void update(int custId, int productId, int preference) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
       
        String sql = "UPDATE USER_PREFERENCES SET PREFERENCE = ? WHERE USER_ID = ? AND PRODUCT_ID = ?";
        
        //casting
        BigDecimal custIdBd = new BigDecimal(custId);
        BigDecimal productIdBd = new BigDecimal(productId);
        Float prefFloat = (float) preference;
           
            try {
                
                conn = ConnectionManager.getConnection();
                stmt = conn.prepareStatement(sql);
                stmt.setFloat(1, prefFloat); 
                stmt.setBigDecimal(2, custIdBd);
                stmt.setBigDecimal(3, productIdBd);              
                stmt.executeUpdate();
                
            } finally {
                ConnectionManager.close(conn, stmt, rs);
            }
        
    }
    
}

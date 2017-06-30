/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import entity.Customer;
import entity.Staff;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Ong Yi Xuan
 */
public class StaffDAO {
    
    public static String addStaff(Staff s){
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Customer customer = null;
        
        String sql = "INSERT INTO STAFF VALUES (?,?)";
        
        try {
            
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, s.getId());
            stmt.setString(2,s.getPassword());
            
            stmt.executeUpdate();

        } catch (SQLException ex) {
            
            return "SQLException Caught";
            
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return "Success";
        
    }
    
}

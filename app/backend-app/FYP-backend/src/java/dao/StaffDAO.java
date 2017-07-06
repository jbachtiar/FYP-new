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
       
        String sql = "INSERT INTO STAFF VALUES (?,?,?,?,?,?)";
        
        try {
            
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, s.getEmail());
            stmt.setString(2, s.getFirstName());
            stmt.setString(3, s.getLastName());
            stmt.setString(4, s.getPhoneNumber());
            stmt.setString(5, s.getPassword());
            stmt.setString(6, s.getRoleCode());
            
            stmt.executeUpdate();

        } catch (SQLException ex) {
            
            return "SQLException Caught";
            
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return "Success";
        
    }
    
}

///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package dao;
//
//import database.ConnectionManager;
//import entity.Customer;
//import entity.Staff;
//import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.util.logging.Level;
//import java.util.logging.Logger;
//
///**
// *
// * @author Ong Yi Xuan
// */
//public class StaffDAO {
//    
//    public static String addStaff(Staff s){
//        
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//       
//        String sql = "INSERT INTO STAFF VALUES (?,?,?,?,?,?)";
//        
//        try {
//            
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement(sql);
//            stmt.setString(1, s.getEmail());
//            stmt.setString(2, s.getFirstName());
//            stmt.setString(3, s.getLastName());
//            stmt.setString(4, s.getPhoneNumber());
//            stmt.setString(5, s.getPassword());
//            stmt.setString(6, s.getRoleCode());
//            
//            stmt.executeUpdate();
//
//        } catch (SQLException ex) {
//            
//           handleSQLException(ex, sql);
//            
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//        
//        return "Success";
//        
//    }
//    
//    public static String updateStaff(Staff s){
//        
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//       
//        String sql = "UPDATE Staff SET first_name = ?, last_name = ?, phone_num = ?, password = ?, role_code = ? WHERE email =?";
//        
//        try {
//            
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement(sql);
//            stmt.setString(6, s.getEmail());
//            stmt.setString(1, s.getFirstName());
//            stmt.setString(2, s.getLastName());
//            stmt.setString(3, s.getPhoneNumber());
//            stmt.setString(4, s.getPassword());
//            stmt.setString(5, s.getRoleCode());
//            
//            stmt.executeUpdate();
//
//        } catch (SQLException ex) {
//            
//           handleSQLException(ex, sql);
//            
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//        
//        return "Success";
//        
//    }
//    
//    public static Staff retrieveStaffByEmail(String email) {
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//        Staff staff = null;
//        
//        String sql = "SELECT * FROM staff WHERE email = ? "; 
//        try {
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement(sql);
//            stmt.setString(1, email);
//            rs = stmt.executeQuery();
//            
//            while (rs.next()) {
//                
//                String firstName = rs.getString(2);
//                String lastName = rs.getString(3);
//                String phoneNumber = rs.getString(4);
//                String password = rs.getString(5);
//                String roleCode = rs.getString(6);
//               
//                staff = new Staff(email,firstName,lastName, phoneNumber, password, roleCode);
//             
//            }
//
//        } catch (SQLException ex) {
//            handleSQLException(ex, sql);
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//        return staff;
//    }
//    
//    private static void handleSQLException(SQLException ex, String sql, String... parameters) {
//        String msg = "Unable to access data; SQL=" + sql + "\n";
//        for (String parameter : parameters) {
//            msg += "," + parameter;
//        }
//        Logger.getLogger(CustomerDAO.class.getName()).log(Level.SEVERE, msg, ex);
//    }
//    
//}

///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package dao;
//
//import database.ConnectionManager;
//import entity.StaffRole;
//import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.util.ArrayList;
//import java.util.logging.Level;
//import java.util.logging.Logger;
//
///**
// *
// * @author JeremyBachtiar
// */
//public class StaffRoleDAO {
//    
//    public static StaffRole retrieveRoleByCode(String roleCode) {
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//        StaffRole staffRole = null;
//        
//        String sql = "SELECT * FROM staff_role WHERE role_code = ? "; 
//        try {
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement(sql);
//            stmt.setString(1, roleCode);
//            rs = stmt.executeQuery();
//            
//            while (rs.next()) {
//                
//                String roleName = rs.getString(2);
//                
//              
//                staffRole = new StaffRole(roleCode, roleName);
//             
//            }
//
//        } catch (SQLException ex) {
//            handleSQLException(ex, sql);
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//        return staffRole;
//    }
//    
//    public static ArrayList<StaffRole> retrieveAllRole() {
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//        StaffRole staffRole = null;
//        ArrayList<StaffRole> staffList = null;
//        
//        String sql = "SELECT * FROM staff_role"; 
//        try {
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement(sql);
//            rs = stmt.executeQuery();
//            
//            while (rs.next()) {
//                String roleCode = rs.getString(1);
//                String roleName = rs.getString(2);
//                
//              
//                staffRole = new StaffRole(roleCode, roleName);
//                staffList.add(staffRole);
//            }
//
//        } catch (SQLException ex) {
//            handleSQLException(ex, sql);
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//        return staffList;
//    }
//    
//   
//    
//    private static void handleSQLException(SQLException ex, String sql, String... parameters) {
//        String msg = "Unable to access data; SQL=" + sql + "\n";
//        for (String parameter : parameters) {
//            msg += "," + parameter;
//        }
//        Logger.getLogger(CustomerDAO.class.getName()).log(Level.SEVERE, msg, ex);
//    }
//}
//    
//

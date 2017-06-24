/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import entity.Customer;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author JeremyBachtiar
 */
public class CustomerDAO {
    
    public static Customer retrieveCustomerByEmail(String email) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Customer customer = null;
        
        String sql = "SELECT * FROM customer WHERE email = ? "; 
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, email);
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                int id = rs.getInt(1);
                String first_name = rs.getString(2);
                String contact = rs.getString(3);
                String address = rs.getString(4);
                String password = rs.getString(5);
                String paymentMethod = rs.getString(6);
                String last_name = rs.getString(8);
                String name = first_name+" "+last_name;
                customer = new Customer(id, name, contact, address, password, paymentMethod);
             
            }

        } catch (SQLException ex) {
            handleSQLException(ex, sql);
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return customer;
    }
    
    public static String retrievePasswordByEmail(String email) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        String password = null;
        
        String sql = "SELECT password FROM customer WHERE contact =  ? "; 
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, email);
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                password = rs.getString(1);
             
            }

        } catch (SQLException ex) {
            handleSQLException(ex, sql);
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return password;
    }
    
             
    public static void addCustomer(int id, String first_name, String last_name, String contact, String address, String password, String paymentMethod, String email) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        String sql = "Insert into customer values (?,?,?,?,?,?,?,?)"; 
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, id);
            stmt.setString(2, first_name );
            stmt.setString(3, contact);
            stmt.setString(4, address);
            stmt.setString(5, password);
            stmt.setString(6, paymentMethod);
            stmt.setString(7, email);
            stmt.setString(7, last_name);
            
            stmt.executeUpdate();
            
          
        } catch (SQLException ex) {
            handleSQLException(ex, sql);
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
       
    }
    
    
      public static int getNumOfCustomers() {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        int numOfCus = 0;
        String sql = "Select count(*) from customer"; 

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();
            while (rs.next()) {
                numOfCus = rs.getInt(1);
             
            }
        } catch (SQLException e) {
            System.out.println(e);
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return numOfCus;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    private static void handleSQLException(SQLException ex, String sql, String... parameters) {
        String msg = "Unable to access data; SQL=" + sql + "\n";
        for (String parameter : parameters) {
            msg += "," + parameter;
        }
        Logger.getLogger(CustomerDAO.class.getName()).log(Level.SEVERE, msg, ex);
    }
}
    


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
                String firstName = rs.getString(2);
                String lastName = rs.getString(3);
                String contact = rs.getString(4);
                String address = rs.getString(5);
                String password = rs.getString(6);
              
                customer = new Customer(id,firstName,lastName, contact, address, password, email);
             
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
        
        String sql = "SELECT password FROM customer WHERE email =  ? "; 
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
    
    
    public static int retrieveNumOfCustomers() {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        int numOfCustomer=0;
        
        String sql = "SELECT count(*) FROM customer"; 
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
             rs = stmt.executeQuery();
            
            while (rs.next()) {
                numOfCustomer = rs.getInt(1);
             
            }

        } catch (SQLException ex) {
            handleSQLException(ex, sql);
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return numOfCustomer;
    }
        
     public static void insertCustomer(String firstName, String lastName, String contact, String address, String password, String email ) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        int numOfCustomer=0;
        
        String sql = "INSERT into customer values(?,?,?,?,?,?,?)";
 
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            numOfCustomer =retrieveNumOfCustomers();
            stmt.setInt(1, (numOfCustomer+1));
            stmt.setString(2,firstName);
            stmt.setString(3, lastName);
            stmt.setString(4, contact);
            stmt.setString(5, address);
            stmt.setString(6, password);
            stmt.setString(7, email);
           
            stmt.executeUpdate();
            
        } catch (SQLException ex) {
            handleSQLException(ex, sql);
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    
    }
    
    
    
    
    private static void handleSQLException(SQLException ex, String sql, String... parameters) {
        String msg = "Unable to access data; SQL=" + sql + "\n";
        for (String parameter : parameters) {
            msg += "," + parameter;
        }
        Logger.getLogger(CustomerDAO.class.getName()).log(Level.SEVERE, msg, ex);
    }
}
    


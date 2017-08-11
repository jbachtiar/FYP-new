package dao;

import database.ConnectionManager;
import entity.Order;
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
public class CartDAO {
    
    public static String createOrder (Order o) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        String sql = "INSERT INTO Order VALUES (?,?,?,?,?,?)";
        
        try {
            
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, o.getOrderID());
            stmt.setString(2, o.getOrderDate());
            stmt.setString(3, o.getOrderTime());
            stmt.setDouble(4, o.getTotalPrice());
            stmt.setString(5, o.getStatus());
            stmt.setString(6, o.getCustomerEmail());
            
            stmt.executeUpdate();

        } catch (SQLException ex) {
            
           handleSQLException(ex, sql);
            
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return "Success";
    }
    
    public int createOrderID(){
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        String sql = "INSERT INTO Order VALUES (?,?,?,?,?,?)";
        
        
        
        return 1;
        
    }

    private static void handleSQLException(SQLException ex, String sql, String... parameters) {
            String msg = "Unable to access data; SQL=" + sql + "\n";
            for (String parameter : parameters) {
                msg += "," + parameter;
            }
            Logger.getLogger(CustomerDAO.class.getName()).log(Level.SEVERE, msg, ex);
    }
}
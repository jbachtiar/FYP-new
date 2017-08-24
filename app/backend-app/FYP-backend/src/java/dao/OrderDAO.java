/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

/**
 *
 * @author Huiyan
 */
import database.ConnectionManager;
import entity.Address;
import entity.Order;
import entity.OrderItem;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

public class OrderDAO {
//    
//    public Order[] retrieveOrdersByEmail(String email) throws SQLException {
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//        Order o = null;
//        ArrayList<Order> orders = new ArrayList<>();
//        
//        String sql = "SELECT * FROM order WHERE email= ?";
//        try {
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement(sql);
//            stmt.setString(1, email);
//            rs = stmt.executeQuery();
//            
//            while (rs.next()) {
//                
//                int orderId = rs.getInt(1);
//                Timestamp orderDate = rs.getTimestamp(2);
//                double netAmt = rs.getDouble(3);
//                double promoDiscAmt = rs.getDouble(4);
//                String addressLine = rs.getString(5);
//                String city = rs.getString(6);
//                String country = rs.getString(7);
//                String postalCode = rs.getString(8);
//                String paymentRefNo = rs.getString(9);
//                int promoCode = rs.getInt(10);
//                Address a = new Address(0, addressLine, city, country, postalCode, "N");
//                address.add(a);
//                
//            }
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//        
//        return address.toArray(new Address[address.size()]);
//    }
    
    public Order retrieveOrderById(int orderId) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Order order = null;
        
        String sql = "SELECT * FROM order WHERE order_id= ?";
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, orderId);
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                
                Timestamp orderDate = rs.getTimestamp(2);
                double netAmt = rs.getDouble(3);
                double promoDiscAmt = rs.getDouble(4);
                String addressLine = rs.getString(5);
                String city = rs.getString(6);
                String country = rs.getString(7);
                String postalCode = rs.getString(8);
                String paymentRefNo = rs.getString(9);
                int promoCode = rs.getInt(10);
                OrderStatusLogDAO orderLog = new OrderStatusLogDAO();
                PromoCodeDAO pcDao = new PromoCodeDAO();
                Address a = new Address(0, addressLine, city, country, postalCode, "N");
                order = new Order(orderId, orderDate, netAmt, promoDiscAmt, a, paymentRefNo, pcDao.getPromoCodeById(promoCode), retrieveOrderItemsByOrderId(orderId), orderLog.getOrderStatusByOrderId(orderId));
                
            }
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return order;
    }
    
    public OrderItem[] retrieveOrderItemsByOrderId(int orderId) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ArrayList<OrderItem> orderItems = new ArrayList<>();
        
        String sql = "SELECT * FROM order_item WHERE order_id= ?";
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, orderId);
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                
                int productId = rs.getInt(2);
                int quantity = rs.getInt(3);
                double unitPrice = rs.getDouble(4);
                ProductDAO pd = new ProductDAO();
                orderItems.add(new OrderItem(pd.retrieveProductById(productId), quantity, unitPrice));
                
            }
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return orderItems.toArray(new OrderItem[orderItems.size()]);
    }

//    private static void handleSQLException(SQLException ex, String sql, String... parameters) {
//        String msg = "Unable to access data; SQL=" + sql + "\n";
//        for (String parameter : parameters) {
//            msg += "," + parameter;
//
//        }
//        Logger.getLogger(CustomerDAO.class
//                .getName()).log(Level.SEVERE, msg, ex);
//    }
}
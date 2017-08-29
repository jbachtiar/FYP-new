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
    
    public String addOrder(Order o, String email) throws SQLException{
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        int orderId = getNextOrderId();
        OrderItem[] orderItems =  o.getOrderItems();
        
        for(OrderItem oI: orderItems){
            OrderItemDAO orderItemDAO = new OrderItemDAO();
            String result = orderItemDAO.addOrderItems(orderId, oI);
        }
        String sql = "INSERT INTO ORDER VALUES (?,?,?,?,?,?,?,?,?,?,?)";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, orderId);
            stmt.setTimestamp(2, getCurrentTimeStamp());
            stmt.setDouble(3, o.getNetAmt());
            stmt.setDouble(4, o.getPromoDiscAmt());
            stmt.setString(5, o.getAddress().getAddressLine());
            stmt.setString(6, o.getAddress().getCity());
            stmt.setString(7, o.getAddress().getCountry());
            stmt.setString(8, o.getAddress().getPostalCode());
            stmt.setString(9, o.getPaymentRefNo());
            stmt.setString(10, email);
            stmt.setInt(11, o.getPromoCode().getPromoCodeId());
            
            rs = stmt.executeQuery();

            while (rs.next()) {

            }
        } finally {
            ConnectionManager.close(conn);
        }
        
        return "Success";
        
    }
    
    public ArrayList<Order> getOrderById(int orderId) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ArrayList<Order> orderList = new ArrayList<Order>();
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
                OrderItemDAO orderItemDao = new OrderItemDAO();
                order = new Order(orderId, orderDate, netAmt, promoDiscAmt, a, paymentRefNo, pcDao.getPromoCodeById(promoCode), orderItemDao.getOrderItemsByOrderId(orderId), orderLog.getOrderStatusByOrderId(orderId));
                orderList.add(order);
            }
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return orderList;
    }
    
    public Order getOrderByEmail(String email) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        Order order = null;
        
        String sql = "SELECT * FROM order WHERE EMAIL = ?";
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, email);
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                int orderId = rs.getInt(1);
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
                OrderItemDAO orderItemDao = new OrderItemDAO();
                order = new Order(orderId, orderDate, netAmt, promoDiscAmt, a, paymentRefNo, pcDao.getPromoCodeById(promoCode), orderItemDao.getOrderItemsByOrderId(orderId), orderLog.getOrderStatusByOrderId(orderId));
                
            }
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return order;
    }
    
    public int getNextOrderId() throws SQLException {
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        int nextOrderId = 0;

        String sql = "SELECT MAX(ORDER_ID) AS MAX FROM ORDER";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();

            while (rs.next()) {

                nextOrderId = rs.getInt("MAX") +1;
                
            }

        } finally {
            
            ConnectionManager.close(conn, stmt, rs);
            
        }

        return nextOrderId;
        
    }
    
    private java.sql.Timestamp getCurrentTimeStamp() {

        java.util.Date today = new java.util.Date();
        return new java.sql.Timestamp(today.getTime());

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

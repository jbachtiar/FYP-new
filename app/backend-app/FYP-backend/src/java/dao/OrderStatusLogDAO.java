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
import entity.OrderStatus;
import entity.OrderStatusLog;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.sql.SQLException;
import java.sql.Timestamp;

public class OrderStatusLogDAO {

    public OrderStatusLog[] getOrderStatusByOrderId(int orderId) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ArrayList<OrderStatusLog> orderStatusLogs = new ArrayList<>();

        String sql = "SELECT * FROM order_status_log ol and order_status os where os.status_id=ol.status_id and ol.order_id=?";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, orderId);
            rs = stmt.executeQuery();

            while (rs.next()) {
                int statusId = rs.getInt("STATUS_ID");
                String orderStatus = rs.getString("STATUS_NAME");
                Timestamp timeStamp = rs.getTimestamp("TIMESTAMP");
                orderStatusLogs.add(new OrderStatusLog(new OrderStatus(statusId, orderStatus), timeStamp));

            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return orderStatusLogs.toArray(new OrderStatusLog[orderStatusLogs.size()]);

    }
    
    

}

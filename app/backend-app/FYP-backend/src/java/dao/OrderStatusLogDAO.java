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

        String sql = "SELECT ol.*, os.STATUS_NAME FROM mydb.order_status_log ol LEFT OUTER JOIN mydb.order_status os ON ol.STATUS_ID = os.STATUS_ID WHERE ol.ORDER_ID = ?";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, orderId);
            rs = stmt.executeQuery();

            while (rs.next()) {
                int statusId = rs.getInt("STATUS_ID");
                String orderStatus = rs.getString("STATUS_NAME");
                Timestamp startTimeStamp = rs.getTimestamp("START_TIMESTAMP");
                Timestamp endTimeStamp = rs.getTimestamp("END_TIMESTAMP");
                orderStatusLogs.add(new OrderStatusLog(new OrderStatus(statusId, orderStatus), startTimeStamp, endTimeStamp));

            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return orderStatusLogs.toArray(new OrderStatusLog[orderStatusLogs.size()]);

    }
    
    

}

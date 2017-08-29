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
import entity.OrderItem;
import entity.Product;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class OrderItemDAO {

    static void addOrderItem() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public OrderItem[] getOrderItemsByOrderId(int orderId) throws SQLException {
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

    public String addOrderItems(int orderId, OrderItem oI) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        String sql = "INSERT INTO ORDER_ITEM VALUES (?,?,?,?)";

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, orderId);
            stmt.setInt(2, oI.getProduct().getProductId());
            stmt.setInt(3, oI.getQuantity());
            stmt.setDouble(3, oI.getUnitPrice());

            rs = stmt.executeQuery();

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }


        return "Success";

    }

}
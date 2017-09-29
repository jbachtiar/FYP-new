/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import entity.Cart;
import entity.Product;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Huiyan
 */
public class CartDAO {

    public static String addCart(String cartId, double totalPrice, String email, String date){
        
        Connection conn = null;
        PreparedStatement stmt = null;

        ResultSet rs = null;

        String sql = "INSERT INTO CART VALUES (?,?,?,?)";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, cartId);
            stmt.setString(2, ""+totalPrice);
            stmt.setString(3, email);
            stmt.setString(4, date);

            stmt.executeUpdate();

        } catch (SQLException ex) {
            
           handleSQLException(ex, sql);
            
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        
        return "";
    }

    public static Cart[] getCartsByCartId(String cartId) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        ArrayList<Cart> carts = new ArrayList();

        String sql = "SELECT * FROM  cart_details  where cart_id=?";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, cartId);
            rs = stmt.executeQuery();

            while (rs.next()) {

                String product_sku = rs.getString("product_sku");
                double qty = rs.getDouble("quantity");
                Product p = ProductDAO.retrieveProductById(product_sku);
                //Cart c = new Cart(qty, p);
                //.add(c);

            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return carts.toArray(new Cart[carts.size()]);

    }

    public static String getTotalPriceByCardId(String cartId) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        String price="";

        String sql = "SELECT * FROM cart where cart_id=?";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, cartId);
            rs = stmt.executeQuery();
            while (rs.next()) {
                price = rs.getString("price");

            }


        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return price;

    }

    public static void clearCarts() {
        Connection conn = null;
        PreparedStatement stmt = null;
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("TRUNCATE cart_details");
            stmt.execute();
        } catch (SQLException e) {
            System.out.println(e);
        } finally {
            ConnectionManager.close(conn, stmt, null);
        }
    }

    public static void deleteCartItem(String cartId, int qty, String productId) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        String sql = "DELETE from cart_details where cart_id=? and product_sku=? and quantity=?";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, cartId);
            stmt.setString(2, productId);
            stmt.setInt(3, qty);

            stmt.executeUpdate();
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
    }

    public static void updateCartDetails(String cartId, String productId, int qty) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;

        ResultSet rs = null;

        String sql = "update cart_details set quantity=? where cart_id=? and product_sku=?";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, qty);
            stmt.setString(2, cartId);
            stmt.setString(3, productId);

            stmt.executeUpdate();

        } finally {
            ConnectionManager.close(conn, stmt, rs);

        }
    }



    public static void updateCart(double price, String date, String cart_id) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;

        ResultSet rs = null;

        String sql = "update cart set price=? , date=? where cart_id=?";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, ""+price);
            stmt.setString(2, date);
            stmt.setString(3, cart_id);

            stmt.executeUpdate();

        } finally {
            ConnectionManager.close(conn, stmt, rs);

        }
    }

    public static Cart getCartByCartId(String cartId) throws SQLException {
        Cart cart = null;
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        ArrayList<Cart> carts = new ArrayList();

        String sql = "SELECT * FROM  where cart_id=?";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, cartId);
            rs = stmt.executeQuery();

            while (rs.next()) {

                String product_sku = rs.getString("product_sku");
                double qty = rs.getDouble("quantity");
                Product p = ProductDAO.retrieveProductById(product_sku);
                //Cart c = new Cart(qty, p);
                //carts.add(c);

            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return cart;

    }
    
    public static Cart retrieveCartByCust(String email) throws SQLException {
        Cart cart = null;
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;


        String sql = "SELECT * FROM  where customer_id=?";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, email);
            rs = stmt.executeQuery();

            while (rs.next()) {

                String cartId = rs.getString("cart_id");
                double totalPrice = Double.parseDouble(rs.getString("price"));
                String date = rs.getString("date");
                cart = new Cart(cartId, totalPrice, email, date);
         

            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return cart;

    }

    public static String getCartId() throws SQLException {
        String result = "";
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        ArrayList<Cart> carts = new ArrayList();

        String sql = "SELECT cart_id FROM cart WHERE date = ? ORDER BY cart_id DESC LIMIT 1";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, getCurrentDate());
            rs = stmt.executeQuery();

            while (rs.next()) {
                String cartId = rs.getString("cart_id");
                int cartIdInt = Integer.parseInt(cartId);
                cartIdInt++;

                return result + cartIdInt;
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        if(result.equals("")){
            String curDate = getCurrentDate();
            int number = 1;
            String numString = String.format("%08d", number);

            result = curDate + numString;
        }

        return result;

    }

    public static String getCurrentDate(){
        String currentDate;

        Date current = new Date();
        SimpleDateFormat dateFmt = new SimpleDateFormat("yyyyMMdd");
        currentDate = dateFmt.format(current);

        return currentDate;
    }
    
    private static void handleSQLException(SQLException ex, String sql, String... parameters) {
        String msg = "Unable to access data; SQL=" + sql + "\n";
        for (String parameter : parameters) {
            msg += "," + parameter;
        }
        Logger.getLogger(CustomerDAO.class.getName()).log(Level.SEVERE, msg, ex);
    }
}

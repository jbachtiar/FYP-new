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
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

public class CustomerAddressDAO {

    public Address[] retrieveAddressesByEmail(String email) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Address a = null;
        ArrayList<Address> address = new ArrayList<>();

        String sql = "SELECT * FROM customer_address WHERE email= ? ";
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, email);
            rs = stmt.executeQuery();

            while (rs.next()) {

                int addressId = rs.getInt(1);
                String addressLine = rs.getString(3);
                String city = rs.getString(4);
                String country = rs.getString(5);
                String postalCode = rs.getString(6);
                String isDefault = rs.getString(7);

                a = new Address(addressId, addressLine, city, country, postalCode, isDefault);
                address.add(a);

            }
        } catch (SQLException ex) {
            handleSQLException(ex, sql);
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return address.toArray(new Address[address.size()]);
    }

    public Address retrieveAddressById(int addressId) {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Address a = null;
    

        String sql = "SELECT * FROM customer_address WHERE address_id= ? ";
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, addressId);
            rs = stmt.executeQuery();

            while (rs.next()) {

                String addressLine = rs.getString(3);
                String city = rs.getString(4);
                String country = rs.getString(5);
                String postalCode = rs.getString(6);
                String isDefault = rs.getString(7);

                a = new Address(addressId, addressLine, city, country, postalCode, isDefault);

            }
        } catch (SQLException ex) {
            handleSQLException(ex, sql);
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return a;
    }

    private static void handleSQLException(SQLException ex, String sql, String... parameters) {
        String msg = "Unable to access data; SQL=" + sql + "\n";
        for (String parameter : parameters) {
            msg += "," + parameter;
        }
        Logger.getLogger(CustomerDAO.class.getName()).log(Level.SEVERE, msg, ex);
    }

}

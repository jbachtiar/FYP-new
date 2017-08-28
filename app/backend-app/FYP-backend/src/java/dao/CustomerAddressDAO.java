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

public class CustomerAddressDAO {

    public Address[] getAddressesByEmail(String email) throws SQLException {
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
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return address.toArray(new Address[address.size()]);
    }

    public Address getAddressById(int addressId) throws SQLException {
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
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return a;
    }

    public int getTheNumOfAddressesByEmail(String email) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        int num = 0;

        String sql = "SELECT COUNT(*) FROM CUSTOMER_ADDRESS WHERE EMAIL=?";
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, email);
            rs = stmt.executeQuery();
            num = rs.getInt(1);

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return num;

    }

    public String addAddressToCustomer(String email, Address address) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Address a = null;

        String sql = "INSERT INTO CUSTOMER_ADDRESS VALUES (?,?,?,?,?,?,?)";
        if (getTheNumOfAddressesByEmail(email) > 3) {
            return "exceed address limit";
        } else {
            try {
                conn = ConnectionManager.getConnection();
                stmt = conn.prepareStatement(sql);
                String addressLine = address.getAddressLine();
                String city = address.getCity();
                String country = address.getCountry();
                String postalCode = address.getPostalCode();
                String isDefault = address.getIsDefault();

                stmt.setInt(1, getTheNumOfAddressesByEmail(email) + 1);
                stmt.setString(2, email);
                stmt.setString(3, addressLine);
                stmt.setString(4, city);
                stmt.setString(5, country);
                stmt.setString(6, postalCode);
                stmt.setString(7, isDefault);

                rs = stmt.executeQuery();
            } finally {
                ConnectionManager.close(conn, stmt, rs);
            }
        }

        return "Success";

    }

    public String deleteAddressByCustomerEmail(String email, String addressId) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        String sql = "DELETE FROM CUSTOMER_ADDRESS WHERE EMAIL = ? AND ADDRESS_ID=? ";
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, email);
            stmt.setString(2, addressId);
            rs = stmt.executeQuery();

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return "Success";

    }

    public String updateAddressByCustomerEmail(String email, String addressId, String addressLine, String city, String country, String postalCode, String isDefault) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        String sql = "UPDATE CUSTOMER_ADDRESS SET ADDRESS_LINE = ?, CITY = ?, COUNTRY = ?, POSTAL_CODE = ?, ISDEFAULT = ? WHERE EMAIL=? AND ADDDRESS_ID=?";
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, addressLine);
            stmt.setString(2, city);
            stmt.setString(3, country);
            stmt.setString(4, postalCode);
            stmt.setString(5, isDefault);
            stmt.setString(6, email);
            stmt.setString(7, addressId);

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return "Success";

    }
}

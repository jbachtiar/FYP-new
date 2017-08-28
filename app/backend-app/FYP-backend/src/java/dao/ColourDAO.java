/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import entity.Colour;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author JeremyBachtiar
 */
public class ColourDAO {

    public String addColour(Colour colour) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        String sql = "INSERT INTO COLOUR VALUES (?,?,?)";
        if (getColourById(colour.getColourId()) != null) {

            try {

                conn = ConnectionManager.getConnection();
                stmt = conn.prepareStatement(sql);
                stmt.setInt(1, colour.getColourId());
                stmt.setString(2, colour.getColourName());
                stmt.setString(3, "N");

                rs = stmt.executeQuery();

            } finally {
                ConnectionManager.close(conn, stmt, rs);
            }
        } else {
            return "Colour already exist";
        }

        return "Success";
    }

    public Colour getColourById(int colourId) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Colour result = null;

        String sql = "SELECT * FROM COLOUR WHERE COLOUR_ID = ?";

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, colourId);
            rs = stmt.executeQuery();

            while (rs.next()) {
                String colourName = rs.getString("COLOUR_NAME");
                String deleted = rs.getString("DELETED");

                result = new Colour(colourId, colourName);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return result;

    }

    public ArrayList<Colour> getAllAvailableColours() throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ArrayList<Colour> colourList = new ArrayList<Colour>();

        String sql = "SELECT * FROM COLOUR WHERE DELETED = ? ";
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, "N");
            rs = stmt.executeQuery();

            while (rs.next()) {
                int colourId = rs.getInt("COLOUR_ID");
                String colourName = rs.getString("COLOUR_NAME");

                Colour colour = new Colour(colourId, colourName);
                colourList.add(colour);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return colourList;

    }

    public String deleteColourById(int id) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        String sql = "UPDATE COLOUR SET DELETED = ? WHERE COLOUR_ID = ?";

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, "Y");
            stmt.setInt(2, id);

            rs = stmt.executeQuery();

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return "Success";

    }

    public String updateColour(Colour colour) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        String sql = "UPDATE COLOUR SET COLOUR_NAME = ? WHERE COLOUR_ID = ?";

        if (getColourById(colour.getColourId()) != null) {

            try {

                conn = ConnectionManager.getConnection();
                stmt = conn.prepareStatement(sql);
                stmt.setString(1, colour.getColourName());
                stmt.setInt(2, colour.getColourId());

                rs = stmt.executeQuery();

            } finally {
                ConnectionManager.close(conn, stmt, rs);
            }
        } else {
            return "Colour does not exist";
        }

        return "Success";
    }

    public Colour getColourByProductId(int productId) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Colour colour = null;

        String sql = "SELECT * FROM PRODUCT WHERE PRODUCT_ID=?";
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, productId);
            rs = stmt.executeQuery();

            int colourId = rs.getInt("COLOUR_ID");
            colour = getColourById(colourId);

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return colour;

    }

}

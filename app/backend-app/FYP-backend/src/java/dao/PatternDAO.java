/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import entity.Collection;
import entity.Pattern;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Ong Yi Xuan
 */
public class PatternDAO {

    public ArrayList<Pattern> getAllAvailablePatterns() throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ArrayList<Pattern> patternList = new ArrayList<Pattern>();

        String sql = "SELECT * FROM PATTERN WHERE DELETED = ? ";
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, "N");
            rs = stmt.executeQuery();

            while (rs.next()) {
                int patternId = rs.getInt("PATTERN_ID");
                String patternName = rs.getString("PATTERN_NAME");
                String patternDesc = rs.getString("PATTERN_DESC");
                double patternPrice = rs.getDouble("PATTERN_PRICE");

//    public Pattern(int patternId, String patternName, String patternDesc, double patternPrice, Collection collection, Tag[] tags) {
                Pattern pattern = new Pattern(patternId, patternName, patternDesc, patternPrice, null, null);
                patternList.add(pattern);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return patternList;

    }

    public int addPattern(Pattern pattern) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        int nextPatternId = getNextPatternId();
        
        String sql = "INSERT INTO PATTERN (PATTERN_ID, PATTERN_NAME, PATTERN_DESC, PATTERN_PRICE, DELETED, COLLECTION_ID) VALUES (?,?,?,?,?,?)";

        try {


                conn = ConnectionManager.getConnection();
                stmt = conn.prepareStatement(sql);
                stmt.setInt(1, nextPatternId);
                stmt.setString(2, pattern.getPatternName());
                stmt.setString(3, pattern.getPatternDesc());
                stmt.setDouble(4, pattern.getPatternPrice());
                stmt.setString(5, "N");
                stmt.setInt(6, pattern.getCollection().getCollectionId());


            stmt.executeUpdate();

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        
        return nextPatternId;
    }   


    public String updatePattern(Pattern pattern) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        String sql = "UPDATE PATTERN SET PATTERN_NAME = ?, PATTERN_DESC = ? , PATTERN_PRICE = ?, DELETED = ?, COLLECTION_ID = ? WHERE PATTERN_ID = ?";

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);

            stmt.setString(1, pattern.getPatternName());
            stmt.setString(2, pattern.getPatternDesc());
            stmt.setDouble(3, pattern.getPatternPrice());
            stmt.setString(4, "N");
            stmt.setInt(5, pattern.getCollection().getCollectionId());
            stmt.setInt(6, pattern.getPatternId());

            stmt.executeUpdate();

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return "Success";
    }

    public String deletePatternById(int id) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        String sql = "UPDATE PATTERN SET DELETED = ? WHERE PATTERN_ID = ?";

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

    public int getNextPatternId() throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        int nextPatternId = 0;

        String sql = "SELECT MAX(PATTERN_ID) AS MAX FROM PATTERN";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();

            while (rs.next()) {

                nextPatternId = rs.getInt("MAX") + 1;

            }

        } finally {

            ConnectionManager.close(conn, stmt, rs);

        }

        return nextPatternId;

    }

    public Pattern getPatternById(int patternId) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Pattern pattern = null;

        String sql = "SELECT d.*, c.COLLECTION_NAME FROM PATTERN d LEFT OUTER JOIN COLLECTION c ON d.COLLECTION_ID = c.COLLECTION_ID where d.pattern_id=? ";
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, patternId);
            rs = stmt.executeQuery();
            while (rs.next()) {

                String patternName = rs.getString("PATTERN_NAME");
                String patternDescription = rs.getString("PATTERN_DESC");
                Double patternPrice = rs.getDouble("PATTERN_PRICE");
                int collectionId = rs.getInt("COLLECTION_ID");
                String collectionName = rs.getString("COLLECTION_NAME");
                TagDAO td = new TagDAO();
                pattern = new Pattern(patternId, patternName, patternDescription, patternPrice, new Collection(collectionId, collectionName), td.getTagsByPatternId(patternId));
            }
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return pattern;
    }

    public Pattern getPatternByName(String patternName) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Pattern pattern = null;

        String sql = "SELECT d.*, c.COLLECTION_NAME FROM PATTERN d LEFT OUTER JOIN COLLECTION c ON d.COLLECTION_ID = c.COLLECTION_ID where d.pattern_name=? ";
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, patternName);
            rs = stmt.executeQuery();
            while (rs.next()) {

                int patternId = rs.getInt("PATTERN_ID");
                String patternDescription = rs.getString("PATTERN_DESC");
                Double patternPrice = rs.getDouble("PATTERN_PRICE");
                int collectionId = rs.getInt("COLLECTION_ID");
                String collectionName = rs.getString("COLLECTION_NAME");
                TagDAO td = new TagDAO();
                pattern = new Pattern(patternId, patternName, patternDescription, patternPrice, new Collection(collectionId, collectionName), td.getTagsByPatternId(patternId));
            }
        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return pattern;
    }

    public Pattern getPatternByProductId(int productId) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Pattern pattern = null;

        String sql = "SELECT * FROM PRODUCT WHERE PRODUCT_ID=?";
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, productId);
            rs = stmt.executeQuery();

            int patternId = rs.getInt("PATTERN_ID");
            pattern = getPatternById(patternId);

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return pattern;
    }

}

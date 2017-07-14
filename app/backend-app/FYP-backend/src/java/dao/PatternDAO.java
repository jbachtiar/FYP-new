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
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author Ong Yi Xuan
 */
public class PatternDAO {
    
    public Pattern[] getAllPatterns() throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Pattern pattern = null;
        ArrayList<Pattern> patternArrayList = new ArrayList<Pattern>();
        
        String sql = "SELECT p.*, c.COLLECTION_NAME FROM pattern p LEFT OUTER JOIN COLLECTION c ON p.COLLECTION_ID = c.COLLECTION_ID"; 
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                
                String patternID = rs.getString("PATTERN_ID");
                String patternName = rs.getString("PATTERN_NAME");
                String patternDescription = rs.getString("PATTERN_DESCRIPTION");
                Double patternPrice = rs.getDouble("PATTERN_PRICE");
                String collectionID = rs.getString("COLLECTION_ID");
                String collectionName = rs.getString("COLLECTION_NAME");
                
                pattern = new Pattern(patternID, patternName, patternDescription, patternPrice, new Collection(collectionID,collectionName));
                patternArrayList.add(pattern);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return patternArrayList.toArray(new Pattern[patternArrayList.size()]);
    }
    
}

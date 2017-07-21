/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import entity.Collection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Huiyan
 */
public class CollectionDAO {
    
    public static Collection getCollectionById(String collectionId) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Collection c=null;
  
        
        String sql = "SELECT * FROM collection where collection_id=?"; 
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, collectionId);
            rs = stmt.executeQuery();
        
            
            while (rs.next()) {
                
              
                String collectionName = rs.getString("fabric_name");
                c= new Collection (collectionId, collectionName);
                
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return c;
   
    }
    
}

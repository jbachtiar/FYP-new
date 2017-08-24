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
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author JeremyBachtiar
 */
public class CollectionDAO {
    
    public String addTag(Collection c) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
       
        String sql = "INSERT INTO TAG VALUES (?,?)";
        if(getCollectionById(c.getCollectionId())!=null){
            
            try {

                conn = ConnectionManager.getConnection();
                stmt = conn.prepareStatement(sql);
                stmt.setInt(1, c.getCollectionId());
                stmt.setString(2, c.getCollectionName());
                
                rs = stmt.executeQuery();
                
            } finally {
                ConnectionManager.close(conn, stmt, rs);
            }
        }else{
            return "Collection already exist";
        }
        
        return "Success";
    }
    
    public Collection getCollectionById(int collectionId) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Collection c=null;
  
        
        String sql = "SELECT * FROM collection where collection_id=?"; 
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, collectionId);
            rs = stmt.executeQuery();
        
            
            while (rs.next()) {
                
              
                String collectionName = rs.getString("collection_name");
                c= new Collection (collectionId, collectionName);
                
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return c;
   
    }
//    
//      public static Collection getCollectionByPatternId(String patternId) throws SQLException{
//        
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//        Collection c=null;
//  
//        
//        String sql = "SELECT * FROM  pattern  where pattern_id=?"; 
//        
//        try {
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement(sql);
//            stmt.setString(1, patternId);
//            rs = stmt.executeQuery();
//        
//            
//            while (rs.next()) {
//                
//              
//                String collectionId = rs.getString("collection_id");
//                c=getCollectionById(collectionId);
//                
//            }
//
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//        
//        return c;
//   
}

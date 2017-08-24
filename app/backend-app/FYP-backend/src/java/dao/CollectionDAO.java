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
        Collection result = null;
        
        String sql = "SELECT * FROM COLLECTION WHERE COLLECTION_ID = ?";
        
        try {
            
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, collectionId);
            rs = stmt.executeQuery();
            
            while(rs.next()){
                String collectionName = rs.getString("COLLECTION_NAME");
                
                result = new Collection(collectionId, collectionName);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return result;
        
    }
    
    public ArrayList<Collection> getAllCollections() throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ArrayList<Collection> collectionList = new ArrayList<Collection>();
        
        String sql = "SELECT * FROM COLLECTION";
        try {
            
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();
            
            while(rs.next()){
                int collectionId = rs.getInt("COLLECTION_ID");
                String collectionName = rs.getString("COLLECTION_NAME");
                
                Collection c = new Collection(collectionId, collectionName);
                collectionList.add(c);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return collectionList;
        
    }
    
    public String deleteCollectionById(int id) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
       
        String sql = "DELETE FROM COLLECTION WHERE COLLECTION_ID = ?";
        
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, id);

            rs = stmt.executeQuery();

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return "Success";
    }
    public String updateCollection(Collection c)throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
       
        String sql = "UPDATE COLLECTION SET COLLECTION_NAME = ? WHERE COLLECTION_ID = ?";
        
        if(getCollectionById(c.getCollectionId())!=null){
            
            try {

                conn = ConnectionManager.getConnection();
                stmt = conn.prepareStatement(sql);
                stmt.setString(1, c.getCollectionName());
                stmt.setInt(2, c.getCollectionId());
                
                rs = stmt.executeQuery();
                
            } finally {
                ConnectionManager.close(conn, stmt, rs);
            }
        }else{
            return "Collection does not exist";
        }
        
        return "Success";
    }
    
    private static void handleSQLException(SQLException ex, String sql, String... parameters) {
        String msg = "Unable to access data; SQL=" + sql + "\n";
        for (String parameter : parameters) {
            msg += "," + parameter;
        }
        Logger.getLogger(CustomerDAO.class.getName()).log(Level.SEVERE, msg, ex);
    }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

<<<<<<< HEAD
/**
 *
 * @author Huiyan
 */
=======
>>>>>>> 689643d0267fb2e97f291bf78780bb0a6bba2924
import database.ConnectionManager;
import entity.Tag;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
<<<<<<< HEAD
import java.util.ArrayList;
import java.sql.SQLException;

public class TagDAO {

    public Tag[] getTagsByDesignId(int designId) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Tag t = null;
        ArrayList<Tag> tags = new ArrayList<Tag>();

        String sql = "SELECT * FROM design_tag dt, tag t where t.tag_id=dt.tag_id and dt.design_id=?";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, designId);
            rs = stmt.executeQuery();

            while (rs.next()) {

                int tagId = rs.getInt("TAG_ID");
                String tagName = rs.getString("TAG_NAME");
                t = new Tag(tagId, tagName);
                tags.add(t);
=======
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author JeremyBachtiar
 */
public class TagDAO {
    
    public String addTag(Tag tag) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
       
        String sql = "INSERT INTO TAG VALUES (?,?)";
        if(getTagById(tag.getTagId())!=null){
            
            try {

                conn = ConnectionManager.getConnection();
                stmt = conn.prepareStatement(sql);
                stmt.setInt(1, tag.getTagId());
                stmt.setString(2, tag.getTagName());
                
                rs = stmt.executeQuery();
                
            } finally {
                ConnectionManager.close(conn, stmt, rs);
            }
        }else{
            return "Tag already exist";
        }
        
        return "Success";
    }
    
    public Tag getTagById(int tagId) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Tag result = null;
        
        String sql = "SELECT * FROM TAG WHERE TAG_ID = ?";
        
        try {
            
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, tagId);
            rs = stmt.executeQuery();
            
            while(rs.next()){
                String tagName = rs.getString("TAG_NAME");
                
                result = new Tag(tagId, tagName);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return result;
        
    }
    
    public ArrayList<Tag> getAllTags() throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ArrayList<Tag> tagList = new ArrayList<Tag>();
        
        String sql = "SELECT * FROM TAG";
        try {
            
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();
            
            while(rs.next()){
                int tagId = rs.getInt("TAG_ID");
                String tagName = rs.getString("TAG_NAME");
                
                Tag tag = new Tag(tagId, tagName);
                tagList.add(tag);
>>>>>>> 689643d0267fb2e97f291bf78780bb0a6bba2924
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
<<<<<<< HEAD

        return tags.toArray(new Tag[tags.size()]);

    }

=======
        
        return tagList;
        
    }
    
    public String deleteTagById(int id) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
       
        String sql = "DELETE FROM TAG WHERE TAG_ID = ?";
        
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
    public String updateTag(Tag tag)throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
       
        String sql = "UPDATE TAG SET TAG_NAME = ? WHERE TAG_ID = ?";
        
        if(getTagById(tag.getTagId())!=null){
            
            try {

                conn = ConnectionManager.getConnection();
                stmt = conn.prepareStatement(sql);
                stmt.setString(1, tag.getTagName());
                stmt.setInt(2, tag.getTagId());
                
                rs = stmt.executeQuery();
                
            } finally {
                ConnectionManager.close(conn, stmt, rs);
            }
        }else{
            return "Tag does not exist";
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
>>>>>>> 689643d0267fb2e97f291bf78780bb0a6bba2924
}

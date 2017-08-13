    /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import entity.Colour;
import entity.Fabric;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author Huiyan
 */
public class ColourDAO {
    
        public Colour[] getAllColours() throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Colour colour = null;
        ArrayList<Colour> colourArrayList = new ArrayList<>();
        
        String sql = "SELECT * FROM colour"; 
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                
                String colourID = rs.getString("COLOUR_ID");
                String colourName = rs.getString("COLOUR_NAME");
                
                colour = new Colour(colourID,colourName);
                colourArrayList.add(colour);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return colourArrayList.toArray(new Colour[colourArrayList.size()]);
    }
        
      public static Colour getColorById(String colorId) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Colour c=null;
  
        
        String sql = "SELECT * FROM colour where colour_id=?"; 
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, colorId);
            rs = stmt.executeQuery();
        
            
            while (rs.next()) {
                
              
                String colorName = rs.getString("colour_name");
                c= new Colour (colorId, colorName);
                
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return c;
   
    }
   
    
    
    
}

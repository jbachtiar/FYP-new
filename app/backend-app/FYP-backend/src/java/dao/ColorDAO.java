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

/**
 *
 * @author Huiyan
 */
public class ColorDAO {
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

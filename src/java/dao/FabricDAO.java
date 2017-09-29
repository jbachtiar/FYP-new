/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import entity.Fabric;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author Ong Yi Xuan
 */
public class FabricDAO {
    
    public Fabric[] getAllFabrics() throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Fabric fabric = null;
        ArrayList<Fabric> fabricArrayList = new ArrayList<Fabric>();
        
        String sql = "SELECT * FROM fabric"; 
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                
                String fabricID = rs.getString("FABRIC_ID");
                String fabricName = rs.getString("FABRIC_NAME");
                String fabricDescription = rs.getString("FABRIC_DESCRIPTION");
                Double fabricPrice = rs.getDouble("FABRIC_PRICE");
                
                fabric = new Fabric(fabricID,fabricName,fabricDescription, fabricPrice);
                fabricArrayList.add(fabric);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return fabricArrayList.toArray(new Fabric[fabricArrayList.size()]);
    }
    
     public static Fabric getFabricById(String fabricId) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Fabric f=null;
  
        
        String sql = "SELECT * FROM fabric where fabric_id=?"; 
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, fabricId);
            rs = stmt.executeQuery();
        
            
            while (rs.next()) {
                
              
                String fabricName = rs.getString("fabric_name");
                String fabricDes= rs.getString("fabric_description");
                double fabricPrice= rs.getDouble("fabric_price");
                f= new Fabric (fabricId, fabricName, fabricDes, fabricPrice);
                        
                
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return f;
   
    }
     
       
     public static ArrayList<Fabric> getFabricSByPatternId(String patternId) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ArrayList<Fabric> fabrics = new ArrayList() ;
        Fabric f;
  
        
        String sql = "SELECT * FROM fabric f, pattern_fabric pf, pattern p where p.pattern_id =? and p.pattern_id=pf.pattern_id and pf.fabric_id=f.fabric_id "; 
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, patternId);
            rs = stmt.executeQuery();
        
            
            while (rs.next()) {
                
                String fabricId = rs.getString("fabric_id");
                String fabricName = rs.getString("fabric_name");
                String fabricDes= rs.getString("fabric_description");
                double fabricPrice= rs.getDouble("fabric_price");
                f= new Fabric (fabricId, fabricName, fabricDes, fabricPrice);
                fabrics.add(f);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return fabrics;
   
    }
    
    
    
    
        

}

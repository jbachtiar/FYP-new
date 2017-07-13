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
        

}

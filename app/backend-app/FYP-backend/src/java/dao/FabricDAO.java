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
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author JeremyBachtiar
 */
public class FabricDAO {
    
    public String addFabric(Fabric fabric) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
       
        String sql = "INSERT INTO COLOUR VALUES (?,?,?,?,?)";
        
        if(getFabricById(fabric.getFabricId())!=null){
            
            try {

                conn = ConnectionManager.getConnection();
                stmt = conn.prepareStatement(sql);
                stmt.setInt(1, fabric.getFabricId());
                stmt.setString(2, fabric.getFabricName());
                stmt.setString(3, fabric.getFabricDesc());
                stmt.setDouble(4, fabric.getFabricPrice());
                stmt.setString(5, "N");
                
                rs = stmt.executeQuery();
                
            } finally {
                ConnectionManager.close(conn, stmt, rs);
            }
        }else{
            return "Fabric already exist";
        }
        
        return "Success";
    }
    
    public Fabric getFabricById(int fabricId) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Fabric result = null;
        
        String sql = "SELECT * FROM FABRIC WHERE FABRIC_ID = ?";
        
        try {
            
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, fabricId);
            rs = stmt.executeQuery();
            
            while(rs.next()){
                String fabricName = rs.getString("FABRIC_NAME");
                String fabricDesc = rs.getString("FABRIC_DESC");
                double fabricPrice = rs.getDouble("FABRIC_PRICE");
                String deleted = rs.getString("DELETED");
                
                result = new Fabric(fabricId, fabricName,fabricDesc,fabricPrice);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return result;
        
    }
    
    public ArrayList<Fabric> getAllAvailableFabrics() throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ArrayList<Fabric> fabricList = new ArrayList<Fabric>();
        
        String sql = "SELECT * FROM FABRIC WHERE DELETED = ? ";
        try {
            
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, "N");
            rs = stmt.executeQuery();
            
            while(rs.next()){
                int fabricId = rs.getInt("FABRIC_ID");
                String fabricName = rs.getString("FABRIC_NAME");
                String fabricDesc = rs.getString("FABRIC_DESC");
                double fabricPrice = rs.getDouble("FABRIC_PRICE");
                String deleted = rs.getString("DELETED");
                
                Fabric fabric = new Fabric(fabricId, fabricName,fabricDesc,fabricPrice);
                fabricList.add(fabric);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        
        return fabricList;
        
    }
    
    public String deleteFabricById(int id) throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
       
        String sql = "UPDATE FABRIC SET DELETED = ? WHERE FABRIC_ID = ?";
        
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
    public String updateFabric(Fabric fabric)throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
       
        String sql = "UPDATE FABRIC SET FABRIC_NAME = ?, FABRIC_DESC = ?, FABRIC_PRICE = ? WHERE FABRIC_ID = ?";
        
        if(getFabricById(fabric.getFabricId())!=null){
            
            try {

                conn = ConnectionManager.getConnection();
                stmt = conn.prepareStatement(sql);
                stmt.setString(1, fabric.getFabricName());
                stmt.setString(2, fabric.getFabricDesc());
                stmt.setDouble(3, fabric.getFabricPrice());
                stmt.setInt(4, fabric.getFabricId());
                
                rs = stmt.executeQuery();
                
            } finally {
                ConnectionManager.close(conn, stmt, rs);
            }
        }else{
            return "Fabric does not exist";
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

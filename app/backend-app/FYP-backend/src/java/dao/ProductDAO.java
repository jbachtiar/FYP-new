/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import entity.Collection;
import entity.Colour;
import entity.Fabric;
import entity.Pattern;
import entity.Product;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.sql.SQLException;

/**
 *
 * @author Huiyan
 */
public class ProductDAO {
     
    public static Product[] getUniqueProducts() throws SQLException{
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Product product = null;
        ArrayList<Product> productArrayList = new ArrayList();
        
        String sql = "SELECT * FROM product GROUP BY(pattern_id)"; 
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                
                String patternID = rs.getString("PATTERN_ID");
                String sku = rs.getString("SKU");
                String colourID = rs.getString("COLOUR_ID");
                String fabricID = rs.getString("FABRIC_ID");
                double colorPrice = rs.getDouble("COLOUR_PRICE");
                String imageUrl = rs.getString("IMAGE_URL");
                
                Fabric f= FabricDAO.getFabricById(fabricID);
                Colour c= ColorDAO.getColorById(colourID);
                Pattern p= PatternDAO.retrievePatternById(patternID);
                Collection col= p.getCollection();
                ArrayList<String> tags= PatternDAO.getTagsByPatternId(patternID);
                
                product = new Product(sku,patternID, p.getPatternName(), p.getPatternPrice(), f.getFabricID(), f.getFabricName(), f.getFabricPrice(), c.getColourID(), c.getColourName(), colorPrice, col.getCollectionID(), col.getCollectionName(), imageUrl, tags );
               
                productArrayList.add(product);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return productArrayList.toArray(new Product[productArrayList.size()]);
    }
    
     public static Product retrieveProductById(String sku) throws SQLException{
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Product product = null;
        
        String sql = "SELECT * from product where sku=? "; 
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, sku);
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                
                String patternID = rs.getString("PATTERN_ID");
                String colourID = rs.getString("COLOUR_ID");
                String fabricID = rs.getString("FABRIC_ID");
                double colorPrice = rs.getDouble("COLOUR_PRICE");
                String imageUrl = rs.getString("IMAGE_URL");
                
                Fabric f= FabricDAO.getFabricById(fabricID);
                Colour c= ColorDAO.getColorById(colourID);
                Pattern p= PatternDAO.retrievePatternById(patternID);
                Collection col= p.getCollection();
                ArrayList<String> tags= PatternDAO.getTagsByPatternId(patternID);
                
                product = new Product(sku,patternID, p.getPatternName(), p.getPatternPrice(), f.getFabricID(), f.getFabricName(), f.getFabricPrice(), c.getColourID(), c.getColourName(), colorPrice, col.getCollectionID(), col.getCollectionName(), imageUrl, tags );
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return product;
    }
       
    
    
    
    
}

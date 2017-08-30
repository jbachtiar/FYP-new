/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import database.ConnectionManager;
import entity.Bedding;
import entity.BeddingSize;
import entity.Colour;
import entity.Design;
import entity.Fabric;
import entity.Image;
import entity.Product;
import entity.PromoCode;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author Huiyan
 */
public class ProductDAO {

    //Create 1 PromoCode
    public void addProduct(Product p) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        String sql = "INSERT INTO PRODUCT (PRODUCT_ID, PRODUCT_TYPE, DESIGN_ID, COLOUR_ID, DELETED) VALUES (?,?,?,?,?)";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, p.getProductId());
            stmt.setString(2, p.getProductType());
            stmt.setInt(3, p.getDesign().getDesignId());
            stmt.setInt(4, p.getColour().getColourId());
            stmt.setString(5, "N");
            stmt.executeUpdate();

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

    }

    public int getNextProductId() throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        int nextProductId = 0;

        String sql = "SELECT MAX(PRODUCT_ID) AS MAX FROM PRODUCT";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();

            while (rs.next()) {

                nextProductId = rs.getInt("MAX") + 1;

            }

        } finally {

            ConnectionManager.close(conn, stmt, rs);

        }

        return nextProductId;

    }

    //Update
    public void updateProduct(Product p) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        String sql = "UPDATE PRODUCT SET PRODUCT_TYPE = ?, DESIGN_ID = ?, COLOUR_ID = ? WHERE PRODUCT_ID = ?";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, p.getProductType());
            stmt.setInt(2, p.getDesign().getDesignId());
            stmt.setInt(3, p.getColour().getColourId());
            stmt.setInt(4, p.getProductId());
            stmt.executeUpdate();

        } finally {

            ConnectionManager.close(conn, stmt, rs);

        }

    }

    //Soft Delete
    public void deleteProductById(int productId) throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        String sql = "UPDATE PRODUCT SET DELETED = 'Y' WHERE PRODUCT_ID = ?";

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, productId);
            stmt.executeUpdate();

        } finally {

            ConnectionManager.close(conn, stmt, rs);

        }

    }

//
//    public static void insertProductToDB (Product p) throws SQLException{
//        
//        //may need to drop productr table first
//        
//        String SKU = p.getSKU();
//        String patternID = p.getPatternID();
//        String fabricID = p.getFabricID();
//        String colorID = p.getColorID();
//        Double colorPrice = p.getColorPrice();
//        String imageURL = p.getImageUrl();
//        
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//        Product product = null;
//
//        String sql = "INSERT INTO PRODUCT (SKU, PATTERN_ID, FABRIC_ID, COLOUR_ID, COLOUR_PRICE, IMAGE_URL) VALUES(?,?,?,?,?,?)";      
//
//        try {
//            
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement(sql);
//            stmt.setString(1, SKU);
//            stmt.setString(2, patternID);
//            stmt.setString(3, fabricID);
//            stmt.setString(4, colorID);
//            stmt.setDouble(5, colorPrice);
//            stmt.setString(6, imageURL);
//            
//            rs = stmt.executeQuery();
//
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//        
//
//        
//    }
//    
    public ArrayList<Bedding> getBeddingDesigns() throws SQLException {

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ArrayList<Bedding> beddings = new ArrayList<>();

        String sql = "SELECT  * FROM DESIGN D, PRODUCT P, BEDDING B WHERE D.DESIGN_ID=P.DESIGN_ID AND P.PRODUCT_ID=B.PRODUCT_ID group by D.DESIGN_NAME";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            rs = stmt.executeQuery();

            while (rs.next()) {

                int productId = rs.getInt("product_id");
                int designId = rs.getInt("design_id");
                int colourId = rs.getInt("colour_id");
                double colourPrice = rs.getDouble("colour_price");
                String sizeName = rs.getString("size_name");
                int fabricId = rs.getInt("fabric_id");

                DesignDAO dd = new DesignDAO();
                ColourDAO cd = new ColourDAO();
                ImageDAO id = new ImageDAO();
                BeddingSizeDAO bzd = new BeddingSizeDAO();
                FabricDAO fd = new FabricDAO();

                Design d = dd.getDesignById(designId);
                Colour c = cd.getColourById(colourId);
                BeddingSize bs = bzd.getBeddingSizeByName(sizeName);
                Fabric f = fd.getFabricById(fabricId);
                Image[] images = id.getAllImagesByProductId(productId);

                Bedding bedding = new Bedding(colourPrice, bs, f, productId, "Bedding", d, c, images);
                beddings.add(bedding);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return beddings;
    }

    public Product getProductById(int productId) throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        Product product = null;

        String sql = "SELECT * FROM PRODUCT WHERE PRODUCT_ID=? ";
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, productId);
            rs = stmt.executeQuery();

            while (rs.next()) {

                int designId = rs.getInt("DESIGN_ID");
                DesignDAO dd = new DesignDAO();
                ColourDAO cd = new ColourDAO();
                ImageDAO id = new ImageDAO();

                int colourId = rs.getInt("COLOUR_ID");
                String productType = rs.getString("PRODUCT_TYPE");
                product = new Product(productId, productType, dd.getDesignById(designId), cd.getColourById(colourId), id.getAllImagesByProductId(productId));

            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }
        return product;
    }

    public ArrayList<Bedding> getAllBeddings() throws SQLException {
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ArrayList<Bedding> beddings = new ArrayList<>();
        String sql = "SELECT * FROM PRODUCT P AND BEDDING B WHERE B.PRODUCT_ID=P.PRODUCT_ID AND P.PRODUCT_TYPE=?";
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, "Bedding");
            rs = stmt.executeQuery();
            while (rs.next()) {

                int productId = rs.getInt("product_id");
                int designId = rs.getInt("design_id");
                int colourId = rs.getInt("colour_id");
                double colourPrice = rs.getDouble("colour_price");
                String sizeName = rs.getString("size_name");
                int fabricId = rs.getInt("fabric_id");

                DesignDAO dd = new DesignDAO();
                ColourDAO cd = new ColourDAO();
                ImageDAO id = new ImageDAO();
                BeddingSizeDAO bzd = new BeddingSizeDAO();
                FabricDAO fd = new FabricDAO();

                Design d = dd.getDesignById(designId);
                Colour c = cd.getColourById(colourId);
                BeddingSize bs = bzd.getBeddingSizeByName(sizeName);
                Fabric f = fd.getFabricById(fabricId);
                Image[] images = id.getAllImagesByProductId(productId);

                Bedding bedding = new Bedding(colourPrice, bs, f, productId, "Bedding", d, c, images);
                beddings.add(bedding);
            }

        } finally {
            ConnectionManager.close(conn, stmt, rs);
        }

        return beddings;

    }
//
//    public static ArrayList<Colour> getAvailableColoursByPatternFabric(String patternId, String fabricId) throws SQLException {
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//        ArrayList<Colour> colors = new ArrayList();
//
//        String sql = "SELECT colour_id from product where fabric_id=? and pattern_id=?";
//        try {
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement(sql);
//            stmt.setString(1, fabricId);
//            stmt.setString(2, patternId);
//            rs = stmt.executeQuery();
//
//            while (rs.next()) {
//
//                String ColorId = rs.getString("colour_id");
//                colors.add(ColourDAO.getColorById(ColorId));
//
//            }
//
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//        return colors;
//    }
//
//    public static Product getProductByPatternFabricColor(String patternId, String fabricId, String colorId) throws SQLException {
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//        Product p = null;
//
//        String sql = "SELECT sku from product where fabric_id=? and pattern_id=? and colour_id = ? ";
//        try {
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement(sql);
//            stmt.setString(1, fabricId);
//            stmt.setString(2, patternId);
//            stmt.setString(3, colorId);
//            rs = stmt.executeQuery();
//
//            while (rs.next()) {
//
//                String productId = rs.getString("sku");
//                p = retrieveProductById(productId);
//
//            }
//
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//        return p;
//    }
//
//    public static Product[] getfilteredProducts(String collectionId, String fabricId, String colourId, String sortPrice) throws SQLException {
//
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//        Product product = null;
//        ArrayList<Product> productArrayList = new ArrayList();
//        System.out.println(collectionId + fabricId + colourId + sortPrice);
//        String sql = "SELECT p1.*, p2.COLLECTION_ID FROM PRODUCT p1 LEFT OUTER JOIN PATTERN p2 ON p1.PATTERN_ID = p2.PATTERN_ID WHERE ";
//
//        if (collectionId != null) {
//
//            sql += "COLLECTION_ID = ? AND";
//
//        }
//
//        if (fabricId != null) {
//
//            sql += " FABRIC_ID = ? AND";
//
//        }
//
//        if (colourId != null) {
//
//            sql += " COLOUR_ID = ? AND";
//
//        }
//
//        sql = sql.substring(0, sql.length() - 3);
//        sql += " GROUP BY (p1.pattern_id) ORDER BY p1.COLOUR_PRICE";
//
//        if (sortPrice.equals("desc")) {
//
//            sql += " DESC";
//
//        }
//        
//        System.out.println(sql);
//
//        try {
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement(sql);
//
//            if (collectionId != null) {
//
//                stmt.setString(1, collectionId);
//
//                if (fabricId != null) {
//
//                    stmt.setString(2, fabricId);
//
//                    if (colourId != null) {
//
//                        stmt.setString(3, colourId);
//
//                    }
//
//                }else if(colourId != null){
//                    
//                    stmt.setString(2, colourId);
//                      
//                }
//
//            } else if (fabricId != null) {
//
//                stmt.setString(1, fabricId);
//
//                if (colourId != null) {
//
//                    stmt.setString(2, colourId);
//
//                }
//
//            } else if (colourId != null) {
//
//                stmt.setString(1, colourId);
//
//            }
//
//            rs = stmt.executeQuery();
//
//            while (rs.next()) {
//
//                String patternID = rs.getString("PATTERN_ID");
//                String sku = rs.getString("SKU");
//                String colourID = rs.getString("COLOUR_ID");
//                String fabricID = rs.getString("FABRIC_ID");
//                double colorPrice = rs.getDouble("COLOUR_PRICE");
//                String imageUrl = rs.getString("IMAGE_URL");
//
//                Fabric f = FabricDAO.getFabricById(fabricID);
//                Colour c = ColourDAO.getColorById(colourID);
//                Pattern p = PatternDAO.retrievePatternById(patternID);
//                Collection col = p.getCollection();
//                ArrayList<String> tags = PatternDAO.getTagsByPatternId(patternID);
//
//                product = new Product(sku, patternID, p.getPatternName(), p.getPatternPrice(), f.getFabricID(), f.getFabricName(), f.getFabricPrice(), c.getColourID(), c.getColourName(), colorPrice, col.getCollectionID(), col.getCollectionName(), imageUrl, tags);
//
//                productArrayList.add(product);
//            }
//
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//        return productArrayList.toArray(new Product[productArrayList.size()]);
//    }
//    
//    public static Product[] getSearchProducts(String search) throws SQLException {
//        System.out.print(search);
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//        Product product = null;
//        ArrayList<Product> productArrayList = new ArrayList();
//
//        String sql = "SELECT p1.* FROM PRODUCT p1 LEFT OUTER JOIN PATTERN p2 ON p1.PATTERN_ID = p2.PATTERN_ID WHERE PATTERN_NAME LIKE '%";
//        sql = sql + search + "%' GROUP BY (p1.pattern_id)";
//        System.out.println(sql);
//        try {
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement(sql);
//            rs = stmt.executeQuery();
//
//            while (rs.next()) {
//
//                String patternID = rs.getString("PATTERN_ID");
//                String sku = rs.getString("SKU");
//                String colourID = rs.getString("COLOUR_ID");
//                String fabricID = rs.getString("FABRIC_ID");
//                double colorPrice = rs.getDouble("COLOUR_PRICE");
//                String imageUrl = rs.getString("IMAGE_URL");
//
//                Fabric f = FabricDAO.getFabricById(fabricID);
//                Colour c = ColourDAO.getColorById(colourID);
//                Pattern p = PatternDAO.retrievePatternById(patternID);
//                Collection col = p.getCollection();
//                ArrayList<String> tags = PatternDAO.getTagsByPatternId(patternID);
//
//                product = new Product(sku, patternID, p.getPatternName(), p.getPatternPrice(), f.getFabricID(), f.getFabricName(), f.getFabricPrice(), c.getColourID(), c.getColourName(), colorPrice, col.getCollectionID(), col.getCollectionName(), imageUrl, tags);
//
//                productArrayList.add(product);
//            }
//
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//        return productArrayList.toArray(new Product[productArrayList.size()]);
//    }
//    
//    public static void updatePatternFabric(String patternID, String fabricID) {
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//        String sql = "INSERT IGNORE INTO pattern_fabric (PATTERN_ID, FABRIC_ID) VALUES (?, ?)";
//
//        try {
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement(sql);
//            stmt.setString(1, patternID);
//            stmt.setString(2, fabricID);
//           
//            stmt.executeUpdate();
//            
//        } catch (SQLException ex) {
//            handleSQLException(ex, sql);
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//    }
//    
//    private static void handleSQLException(SQLException ex, String sql, String... parameters) {
//        String msg = "Unable to access data; SQL=" + sql + "\n";
//        for (String parameter : parameters) {
//            msg += "," + parameter;
//        }
//        Logger.getLogger(CustomerDAO.class.getName()).log(Level.SEVERE, msg, ex);
//    }
//    
//    public static Product[] getfilteredProductList(String collectionId, String fabricId, String colourId, String sortPrice, String search) throws SQLException {
//
//        Connection conn = null;
//        PreparedStatement stmt = null;
//        ResultSet rs = null;
//        Product product = null;
//        ArrayList<Product> productArrayList = new ArrayList();
//
//        String sql = "SELECT p1.*, p2.COLLECTION_ID FROM PRODUCT p1 LEFT OUTER JOIN PATTERN p2 ON p1.PATTERN_ID = p2.PATTERN_ID WHERE ";
//
//        
//        if (!collectionId.equals("undefined")) {
//
//            sql += "COLLECTION_ID = ? AND";
//
//        }
//
//        if (!fabricId.equals("undefined")) {
//
//            sql += " FABRIC_ID = ? AND";
//
//        }
//
//        if (!colourId.equals("undefined")) {
//
//            sql += " COLOUR_ID = ? AND";
//
//        }
//        
//        if (!search.equals("undefined")){
//            
//            System.out.println(search);
//            sql += " PATTERN_NAME LIKE '%" + search + "%' AND";
//            
//        }
//
//        sql = sql.substring(0, sql.length() - 3);
//        sql += " GROUP BY (p1.pattern_id) ORDER BY p1.COLOUR_PRICE";
//
//        if (sortPrice.equals("desc")) {
//
//            sql += " DESC";
//
//        }
//        
//        System.out.println(sql);
//
//        try {
//            conn = ConnectionManager.getConnection();
//            stmt = conn.prepareStatement(sql);
//
//            if (!collectionId.equals("undefined")) {
//
//                stmt.setString(1, collectionId);
//
//                if (!fabricId.equals("undefined")) {
//
//                    stmt.setString(2, fabricId);
//
//                    if (!colourId.equals("undefined")) {
//
//                        stmt.setString(3, colourId);
//
//                    }
//
//                }else if(!colourId.equals("undefined")){
//                    
//                    stmt.setString(2, colourId);
//                      
//                }
//
//            } else if (!fabricId.equals("undefined")) {
//
//                stmt.setString(1, fabricId);
//
//                if (!colourId.equals("undefined")) {
//
//                    stmt.setString(2, colourId);
//
//                }
//
//            } else if (!colourId.equals("undefined")) {
//
//                stmt.setString(1, colourId);
//
//            }
//
//            rs = stmt.executeQuery();
//
//            while (rs.next()) {
//
//                String patternID = rs.getString("PATTERN_ID");
//                String sku = rs.getString("SKU");
//                String colourID = rs.getString("COLOUR_ID");
//                String fabricID = rs.getString("FABRIC_ID");
//                double colorPrice = rs.getDouble("COLOUR_PRICE");
//                String imageUrl = rs.getString("IMAGE_URL");
//
//                Fabric f = FabricDAO.getFabricById(fabricID);
//                Colour c = ColourDAO.getColorById(colourID);
//                Pattern p = PatternDAO.retrievePatternById(patternID);
//                Collection col = p.getCollection();
//                ArrayList<String> tags = PatternDAO.getTagsByPatternId(patternID);
//
//                product = new Product(sku, patternID, p.getPatternName(), p.getPatternPrice(), f.getFabricID(), f.getFabricName(), f.getFabricPrice(), c.getColourID(), c.getColourName(), colorPrice, col.getCollectionID(), col.getCollectionName(), imageUrl, tags);
//
//                productArrayList.add(product);
//            }
//
//        } finally {
//            ConnectionManager.close(conn, stmt, rs);
//        }
//        return productArrayList.toArray(new Product[productArrayList.size()]);
//    }
//    
}

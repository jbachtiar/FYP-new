/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webServices;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dao.BeddingSizeDAO;
import dao.CollectionDAO;
import dao.ColourDAO;
import dao.FabricDAO;
import dao.PatternDAO;
import dao.ProductDAO;
import entity.Bedding;
import entity.BeddingSize;
import entity.Collection;
import entity.Colour;
import entity.Fabric;
import entity.Pattern;
import entity.Product;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;

import javax.ws.rs.core.MediaType;

/**
 *
 * @author Huiyan
 */
@Path("/ProductCatalogue")
public class ProductCatalogue {

    @Context
    private HttpServletResponse response;
//
//    @OPTIONS
//    @PermitAll
//    @Path("/update")  // post delete update 
//    public void optionsUpdateProduct() {
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
//        response.setHeader("Access-Control-Allow-Headers", "content-type");
//        
//    }
//    
//    
//    @POST
//    @Path("/update")
//    @Consumes(MediaType.APPLICATION_JSON)
//    public String updateProduct(final String json){
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        
//        
//        Gson gson = new Gson(); 
//        CustomPattern cp = gson.fromJson(json, CustomPattern.class);
//        
//        JsonObject jsonOutput = new JsonObject();
//        
//        try{
//            
//            jsonOutput.addProperty("status", "200");
//            PatternDAO.updatePatternToDB(cp);
//            
//            
//        }catch(SQLException e){
//            
//            
//            jsonOutput.addProperty("status", "error");
//            jsonOutput.addProperty("msg", e.getMessage());
//        }
//        
//        String finalJsonOutput = gson.toJson(jsonOutput);
//        return finalJsonOutput;
//        
//    }
//    
//    

    @GET
    @Path("/BeddingPatterns")
    @Produces(MediaType.APPLICATION_JSON)
    public String getProductsCatalogue() {
        response.setHeader("Access-Control-Allow-Origin", "*");

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray patterns = new JsonArray();
        ProductDAO productDao = new ProductDAO();

        try {

            ArrayList<Bedding> beddingDesigns = productDao.getBeddingPatterns();
            jsonOutput.addProperty("status", "200");

            for (Bedding b : beddingDesigns) {

                JsonObject temp = new JsonObject();

                temp.addProperty("product_id", b.getProductId());
                temp.addProperty("fabric_id", b.getFabric().getFabricId());
                temp.addProperty("pattern_id", b.getPattern().getPatternId());
                temp.addProperty("colour_id", b.getColour().getColourId());

                temp.addProperty("design_name", b.getPattern().getPatternName());
                temp.addProperty("fabric_name", b.getFabric().getFabricName());
                temp.addProperty("collection_name", b.getPattern().getCollection().getCollectionName());
                temp.addProperty("colour_name", b.getColour().getColourName());

                temp.addProperty("design_price", b.getPattern().getPatternPrice());
                temp.addProperty("fabric_price", b.getFabric().getFabricPrice());
                temp.addProperty("lowest_price", productDao.getLowestCombinationPriceByPatternId(b.getPattern().getPatternId()));
                JsonArray images = gson.toJsonTree(b.getImages()).getAsJsonArray(); // convert arraylist to jsonArray
                temp.add("images", images);
                JsonArray tags = gson.toJsonTree(b.getPattern().getTags()).getAsJsonArray(); // convert arraylist to jsonArray
                temp.add("tags", tags);

                patterns.add(temp);

            }

            jsonOutput.add("patterns", patterns);

        } catch (SQLException e) {
            System.out.println(e);
            jsonOutput.addProperty("status", "SQL exception");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }

    @GET
    @Path("/GetBedding")
    @Produces(MediaType.APPLICATION_JSON)
    public String getBeddingById(@QueryParam("productId") int productId) {
        response.setHeader("Access-Control-Allow-Origin", "*");

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray product = new JsonArray();
        ProductDAO productDao = new ProductDAO();

        try {

            Product p = productDao.getProductById(productId);
            if (p == null) {
                jsonOutput.addProperty("error", "Bedding not found");

            } else {
                jsonOutput.addProperty("status", "200");

                JsonObject temp = new JsonObject();

                temp.addProperty("product_id", p.getProductId());
                temp.addProperty("fabric_id", p.getFabric().getFabricId());
                temp.addProperty("pattern_id", p.getPattern().getPatternId());
                temp.addProperty("colour_id", p.getColour().getColourId());

                temp.addProperty("design_name", p.getPattern().getPatternName());
                temp.addProperty("fabric_name", p.getFabric().getFabricName());
                temp.addProperty("collection_name", p.getPattern().getCollection().getCollectionName());
                temp.addProperty("colour_name", p.getColour().getColourName());

                temp.addProperty("design_price", p.getPattern().getPatternPrice());
                temp.addProperty("fabric_price", p.getFabric().getFabricPrice());
              
                JsonArray images = gson.toJsonTree(p.getImages()).getAsJsonArray(); // convert arraylist to jsonArray
                temp.add("images", images);
                JsonArray tags = gson.toJsonTree(p.getPattern().getTags()).getAsJsonArray(); // convert arraylist to jsonArray
                temp.add("tags", tags);

                product.add(temp);

                jsonOutput.add("product", product);
            }

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "error");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
//
//    @GET
//    @Path("/product")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getProductById(@QueryParam("sku") String sku) {
//        
//        response.setHeader("Access-Control-Allow-Origin", "*");
//
//        JsonObject jsonOutput = new JsonObject();
//        Gson gson = new GsonBuilder().create();
//
//        try {
//
//            Product p = ProductDAO.retrieveProductById(sku);
//            if (p == null) {
//                jsonOutput.addProperty("status", "Product not found");
//
//            } else {
//                jsonOutput.addProperty("status", "200");
//                JsonObject temp = new JsonObject();
//                temp.addProperty("SKU", p.getSKU());
//                temp.addProperty("pattern_id", p.getPatternID());
//                temp.addProperty("fabric_id", p.getFabricID());
//                temp.addProperty("collection_id", p.getCollectionID());
//                temp.addProperty("colour_id", p.getColorID());
//
//                temp.addProperty("pattern_name", p.getPatternName());
//                temp.addProperty("fabric_name", p.getFabricName());
//                temp.addProperty("collection_name", p.getCollectionName());
//                temp.addProperty("colour_name", p.getColorName());
//
//                temp.addProperty("pattern_price", p.getFabricPrice());
//                temp.addProperty("fabric_price", p.getFabricPrice());
//                temp.addProperty("colour_price", p.getFabricPrice());
//                temp.addProperty("image_url", p.getImageUrl());
//                JsonArray tags = gson.toJsonTree(p.getTags()).getAsJsonArray(); // convert arraylist to jsonArray
//                temp.add("tags", tags);
//                jsonOutput.add("product", temp);
//
//            }
//        } catch (SQLException e) {
//
//            jsonOutput.addProperty("status", "error");
//
//        }
//
//        String finalJsonOutput = gson.toJson(jsonOutput);
//        return finalJsonOutput;
//    }
//

    @GET
    @Path("/customize")
    @Produces(MediaType.APPLICATION_JSON)
    public String getBeddingCombinationsByPatternId(@QueryParam("patternId") int patternId) {

        response.setHeader("Access-Control-Allow-Origin", "*");

        JsonObject jsonOutput = new JsonObject();
        Gson gson = new GsonBuilder().create();
        JsonParser parser = new JsonParser();

        try {
            PatternDAO patternDao = new PatternDAO();
            FabricDAO fabricDao = new FabricDAO();
            CollectionDAO collectionDao = new CollectionDAO();
            Pattern pattern = patternDao.getPatternById(patternId);
            ColourDAO colourDao = new ColourDAO();
            ProductDAO productDao = new ProductDAO();
            ArrayList<Fabric> fabrics = fabricDao.getFabricsByPatternId(patternId);

            Collection c = collectionDao.getCollectionByPatternId(patternId);
            if (fabrics.isEmpty()) {
                jsonOutput.addProperty("status", "Fabric not found");

            } else {
                jsonOutput.addProperty("status", "200");
                JsonObject patt = new JsonObject();
                patt.addProperty("pattern_id", pattern.getPatternId());
                patt.addProperty("pattern_name", pattern.getPatternName());
                patt.addProperty("pattern_description", pattern.getPatternDesc());
                patt.addProperty("pattern_price", pattern.getPatternPrice());

                patt.addProperty("collection_id", c.getCollectionId());
                patt.addProperty("collection_name", c.getCollectionName());

                JsonArray fabricsJson = new JsonArray();

                for (int i = 0; i < fabrics.size(); i++) {
                    Fabric f = fabrics.get(i);
                    int fabricId = f.getFabricId();
                    ArrayList<Colour> colours = colourDao.getAvailableColoursByPatternIdFabricId(patternId, fabricId);

                    JsonObject fa = new JsonObject();
                    fa.addProperty("fabric_id", fabricId);
                    fa.addProperty("fabric_name", f.getFabricName());
                    fa.addProperty("fabric_description", f.getFabricDesc());
                    fa.addProperty("fabric_price", f.getFabricPrice());
                    JsonArray colorsJson = new JsonArray();
                    for (int j = 0; j < colours.size(); j++) {
                        Colour col = colours.get(j);
                        JsonObject co = new JsonObject();
                        int colorId = col.getColourId();

                        co.addProperty("colour_id", colorId);
                        co.addProperty("colour_name", col.getColourName());

                        Product p = productDao.getProductByPatternFabricColor(pattern.getPatternId(), fabricId, colorId);
                        if (p != null) {
                            JsonArray images = gson.toJsonTree(p.getImages()).getAsJsonArray();

                            co.add("images", images);

                            if (p.getProductType().equals("Bedding")) {

                                BeddingSizeDAO beddingSizeDao = new BeddingSizeDAO();
                                ArrayList<BeddingSize> beddingSizes = beddingSizeDao.getAllBeddingSizes();
                                JsonArray sizes = new JsonArray();
                                for (BeddingSize bs : beddingSizes) {
                                    String beddingSizeString = gson.toJson(bs);
                                    JsonElement beddingSizeElement = parser.parse(beddingSizeString);
                                    sizes.add(beddingSizeElement);
                                }
                                
                                co.add("size", sizes);
                            }
                        }
                        colorsJson.add(co);
                    }

                    fa.add("colours", colorsJson);

                    fabricsJson.add(fa);
                }

                patt.add("fabrics", fabricsJson);
                jsonOutput.add("pattern", patt);

            }
        } catch (SQLException e) {

            jsonOutput.addProperty("status", "error");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }

//    @GET
//    @Path("/filtersort")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getProductsCataloguebyFilter(@QueryParam("collectionId") String collectionId, @QueryParam("fabricId") String fabricId, @QueryParam("colourId") String colourId, @QueryParam("sortPrice") String sortPrice, @QueryParam("search") String search) {
//        
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        
//        Gson gson = new GsonBuilder().create();
//        JsonObject jsonOutput = new JsonObject();
//        JsonArray products = new JsonArray();
//
//        try {
//
//            Product[] pArray = ProductDAO.getfilteredProductList(collectionId, fabricId, colourId, sortPrice, search);
//            jsonOutput.addProperty("status", "200");
//
//            for (Product p : pArray) {
//
//                JsonObject temp = new JsonObject();
//
//                temp.addProperty("SKU", p.getSKU());
//                temp.addProperty("pattern_id", p.getPatternID());
//                temp.addProperty("fabric_id", p.getFabricID());
//                temp.addProperty("collection_id", p.getCollectionID());
//                temp.addProperty("colour_id", p.getColorID());
//
//                temp.addProperty("pattern_name", p.getPatternName());
//                temp.addProperty("fabric_name", p.getFabricName());
//                temp.addProperty("collection_name", p.getCollectionName());
//                temp.addProperty("colour_name", p.getColorName());
//
//                temp.addProperty("pattern_price", p.getFabricPrice());
//                temp.addProperty("fabric_price", p.getFabricPrice());
//                temp.addProperty("colour_price", p.getFabricPrice());
//                temp.addProperty("image_url", p.getImageUrl());
//
//                JsonArray tags = gson.toJsonTree(p.getTags()).getAsJsonArray(); // convert arraylist to jsonArray
//                temp.add("tags", tags);
//
//                products.add(temp);
//
//            }
//
//            jsonOutput.add("products", products);
//
//        } catch (SQLException e) {
//
//            jsonOutput.addProperty("status", "error");
//
//        }
//
//        String finalJsonOutput = gson.toJson(jsonOutput);
//        return finalJsonOutput;
//    }
//
//    @GET
//    @Path("/search")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getSearchProducts(@QueryParam("search") String search) {
//        
//        
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        
//        Gson gson = new GsonBuilder().create();
//        JsonObject jsonOutput = new JsonObject();
//        JsonArray products = new JsonArray();
//
//        if (search.isEmpty() || search.equals(" ")) {
//
//            return getProductsCatalogue();
//
//        } else {
//
//            try {
//
//                Product[] pArray = ProductDAO.getSearchProducts(search);
//                jsonOutput.addProperty("status", "200");
//
//                for (Product p : pArray) {
//
//                    JsonObject temp = new JsonObject();
//
//                    temp.addProperty("SKU", p.getSKU());
//                    temp.addProperty("pattern_id", p.getPatternID());
//                    temp.addProperty("fabric_id", p.getFabricID());
//                    temp.addProperty("collection_id", p.getCollectionID());
//                    temp.addProperty("colour_id", p.getColorID());
//
//                    temp.addProperty("pattern_name", p.getPatternName());
//                    temp.addProperty("fabric_name", p.getFabricName());
//                    temp.addProperty("collection_name", p.getCollectionName());
//                    temp.addProperty("colour_name", p.getColorName());
//
//                    temp.addProperty("pattern_price", p.getFabricPrice());
//                    temp.addProperty("fabric_price", p.getFabricPrice());
//                    temp.addProperty("colour_price", p.getFabricPrice());
//                    temp.addProperty("image_url", p.getImageUrl());
//
//                    JsonArray tags = gson.toJsonTree(p.getTags()).getAsJsonArray(); // convert arraylist to jsonArray
//                    temp.add("tags", tags);
//
//                    products.add(temp);
//
//                }
//
//                jsonOutput.add("products", products);
//
//            } catch (SQLException e) {
//
//                jsonOutput.addProperty("status", "error");
//
//            }
//
//            String finalJsonOutput = gson.toJson(jsonOutput);
//            return finalJsonOutput;
//        }
//    }
//    
//    //Get product ID for Cart
//    @GET
//    @Path("/filters")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getProductsCataloguebyFilters(@QueryParam("collectionId") String collectionId, @QueryParam("fabricId") String fabricId, @QueryParam("colourId") String colourId, @QueryParam("sortPrice") String sortPrice, @QueryParam("search") String search) {
//        
//        
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        
//        Gson gson = new GsonBuilder().create();
//        JsonObject jsonOutput = new JsonObject();
//        JsonArray products = new JsonArray();
//
//        try {
//
//            Product[] pArray = ProductDAO.getfilteredProductList(collectionId, fabricId, colourId, sortPrice, search);
//            jsonOutput.addProperty("status", "200");
//
//            for (Product p : pArray) {
//
//                JsonObject temp = new JsonObject();
//
//                temp.addProperty("SKU", p.getSKU());
//                temp.addProperty("pattern_id", p.getPatternID());
//                temp.addProperty("fabric_id", p.getFabricID());
//                temp.addProperty("collection_id", p.getCollectionID());
//                temp.addProperty("colour_id", p.getColorID());
//
//                temp.addProperty("pattern_name", p.getPatternName());
//                temp.addProperty("fabric_name", p.getFabricName());
//                temp.addProperty("collection_name", p.getCollectionName());
//                temp.addProperty("colour_name", p.getColorName());
//
//                temp.addProperty("pattern_price", p.getFabricPrice());
//                temp.addProperty("fabric_price", p.getFabricPrice());
//                temp.addProperty("colour_price", p.getFabricPrice());
//                temp.addProperty("image_url", p.getImageUrl());
//
//                JsonArray tags = gson.toJsonTree(p.getTags()).getAsJsonArray(); // convert arraylist to jsonArray
//                temp.add("tags", tags);
//
//                products.add(temp);
//
//            }
//
//            jsonOutput.add("products", products);
//
//        } catch (SQLException e) {
//
//            jsonOutput.addProperty("status", "error");
//
//        }
//
//        String finalJsonOutput = gson.toJson(jsonOutput);
//        return finalJsonOutput;
//    }
//    
//    
//    @PUT
//    @Path("/updatePatternFabric")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String updatePatternFabric (@Context HttpHeaders httpHeaders, @FormParam("patternID") String patternID,@FormParam("fabricID") String fabricID){
//        //String password = CustomerDAO.retrievePasswordByEmail(email);
//        
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        
//        HashMap<String, String> responseMap = new HashMap<>();
//        Gson gson = new GsonBuilder().create();
//        String status;
//        Pattern pattern = null;
//                
//        
//        ProductDAO.updatePatternFabric(patternID, fabricID);
//        status = "200";
//        responseMap.put("status", status);
//        
//        //responseMap.put("status", STATUS_ERROR_NULL_PASSWORD);
//        return gson.toJson(responseMap);
//    }
//    
//    @GET
//    @Path("/colours")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getColourCatalogue(){
//        
//        
//        response.setHeader("Access-Control-Allow-Origin", "*");
//
//        ColourDAO colourDAO = new ColourDAO();
//        Gson gson = new GsonBuilder().create();
//        JsonObject jsonOutput = new JsonObject();
//        JsonArray colours = new JsonArray();
//        
//        try{
//            
//            Colour[] cArray = colourDAO.getAllColours();
//            jsonOutput.addProperty("status","200");
//            
//            for(Colour f: cArray){
//                
//                JsonObject temp = new JsonObject();
//                temp.addProperty("colour_id", f.getColourID());
//                temp.addProperty("colour_name", f.getColourName());
//                colours.add(temp);
//            
//            }
//
//            jsonOutput.add("colours", colours);
//            
//        }catch(SQLException e){
//        
//            jsonOutput.addProperty("status","error");
//            
//        }
//        
//        String finalJsonOutput = gson.toJson(jsonOutput);
//        return finalJsonOutput;
//    }
//    
//    @GET
//    @Path("/collections")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getCollectionCatalogue(){
//        
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        
//        CollectionDAO collectionDAO = new CollectionDAO();
//        Gson gson = new GsonBuilder().create();
//        JsonObject jsonOutput = new JsonObject();
//        JsonArray collections = new JsonArray();
//        
//        try{
//            
//            Collection[] cArray = collectionDAO.getAllCollections();
//            jsonOutput.addProperty("status","200");
//            
//            for(Collection c: cArray){
//                
//                JsonObject temp = new JsonObject();
//                temp.addProperty("collection_id", c.getCollectionID());
//                temp.addProperty("collection_name", c.getCollectionName());
//                collections.add(temp);
//            
//            }
//
//            jsonOutput.add("collections", collections);
//            
//        }catch(SQLException e){
//        
//            jsonOutput.addProperty("status","error");
//            
//        }
//        
//        String finalJsonOutput = gson.toJson(jsonOutput);
//        return finalJsonOutput;
//    }
//    
//    @GET
//    @Path("/adminPatternFilter")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getadminFilter(@QueryParam("collectionId") String collectionId, @QueryParam("fabricId") String fabricId, @QueryParam("colourId") String colourId, @QueryParam("sortPrice") String sortPrice, @QueryParam("search") String search) {
//        
//        
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        
//        System.out.println("bad");
//        Gson gson = new GsonBuilder().create();
//        JsonObject jsonOutput = new JsonObject();
//        JsonArray products = new JsonArray();
//
//        try {
//
//            Product[] pArray = ProductDAO.getfilteredProductList(collectionId, fabricId, colourId, sortPrice, search);
//            System.out.println("Hello");
//            jsonOutput.addProperty("status", "200");
//
//            for (Product p : pArray) {
//
//                JsonObject temp = new JsonObject();
//
//                temp.addProperty("SKU", p.getSKU());
//                temp.addProperty("pattern_id", p.getPatternID());
//                temp.addProperty("fabric_id", p.getFabricID());
//                temp.addProperty("collection_id", p.getCollectionID());
//                temp.addProperty("colour_id", p.getColorID());
//
//                temp.addProperty("pattern_name", p.getPatternName());
//                temp.addProperty("fabric_name", p.getFabricName());
//                temp.addProperty("collection_name", p.getCollectionName());
//                temp.addProperty("colour_name", p.getColorName());
//
//                temp.addProperty("pattern_price", p.getFabricPrice());
//                temp.addProperty("fabric_price", p.getFabricPrice());
//                temp.addProperty("colour_price", p.getFabricPrice());
//                temp.addProperty("image_url", p.getImageUrl());
//
//                JsonArray tags = gson.toJsonTree(p.getTags()).getAsJsonArray(); // convert arraylist to jsonArray
//                temp.add("tags", tags);
//
//                products.add(temp);
//
//            }
//
//            jsonOutput.add("products", products);
//
//        } catch (SQLException e) {
//
//            jsonOutput.addProperty("status", "error");
//
//        }
//
//        String finalJsonOutput = gson.toJson(jsonOutput);
//        return finalJsonOutput;
//    }
//    
//    @GET
//    @Path("/getProductId")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getProductIdBy(@QueryParam("patternId") String patternId, @QueryParam("fabricId") String fabricId, @QueryParam("colourId") String colourId){
//        
//        
//        response.setHeader("Access-Control-Allow-Origin", "*");
//      
//        JsonObject jsonOutput = new JsonObject();
//        Gson gson = new GsonBuilder().create();
//     
//        try{
//            
//            Product p = ProductDAO.getProductByPatternFabricColor(patternId, fabricId, colourId);
//            if(p==null){
//                jsonOutput.addProperty("status", "Product not found");
//           
//            }else{
//                jsonOutput.addProperty("status","200");
//                jsonOutput.addProperty("productId", p.getSKU());
//                
//                 
//            }
//        }catch(SQLException e){
//        
//            jsonOutput.addProperty("status","error");
//            
//        }
//        
//        String finalJsonOutput = gson.toJson(jsonOutput);
//        return finalJsonOutput;
//    }
//    
//    @GET
//    @Path("/fabrics")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getFabricCatalogue(){
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        FabricDAO fabricDAO = new FabricDAO();
//        Gson gson = new GsonBuilder().create();
//        JsonObject jsonOutput = new JsonObject();
//        JsonArray fabrics = new JsonArray();
//        
//        try{
//            
//            Fabric[] fArray = fabricDAO.getAllFabrics();
//            jsonOutput.addProperty("status","200");
//            
//            for(Fabric f: fArray){
//                
//                JsonObject temp = new JsonObject();
//                temp.addProperty("fabric_id", f.getFabricID());
//                temp.addProperty("fabric_name", f.getFabricName());
//                temp.addProperty("fabric_price", f.getFabricPrice());
//                fabrics.add(temp);
//                
//            }
//
//            jsonOutput.add("fabrics", fabrics);
//            
//        }catch(SQLException e){
//        
//            jsonOutput.addProperty("status","error");
//            
//        }
//        
//        String finalJsonOutput = gson.toJson(jsonOutput);
//        return finalJsonOutput;
//    }
    
//    @GET
//    @Path("/GetFilters")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getAllFilters() {
//        
//        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
//
//        Gson gson = new GsonBuilder().create();
//        JsonObject jsonOutput = new JsonObject();
//        
//        JsonArray collectionArray = new JsonArray();
//        JsonArray fabricArray = new JsonArray();
//        JsonArray colourArray = new JsonArray();
//        
//        ProductDAO productDao = new ProductDAO();
//
//        try {
//
//            ArrayList<Bedding> bList = productDao.getAllBeddings();
//            if (bList == null) {
//                
//                jsonOutput.addProperty("status", "500");
//                jsonOutput.addProperty("msg", "No Beddings Available");
//                
//
//            } else {
//                
//                Set<Integer> collectionSet = new HashSet();
//                Set<Integer> fabricSet = new HashSet();
//                Set<Integer> colourSet = new HashSet();
//                
//                
//                
//                
//                
//setOfIntegers.add(Integer.valueOf(10));
//setOfIntegers.add(Integer.valueOf(20));
//setOfIntegers.add(Integer.valueOf(30));
//setOfIntegers.add(Integer.valueOf(40));
//setOfIntegers.add(Integer.valueOf(50));
//Logger l = Logger.getLogger("Test");
//for (Integer i : setOfIntegers) {
//  l.info("Integer value is : " + i);
//}
//
//                
//                jsonOutput.addProperty("status", "200");
//                JsonArray colours = gson.toJsonTree(cList).getAsJsonArray(); // convert arraylist to jsonArray
//                jsonOutput.add("colours", colours);
//
//            }
//
//        } catch (SQLException e) {
//
//            jsonOutput.addProperty("status", "500");
//            jsonOutput.addProperty("msg", "ColourService: SQL Exception");
//
//        }
//
//        String finalJsonOutput = gson.toJson(jsonOutput);
//        return finalJsonOutput;
//        
//    }
    
}

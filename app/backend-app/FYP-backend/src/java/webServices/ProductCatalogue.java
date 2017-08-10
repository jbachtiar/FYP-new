/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webServices;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import dao.CollectionDAO;
import dao.ColourDAO;
import dao.FabricDAO;
import dao.PatternDAO;
import dao.ProductDAO;
import entity.Colour;
import entity.Fabric;
import entity.Pattern;
import entity.Product;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
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

    @GET
    @Path("/uniquePatterns")
    @Produces(MediaType.APPLICATION_JSON)
    public String getProductsCatalogue() {

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray products = new JsonArray();

        try {

            Product[] pArray = ProductDAO.getUniqueProducts();
            jsonOutput.addProperty("status", "200");

            for (Product p : pArray) {

                JsonObject temp = new JsonObject();

                temp.addProperty("SKU", p.getSKU());
                temp.addProperty("pattern_id", p.getPatternID());
                temp.addProperty("fabric_id", p.getFabricID());
                temp.addProperty("collection_id", p.getCollectionID());
                temp.addProperty("colour_id", p.getColorID());

                temp.addProperty("pattern_name", p.getPatternName());
                temp.addProperty("fabric_name", p.getFabricName());
                temp.addProperty("collection_name", p.getCollectionName());
                temp.addProperty("colour_name", p.getColorName());

                temp.addProperty("pattern_price", p.getFabricPrice());
                temp.addProperty("fabric_price", p.getFabricPrice());
                temp.addProperty("colour_price", p.getFabricPrice());
                temp.addProperty("image_url", p.getImageUrl());

                JsonArray tags = gson.toJsonTree(p.getTags()).getAsJsonArray(); // convert arraylist to jsonArray
                temp.add("tags", tags);

                products.add(temp);

            }

            jsonOutput.add("products", products);

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "error");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }

    @GET
    @Path("/product")
    @Produces(MediaType.APPLICATION_JSON)
    public String getPatternById(@QueryParam("sku") String sku) {

        JsonObject jsonOutput = new JsonObject();
        Gson gson = new GsonBuilder().create();

        try {

            Product p = ProductDAO.retrieveProductById(sku);
            if (p == null) {
                jsonOutput.addProperty("status", "Product not found");

            } else {
                jsonOutput.addProperty("status", "200");
                JsonObject temp = new JsonObject();
                temp.addProperty("SKU", p.getSKU());
                temp.addProperty("pattern_id", p.getPatternID());
                temp.addProperty("fabric_id", p.getFabricID());
                temp.addProperty("collection_id", p.getCollectionID());
                temp.addProperty("colour_id", p.getColorID());

                temp.addProperty("pattern_name", p.getPatternName());
                temp.addProperty("fabric_name", p.getFabricName());
                temp.addProperty("collection_name", p.getCollectionName());
                temp.addProperty("colour_name", p.getColorName());

                temp.addProperty("pattern_price", p.getFabricPrice());
                temp.addProperty("fabric_price", p.getFabricPrice());
                temp.addProperty("colour_price", p.getFabricPrice());
                temp.addProperty("image_url", p.getImageUrl());
                JsonArray tags = gson.toJsonTree(p.getTags()).getAsJsonArray(); // convert arraylist to jsonArray
                temp.add("tags", tags);
                jsonOutput.add("product", temp);

            }
        } catch (SQLException e) {

            jsonOutput.addProperty("status", "error");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }

    @GET
    @Path("/customization")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCombinationsByPatternId(@QueryParam("patternId") String patternId) {

        JsonObject jsonOutput = new JsonObject();
        Gson gson = new GsonBuilder().create();

        try {

            Pattern pattern = PatternDAO.retrievePatternById(patternId);
            ArrayList<Fabric> fabrics = FabricDAO.getFabricSByPatternId(patternId);
            if (fabrics.isEmpty()) {
                jsonOutput.addProperty("status", "Fabric not found");

            } else {
                jsonOutput.addProperty("status", "200");
                JsonObject patt = new JsonObject();
                patt.addProperty("pattern_id", pattern.getPatternID());
                patt.addProperty("pattern_name", pattern.getPatternName());
                patt.addProperty("pattern_description", pattern.getPatternDescription());
                patt.addProperty("pattern_price", pattern.getPatternPrice());
                patt.addProperty("collection_id", CollectionDAO.getCollectionByPatternId(patternId).getCollectionID());
                patt.addProperty("collection_name", CollectionDAO.getCollectionByPatternId(patternId).getCollectionName());

                JsonArray fabricsJson = new JsonArray();


                for (int i = 0; i < fabrics.size(); i++) {
                    Fabric f = fabrics.get(i);
                    String fabricId = f.getFabricID();
                    ArrayList<Colour> colors = ProductDAO.getAvailableColoursByPatternFabric(patternId, fabricId);

                    JsonObject fa = new JsonObject();
                    fa.addProperty("fabric_id", f.getFabricID());
                    fa.addProperty("fabric_name", f.getFabricName());
                    fa.addProperty("fabric_description", f.getFabriDescription());
                    fa.addProperty("fabric_price", f.getFabricPrice());
                    JsonArray colorsJson = new JsonArray();
                    for (int j = 0; j < colors.size(); j++) {
                        Colour c = colors.get(j);
                        JsonObject co = new JsonObject();
                        String colorId = c.getColourID();
                        co.addProperty("colour_id", colorId);
                        co.addProperty("colour_name", c.getColourName());

                        Product p = ProductDAO.getProductByPatternFabricColor(pattern.getPatternID(), fabricId, colorId);
                        co.addProperty("colour_price", p.getColorPrice());
                        co.addProperty("image_url", p.getImageUrl());
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

    @GET
    @Path("/filtersort")
    @Produces(MediaType.APPLICATION_JSON)
    public String getProductsCataloguebyFilter(@QueryParam("collectionId") String collectionId, @QueryParam("fabricId") String fabricId, @QueryParam("colourId") String colourId, @QueryParam("sortPrice") String sortPrice, @QueryParam("search") String search) {

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray products = new JsonArray();

        try {

            Product[] pArray = ProductDAO.getfilteredProductList(collectionId, fabricId, colourId, sortPrice, search);
            jsonOutput.addProperty("status", "200");

            for (Product p : pArray) {

                JsonObject temp = new JsonObject();

                temp.addProperty("SKU", p.getSKU());
                temp.addProperty("pattern_id", p.getPatternID());
                temp.addProperty("fabric_id", p.getFabricID());
                temp.addProperty("collection_id", p.getCollectionID());
                temp.addProperty("colour_id", p.getColorID());

                temp.addProperty("pattern_name", p.getPatternName());
                temp.addProperty("fabric_name", p.getFabricName());
                temp.addProperty("collection_name", p.getCollectionName());
                temp.addProperty("colour_name", p.getColorName());

                temp.addProperty("pattern_price", p.getFabricPrice());
                temp.addProperty("fabric_price", p.getFabricPrice());
                temp.addProperty("colour_price", p.getFabricPrice());
                temp.addProperty("image_url", p.getImageUrl());

                JsonArray tags = gson.toJsonTree(p.getTags()).getAsJsonArray(); // convert arraylist to jsonArray
                temp.add("tags", tags);

                products.add(temp);

            }

            jsonOutput.add("products", products);

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "error");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }

    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    public String getSearchProducts(@QueryParam("search") String search) {

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray products = new JsonArray();

        if (search.isEmpty() || search.equals(" ")) {

            return getProductsCatalogue();

        } else {

            try {

                Product[] pArray = ProductDAO.getSearchProducts(search);
                jsonOutput.addProperty("status", "200");

                for (Product p : pArray) {

                    JsonObject temp = new JsonObject();

                    temp.addProperty("SKU", p.getSKU());
                    temp.addProperty("pattern_id", p.getPatternID());
                    temp.addProperty("fabric_id", p.getFabricID());
                    temp.addProperty("collection_id", p.getCollectionID());
                    temp.addProperty("colour_id", p.getColorID());

                    temp.addProperty("pattern_name", p.getPatternName());
                    temp.addProperty("fabric_name", p.getFabricName());
                    temp.addProperty("collection_name", p.getCollectionName());
                    temp.addProperty("colour_name", p.getColorName());

                    temp.addProperty("pattern_price", p.getFabricPrice());
                    temp.addProperty("fabric_price", p.getFabricPrice());
                    temp.addProperty("colour_price", p.getFabricPrice());
                    temp.addProperty("image_url", p.getImageUrl());

                    JsonArray tags = gson.toJsonTree(p.getTags()).getAsJsonArray(); // convert arraylist to jsonArray
                    temp.add("tags", tags);

                    products.add(temp);

                }

                jsonOutput.add("products", products);

            } catch (SQLException e) {

                jsonOutput.addProperty("status", "error");

            }

            String finalJsonOutput = gson.toJson(jsonOutput);
            return finalJsonOutput;
        }
    }
    
    @GET
    @Path("/filters")
    @Produces(MediaType.APPLICATION_JSON)
    public String getProductsCataloguebyFilters(@QueryParam("collectionId") String collectionId, @QueryParam("fabricId") String fabricId, @QueryParam("colourId") String colourId, @QueryParam("sortPrice") String sortPrice, @QueryParam("search") String search) {

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray products = new JsonArray();

        try {

            Product[] pArray = ProductDAO.getfilteredProductList(collectionId, fabricId, colourId, sortPrice, search);
            jsonOutput.addProperty("status", "200");

            for (Product p : pArray) {

                JsonObject temp = new JsonObject();

                temp.addProperty("SKU", p.getSKU());
                temp.addProperty("pattern_id", p.getPatternID());
                temp.addProperty("fabric_id", p.getFabricID());
                temp.addProperty("collection_id", p.getCollectionID());
                temp.addProperty("colour_id", p.getColorID());

                temp.addProperty("pattern_name", p.getPatternName());
                temp.addProperty("fabric_name", p.getFabricName());
                temp.addProperty("collection_name", p.getCollectionName());
                temp.addProperty("colour_name", p.getColorName());

                temp.addProperty("pattern_price", p.getFabricPrice());
                temp.addProperty("fabric_price", p.getFabricPrice());
                temp.addProperty("colour_price", p.getFabricPrice());
                temp.addProperty("image_url", p.getImageUrl());

                JsonArray tags = gson.toJsonTree(p.getTags()).getAsJsonArray(); // convert arraylist to jsonArray
                temp.add("tags", tags);

                products.add(temp);

            }

            jsonOutput.add("products", products);

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "error");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    
    @PUT
    @Path("/updatePatternFabric")
    @Produces(MediaType.APPLICATION_JSON)
    public String updatePatternFabric (@Context HttpHeaders httpHeaders, @FormParam("patternID") String patternID,@FormParam("fabricID") String fabricID){
        //String password = CustomerDAO.retrievePasswordByEmail(email);
        HashMap<String, String> responseMap = new HashMap<>();
        Gson gson = new GsonBuilder().create();
        String status;
        Pattern pattern = null;
                
        
        ProductDAO.updatePatternFabric(patternID, fabricID);
        status = "200";
        responseMap.put("status", status);
        
        //responseMap.put("status", STATUS_ERROR_NULL_PASSWORD);
        return gson.toJson(responseMap);
    }
    
    @GET
    @Path("/colours")
    @Produces(MediaType.APPLICATION_JSON)
    public String getColourCatalogue(){

        ColourDAO colourDAO = new ColourDAO();
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray colours = new JsonArray();
        
        try{
            
            Colour[] cArray = colourDAO.getAllColours();
            jsonOutput.addProperty("status","200");
            
            for(Colour f: cArray){
                
                JsonObject temp = new JsonObject();
                temp.addProperty("colour_id", f.getColourID());
                temp.addProperty("colour_name", f.getColourName());
                colours.add(temp);
            
            }

            jsonOutput.add("colours", colours);
            
        }catch(SQLException e){
        
            jsonOutput.addProperty("status","error");
            
        }
        
        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    
    @GET
    @Path("/adminPatternFilter")
    @Produces(MediaType.APPLICATION_JSON)
    public String getadminFilter(@QueryParam("collectionId") String collectionId, @QueryParam("fabricId") String fabricId, @QueryParam("colourId") String colourId, @QueryParam("sortPrice") String sortPrice, @QueryParam("search") String search) {

        System.out.println("bad");
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray products = new JsonArray();

        try {

            Product[] pArray = ProductDAO.getfilteredProductList(collectionId, fabricId, colourId, sortPrice, search);
            System.out.println("Hello");
            jsonOutput.addProperty("status", "200");

            for (Product p : pArray) {

                JsonObject temp = new JsonObject();

                temp.addProperty("SKU", p.getSKU());
                temp.addProperty("pattern_id", p.getPatternID());
                temp.addProperty("fabric_id", p.getFabricID());
                temp.addProperty("collection_id", p.getCollectionID());
                temp.addProperty("colour_id", p.getColorID());

                temp.addProperty("pattern_name", p.getPatternName());
                temp.addProperty("fabric_name", p.getFabricName());
                temp.addProperty("collection_name", p.getCollectionName());
                temp.addProperty("colour_name", p.getColorName());

                temp.addProperty("pattern_price", p.getFabricPrice());
                temp.addProperty("fabric_price", p.getFabricPrice());
                temp.addProperty("colour_price", p.getFabricPrice());
                temp.addProperty("image_url", p.getImageUrl());

                JsonArray tags = gson.toJsonTree(p.getTags()).getAsJsonArray(); // convert arraylist to jsonArray
                temp.add("tags", tags);

                products.add(temp);

            }

            jsonOutput.add("products", products);

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "error");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    
}

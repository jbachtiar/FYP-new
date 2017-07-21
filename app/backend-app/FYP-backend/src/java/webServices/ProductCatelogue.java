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
import dao.ProductDAO;;
import entity.Product;
import java.sql.SQLException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Huiyan
 */
@Path("/ProductCatalogue")
public class ProductCatelogue {

  
    @GET
    @Path("/uniquePatterns")
    @Produces(MediaType.APPLICATION_JSON)
    public String getProductsCatalogue(){

     
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray products = new JsonArray();
        
        try{
            
            Product[] pArray = ProductDAO.getUniqueProducts();
            jsonOutput.addProperty("status","200");
            
            for(Product p: pArray){
                
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
            
        }catch(SQLException e){
        
            jsonOutput.addProperty("status","error");
            
        }
        
        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    

    
}

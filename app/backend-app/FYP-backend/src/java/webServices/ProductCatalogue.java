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
import dao.FabricDAO;
import entity.Fabric;
import java.sql.SQLException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


/**
 *
 * @author Ong Yi Xuan
 */

@Path("/ProductCatalogue")
public class ProductCatalogue {
    
    @GET
    @Path("/fabrics")
    @Produces(MediaType.APPLICATION_JSON)
    public String getFabricCatalogue(){

        FabricDAO fabricDAO = new FabricDAO();
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray fabrics = new JsonArray();
        
        try{
            
            Fabric[] fArray = fabricDAO.getAllFabrics();
            jsonOutput.addProperty("status","200");
            
            for(Fabric f: fArray){
                
                JsonObject temp = new JsonObject();
                temp.addProperty("id", f.getFabricID());
                temp.addProperty("name", f.getFabricName());
                temp.addProperty("price", f.getFabricPrice());
                fabrics.add(temp);
                
            }

            jsonOutput.add("fabrics", fabrics);
            
        }catch(SQLException e){
        
            jsonOutput.addProperty("status","error");
            
        }
        
        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
} 

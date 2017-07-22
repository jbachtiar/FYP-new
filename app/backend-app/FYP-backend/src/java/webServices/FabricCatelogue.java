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
import java.util.ArrayList;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;


/**
 *
 * @author Huiyan
 */
@Path("/FabricCatelogue")
public class FabricCatelogue {
    
    @GET
    @Path("/fabrics")
    @Produces(MediaType.APPLICATION_JSON)
    public String getFabricsByPatternId(@QueryParam("patternId") String patternID){
        
        
      
        JsonObject jsonOutput = new JsonObject();
        Gson gson = new GsonBuilder().create();
     
        
     
        try{
            
            ArrayList<Fabric> fabrics = FabricDAO.getFabricSByPatternId(patternID);
            if(fabrics.isEmpty()){
                jsonOutput.addProperty("status", "Fabrics not found");
           
            }else{
                jsonOutput.addProperty("status","200");
              
                JsonArray fabricsJsonArray = new JsonArray();
        
                for (int i=0; i<fabrics.size(); i++){
                    Fabric f=fabrics.get(i);
                    JsonObject temp = new JsonObject();
                    temp.addProperty("fabric_id", f.getFabricID());
                    temp.addProperty("fabric_name", f.getFabricName());
                    temp.addProperty("fabric_description", f.getFabriDescription());
                    temp.addProperty("fabric_price", f.getFabricPrice());
                    fabricsJsonArray.add(temp);
                 
                
                 }
           
                jsonOutput.add("fabrics", fabricsJsonArray);             
            }
        }catch(SQLException e){
        
            jsonOutput.addProperty("status","error");
            
        }
        
        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    
}

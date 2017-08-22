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
import dao.CustomerDAO;
import dao.FabricDAO;
import dao.PatternDAO;
import entity.Customer;
import entity.Fabric;
import entity.Pattern;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import tokenManagement.tokenManagement;


/**
 *
 * @author Ong Yi Xuan
 */

@Path("/PatternCatalogue")
public class PatternCatalogue {
    @Context private HttpServletResponse response;
    @GET
    @Path("/patterns")
    @Produces(MediaType.APPLICATION_JSON)
    public String getPatternsCatalogue(){
        response.setHeader("Access-Control-Allow-Origin", "*");
        
        PatternDAO patternDAO = new PatternDAO();
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray patterns = new JsonArray();
        
        try{
            
            Pattern[] pArray = patternDAO.getAllPatterns();
            jsonOutput.addProperty("status","200");
            
            for(Pattern p: pArray){
                
                JsonObject temp = new JsonObject();
                temp.addProperty("id", p.getPatternID());
                temp.addProperty("name", p.getPatternName());
                temp.addProperty("price", p.getPatternPrice());
                temp.addProperty("collection", p.getCollection().getCollectionName());
                patterns.add(temp);
                
                
            }

            jsonOutput.add("patterns", patterns);
            
        }catch(SQLException e){
        
            jsonOutput.addProperty("status","error");
            
        }
        
        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    
    @GET
    @Path("/pattern")
    @Produces(MediaType.APPLICATION_JSON)
    public String getPatternById(@QueryParam("productId") String productId){
        
        response.setHeader("Access-Control-Allow-Origin", "*");
      
        JsonObject jsonOutput = new JsonObject();
        Gson gson = new GsonBuilder().create();
        PatternDAO patternDAO = new PatternDAO();
     

        try{
            
            Pattern p = patternDAO.retrievePatternById(productId);
            if(p==null){
                jsonOutput.addProperty("status", "Pattern not found");
           
            }else{
                jsonOutput.addProperty("status","200");
                JsonObject temp = new JsonObject();
                temp.addProperty("id", p.getPatternID());
                temp.addProperty("name", p.getPatternName());
                temp.addProperty("price", p.getPatternPrice());
                temp.addProperty("collection", p.getCollection().getCollectionName());
                jsonOutput.add("pattern", temp);
                
                 
            }
        }catch(SQLException e){
        
            jsonOutput.addProperty("status","error");
            
        }
        
        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    @POST
    @Path("/addPattern")
    @Produces(MediaType.APPLICATION_JSON)
//    public static void insertPattern(String patternID, String patternName, String patternDescription, double patternPrice, Collection collection) {

    public String addPattern (@FormParam("patternID") String patternID,@FormParam("patternName") String patternName, @FormParam("patternDescription") String patternDescription, @FormParam("patternPrice") Double patternPrice, @FormParam("collectionID") String collectionID){
        //String password = CustomerDAO.retrievePasswordByEmail(email);
        
        response.setHeader("Access-Control-Allow-Origin", "*");
        HashMap<String, String> responseMap = new HashMap();
        Gson gson = new GsonBuilder().create();
        String status = "";
    
         
        PatternDAO.insertPattern(patternID,patternName,patternDescription, patternPrice, collectionID);
        status = "200";
                 
        responseMap.put("status", status);
      
       
         //responseMap.put("status", STATUS_ERROR_NULL_PASSWORD);
        return gson.toJson(responseMap);
    }
    
    @PUT
    @Path("/updatePattern")
    @Produces(MediaType.APPLICATION_JSON)
    public String updatePattern (@Context HttpHeaders httpHeaders, @FormParam("patternID") String patternID,@FormParam("patternName") String patternName, @FormParam("patternDescription") String patternDescription, @FormParam("patternPrice") Double patternPrice, @FormParam("collectionID") String collectionID){
        //String password = CustomerDAO.retrievePasswordByEmail(email);
        response.setHeader("Access-Control-Allow-Origin", "*");
        
        HashMap<String, String> responseMap = new HashMap<>();
        Gson gson = new GsonBuilder().create();
        String status;
        Pattern pattern = null;
        try{
            pattern = PatternDAO.retrievePatternById(patternID);
        } catch (SQLException ex) {
            handleSQLException(ex, patternID);
        }
                
        if (pattern == null) {
            status = "Pattern not found";
            //responseMap.put("status", STATUS_NOT_FOUND);
            responseMap.put("status", status);
        }else{
        
            PatternDAO.updatePattern(patternID,patternName,patternDescription, patternPrice, collectionID);
            status = "200";
            responseMap.put("status", status);
        }
      
        //responseMap.put("status", STATUS_ERROR_NULL_PASSWORD);
        return gson.toJson(responseMap);
    }
    
    private static void handleSQLException(SQLException ex, String patternID) {
        String msg = "Unable to access data; patternID=" + patternID + "\n";

        Logger.getLogger(CustomerDAO.class.getName()).log(Level.SEVERE, msg, ex);
    }
} 

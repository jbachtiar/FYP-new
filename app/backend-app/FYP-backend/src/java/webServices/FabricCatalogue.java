///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package webServices;
//
//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;
//import com.google.gson.JsonArray;
//import com.google.gson.JsonObject;
//import dao.FabricDAO;
//import entity.Fabric;
//import java.sql.SQLException;
//import java.util.ArrayList;
//import javax.servlet.http.HttpServletResponse;
//import javax.ws.rs.GET;
//import javax.ws.rs.Path;
//import javax.ws.rs.Produces;
//import javax.ws.rs.QueryParam;
//import javax.ws.rs.core.Context;
//import javax.ws.rs.core.MediaType;
//
//
///**
// *
// * @author Huiyan
// */
//@Path("/FabricCatalogue")
//public class FabricCatalogue {
//    @Context private static HttpServletResponse response;
//    
//    @GET
//    @Path("/patternFabric")
//    @Produces(MediaType.APPLICATION_JSON)
//    public static String getFabricsByPatternID(@QueryParam("patternID") String patternID){
//        
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        
//      
//        JsonObject jsonOutput = new JsonObject();
//        Gson gson = new GsonBuilder().create();
//     
//        
//     
//        try{
//            
//            ArrayList<Fabric> fabrics = FabricDAO.getFabricSByPatternId(patternID);
//            if(fabrics.isEmpty()){
//                jsonOutput.addProperty("status", "Fabrics not found");
//           
//            }else{
//                jsonOutput.addProperty("status","200");
//              
//                JsonArray fabricsJsonArray = new JsonArray();
//        
//                for (int i=0; i<fabrics.size(); i++){
//                    Fabric f=fabrics.get(i);
//                    JsonObject temp = new JsonObject();
//                    temp.addProperty("fabric_id", f.getFabricID());
//                    temp.addProperty("fabric_name", f.getFabricName());
//                    temp.addProperty("fabric_description", f.getFabricDescription());
//                    temp.addProperty("fabric_price", f.getFabricPrice());
//                    fabricsJsonArray.add(temp);
//                 
//                
//                 }
//           
//                jsonOutput.add("fabrics", fabricsJsonArray);             
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
//}

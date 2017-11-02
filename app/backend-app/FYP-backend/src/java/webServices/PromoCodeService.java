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
import dao.PromoCodeDAO;
import dao.StaffDAO;
import entity.PromoCode;
import entity.Staff;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import tokenManagement.tokenManagement;

/**
 *
 * @author Jeremy Bachtiar
 */
@Path("/PromoService")
public class PromoCodeService {

    @Context
    private HttpServletResponse response;
    
    @OPTIONS
    @PermitAll
    @Path("/save")
    public void optionsSave() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        response.setHeader("Access-Control-Allow-Headers", "authorization");

    }
    
    @POST
    @Path("/save")
    @Produces(MediaType.APPLICATION_JSON)
    public String savePromo(@FormParam("promoCode") String json) {
        
        PromoCodeDAO pcDAO = new PromoCodeDAO();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gs = new Gson();
        PromoCode promoToSave = gs.fromJson(json, PromoCode.class);
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {
                System.out.println("JSON: " + json);
                jsonOutput.addProperty("status", "200"); 
                
                if(pcDAO.getPromoCodeByPromoCode(promoToSave.getPromoCode()) != null){
                    
                    jsonOutput.addProperty("error", "Promo Code Exists");
                    
                }else{
                    
                    jsonOutput.addProperty("newPromoCodeId", pcDAO.addPromoCode(promoToSave));

                }
                
        } catch (SQLException e) {

            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("error", e.getMessage());
        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    @GET
    @Path("/check")
    @Produces(MediaType.APPLICATION_JSON)
    public String checkPromo(@QueryParam("PromoCode") String promoCode, @QueryParam("Amount") double purchaseAmt) {
        
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        
        java.util.Date currentDate = new java.util.Date();
        DateFormat df = new SimpleDateFormat("MM-dd-yyyy");
        java.sql.Date currSqlDate = new java.sql.Date(currentDate.getTime());
        
        PromoCodeDAO pcDAO = new PromoCodeDAO();
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        
        try{
            
            jsonOutput.addProperty("status", "200");
            PromoCode pc = pcDAO.getPromoCodeByPromoCode(promoCode);
            System.out.println(pc.getEndDate());
            if(pc == null){
                
                
                JsonObject temp = new JsonObject();
                temp.addProperty("valid", "N");
                temp.addProperty("discountAmt", 0);
                temp.addProperty("reason", "Promo Code does not exist!");
                jsonOutput.add("promo", temp);
                
            }else if(pc.getStartDate().after(currSqlDate)){
                
                JsonObject temp = new JsonObject();
                temp.addProperty("valid", "N");
                temp.addProperty("discountAmt", 0);
                temp.addProperty("reason", "Promo has yet to start!");
                jsonOutput.add("promo", temp);
                
            }else if(pc.getEndDate().before(currSqlDate)){
                
                JsonObject temp = new JsonObject();
                temp.addProperty("valid", "N");
                temp.addProperty("discountAmt", 0);
                temp.addProperty("reason", "Promo has ended!");
                jsonOutput.add("promo", temp);
                
            }else if(pc.getQuota() <= pc.getCounter()){
                
                JsonObject temp = new JsonObject();
                temp.addProperty("valid", "N");
                temp.addProperty("discountAmt", 0);
                temp.addProperty("reason", "Promo has been fully redeemed!");
                jsonOutput.add("promo", temp);
                
            }else if(pc.getMinPurchase() > purchaseAmt){
                
                JsonObject temp = new JsonObject();
                temp.addProperty("valid", "N");
                temp.addProperty("discountAmt", 0);
                temp.addProperty("reason", "Min Purchase: " + pc.getMinPurchase());
                jsonOutput.add("promo", temp);
                
            }else{
                
                double discountAmount = 0.00;
                //find out what kind of promo
                String promoType = pc.getPromoType();
                if(promoType.equals("Dollar Off")){
                    
                    discountAmount = pc.getPromoValue();
                    
                }else if(promoType.equals("Percent Off")){
                    
                    discountAmount = purchaseAmt /* (pc.getPercentOff()/100)*/;
                }
                
                if(discountAmount > pc.getMaxDiscount()){
                    
                    discountAmount = pc.getMaxDiscount();
                    
                }
                
                JsonObject temp = new JsonObject();
                temp.addProperty("valid", "Y");
                temp.addProperty("discountAmt", discountAmount);
                jsonOutput.add("promo", temp);
                
            }
            
        }catch(SQLException e){
            
            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("valid", "N");
            jsonOutput.addProperty("discountAmt", 0);
            jsonOutput.addProperty("error", e.getMessage());
            
        }
       
        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
        
    }
    
    @GET
    @Path("/use")
    @Produces(MediaType.APPLICATION_JSON)
    public String usePromo(@QueryParam("PromoCode") String promoCode, @QueryParam("Amount") double purchaseAmt) {
        
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        
        java.util.Date currentDate = new java.util.Date();
        DateFormat df = new SimpleDateFormat("MM-dd-yyyy");
        java.sql.Date currSqlDate = new java.sql.Date(currentDate.getTime());
        
        PromoCodeDAO pcDAO = new PromoCodeDAO();
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        
        try{
            
            jsonOutput.addProperty("status", "200");
            PromoCode pc = pcDAO.getPromoCodeByPromoCode(promoCode);
            
            if(pc == null){
                
                jsonOutput.addProperty("valid", "N");
                jsonOutput.addProperty("discountAmt", 0);
                jsonOutput.addProperty("reason", "Promo Code does not exist!");
                
            }else if(pc.getStartDate().after(currSqlDate)){
                
                jsonOutput.addProperty("valid", "N");
                jsonOutput.addProperty("discountAmt", 0);
                jsonOutput.addProperty("reason", "Promo has yet to start!");
                
            }else if(pc.getEndDate().before(currSqlDate)){
                
                jsonOutput.addProperty("valid", "N");
                jsonOutput.addProperty("discountAmt", 0);
                jsonOutput.addProperty("reason", "Promo has ended!");
                
            }else if(pc.getQuota() <= pc.getCounter()){
                
                jsonOutput.addProperty("valid", "N");
                jsonOutput.addProperty("discountAmt", 0);
                jsonOutput.addProperty("reason", "Promo has been fully redeemed!");
                
            }else if(pc.getMinPurchase() > purchaseAmt){
                
                jsonOutput.addProperty("valid", "N");
                jsonOutput.addProperty("discountAmt", 0);
                jsonOutput.addProperty("reason", "Min Purchase: " + pc.getMinPurchase());
                
            }else{
                
                double discountAmount = 0.00;
                //find out what kind of promo
                String promoType = pc.getPromoType();
                if(promoType.equals("Dollar Off")){
                    
                    discountAmount = pc.getPromoValue();
                    
                }else if(promoType.equals("Percent Off")){
                    
                    discountAmount = purchaseAmt /* (pc.getPercentOff()/100)*/;
                }
                
                if(discountAmount > pc.getMaxDiscount()){
                    
                    discountAmount = pc.getMaxDiscount();
                    
                }
                
                jsonOutput.addProperty("valid", "Y");
                jsonOutput.addProperty("discountAmt", discountAmount);
                pcDAO.usePromoCode(pc.getPromoCodeId(),pc.getCounter());
                
            }
            
        }catch(SQLException e){
            
            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("valid", "N");
            jsonOutput.addProperty("discountAmt", 0);
            jsonOutput.addProperty("error", e.getMessage());
            
        }
       
        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
        
    }
    
    @OPTIONS
    @PermitAll
    @Path("/delete")
    public void deletePromo() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        response.setHeader("Access-Control-Allow-Headers", "auhtorization");

    }

    @POST
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public String deletePromo(@FormParam("PromoCodeId") int promoId) {
        
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        
        PromoCodeDAO pcDAO = new PromoCodeDAO();
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        
        try{

            pcDAO.deletePromoCodeById(promoId);
            jsonOutput.addProperty("status", "200");
                   
        }catch(SQLException e){
            
            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("error", e.getMessage());
            
        }
       
        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
        
    }
    
    @GET
    @Path("/getAllPromoCodes")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllPromoCodes() {
        
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        
        JsonArray promoCodeArray = new JsonArray();
        PromoCodeDAO pcDao = new PromoCodeDAO();

        try {

            ArrayList<PromoCode> pcList = pcDao.getAllPromoCodes();
            if (pcList == null) {
                
                jsonOutput.addProperty("status", "500");
                jsonOutput.addProperty("msg", "No PromoCodes Available");
                

            } else {
                
                jsonOutput.addProperty("status", "200");
                JsonArray promoCodes = gson.toJsonTree(pcList).getAsJsonArray(); // convert arraylist to jsonArray
                jsonOutput.add("promoCodes", promoCodes);

            }

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("msg", e.getMessage());

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
        
    }
    

//    @POST
//    @Path("/retrieveAll")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getAllPromo(@FormParam("token") String token) {
//        response.setHeader("Access-Control-Allow-Origin", "*");
//
//        JsonObject jsonOutput = new JsonObject();
//        Gson gson = new GsonBuilder().create();
//        JsonParser parser = new JsonParser();
//        PromoCode promoCode = null;
//        Staff staff = null;
//        String status = "";
//
//        StaffDAO staffDao = new StaffDAO();
//        PromoCodeDAO promoDao = new PromoCodeDAO();
//        String email = tokenManagement.parseJWT(token);
//
//        try {
//            staff = staffDao.getStaffByEmail(email);
//        } catch (SQLException e) {
//            //HANDLE SQL ERROR
//        }
//
//        if (staff != null) {
//            int staffRole = staff.getRoleId();
//            if (staffRole == 1) {
//                try {
//                    JsonArray promos = new JsonArray();
//                    PromoCode[] promoList = promoDao.getAllPromoCodes();
//
//                    for (PromoCode p : promoList) {
//
//                        String promoString = gson.toJson(p);
//                        JsonElement promoElement = parser.parse(promoString);
//                        promos.add(promoElement);
//                    }
//                    jsonOutput.addProperty("status", "200");
//                    jsonOutput.add("promos", promos);
//
//                } catch (SQLException e) {
//                    //HANDLE SQL EXCEPTION
//                }
//
//            } else {
//                String description = "Not Authorized";
//                jsonOutput.addProperty("status", "500");
//                jsonOutput.addProperty("description", description);
//            }
//        } else {
//            String description = "Not Authenticated";
//            jsonOutput.addProperty("status", "500");
//            jsonOutput.addProperty("description", description);
//        }
//
//        return gson.toJson(jsonOutput);
//    }
//    
//    @OPTIONS
//    @PermitAll
//    @Path("/delete")
//    public void optionsDeletePromo() {
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
//        response.setHeader("Access-Control-Allow-Headers", "auhtorization");
//
//    }
//
//    @POST
//    @Path("/delete")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String deletePromo(@FormParam("token") String token, @FormParam("promoId") String promoIdDelete) {
//        response.setHeader("Access-Control-Allow-Origin", "*");
//
//        JsonObject jsonOutput = new JsonObject();
//        Gson gson = new GsonBuilder().create();
//        JsonParser parser = new JsonParser();
//
//        PromoCodeDAO promoCodeDAO = new PromoCodeDAO();
//        Staff staff = null;
//        String status = "";
//        String email = tokenManagement.parseJWT(token);
//        if (email != null) {
//            try {
//                String result = promoCodeDAO.deletePromoCodeById(Integer.parseInt(promoIdDelete));
//                if (result.equals("Success")) {
//
//                    jsonOutput.addProperty("status", "200");
//                    jsonOutput.addProperty("description", "Deleted Successfully");
//
//                } else {
//
//                    jsonOutput.addProperty("status", "500");
//                    jsonOutput.addProperty("description", "Failed to Delete");
//
//                }
//            } catch (SQLException e) {
//
//                jsonOutput.addProperty("status", "500");
//                jsonOutput.addProperty("description", "SQL Exception");
//
//            }
//        } else {
//            jsonOutput.addProperty("status", "500");
//            jsonOutput.addProperty("description", "Not Authorised");
//
//        }
//
//        return gson.toJson(jsonOutput);
//    }
}

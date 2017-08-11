 /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webServices;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import dao.CartDAO;
import dao.CustomerDAO;
import dao.FabricDAO;
import dao.PatternDAO;
import dao.ProductDAO;
import dao.StaffDAO;
import entity.Customer;
import entity.Fabric;
import entity.Pattern;
import entity.Product;
import entity.Staff;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.ws.rs.FormParam;
//import javax.ws.rs.MatrixParam;
import javax.ws.rs.POST;
//import javax.ws.rs.MatrixParam;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
//import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import tokenManagement.tokenManagement;
import java.util.*;
import javax.ws.rs.GET;
import javax.ws.rs.QueryParam;

/**
 *
 * @author JeremyBachtiar
 */
@Path("/cart")
public class Cart {
    
    @POST
    @Path("/newOrder")
    @Produces(MediaType.APPLICATION_JSON)
    public String addNewOrder(@Context HttpHeaders httpHeaders, @FormParam("totalPrice") double totalPrice,  @FormParam("status") String status,  @FormParam("productList") List productList){
        String orderId = "create order ID";
        double totalprice = 0;
        String statuss ="";
        String customerEmail ="";
        List<HashMap<String,Integer>> products = null;
        
        String date = getCurrentDate();
        String time = getCurrentTime();
        
        return "";
    }
    
//    @POST
//    @Path("/newCart")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String addNewCart(@Context HttpHeaders httpHeaders, @FormParam("patternId") String patternId,  @FormParam("fabricId") String fabricId,  @FormParam("colourId") String colourId, @FormParam("qty") int qty ){
//        JsonObject jsonOutput = new JsonObject();
//        
//        
//        String cartId = "";
//        double totalprice = 0;
//        String customerEmail ="";
//        
//        try{
//            //Get productSKU and generate new Cart ID
//            Product product = ProductDAO.getProductByPatternFabricColor(patternId, fabricId, colourId);
//            String productSKU = product.getSKU();
//            cartId = CartDAO.newCartIdByDate();
//            
//            //Add New Cart to the database with 0 total price
//            
//            
//        }
//        catch(SQLException e){
//            jsonOutput.addProperty("status","error");
//        }
//        
//        return "";
//    }
    
    @GET
    @Path("/productPrice")
    @Produces(MediaType.APPLICATION_JSON)
    public String getProductPrice(@QueryParam("productId") String productId){
        double totalPrice = 0.0;
        JsonObject jsonOutput = new JsonObject();
        Gson gson = new GsonBuilder().create();
     
        try{
            Product product = ProductDAO.retrieveProductById(productId);
            double colorPrice = product.getColorPrice();
            
            Pattern pattern = PatternDAO.retrievePatternById(product.getPatternID());
            double patternPrice = pattern.getPatternPrice();
            
            Fabric fabric = FabricDAO.getFabricById(product.getFabricID());
            double fabricPrice = fabric.getFabricPrice();
            
            
            totalPrice = colorPrice + patternPrice + fabricPrice;
            
            jsonOutput.addProperty("status", "200");
            jsonOutput.addProperty("totalPrice" , totalPrice);
             
        }catch(SQLException e){
            
        }
        String finalJsonOutput = gson.toJson(jsonOutput);
        
        return finalJsonOutput;
    }
    
    
    private String getCurrentTime(){
        String currentTime;
                
        Date current = new Date();
        SimpleDateFormat timeFmt = new SimpleDateFormat("HH:mm:ss");
        currentTime = timeFmt.format(current);
        
        return currentTime;
    }
    
    private String getCurrentDate(){
        String currentDate;
         
        Date current = new Date();
        SimpleDateFormat dateFmt = new SimpleDateFormat("yyyy-MM-dd");
        currentDate = dateFmt.format(current);
       
        return currentDate;
    }
}

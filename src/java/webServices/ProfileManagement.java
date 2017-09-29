/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webServices;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dao.CustomerDAO;
import entity.Customer;
import java.util.HashMap;
import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
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
 * @author Huiyan
 */
@Path("/profile")
public class ProfileManagement{
    
    @Context 
    private HttpServletResponse response;
    
    
    
    @GET
    @Path("/retrieve")
    @Produces(MediaType.APPLICATION_JSON)
    public String retrieve (@QueryParam("token") String token){
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Origin", "*");
        
        System.out.println("IM HEEERRREEEEEEE");
        
        //String password = CustomerDAO.retrievePasswordByEmail(email);
        HashMap<String, String> responseMap = new HashMap<>();
        Gson gson = new GsonBuilder().create();
        String status;
        //String token = httpHeaders.getRequestHeader("Authorization").get(0);
        String email=tokenManagement.parseJWT(token);
        Customer customer=CustomerDAO.retrieveCustomerByEmail(email);
        
        if (customer == null) {
            status = "User not found";
            //responseMap.put("status", STATUS_NOT_FOUND);
            responseMap.put("status", status);
        }else{
            
            String firstName= customer.getFirstName();
            String lastName =customer.getLastName();
            String phoneNumber=customer.getPhoneNumber();
            String address=customer.getAddress();
            String postalCode=customer.getPostalCode();
            String password=customer.getPassword();

            responseMap.put("firstName", firstName);
            responseMap.put("lastName", lastName );
            responseMap.put("phoneNumber", phoneNumber);
            responseMap.put("address", address);
            responseMap.put("postalCode", postalCode);
            responseMap.put("password", password);
            status="200";
            responseMap.put("status", status);
        }
       
         //responseMap.put("status", STATUS_ERROR_NULL_PASSWORD);
        return gson.toJson(responseMap);
    }
      
    @OPTIONS
    @PermitAll
    @Path("/update")
    public void options() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        response.setHeader("Access-Control-Allow-Headers", "auhtorization");
        
    }
    
      
      @PUT
      @Path("/update")
      @Produces(MediaType.APPLICATION_JSON)
      public String updateCustomer (@FormParam("token") String token, @FormParam("firstName") String firstName, @FormParam("lastName") String lastName, @FormParam("phoneNumber") String phoneNumber, @FormParam("address") String address, @FormParam("postalCode") String postalCode, @FormParam("password") String password){
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        //String password = CustomerDAO.retrievePasswordByEmail(email);
        HashMap<String, String> responseMap = new HashMap<>();
        Gson gson = new GsonBuilder().create();
        String status;
        //String token = httpHeaders.getRequestHeader("Authorization").get(0);
        String email=tokenManagement.parseJWT(token);
        Customer customer = CustomerDAO.retrieveCustomerByEmail(email);
                
        if (customer == null) {
            status = "User not found";
            //responseMap.put("status", STATUS_NOT_FOUND);
            responseMap.put("status", status);
        }else{
        
            CustomerDAO.updateCustomer(email,firstName,lastName, phoneNumber, address, postalCode, password);
            status = "200";
            responseMap.put("status", status);
        }
      
        //responseMap.put("status", STATUS_ERROR_NULL_PASSWORD);
        return gson.toJson(responseMap);
    }
} 

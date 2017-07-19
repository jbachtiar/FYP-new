/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webServices;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dao.CustomerDAO;
import dao.StaffDAO;
import entity.Customer;
import entity.Staff;
import java.util.HashMap;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
//import javax.ws.rs.MatrixParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
//import javax.ws.rs.MatrixParam;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
//import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import tokenManagement.tokenManagement;


/**
 *
 * @author JeremyBachtiar
 */
@Path("/staff")
public class Admin {
    
    @POST
    @Path("/addNewStaff")
    @Produces(MediaType.APPLICATION_JSON)
    public String addNewStaff(@FormParam("email") String email, @FormParam("firstName") String firstName, @FormParam("lastName") String lastName, @FormParam("phoneNumber") String phoneNumber, @FormParam("password") String password, @FormParam("roleCode") String roleCode){
        HashMap<String, String> responseMap = new HashMap<String, String>();
        Gson gson = new GsonBuilder().create();
        String status = "";     
        
        
        
        if(StaffDAO.retrieveStaffByEmail(email)==null){
            Staff staff = new Staff(email, firstName, lastName, phoneNumber, password, roleCode);
            String result = StaffDAO.addStaff(staff);

            if( result!=null || !result.equals("")){
                status = "Staff Added Successfully";
                responseMap.put("status", status);
            }else{
                status = "Failed adding new staff";
                responseMap.put("status", status);
            }
        }else {
            status = "Staff already existed";
            responseMap.put("status", status);
        }
        return gson.toJson(responseMap);
    }
    
    @PUT
      @Path("/update")
      @Produces(MediaType.APPLICATION_JSON)
      public String updateStaff (@Context HttpHeaders httpHeaders, @FormParam("firstName") String firstName, @FormParam("lastName") String lastName, @FormParam("phoneNumber") String phoneNumber, @FormParam("password") String password, @FormParam("roleCode") String roleCode){
        //String password = CustomerDAO.retrievePasswordByEmail(email);
        HashMap<String, String> responseMap = new HashMap<>();
        Gson gson = new GsonBuilder().create();
        String status;
        String token = httpHeaders.getRequestHeader("Authorization").get(0);
        String email=tokenManagement.parseJWT(token);
        Staff staff = StaffDAO.retrieveStaffByEmail(email);
                
        if (staff == null) {
            status = "User not found";
            //responseMap.put("status", STATUS_NOT_FOUND);
            responseMap.put("status", status);
        }else{
            Staff updateStaff = new Staff(email, firstName, lastName, phoneNumber, password, roleCode);
            StaffDAO.updateStaff(updateStaff);
            status = "200";
            responseMap.put("status", status);
        }
      
        //responseMap.put("status", STATUS_ERROR_NULL_PASSWORD);
        return gson.toJson(responseMap);
    }
    
    @GET
    @Path("/retrieve")
    @Produces(MediaType.APPLICATION_JSON)
    public String retrieve (@Context HttpHeaders httpHeaders){
        //String password = CustomerDAO.retrievePasswordByEmail(email);
        HashMap<String, String> responseMap = new HashMap<>();
        Gson gson = new GsonBuilder().create();
        String status;
        String token = httpHeaders.getRequestHeader("Authorization").get(0);
        String email=tokenManagement.parseJWT(token);
        Staff staff = StaffDAO.retrieveStaffByEmail(email);
        
        if (staff == null) {
            status = "User not found";
            //responseMap.put("status", STATUS_NOT_FOUND);
            responseMap.put("status", status);
        }else{
            
            String firstName= staff.getFirstName();
            String lastName =staff.getLastName();
            String phoneNumber=staff.getPhoneNumber();
            String password=staff.getPassword();
            String roleCode=staff.getRoleCode();

            responseMap.put("email", email);
            responseMap.put("firstName", firstName);
            responseMap.put("lastName", lastName );
            responseMap.put("phoneNumber", phoneNumber);
            responseMap.put("password", password);
            responseMap.put("roleCode", roleCode);
            status="200";
            responseMap.put("status", status);
        }
       
         //responseMap.put("status", STATUS_ERROR_NULL_PASSWORD);
        return gson.toJson(responseMap);
    }
}

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
//import javax.ws.rs.MatrixParam;
import javax.ws.rs.POST;
//import javax.ws.rs.MatrixParam;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
//import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;


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
    
    @POST
    @Path("/updateProfile")
    @Produces(MediaType.APPLICATION_JSON)
    public String updateProfile(@FormParam("email") String email, @FormParam("firstName") String firstName, @FormParam("lastName") String lastName, @FormParam("phoneNumber") String phoneNumber, @FormParam("password") String password, @FormParam("roleCode") String roleCode){
        HashMap<String, String> responseMap = new HashMap<String, String>();
        Gson gson = new GsonBuilder().create();
        String status = "";     
        
        
        
        if(StaffDAO.retrieveStaffByEmail(email)!=null){
            Staff staff = new Staff(email, firstName, lastName, phoneNumber, password, roleCode);
            String result = StaffDAO.updateStaff(staff);

            if( result.equals("Success")){
                status = "Profile Updated Successfully";
                responseMap.put("status", status);
            }else{
                status = "Failed to update";
                responseMap.put("status", status);
            }
        }else {
            status = "Staff does not existed";
            responseMap.put("status", status);
        }
        return gson.toJson(responseMap);
    }
}

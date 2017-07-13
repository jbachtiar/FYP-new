/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webServices;

//import javax.ws.rs.GET;
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
import tokenManagement.tokenManagement;


/**
 *
 * @author JeremyBachtiar
 */
@Path("/authentication")
public class Authentication {
    
    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public String login (@FormParam("email") String email, @FormParam("password") String password ){
        //String password = CustomerDAO.retrievePasswordByEmail(email);
        HashMap<String, String> responseMap = new HashMap<String, String>();
        Gson gson = new GsonBuilder().create();
        
        String response = "";
        String status = "";
        String token = "";
        if (email != null && !email.equals("")) {
                //String twoDigitsPostalCode = postalCode.substring(0,2);
                Customer customer = CustomerDAO.retrieveCustomerByEmail(email);
                
                if (customer == null) {
                    status = "User not found";
                    //responseMap.put("status", STATUS_NOT_FOUND);
                    responseMap.put("status", status);
                } else {
                    if(password != null && !password.equals("")){
                        if(password.equals(customer.getPassword())){
                            //out.println("exist");
                            //String name = customer.getName();
                            status = "200";
                            token = tokenManagement.createJWT(email, "highlander", "login");
                            //String address = fireStation.getAddress();
                            //responseMap.put("Customer ", name);
                            //responseMap.put("address", address);
                            //responseMap.put("status", STATUS_OK);
                            responseMap.put("status", status);
                            responseMap.put("token", token);
                            
                        } else {
                            status = "Invalid password";
                            responseMap.put("status", status);
                            //responseMap.put("status", STATUS_INVALID_PASSWORD);
                        }
                    } else {
                        status = "Invalid passsword";
                        responseMap.put("status", status);
                        //responseMap.put("status", STATUS_ERROR_NULL_PASSWORD);
                    }
                    
                    
                }

            } else {
                status = "User not found";
                responseMap.put("status", status);
                // country code is null
                //responseMap.put("status", STATUS_ERROR_NULL_EMAIL);
            }
        
        
        return gson.toJson(responseMap);
    }
    
    @POST
    @Path("/admin/login")
    @Produces(MediaType.APPLICATION_JSON)
    public String adminLogin (@FormParam("email") String email, @FormParam("password") String password ){
        //String password = CustomerDAO.retrievePasswordByEmail(email);
        HashMap<String, String> responseMap = new HashMap<String, String>();
        Gson gson = new GsonBuilder().create();
        
        String response = "";
        String status = "";
        if (email != null && !email.equals("")) {
                //String twoDigitsPostalCode = postalCode.substring(0,2);
                Staff staff = StaffDAO.retrieveStaffByEmail(email);
                
                if (staff == null) {
                    status = "User not found";
                    //responseMap.put("status", STATUS_NOT_FOUND);
                    responseMap.put("status", status);
                } else {
                    if(password != null && !password.equals("")){
                        if(password.equals(staff.getPassword())){
                            //out.println("exist");
                            //String name = customer.getName();
                            status = "Login successful";
                            //String address = fireStation.getAddress();
                            //responseMap.put("Customer ", name);
                            //responseMap.put("address", address);
                            //responseMap.put("status", STATUS_OK);
                            responseMap.put("status", status);
                            responseMap.put("user", email);
                        } else {
                            status = "Invalid password";
                            responseMap.put("status", status);
                            //responseMap.put("status", STATUS_INVALID_PASSWORD);
                        }
                    } else {
                        status = "Invalid passsword";
                        responseMap.put("status", status);
                        //responseMap.put("status", STATUS_ERROR_NULL_PASSWORD);
                    }
                    
                    
                }

            } else {
                status = "User not found";
                responseMap.put("status", status);
                // country code is null
                //responseMap.put("status", STATUS_ERROR_NULL_EMAIL);
            }
        
        
        return gson.toJson(responseMap);
    }
} 

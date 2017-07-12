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
 * @author Huiyan
 */
@Path("/registration")
public class Registration {
    
    @POST
    @Path("/insert")
    @Produces(MediaType.APPLICATION_JSON)
    public String login (@FormParam("email") String email,@FormParam("firstName") String firstName, @FormParam("lastName") String lastName, @FormParam("phoneNumber") String phoneNumber, @FormParam("address") String address, @FormParam("postalCode") String postalCode, @FormParam("password") String password){
        //String password = CustomerDAO.retrievePasswordByEmail(email);
        HashMap<String, String> responseMap = new HashMap();
        Gson gson = new GsonBuilder().create();
        String status = "";
    
         
        CustomerDAO.insertCustomer(email,firstName,lastName, phoneNumber, address, postalCode, password);
        status = "200";
                 
        responseMap.put("status", status);
      
       
         //responseMap.put("status", STATUS_ERROR_NULL_PASSWORD);
        return gson.toJson(responseMap);
    }
} 

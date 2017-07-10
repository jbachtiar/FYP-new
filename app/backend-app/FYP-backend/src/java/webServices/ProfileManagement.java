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
import entity.Customer;
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
@Path("/profile")
public class ProfileManagement {
    
    @POST
    @Path("/retrieve")
    @Produces(MediaType.APPLICATION_JSON)
    public String retrieve (@FormParam("email") String email){
        //String password = CustomerDAO.retrievePasswordByEmail(email);
        HashMap<String, String> responseMap = new HashMap<String, String>();
        Gson gson = new GsonBuilder().create();
        String status = "";
        
        
        Customer customer=CustomerDAO.retrieveCustomerByEmail(email);
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
        status="Retrieve successful";
        responseMap.put("status", status);
       
         //responseMap.put("status", STATUS_ERROR_NULL_PASSWORD);
        return gson.toJson(responseMap);
    }
} 

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


/**
 *
 * @author JeremyBachtiar
 */
@Path("/superuser")
public class Superuser {
    
    @POST
    @Path("/addAdmin")
    @Produces(MediaType.APPLICATION_JSON)
    public String addAdmin (@FormParam("id") int id, @FormParam("password") String password ){
        //String password = CustomerDAO.retrievePasswordByEmail(email);
        HashMap<String, String> responseMap = new HashMap<String, String>();
        Gson gson = new GsonBuilder().create();
        
        String response = "";
        String status = "";
        if (password != null && !password.equals("")) {
            if (id!=0){
                if(StaffDAO.retrieveStaffById(id)== null){
                    Staff newStaff = new Staff(id, password);
                    StaffDAO.addStaff(newStaff);
                    status = "Added successfully";
                    responseMap.put("status", status);  
                }
                else{
                    status = "Duplicate Staff ID";
                    responseMap.put("status", status);
                }
                
            }
            else{
                status = "Empty ID";
                responseMap.put("status", status);
            }
                
               

        } else {
                status = "Empty Password";
                responseMap.put("status", status);
                // country code is null
                //responseMap.put("status", STATUS_ERROR_NULL_EMAIL);
            }
        
        
        return gson.toJson(responseMap);
    }
} 

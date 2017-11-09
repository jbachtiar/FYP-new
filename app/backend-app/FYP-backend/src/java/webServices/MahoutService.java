/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webServices;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import dao.AnalyticsDAO;
import dao.CustomerDAO;
import java.sql.SQLException;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Ong Yi Xuan
 */

@Path("/MahoutService")
public class MahoutService {
    
    @Context
    private HttpServletResponse response;

    @GET
    @Path("/save")
    @Produces(MediaType.APPLICATION_JSON)
    public String save(@QueryParam("custEmail") String cEmail, @QueryParam("productId") int pId, @QueryParam("prefValue") int pValue) {

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        
        try{

            jsonOutput.addProperty("status", "200");
            
            //convert email to customer id
            CustomerDAO cDAO = new CustomerDAO();
            int cId = cDAO.getCustIdByEmail(cEmail);
        
            //check if custId*productId exist in user_preferences table
            AnalyticsDAO aDAO = new AnalyticsDAO();
            int currPref = aDAO.getPreference(cId, pId);
            
            //currPref == 0 means custId*productId does not exist
            if(currPref == 0){
                
                //add to user_preferences table
                aDAO.add(cId, pId, pValue);
                
            
            }else{
                
                //user viewed product
                if(pValue == 1){
                    
                    //+1 to preference value (cap at 5)
                    if(currPref < 5){
                        
                        int newPref = currPref + pValue;
                        aDAO.update(cId, pId, newPref);
                        
                    }
                    
                //user added product to cart
                } else if(pValue == 5){
                    
                    if(currPref < 5){
                        
                        int newPref = pValue;
                        aDAO.update(cId, pId, newPref);
                        
                    }
                    
                } else if(pValue == 10){
                    
                    if(currPref < 10){
                        
                        int newPref = pValue;
                        aDAO.update(cId, pId, newPref);
                        
                    }
                                  
                }

            }
            
        } catch(SQLException e){
            
            jsonOutput.addProperty("status", "200");
            jsonOutput.addProperty("error", e.getMessage());
            
        }
                        
       return null;
    
    }
    
}

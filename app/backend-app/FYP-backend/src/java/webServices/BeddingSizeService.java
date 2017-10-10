/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webServices;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import dao.BeddingSizeDAO;
import entity.BeddingSize;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Huiyan
 */
@Path("/BeddingSizeService")
public class BeddingSizeService {

    @Context
    private HttpServletResponse response;
    
    @GET
    @Path("/getAllBeddingSizes")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllColours() {
        
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        BeddingSizeDAO BeddingSizeDAO = new BeddingSizeDAO();

        try {

            ArrayList<BeddingSize> bsList = BeddingSizeDAO.getAllBeddingSizes();
            if (bsList == null) {
                
                jsonOutput.addProperty("status", "500");
                jsonOutput.addProperty("msg", "No Bedding Sizes Available");
                

            } else {
                
                jsonOutput.addProperty("status", "200");
                JsonArray colours = gson.toJsonTree(bsList).getAsJsonArray(); // convert arraylist to jsonArray
                jsonOutput.add("sizes", colours);

            }

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("msg", "ColourService: SQL Exception");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
        
    }

}

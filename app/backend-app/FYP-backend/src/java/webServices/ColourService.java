/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webServices;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import dao.ColourDAO;
import entity.Colour;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Ong Yi Xuan
 */

@Path("/ColourService")
public class ColourService {
    
    @Context
    private HttpServletResponse response;
    
    @GET
    @Path("/getColours")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllColours() {
        
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        
        JsonArray colourArray = new JsonArray();
        ColourDAO colourDao = new ColourDAO();

        try {

            ArrayList<Colour> cList = colourDao.getAllAvailableColours();
            if (cList == null) {
                
                jsonOutput.addProperty("status", "500");
                jsonOutput.addProperty("msg", "No Colours Available");
                

            } else {
                
                jsonOutput.addProperty("status", "200");
                JsonArray colours = gson.toJsonTree(cList).getAsJsonArray(); // convert arraylist to jsonArray
                jsonOutput.add("colours", colours);

            }

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("msg", "ColourService: SQL Exception");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
        
    }
    
    @GET
    @Path("/getColoursByPatternFabric")
    @Produces(MediaType.APPLICATION_JSON)
    public String getColoursByPatternFabricName(@QueryParam("patternName") String patternName, @QueryParam("fabricName") String fabricName) {
        
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        
        JsonArray colourArray = new JsonArray();
        ColourDAO colourDao = new ColourDAO();

        try {

            ArrayList<Colour> cList = colourDao.getAvailableColoursByPatternNameFabricName(patternName, fabricName);
            if (cList == null) {
                
                jsonOutput.addProperty("status", "500");
                jsonOutput.addProperty("msg", "No Colours Available");
                

            } else {
                
                jsonOutput.addProperty("status", "200");
                JsonArray colours = gson.toJsonTree(cList).getAsJsonArray(); // convert arraylist to jsonArray
                jsonOutput.add("colours", colours);

            }

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("msg", "ColourService: SQL Exception");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
        
    }
    
    @GET
    @Path("/getColourById")
    @Produces(MediaType.APPLICATION_JSON)
    public Colour getColourById(@QueryParam("colourId") int colourId) {
        
        ColourDAO cDAO = new ColourDAO();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {
                jsonOutput.addProperty("status", "200");
                Colour c = cDAO.getColourById(colourId);
                return c;

        } catch (SQLException e) {
            System.out.println(e);
            jsonOutput.addProperty("status", "500");
            return null;

        }

        //String finalJsonOutput = gson.toJson(jsonOutput);
        //return finalJsonOutput;
        
    }
    
    
    @OPTIONS
    @PermitAll
    @Path("/save")
    public void optionsSave() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        response.setHeader("Access-Control-Allow-Headers", "authorization");

    }
    
    @POST
    @Path("/save")
    @Produces(MediaType.APPLICATION_JSON)
    public String saveColour(@FormParam("colour") String json) {
        
        ColourDAO cDAO = new ColourDAO();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gs = new Gson();
        Colour colourToSave = gs.fromJson(json, Colour.class);
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {
                System.out.println("JSON: " + json);
                jsonOutput.addProperty("status", "200");       
                jsonOutput.addProperty("newColourId", cDAO.addColour(colourToSave));

        } catch (SQLException e) {
            System.out.println(e);
            jsonOutput.addProperty("status", "500");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }

    @OPTIONS
    @PermitAll
    @Path("/update")
    public void optionsUpdate() {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        response.setHeader("Access-Control-Allow-Headers", "authorization");

    }
    
    @POST
    @Path("/update")
    @Produces(MediaType.APPLICATION_JSON)
    public String updateColour(@FormParam("colour") String json) {
        
        ColourDAO cDAO = new ColourDAO();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gs = new Gson();
        Colour colourToUpdate = gs.fromJson(json, Colour.class);
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {
                System.out.println("JSON: " + json);
                jsonOutput.addProperty("status", "200");
                cDAO.updateColour(colourToUpdate);

        } catch (SQLException e) {
            System.out.println(e);
            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("SQL exception", e.toString());

        }catch (Exception e) {
            System.out.println(e);
            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("Exception", e.toString());

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    
    @GET
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteColour(@QueryParam("colourId") int colourId) {

        ColourDAO cDAO = new ColourDAO();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {
                jsonOutput.addProperty("status", "200");
                cDAO.deleteColourById(colourId);

        } catch (SQLException e) {
            System.out.println(e);
            jsonOutput.addProperty("status", "500");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
}

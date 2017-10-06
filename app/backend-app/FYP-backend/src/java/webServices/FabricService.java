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
import dao.FabricDAO;
import entity.Colour;
import entity.Fabric;
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
@Path("/FabricService")
public class FabricService {
    
    @Context
    private HttpServletResponse response;
    
    @GET
    @Path("/getFabrics")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllFabrics() {
        
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        
        JsonArray fabricArray = new JsonArray();
        FabricDAO fabricDAO = new FabricDAO();

        try {

            ArrayList<Fabric> cList = fabricDAO.getAllAvailableFabrics();
            if (cList == null) {
                
                jsonOutput.addProperty("status", "500");
                jsonOutput.addProperty("msg", "No Fabrics Available");
                

            } else {
                
                jsonOutput.addProperty("status", "200");
                JsonArray fabrics = gson.toJsonTree(cList).getAsJsonArray(); // convert arraylist to jsonArray
                jsonOutput.add("fabrics", fabrics);

            }

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("msg", "FabricService: " + e.toString());

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
        
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
    public String saveFabric(@FormParam("fabric") String json) {
        
        FabricDAO fDAO = new FabricDAO();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gs = new Gson();
        Fabric fabricToSave = gs.fromJson(json, Fabric.class);
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {
                System.out.println("JSON: " + json);
                jsonOutput.addProperty("status", "200");
                fDAO.addFabric(fabricToSave);

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
    public String updateFabric(@FormParam("fabric") String json) {
        
        FabricDAO fDAO = new FabricDAO();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gs = new Gson();
        Fabric fabricToUpdate = gs.fromJson(json, Fabric.class);
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {
                System.out.println("JSON: " + json);
                jsonOutput.addProperty("status", "200");
                fDAO.updateFabric(fabricToUpdate);

        } catch (SQLException e) {
            System.out.println(e);
            jsonOutput.addProperty("status", "500");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    @GET
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteFabric(@QueryParam("fabricId") int fabricId) {

        FabricDAO fDAO = new FabricDAO();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {
                jsonOutput.addProperty("status", "200");
                fDAO.deleteFabricById(fabricId);

        } catch (SQLException e) {
            System.out.println(e);
            jsonOutput.addProperty("status", "500");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    @GET
    @Path("/GetFabricById")
    @Produces(MediaType.APPLICATION_JSON)
    public Fabric getFabricById(@QueryParam("fabricId") int fabricId) {
        
        FabricDAO fDAO = new FabricDAO();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {
                jsonOutput.addProperty("status", "200");
                Fabric f = fDAO.getFabricById(fabricId);
                return f;

        } catch (SQLException e) {
            System.out.println(e);
            jsonOutput.addProperty("status", "500");
            return null;

        }

        //String finalJsonOutput = gson.toJson(jsonOutput);
        //return finalJsonOutput;
        
    }
    
}

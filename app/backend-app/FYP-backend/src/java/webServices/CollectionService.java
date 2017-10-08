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
import dao.CollectionDAO;
import dao.PatternDAO;
import entity.Collection;
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
@Path("/CollectionService")
public class CollectionService {

    @Context
    private HttpServletResponse response;

    @GET
    @Path("/getCollections")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllCollections() {

        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        JsonArray colourArray = new JsonArray();
        CollectionDAO collDAO = new CollectionDAO();

        try {

            ArrayList<Collection> cList = collDAO.getAllAvailableCollections();
            if (cList == null) {

                jsonOutput.addProperty("status", "500");
                jsonOutput.addProperty("msg", "No Collections Available");

            } else {

                jsonOutput.addProperty("status", "200");
                JsonArray collections = gson.toJsonTree(cList).getAsJsonArray(); // convert arraylist to jsonArray
                jsonOutput.add("collections", collections);

            }

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("msg", "CollectionService: " + e.toString());

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
    public String saveCollection(@FormParam("collection") String json) {

        CollectionDAO cDAO = new CollectionDAO();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gs = new Gson();
        Collection collectionToSave = gs.fromJson(json, Collection.class);

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {
            System.out.println("JSON: " + json);
            jsonOutput.addProperty("status", "200");
            cDAO.addCollection(collectionToSave);

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
    public String updateCollection(@FormParam("collection") String json) {
        
        CollectionDAO cDAO = new CollectionDAO();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gs = new Gson();
        Collection collectionToUpdate = gs.fromJson(json, Collection.class);
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {
                System.out.println("JSON: " + json);
                jsonOutput.addProperty("status", "200");
                cDAO.updateCollection(collectionToUpdate);

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
    public String deleteCollection(@QueryParam("collectionId") int collectionId) {

        CollectionDAO cDAO = new CollectionDAO();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {
                jsonOutput.addProperty("status", "200");
                cDAO.deleteCollectionById(collectionId);

        } catch (SQLException e) {
            System.out.println(e);
            jsonOutput.addProperty("status", "500");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    @GET
    @Path("/getCollectionById")
    @Produces(MediaType.APPLICATION_JSON)
    public Collection getCollectionById(@QueryParam("collectionId") int collectionId) {
        
        CollectionDAO cDAO = new CollectionDAO();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {
                jsonOutput.addProperty("status", "200");
                Collection c = cDAO.getCollectionById(collectionId);
                return c;

        } catch (SQLException e) {
            System.out.println(e);
            jsonOutput.addProperty("status", "500");
            return null;

        }

        //String finalJsonOutput = gson.toJson(jsonOutput);
        //return finalJsonOutput;
        
    }
    
}

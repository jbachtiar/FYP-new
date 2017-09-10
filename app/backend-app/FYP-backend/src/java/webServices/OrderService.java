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
import dao.OrderDAO;
import entity.Order;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
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

@Path("/OrderService")
public class OrderService {

    @Context
    private HttpServletResponse response;
    
    
    @GET
    @Path("/getOrderById")
    @Produces(MediaType.APPLICATION_JSON)
    public String getOrderById(@QueryParam("orderId") int orderId) {


        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        
        JsonArray orderArray = new JsonArray();
        OrderDAO orderDao = new OrderDAO();

        try {

            Order[] oArr = orderDao.getOrderById(orderId);
            if (oArr == null) {
                
                jsonOutput.addProperty("status", "500");
                jsonOutput.addProperty("msg", "No Orders Available");
                

            } else {
                
                jsonOutput.addProperty("status", "200");
                JsonArray orders = gson.toJsonTree(oArr).getAsJsonArray(); // convert arraylist to jsonArray
                jsonOutput.add("orders", orders);

            }

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("msg", "OrderService: SQL Exception" +e.getMessage());

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }


    @GET
    @Path("/getAllOrders")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllOrders() {

        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        
        JsonArray orderArray = new JsonArray();
        OrderDAO orderDao = new OrderDAO();

        try {

            Order[] oArr = orderDao.getAllOrders();
            if (oArr == null) {
                
                jsonOutput.addProperty("status", "500");
                jsonOutput.addProperty("msg", "No Orders Available");
                

            } else {
                
                jsonOutput.addProperty("status", "200");
                JsonArray orders = gson.toJsonTree(oArr).getAsJsonArray(); // convert arraylist to jsonArray
                jsonOutput.add("orders", orders);

            }

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("msg", "OrderService: SQL Exception" +e.getMessage());

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }

    @POST
    @Path("/save")
    @Consumes(MediaType.APPLICATION_JSON)
    public String saveOrder(final String json) {
        
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gs = new Gson();
        Order orderToSave = gs.fromJson(json, Order.class);
        OrderDAO oDAO = new OrderDAO();
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {

                jsonOutput.addProperty("status", "200");
                oDAO.addOrder(orderToSave);

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "500");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
}

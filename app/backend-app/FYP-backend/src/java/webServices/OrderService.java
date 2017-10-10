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
<<<<<<< HEAD
=======
import dao.BeddingSizeDAO;
>>>>>>> superUserEnhancement
import dao.CourierDAO;
import dao.OrderDAO;
import entity.Courier;
import entity.Order;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import tokenManagement.tokenManagement;

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
            jsonOutput.addProperty("msg", "OrderService: SQL Exception" + e.getMessage());

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
            jsonOutput.addProperty("msg", "OrderService: SQL Exception" + e.getMessage());

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
<<<<<<< HEAD

=======
    
    @GET
    @Path("/getAllCouriers")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllCouriers() {
        
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        
        JsonArray orderArray = new JsonArray();
        CourierDAO courierDao= new CourierDAO();
        
        try {
            
            Courier[] cArr = courierDao.getAllCouriers();
            if (cArr == null) {
                
                jsonOutput.addProperty("status", "500");
                jsonOutput.addProperty("msg", "No Couriers Available");
                
            } else {
                
                jsonOutput.addProperty("status", "200");
                JsonArray couriers = gson.toJsonTree(cArr).getAsJsonArray(); // convert array to jsonArray
                jsonOutput.add("couriers", couriers);
                
            }
            
        } catch (SQLException e) {
            
            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("msg", "OrderService: SQL Exception" + e.getMessage());
            
        }
        
        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }


    
>>>>>>> superUserEnhancement
    @POST
    @Path("/getOrdersByCustomer")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllOrdersByCustomer(@FormParam("token") String token) {

        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        String email = tokenManagement.parseJWT(token);
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray orderArray = new JsonArray();
        OrderDAO orderDao = new OrderDAO();

        try {

            Order[] oArr = orderDao.getOrderByEmail(email);

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
            jsonOutput.addProperty("msg", "OrderService: SQL Exception" + e.getMessage());

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }

    @POST
    @Path("/getPastOrdersByCustomer")
    @Produces(MediaType.APPLICATION_JSON)
    public String getPastOrdersByCustomer(@FormParam("token") String token) {

        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        String email = tokenManagement.parseJWT(token);
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray orderArray = new JsonArray();
        OrderDAO orderDao = new OrderDAO();

        try {

            Order[] oArr = orderDao.getPastOrdersByEmail(email);

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
            jsonOutput.addProperty("msg", "OrderService: SQL Exception" + e.getMessage());

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }

    @POST
    @Path("/getCurrentOrdersByCustomer")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCurrentOrdersByCustomer(@FormParam("token") String token) {

        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        String email = tokenManagement.parseJWT(token);
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray orderArray = new JsonArray();
        OrderDAO orderDao = new OrderDAO();

        try {

            Order[] oArr = orderDao.getCurrentOrdersByEmail(email);

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
            jsonOutput.addProperty("msg", "OrderService: SQL Exception" + e.getMessage());

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
    public String saveOrder(@FormParam("order") String json) {
        System.out.println("ORDER JSON: " + json);
        //response.setHeader("Access-Control-Allow-Headers", "Content-Type");
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
            System.out.println("EXCEPTION e: " + e);

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
    public String updateOrder(@FormParam("order") String json) {
        System.out.println("Update ORDER JSON: " + json);
        //response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gs = new Gson();
        Order orderToUpdate = gs.fromJson(json, Order.class);
        JsonObject status = gs.fromJson(json, JsonObject.class);

        int newStatusId = status.get("newStatusId").getAsInt();
        //int newStatusId=1;

        OrderDAO oDAO = new OrderDAO();

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {

            jsonOutput.addProperty("status", "200");
            oDAO.updateOrder(orderToUpdate, newStatusId);

        } catch (SQLException e) {
            System.out.println("EXCEPTION e: " + e);

            jsonOutput.addProperty("status", "500");

        }catch(Exception e){
            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("error", e.toString());
        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    
    
    @GET
    @Path("/getCouriers")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllCouriers() {

        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        JsonArray orderArray = new JsonArray();
        CourierDAO cDAO = new CourierDAO();

        try {

            Courier[] cArr = cDAO.getAllAvailableCouriers();
            if (cArr == null) {

                jsonOutput.addProperty("status", "500");
                jsonOutput.addProperty("msg", "No Couriers Available");

            } else {

                jsonOutput.addProperty("status", "200");
                JsonArray couriers = gson.toJsonTree(cArr).getAsJsonArray(); // convert arraylist to jsonArray
                jsonOutput.add("couriers", couriers);

            }

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("msg", "OrderService: SQL Exception" + e.getMessage());

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    @GET
    @Path("/updateShipment")
    @Produces(MediaType.APPLICATION_JSON)
    public String updateOrderStatus(@QueryParam("orderId") int orderId, @QueryParam("courierName") String courierName, @QueryParam("trackingNo") String trackingNo) {


        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        OrderDAO oDao = new OrderDAO();

        try {

            String msg = oDao.updateOrderShipment(orderId, courierName, trackingNo);
            
            if (msg.equals("Success")) {
                
                jsonOutput.addProperty("status", "200");
                

            } else {
                
                jsonOutput.addProperty("status", "500");

            }

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "500");
            jsonOutput.addProperty("msg", "OrderStatusLogService: SQL Exception" +e.getMessage());

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
}

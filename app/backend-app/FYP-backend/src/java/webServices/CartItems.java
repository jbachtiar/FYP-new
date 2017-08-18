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
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dao.CartDAO;
import dao.CartDetailsDAO;
import dao.FabricDAO;
import dao.PatternDAO;
import dao.ProductDAO;
import entity.Cart;
import entity.CartDetails;
import entity.CartItem;
import entity.Fabric;
import entity.Pattern;
import entity.Product;
import entity.ShoppingCart;

import java.sql.SQLException;
import java.util.ArrayList;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;

import javax.ws.rs.core.MediaType;
import tokenManagement.tokenManagement;

/**
 *
 * @author Huiyan
 */
@Path("/Cart")
public class CartItems {
    
    @GET
    @Path("/productPrice")
    @Produces(MediaType.APPLICATION_JSON)
    public String getProductPrice(@QueryParam("productId") String productId){
        double totalPrice = 0.0;
        JsonObject jsonOutput = new JsonObject();
        Gson gson = new GsonBuilder().create();
     
        try{
            Product product = ProductDAO.retrieveProductById(productId);
            double colorPrice = product.getColorPrice();
            
            Pattern pattern = PatternDAO.retrievePatternById(product.getPatternID());
            double patternPrice = pattern.getPatternPrice();
            
            Fabric fabric = FabricDAO.getFabricById(product.getFabricID());
            double fabricPrice = fabric.getFabricPrice();
            
            
            totalPrice = colorPrice + patternPrice + fabricPrice;
            
            jsonOutput.addProperty("status", "200");
            jsonOutput.addProperty("totalPrice" , totalPrice);
             
        }catch(SQLException e){
            
        }
        String finalJsonOutput = gson.toJson(jsonOutput);
        
        return finalJsonOutput;
    }

    @GET
    @Path("/items")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCartItems(@QueryParam("cartId") String cartId) {

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        JsonArray carts = new JsonArray();

        try {

            Cart[] cArray = CartDAO.getCartsByCartId(cartId);
            if (cArray.length == 0) {
                jsonOutput.addProperty("status", "Item not found");

            } else {
                jsonOutput.addProperty("status", "200");

                for (Cart c : cArray) {

                    JsonObject temp = new JsonObject();
                    Product p = c.getProduct();
                    temp.addProperty("SKU", p.getSKU());
                    temp.addProperty("pattern_id", p.getPatternID());
                    temp.addProperty("fabric_id", p.getFabricID());
                    temp.addProperty("collection_id", p.getCollectionID());
                    temp.addProperty("colour_id", p.getColorID());

                    temp.addProperty("pattern_name", p.getPatternName());
                    temp.addProperty("fabric_name", p.getFabricName());
                    temp.addProperty("collection_name", p.getCollectionName());
                    temp.addProperty("colour_name", p.getColorName());

                    temp.addProperty("pattern_price", p.getFabricPrice());
                    temp.addProperty("fabric_price", p.getFabricPrice());
                    temp.addProperty("colour_price", p.getFabricPrice());
                    temp.addProperty("image_url", p.getImageUrl());

                    JsonArray tags = gson.toJsonTree(p.getTags()).getAsJsonArray(); // convert arraylist to jsonArray
                    temp.add("tags", tags);
                    temp.addProperty("quantity", c.getQuantity());

                    carts.add(temp);

                }

                jsonOutput.add("carts", carts);
            }

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "error");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }

    @PUT
    @Path("/updateCartItems")
    @Produces(MediaType.APPLICATION_JSON)
    public String updateCartItems(@FormParam("cartId") String cartId, @FormParam("productId") String productId, @FormParam("qty") String qty) {

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try {

            int quantity = Integer.parseInt(qty);
            CartDAO.updateCartDetails(cartId, productId, quantity);

            jsonOutput.addProperty("status", "200");

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "error");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    @POST
    @Path("/retrieveCart")
    @Produces(MediaType.APPLICATION_JSON)
    public String retrieveCart(@Context HttpHeaders httpHeaders) {
        String token = httpHeaders.getRequestHeader("Authorization").get(0);
        String email = tokenManagement.parseJWT(token);
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        
        try{
            Cart cart = CartDAO.retrieveCartByCust(email);
            
            if(cart!=null){
                String cartId = cart.getCartId();
                double totalPrice =  cart.getPrice();
                ArrayList<CartDetails> cartDetails = CartDetailsDAO.getCartDetailsByCartId(cartId);
                int noOfItems = cartDetails.size();
                
                jsonOutput.addProperty("cartId" , cartId);
                jsonOutput.addProperty("totalPrice" , totalPrice);
                jsonOutput.addProperty("noOfItems" , noOfItems);
                
                JsonArray cartItems = new JsonArray();
                
                for(CartDetails cartDetail : cartDetails){
                    JsonObject temp = new JsonObject();
                    String productSKU = cartDetail.getProductSKU();
                    Product product = ProductDAO.retrieveProductById(productSKU);
                    String patternName = product.getPatternName();
                    String url = product.getImageUrl();
                    double price = product.getPatternPrice() + product.getColorPrice() + product.getFabricPrice();
                    
                    temp.addProperty("productId", productSKU);
                    temp.addProperty("patternName", patternName);
                    temp.addProperty("url", url);
                    temp.addProperty("quantity", cartDetail.getQuantity());
                    temp.addProperty("eachPrice", price);
                    
                    cartItems.add(temp);
                
                }
                jsonOutput.add("items", cartItems);
                jsonOutput.addProperty("status", "200" );
            }else{
                jsonOutput.addProperty("status", "Error" );
            }
        
        }catch(SQLException e){
            
        }
        
        
        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
        
    }
    
    
    @POST
    @Path("/updateCart")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String updateCart(@Context HttpHeaders httpHeaders, final String json) {
        
        String token = httpHeaders.getRequestHeader("Authorization").get(0);
        String email = tokenManagement.parseJWT(token);
        
        System.out.println("json: " + json);
        
        System.out.println("HAHAHAHA IM HEREEEE");
        
        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        ShoppingCart shoppingCart = gson.fromJson(json, ShoppingCart.class);
        System.out.println("totalPrice : " + shoppingCart.getTotalPrice());

        
        if(shoppingCart != null){
             
                String cartId = shoppingCart.getCartId();
                
                if (cartId==null || cartId.equals("")) {
                    try {
                        cartId = CartDAO.getCartId();
                        CartItem[] cartItems = shoppingCart.getItems();
                        double totalPrice = shoppingCart.getTotalPrice();
                        
                        CartDAO.addCart(cartId, totalPrice, email, CartDAO.getCurrentDate());
                        
                        int noOfItems = shoppingCart.getNoOfItems();
                        for (CartItem item : cartItems) {
                            String productId = item.getProductId();
                            int quantity = item.getQuantity();
                            
                            CartDetailsDAO.addCartDetails(cartId, productId, quantity);
                        }
                        jsonOutput.addProperty("status","200");
                    } catch (SQLException e) {

                    }
                }else{
                    //System.out.println("cart id exist")
                    try {
                        CartItem[] cartItems = shoppingCart.getItems();
                        double totalPrice = shoppingCart.getTotalPrice();
                        
                        CartDAO.updateCart(totalPrice, CartDAO.getCurrentDate(), cartId);

                        int noOfItems = shoppingCart.getNoOfItems();
                        for (CartItem item : cartItems) {
                            String productId = item.getProductId();
                            int quantity = item.getQuantity();
                            
                            CartDetailsDAO.updateCartDetails(cartId, productId, quantity);
                        }
                        jsonOutput.addProperty("status","200");
                    } catch (SQLException e) {

                    }
                

                
                
                
                
            }
            
        }
        
        
        

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }

    @DELETE
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteCartItems(@QueryParam("cartId") String cartId,@QueryParam("productId") String productId, @QueryParam("qty") String qty) {

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();

        try { 
            int quantity = Integer.parseInt(qty);
            CartDAO.deleteCartItem(cartId ,quantity, productId);
            jsonOutput.addProperty("status", "200");

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "error");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }
    
    @GET
    @Path("/price")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCartTotalPrice(@QueryParam("cartId") String cartId) {

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();
        String price;

        try {

            price= CartDAO.getTotalPriceByCardId(cartId);
            jsonOutput.addProperty("status", "200");
            jsonOutput.addProperty("total_price", price);
            

        } catch (SQLException e) {

            jsonOutput.addProperty("status", "error");

        }

        String finalJsonOutput = gson.toJson(jsonOutput);
        return finalJsonOutput;
    }


}

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
import dao.CartDAO;
import entity.Cart;
import entity.Product;

import java.sql.SQLException;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import javax.ws.rs.core.MediaType;

/**
 *
 * @author Huiyan
 */
@Path("/Cart")
public class CartItems {

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
    @Path("/update")
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

}

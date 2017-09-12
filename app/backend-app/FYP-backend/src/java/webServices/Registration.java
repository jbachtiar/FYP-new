/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webServices;

//import javax.ws.rs.GET;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dao.CartDAO;
import dao.CustomerAddressDAO;
import dao.CustomerDAO;
import entity.Address;
import entity.Cart;
import entity.CartItem;
import entity.Customer;
import entity.Order;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
//import javax.ws.rs.MatrixParam;
import javax.ws.rs.POST;
//import javax.ws.rs.MatrixParam;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
//import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Huiyan
 */
@Path("/registration")
public class Registration {

    @Context
    private HttpServletResponse response;

    @POST
    @Path("/insert")
    @Produces(MediaType.APPLICATION_JSON)
    public String register(@FormParam("email") String email, @FormParam("firstName") String firstName, @FormParam("lastName") String lastName, @FormParam("phoneNumber") String phoneNumber, @FormParam("country") String country, @FormParam("city") String city, @FormParam("address") String address, @FormParam("postalCode") String postalCode, @FormParam("password") String password) {

        response.setHeader("Access-Control-Allow-Origin", "*");
        //String password = CustomerDAO.retrievePasswordByEmail(email);
        HashMap<String, String> responseMap = new HashMap();
        Gson gson = new GsonBuilder().create();
     
        try {
            CustomerAddressDAO customerAddressDao = new CustomerAddressDAO();
            CartDAO cartDao = new CartDAO();
            CustomerDAO customerDao = new CustomerDAO();

            Address a = new Address(email, firstName, phoneNumber, 1, address, city, country, postalCode, "Y");
            ArrayList<Address> addArrayList = new ArrayList<>();
            addArrayList.add(a);
            Address[] addArray = addArrayList.toArray(new Address[addArrayList.size()]);
            CartItem[] cartItem = new CartItem[0];
            Order[] order = new Order[0];
            Cart c = new Cart(cartDao.getNextCartId(), 0, cartItem);
            Customer cus = new Customer(email, firstName, lastName, phoneNumber, password, "N", c, addArray, order);
            String addCustomerResult=customerDao.addCustomer(cus);
            if(addCustomerResult.equals("Success")){
                customerAddressDao.addAddressToCustomer(a);
                cartDao.addCart(c, email);
                responseMap.put("status", "200");
            }else{
                responseMap.put("description", addCustomerResult);
                
            }
        
           
        } catch (SQLException e) {
            responseMap.put("status", "500");
            responseMap.put("description", "SQL Exception");

        }

        //responseMap.put("status", STATUS_ERROR_NULL_PASSWORD);
        return gson.toJson(responseMap);
    }

}

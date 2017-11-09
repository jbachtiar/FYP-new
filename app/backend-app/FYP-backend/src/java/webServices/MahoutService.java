/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webServices;

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

        //convert email to customer id
        
        //insert to pref table
/*        
1. new row if new view
2. +1 to preference value, with every additional view (cap at 5)
3. Set preference value as 5, with add to cart
4. Set preference value as 10, with purchase
*//*
        PatternDAO pDAO = new PatternDAO();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");

        Gson gson = new GsonBuilder().create();
        JsonObject jsonOutput = new JsonObject();*/
       return null;
    
    }
    
}

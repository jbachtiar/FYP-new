/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

/**
 *
 * @author Huiyan
 */
public class Cart {
    private String cartId;
    private double price;
    private String custId;
    private String date;

    public Cart(String cartId, double price, String custId, String date) {
        this.cartId = cartId;
        this.price = price;
        this.custId = custId;
        this.date = date;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCartId() {
        return cartId;
    }

    public double getPrice() {
        return price;
    }

    public String getCustId() {
        return custId;
    }

    public String getDate() {
        return date;
    }
    
    
   
}

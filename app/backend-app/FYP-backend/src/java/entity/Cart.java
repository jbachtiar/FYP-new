/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

/**
 *
 * @author JeremyBachtiar
 */
public class Cart {
    private String cartId;
    private double totalPrice;
    private String customerId;

    public Cart(String cartId, double totalPrice, String customerId) {
        this.cartId = cartId;
        this.totalPrice = totalPrice;
        this.customerId = customerId;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCartId() {
        return cartId;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public String getCustomerId() {
        return customerId;
    }
    
    
}

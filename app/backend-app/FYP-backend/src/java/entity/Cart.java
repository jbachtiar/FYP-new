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
    private CartItem cartItem;

    public Cart(String cartId, double price, CartItem cartItem) {
        this.cartId = cartId;
        this.price = price;
        this.cartItem = cartItem;
    }

    public String getCartId() {
        return cartId;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public CartItem getCartItem() {
        return cartItem;
    }

    public void setCartItem(CartItem cartItem) {
        this.cartItem = cartItem;
    }
   
}

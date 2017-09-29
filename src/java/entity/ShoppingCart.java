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
public class ShoppingCart {
    
    private CartItem[] items;
    private String cartId;
    private double totalPrice;
    private int noOfItems;

    public ShoppingCart(CartItem[] items, String cartId, double totalPrice, int noOfItems) {
        this.items = items;
        this.cartId = cartId;
        this.totalPrice = totalPrice;
        this.noOfItems = noOfItems;
    }

    public CartItem[] getItems() {
        return items;
    }

    public String getCartId() {
        return cartId;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public int getNoOfItems() {
        return noOfItems;
    }

    public void setItems(CartItem[] items) {
        this.items = items;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setNoOfItems(int noOfItems) {
        this.noOfItems = noOfItems;
    }

   
}

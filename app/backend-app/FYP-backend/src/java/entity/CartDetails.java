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
public class CartDetails {
    private String cartId;
    private String productSKU;
    private int quantity;

    public CartDetails(String cartId, String productSKU, int quantity) {
        this.cartId = cartId;
        this.productSKU = productSKU;
        this.quantity = quantity;
    }

    public String getCartId() {
        return cartId;
    }

    public String getProductSKU() {
        return productSKU;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public void setProductSKU(String productSKU) {
        this.productSKU = productSKU;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
    
}

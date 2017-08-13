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
public class OrderDetails {
    private String productSKU;
    private int quantity;
    private String orderID;

    public OrderDetails(String productSKU, int quantity, String orderID) {
        this.productSKU = productSKU;
        this.quantity = quantity;
        this.orderID = orderID; 
    }

    public String getProductSKU() {
        return productSKU;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getOrderID() {
        return orderID;
    }

    public void setProductSKU(String productSKU) {
        this.productSKU = productSKU;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    
}

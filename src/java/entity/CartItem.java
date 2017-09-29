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
public class CartItem {
    private int quantity;
    private String eachPrice;
    private String productId;
    private String patternName;
    private String url;

    public CartItem(int quantity, String eachPrice, String productId, String patternName, String url) {
        this.quantity = quantity;
        this.eachPrice = eachPrice;
        this.productId = productId;
        this.patternName = patternName;
        this.url = url;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setEachPrice(String eachPrice) {
        this.eachPrice = eachPrice;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public void setPatternName(String patternName) {
        this.patternName = patternName;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getEachPrice() {
        return eachPrice;
    }

    public String getProductId() {
        return productId;
    }

    public String getPatternName() {
        return patternName;
    }

    public String getUrl() {
        return url;
    }
    
    
}

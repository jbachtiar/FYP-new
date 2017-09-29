/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

/**
 *
 * @author Ong Yi Xuan
 */
public class CustomFabric {
    
    private String fabric_id;
    private String fabric_name;
    private String fabric_description;
    private Double fabric_price;
    private CustomColour[] colours;

    public CustomFabric(String fabric_id, String fabric_name, String fabric_description, Double fabric_price, CustomColour[] colours) {
        this.fabric_id = fabric_id;
        this.fabric_name = fabric_name;
        this.fabric_description = fabric_description;
        this.fabric_price = fabric_price;
        this.colours = colours;
    }

    public String getFabric_id() {
        return fabric_id;
    }

    public void setFabric_id(String fabric_id) {
        this.fabric_id = fabric_id;
    }

    public String getFabric_name() {
        return fabric_name;
    }

    public void setFabric_name(String fabric_name) {
        this.fabric_name = fabric_name;
    }

    public String getFabric_description() {
        return fabric_description;
    }

    public void setFabric_description(String fabric_description) {
        this.fabric_description = fabric_description;
    }

    public Double getFabric_price() {
        return fabric_price;
    }

    public void setFabric_price(Double fabric_price) {
        this.fabric_price = fabric_price;
    }

    public CustomColour[] getColours() {
        return colours;
    }

    public void setColours(CustomColour[] colours) {
        this.colours = colours;
    }
    
    
}

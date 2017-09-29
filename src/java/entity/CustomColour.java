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
public class CustomColour {
    
    private String colour_id;
    private String colour_name;
    private Double colour_price;
    private String image_url;

    public CustomColour(String colour_id, String colour_name, Double colour_price, String image_url) {
        this.colour_id = colour_id;
        this.colour_name = colour_name;
        this.colour_price = colour_price;
        this.image_url = image_url;
    }

    public String getColour_id() {
        return colour_id;
    }

    public void setColour_id(String colour_id) {
        this.colour_id = colour_id;
    }

    public String getColour_name() {
        return colour_name;
    }

    public void setColour_name(String colour_name) {
        this.colour_name = colour_name;
    }

    public Double getColour_price() {
        return colour_price;
    }

    public void setColour_price(Double colour_price) {
        this.colour_price = colour_price;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }    
    
}

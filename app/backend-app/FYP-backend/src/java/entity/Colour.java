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
public class Colour {
    
    private String colourID;
    private String colourName;
    private double colour_price;
    private String imageUrl; 

    public Colour(String colourID, String colourName, double colour_price, String imageUrl) {
        this.colourID = colourID;
        this.colourName = colourName;
        this.colour_price = colour_price;
        this.imageUrl = imageUrl;
    }
    
    public Colour(String colourID, String colourName) {
        this.colourID = colourID;
        this.colourName = colourName;
    }

    public String getColourID() {
        return colourID;
    }

    public void setColourID(String colourID) {
        this.colourID = colourID;
    }

    public String getColourName() {
        return colourName;
    }

    public void setColourName(String colourName) {
        this.colourName = colourName;
    }

    public double getColour_price() {
        return colour_price;
    }

    public void setColour_price(double colour_price) {
        this.colour_price = colour_price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
}

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
    
    private int colourId;
    private String colourName;
    private double colourPrice;

    public Colour(int colourId, String colourName, double colourPrice) {
        this.colourId = colourId;
        this.colourName = colourName;
        this.colourPrice = colourPrice;
    }

    public int getColourId() {
        return colourId;
    }

    public void setColourId(int colourId) {
        this.colourId = colourId;
    }

    public String getColourName() {
        return colourName;
    }

    public void setColourName(String colourName) {
        this.colourName = colourName;
    }

    public double getColourPrice() {
        return colourPrice;
    }

    public void setColourPrice(double colourPrice) {
        this.colourPrice = colourPrice;
    }

}

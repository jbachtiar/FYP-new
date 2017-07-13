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
    
}

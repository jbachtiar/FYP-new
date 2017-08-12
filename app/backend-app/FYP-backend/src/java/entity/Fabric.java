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
public class Fabric {
    
    private String fabricID;
    private String fabricName;
    private String fabricDescription;
    private double fabricPrice;
    private Colour[] colours;

    public Fabric(String fabricID, String fabricName, String fabricDescription, double fabricPrice, Colour[] colours) {
        this.fabricID = fabricID;
        this.fabricName = fabricName;
        this.fabricDescription = fabricDescription;
        this.fabricPrice = fabricPrice;
        this.colours = colours;
    }
    
    public Fabric(String fabricID, String fabricName, String fabricDescription, double fabricPrice) {
        this.fabricID = fabricID;
        this.fabricName = fabricName;
        this.fabricDescription = fabricDescription;
        this.fabricPrice = fabricPrice;
    }

    public String getFabricID() {
        return fabricID;
    }

    public void setFabricID(String fabricID) {
        this.fabricID = fabricID;
    }

    public String getFabricName() {
        return fabricName;
    }

    public void setFabricName(String fabricName) {
        this.fabricName = fabricName;
    }

    public String getFabricDescription() {
        return fabricDescription;
    }

    public void setFabricDescription(String fabriDescription) {
        this.fabricDescription = fabriDescription;
    }

    public double getFabricPrice() {
        return fabricPrice;
    }

    public void setFabricPrice(double fabricPrice) {
        this.fabricPrice = fabricPrice;
    }

    public Colour[] getColours() {
        return colours;
    }

    public void setColours(Colour[] colours) {
        this.colours = colours;
    }
    
    
    
}

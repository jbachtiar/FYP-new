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
    private String fabriDescription;
    private double fabricPrice;

    public Fabric(String fabricID, String fabricName, String fabriDescription, double fabricPrice) {
        this.fabricID = fabricID;
        this.fabricName = fabricName;
        this.fabriDescription = fabriDescription;
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

    public String getFabriDescription() {
        return fabriDescription;
    }

    public void setFabriDescription(String fabriDescription) {
        this.fabriDescription = fabriDescription;
    }

    public double getFabricPrice() {
        return fabricPrice;
    }

    public void setFabricPrice(double fabricPrice) {
        this.fabricPrice = fabricPrice;
    }
    
    
}

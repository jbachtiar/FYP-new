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
public class Pattern {
    
    private String patternID;
    private String patternName;
    private String patternDescription;
    private double patternPrice;
    private Collection collection;

    public Pattern(String patternID, String patternName, String patternDescription, double patternPrice, Collection collection) {
        this.patternID = patternID;
        this.patternName = patternName;
        this.patternDescription = patternDescription;
        this.patternPrice = patternPrice;
        this.collection = collection;
    }

    public String getPatternID() {
        return patternID;
    }

    public void setPatternID(String patternID) {
        this.patternID = patternID;
    }

    public String getPatternName() {
        return patternName;
    }

    public void setPatternName(String patternName) {
        this.patternName = patternName;
    }

    public String getPatternDescription() {
        return patternDescription;
    }

    public void setPatternDescription(String patternDescription) {
        this.patternDescription = patternDescription;
    }

    public double getPatternPrice() {
        return patternPrice;
    }

    public void setPatternPrice(double patternPrice) {
        this.patternPrice = patternPrice;
    }

    public Collection getCollection() {
        return collection;
    }

    public void setCollection(Collection collection) {
        this.collection = collection;
    }
    
    
    
    
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.ArrayList;



/**
 *
 * @author Huiyan
 */
public class Product {
    private String SKU;
    private String patternID;
    private String patternName;
    private double patternPrice;
    
    private String fabricID;
    private String fabricName;
    private double fabricPrice;
    
    private String colorID;
    private String colorName;
    private double colorPrice;
    
    private String collectionID;
    private String collectionName;
    
    private String imageUrl;
    private ArrayList<String> tags;
   
    
    public Product(String SKU, String patternID, String patternName, double patternPrice, String fabricID, String fabricName, double fabricPrice, String colorID, String colorName, double colorPrice, String collectionID, String collectionName, String imageUrl, ArrayList<String> tags) {
        this.SKU = SKU;
        this.patternID = patternID;
        this.patternName = patternName;
        this.patternPrice = patternPrice;
        this.fabricID = fabricID;
        this.fabricName = fabricName;
        this.fabricPrice = fabricPrice;
        this.colorID = colorID;
        this.colorName = colorName;
        this.colorPrice = colorPrice;
        this.collectionID = collectionID;
        this.collectionName = collectionName;
        this.imageUrl = imageUrl;
        this.tags= tags;
    }

    public String getSKU() {
        return SKU;
    }

    /**
     * @param SKU the SKU to set
     */
    public void setSKU(String SKU) {
        this.SKU = SKU;
    }

    /**
     * @return the patternID
     */
    public String getPatternID() {
        return patternID;
    }

    /**
     * @param patternID the patternID to set
     */
    public void setPatternID(String patternID) {
        this.patternID = patternID;
    }

    /**
     * @return the patternName
     */
    public String getPatternName() {
        return patternName;
    }

    /**
     * @param patternName the patternName to set
     */
    public void setPatternName(String patternName) {
        this.patternName = patternName;
    }

    /**
     * @return the patternPrice
     */
    public double getPatternPrice() {
        return patternPrice;
    }

    /**
     * @param patternPrice the patternPrice to set
     */
    public void setPatternPrice(double patternPrice) {
        this.patternPrice = patternPrice;
    }

    /**
     * @return the fabricID
     */
    public String getFabricID() {
        return fabricID;
    }

    /**
     * @param fabricID the fabricID to set
     */
    public void setFabricID(String fabricID) {
        this.fabricID = fabricID;
    }

    /**
     * @return the fabricName
     */
    public String getFabricName() {
        return fabricName;
    }

    /**
     * @param fabricName the fabricName to set
     */
    public void setFabricName(String fabricName) {
        this.fabricName = fabricName;
    }

    /**
     * @return the fabricPrice
     */
    public double getFabricPrice() {
        return fabricPrice;
    }

    /**
     * @param fabricPrice the fabricPrice to set
     */
    public void setFabricPrice(double fabricPrice) {
        this.fabricPrice = fabricPrice;
    }

    /**
     * @return the colorID
     */
    public String getColorID() {
        return colorID;
    }

    /**
     * @param colorID the colorID to set
     */
    public void setColorID(String colorID) {
        this.colorID = colorID;
    }

    /**
     * @return the colorName
     */
    public String getColorName() {
        return colorName;
    }

    /**
     * @param colorName the colorName to set
     */
    public void setColorName(String colorName) {
        this.colorName = colorName;
    }

    /**
     * @return the colorPrice
     */
    public double getColorPrice() {
        return colorPrice;
    }

    /**
     * @param colorPrice the colorPrice to set
     */
    public void setColorPrice(double colorPrice) {
        this.colorPrice = colorPrice;
    }

    /**
     * @return the collectionID
     */
    public String getCollectionID() {
        return collectionID;
    }

    /**
     * @param collectionID the collectionID to set
     */
    public void setCollectionID(String collectionID) {
        this.collectionID = collectionID;
    }

    /**
     * @return the collectionName
     */
    public String getCollectionName() {
        return collectionName;
    }

    /**
     * @param collectionName the collectionName to set
     */
    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }

    /**
     * @return the imageUrl
     */
    public String getImageUrl() {
        return imageUrl;
    }

    /**
     * @param imageUrl the imageUrl to set
     */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    /**
     * @return the tags
     */
    public ArrayList<String> getTags() {
        return tags;
    }

    /**
     * @param tags the tags to set
     */
    public void setTags(ArrayList<String> tags) {
        this.tags = tags;
    }



    
   
    
    
}

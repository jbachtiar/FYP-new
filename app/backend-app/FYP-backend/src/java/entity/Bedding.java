/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.ArrayList;

/**
 *
 * @author Ong Yi Xuan
 */
public class Bedding extends Product{
    
    private double colourPrice;
    private BeddingSize size;
    private Fabric fabric;

    public Bedding(double colourPrice, BeddingSize size, Fabric fabric, int productId, String productType, Design design, Colour colour, Image[] images) {
        super(productId, productType, design, colour, images);
        this.colourPrice = colourPrice;
        this.size = size;
        this.fabric = fabric;
    }

    public double getColourPrice() {
        return colourPrice;
    }

    public void setColourPrice(double colourPrice) {
        this.colourPrice = colourPrice;
    }

    public BeddingSize getSize() {
        return size;
    }

    public void setSize(BeddingSize size) {
        this.size = size;
    }

    public Fabric getFabric() {
        return fabric;
    }

    public void setFabric(Fabric fabric) {
        this.fabric = fabric;
    }

    
    
    
}

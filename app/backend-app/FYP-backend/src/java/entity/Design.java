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

public class Design {
    
    private int designId;
    private String designName;
    private String designDesc;
    private double designPrice;
    private Collection collection;
    private Tag[] tags;

    public Design(int designId, String designName, String designDesc, double designPrice, Collection collection, Tag[] tags) {
        this.designId = designId;
        this.designName = designName;
        this.designDesc = designDesc;
        this.designPrice = designPrice;
        this.collection = collection;
        this.tags = tags;
    }

    public int getDesignId() {
        return designId;
    }

    public void setDesignId(int designId) {
        this.designId = designId;
    }

    public String getDesignName() {
        return designName;
    }

    public void setDesignName(String designName) {
        this.designName = designName;
    }

    public String getDesignDesc() {
        return designDesc;
    }

    public void setDesignDesc(String designDesc) {
        this.designDesc = designDesc;
    }

    public double getDesignPrice() {
        return designPrice;
    }

    public void setDesignPrice(double designPrice) {
        this.designPrice = designPrice;
    }

    public Collection getCollection() {
        return collection;
    }

    public void setCollection(Collection collection) {
        this.collection = collection;
    }

    public Tag[] getTags() {
        return tags;
    }

    public void setTags(Tag[] tags) {
        this.tags = tags;
    }
    
}

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
public class CustomPattern {
    
    private String pattern_id;
    private String pattern_name;
    private String pattern_description;
    private Double pattern_price;
    private String collection_id;
    private String collection_name;
    private CustomFabric[] fabrics;

    public CustomPattern(String pattern_id, String pattern_name, String pattern_description, Double pattern_price, String collection_id, String collection_name, CustomFabric[] fabrics) {
        this.pattern_id = pattern_id;
        this.pattern_name = pattern_name;
        this.pattern_description = pattern_description;
        this.pattern_price = pattern_price;
        this.collection_id = collection_id;
        this.collection_name = collection_name;
        this.fabrics = fabrics;
    }

    
    public String getPattern_id() {
        return pattern_id;
    }

    public void setPattern_id(String pattern_id) {
        this.pattern_id = pattern_id;
    }

    public String getPattern_name() {
        return pattern_name;
    }

    public void setPattern_name(String pattern_name) {
        this.pattern_name = pattern_name;
    }

    public Double getPattern_price() {
        return pattern_price;
    }

    public void setPattern_price(Double pattern_price) {
        this.pattern_price = pattern_price;
    }

    public String getCollection_id() {
        return collection_id;
    }

    public void setCollection_id(String collection_id) {
        this.collection_id = collection_id;
    }

    public String getCollection_name() {
        return collection_name;
    }

    public void setCollection_name(String collection_name) {
        this.collection_name = collection_name;
    }

    public CustomFabric[] getFabrics() {
        return fabrics;
    }

    public void setFabrics(CustomFabric[] fabrics) {
        this.fabrics = fabrics;
    }

    public String getPattern_description() {
        return pattern_description;
    }

    public void setPattern_description(String pattern_description) {
        this.pattern_description = pattern_description;
    }
    
}

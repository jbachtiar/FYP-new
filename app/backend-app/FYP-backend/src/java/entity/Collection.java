/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Ong Yi Xuan
 */
@XmlRootElement

public class Collection {
    
    private String collectionID;
    private String collectionName;
    
    public Collection() {
        this.collectionID = null;
        this.collectionName = null;
    }

    public Collection(String collectionID, String collectionName) {
        this.collectionID = collectionID;
        this.collectionName = collectionName;
    }

    public String getCollectionID() {
        return collectionID;
    }

    public void setCollectionID(String collectionID) {
        this.collectionID = collectionID;
    }

    public String getCollectionName() {
        return collectionName;
    }

    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }
    
}

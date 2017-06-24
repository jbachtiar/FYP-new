/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

/**
 *
 * @author JeremyBachtiar
 */
public class Customer {
    private int custID;
    private String name;
    private String contact;
    private String address;
    private String password;
    private String paymentMethod;

    public Customer(int custID, String name, String contact, String address, String password, String paymentMethod) {
        this.custID = custID;
        this.name = name;
        this.contact = contact;
        this.address = address;
        this.password = password;
        this.paymentMethod = paymentMethod;
    }

    public void setCustID(int custID) {
        this.custID = custID;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    
    public int getCustID() {
        return custID;
    }

    public String getName() {
        return name;
    }

    public String getContact() {
        return contact;
    }

    public String getAddress() {
        return address;
    }

    public String getPassword() {
        return password;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }
    
    
}

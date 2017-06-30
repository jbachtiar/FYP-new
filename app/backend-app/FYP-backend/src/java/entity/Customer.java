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
    private String firstName;
    private String lastName;
    private String contact;
    private String address;
    private String password;
    private String email;

    public Customer(int custID, String firstName, String lastName, String contact, String address, String password, String email) {
        this.custID = custID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contact = contact;
        this.address = address;
        this.password = password;
        this.email= email;

    }

    public void setCustID(int custID) {
        this.custID = custID;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    public void setEmail(String email) {
        this.email = email;
    }
    
    public int getCustID() {
        return custID;
    }

    public String getFirstName() {
        return firstName;
    }
    
    public String getLastName() {
        return lastName;
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

    public String getEmail() {
        return email;
    }
    
    
}

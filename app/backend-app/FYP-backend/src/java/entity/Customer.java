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
    
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private String unitNumber;
    private String country;
    private String postalCode;
    private String password;
    private String verified;

    public Customer(String email, String firstName, String lastName, String phoneNumber, String address, String unitNumber, String country, String postalCode, String password, String verified) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.unitNumber = unitNumber;
        this.country = country;
        this.postalCode = postalCode;
        this.password = password;
        this.verified = verified;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setUnitNumber(String unitNumber) {
        this.unitNumber = unitNumber;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setVerified(String verified) {
        this.verified = verified;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public String getUnitNumber() {
        return unitNumber;
    }

    public String getCountry() {
        return country;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public String getPassword() {
        return password;
    }

    public String getVerified() {
        return verified;
    }

    
}

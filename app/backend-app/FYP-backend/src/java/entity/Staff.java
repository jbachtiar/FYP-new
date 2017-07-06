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
public class Staff {
    
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String password;
    private String roleCode;

    public Staff(String email, String firstName, String lastName, String phone_num, String password, String roleCode) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phone_num;
        this.password = password;
        this.roleCode = roleCode;
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

    public void setPhoneNumber(String phone_num) {
        this.phoneNumber = phone_num;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
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

    public String getPassword() {
        return password;
    }

    public String getRoleCode() {
        return roleCode;
    }

  
}

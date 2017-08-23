/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.sql.Date;

/**
 *
 * @author Ong Yi Xuan
 */
public class PromoCode {
    
    private int promoCodeId;
    private String promoName;
    private String promoType;
    private double promoValue;
    private double minPurchase;
    private double maxDiscount;
    private int quota;
    private int counter;
    private Date start_date;
    private Date end_date;

    public PromoCode(int promoCodeId, String promoName, String promoType, double promoValue, double minPurchase, double maxDiscount, int quota, int counter, Date start_date, Date end_date) {
        this.promoCodeId = promoCodeId;
        this.promoName = promoName;
        this.promoType = promoType;
        this.promoValue = promoValue;
        this.minPurchase = minPurchase;
        this.maxDiscount = maxDiscount;
        this.quota = quota;
        this.counter = counter;
        this.start_date = start_date;
        this.end_date = end_date;
    }

    public int getPromoCodeId() {
        return promoCodeId;
    }

    public void setPromoCodeId(int promoCodeId) {
        this.promoCodeId = promoCodeId;
    }

    public String getPromoName() {
        return promoName;
    }

    public void setPromoName(String promoName) {
        this.promoName = promoName;
    }

    public String getPromoType() {
        return promoType;
    }

    public void setPromoType(String promoType) {
        this.promoType = promoType;
    }

    public double getPromoValue() {
        return promoValue;
    }

    public void setPromoValue(double promoValue) {
        this.promoValue = promoValue;
    }

    public double getMinPurchase() {
        return minPurchase;
    }

    public void setMinPurchase(double minPurchase) {
        this.minPurchase = minPurchase;
    }

    public double getMaxDiscount() {
        return maxDiscount;
    }

    public void setMaxDiscount(double maxDiscount) {
        this.maxDiscount = maxDiscount;
    }

    public int getQuota() {
        return quota;
    }

    public void setQuota(int quota) {
        this.quota = quota;
    }

    public int getCounter() {
        return counter;
    }

    public void setCounter(int counter) {
        this.counter = counter;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }
    
    
    
}

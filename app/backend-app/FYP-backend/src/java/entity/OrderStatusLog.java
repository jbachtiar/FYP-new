/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.sql.Timestamp;

/**
 *
 * @author Ong Yi Xuan
 */
public class OrderStatusLog {
    
    private OrderStatus orderStatus;
    private Timestamp timeStamp;

    public OrderStatusLog(OrderStatus orderStatus, Timestamp timeStamp) {
        this.orderStatus = orderStatus;
        this.timeStamp = timeStamp;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Timestamp getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Timestamp timeStamp) {
        this.timeStamp = timeStamp;
    }
    
}

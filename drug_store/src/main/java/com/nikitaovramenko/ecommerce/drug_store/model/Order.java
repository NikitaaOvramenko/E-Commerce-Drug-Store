package com.nikitaovramenko.ecommerce.drug_store.model;

import java.lang.ProcessBuilder.Redirect.Type;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.nikitaovramenko.ecommerce.drug_store.enums.OrderStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime createdAt;

    private Double totalPrice;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @OneToOne(mappedBy = "order")
    private OrderAddress orderAddress;

    @OneToMany(mappedBy = "order")
    private List<OrderDrug> orderDrugs = new ArrayList<>();

    @OneToOne(mappedBy = "order")
    private Payment payment;

    public Order() {
    }

    public Order(Long id, User user, LocalDateTime createdAt, Double totalPrice, OrderStatus orderStatus) {
        this.id = id;
        this.user = user;
        this.createdAt = createdAt;
        this.totalPrice = totalPrice;
        this.orderStatus = orderStatus;
    }

    public OrderAddress getOrderAddress() {
        return orderAddress;
    }

    public void setOrderAddress(OrderAddress orderAddress) {
        this.orderAddress = orderAddress;
    }

    public List<OrderDrug> getOrderDrugs() {
        return orderDrugs;
    }

    public void setOrderDrugs(List<OrderDrug> orderDrugs) {
        this.orderDrugs = orderDrugs;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setLocalDateTime(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

}

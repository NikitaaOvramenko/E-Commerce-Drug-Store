package com.nikitaovramenko.ecommerce.drug_store.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class OrderDrug {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private Integer quantity;

    private Double priceAtPurchase;

    public OrderDrug() {
    }

    public OrderDrug(Long id, Order order, Integer quantity, Double priceAtPurchase) {
        this.id = id;
        this.order = order;
        this.quantity = quantity;
        this.priceAtPurchase = priceAtPurchase;
    }

}

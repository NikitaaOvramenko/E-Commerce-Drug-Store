package com.nikitaovramenko.ecommerce.drug_store.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

@Entity
public record Basket(
        @Id @GeneratedValue(strategy = GenerationType.AUTO) Integer id,

        @JoinColumn(name = "user_id") User user) {

}

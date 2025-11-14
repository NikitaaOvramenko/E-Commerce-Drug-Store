package com.nikitaovramenko.ecommerce.drug_store.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

@Entity
public record Drug(
        @Id @GeneratedValue(strategy = GenerationType.AUTO) Integer id,
        String name,
        Double price,
        Integer stock,
        String img,
        @JoinColumn(name = "type_id") Type type,
        @JoinColumn(name = "brand_id") Brand brand) {

}

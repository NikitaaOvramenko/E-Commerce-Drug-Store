package com.nikitaovramenko.ecommerce.drug_store.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public record Type(
        @Id @GeneratedValue(strategy = GenerationType.AUTO) Integer id,
        String name) {

}

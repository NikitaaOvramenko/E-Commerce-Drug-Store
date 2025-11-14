package com.nikitaovramenko.ecommerce.drug_store.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public record Brand(
        @Id @GeneratedValue(strategy = GenerationType.AUTO) Integer id,
        String name

) {

}

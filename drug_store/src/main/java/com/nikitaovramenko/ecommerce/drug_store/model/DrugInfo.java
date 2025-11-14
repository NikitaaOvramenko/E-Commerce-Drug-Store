package com.nikitaovramenko.ecommerce.drug_store.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

public record DrugInfo(
        @Id @GeneratedValue(strategy = GenerationType.AUTO) Integer id,
        @JoinColumn(name = "drug_id") Drug drug,
        String title,
        String manufacturer,
        String description

) {

}

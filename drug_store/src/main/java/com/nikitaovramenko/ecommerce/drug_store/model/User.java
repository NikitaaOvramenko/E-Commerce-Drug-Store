package com.nikitaovramenko.ecommerce.drug_store.model;

import org.hibernate.annotations.ValueGenerationType;
import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public record User(
        @Id @GeneratedValue(strategy = GenerationType.AUTO) Integer id,
        String email,
        String password,
        Role role) {
}

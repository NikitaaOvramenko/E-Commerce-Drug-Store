package com.nikitaovramenko.ecommerce.drug_store.dto;

public record OrderDrugDto(
    Long id,
    String drugName,
    String drugImg,
    Integer quantity,
    Long priceAtPurchase
) {}

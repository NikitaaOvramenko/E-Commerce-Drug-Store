package com.nikitaovramenko.ecommerce.drug_store.dto;

public record OrderDrugDto(
    Long id,
    String drugName,
    Integer quantity,
    Double priceAtPurchase
) {}

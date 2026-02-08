package com.nikitaovramenko.ecommerce.drug_store.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.nikitaovramenko.ecommerce.drug_store.enums.OrderStatus;

public record OrderDto(
    Long id,
    Long tgUserId,
    Long tgChatId,
    LocalDateTime createdAt,
    Double totalPrice,
    OrderStatus orderStatus,
    List<OrderDrugDto> items
) {}

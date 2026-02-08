package com.nikitaovramenko.ecommerce.drug_store.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nikitaovramenko.ecommerce.drug_store.dto.OrderDto;
import com.nikitaovramenko.ecommerce.drug_store.service.OrderService;

@RestController
@RequestMapping("/api")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/order/checkout")
    public ResponseEntity<OrderDto> checkout(Authentication authentication) {
        // Get the email from the authenticated user (JWT)
        String email = authentication.getName();
        OrderDto res = orderService.checkout(email);
        return ResponseEntity.ok(res);
    }
}

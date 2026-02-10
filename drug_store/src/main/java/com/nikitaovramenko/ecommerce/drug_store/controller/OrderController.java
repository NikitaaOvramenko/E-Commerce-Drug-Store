package com.nikitaovramenko.ecommerce.drug_store.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nikitaovramenko.ecommerce.drug_store.dto.OrderDto;
import com.nikitaovramenko.ecommerce.drug_store.service.OrderService;
import com.nikitaovramenko.ecommerce.drug_store.service.TgServerApiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api")
public class OrderController {

    private final OrderService orderService;
    private final TgServerApiService serverApiService;

    public OrderController(OrderService orderService, TgServerApiService serverApiService) {
        this.orderService = orderService;
        this.serverApiService = serverApiService;
    }

    @PostMapping("/order/checkout")
    public ResponseEntity<OrderDto> checkout(Authentication authentication) {
        // Get the email from the authenticated user (JWT)
        String email = authentication.getName();
        OrderDto res = orderService.checkout(email);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/order/{orderId}/place")
    public ResponseEntity<OrderDto> placeOrder(@PathVariable Long orderId) {
        OrderDto res = serverApiService.placeOrder(orderId);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/order/all")
    public ResponseEntity<List<OrderDto>> getAllOrders(Authentication authentication) {
        List<OrderDto> orders = orderService.getAllByUserEmail(authentication.getName());
        return ResponseEntity.ok(orders);
    }

}

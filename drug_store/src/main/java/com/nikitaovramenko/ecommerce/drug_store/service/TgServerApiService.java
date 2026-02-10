package com.nikitaovramenko.ecommerce.drug_store.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nikitaovramenko.ecommerce.drug_store.dto.OrderDto;
import com.nikitaovramenko.ecommerce.drug_store.enums.OrderStatus;
import com.nikitaovramenko.ecommerce.drug_store.mapper.OrderMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.Order;
import com.nikitaovramenko.ecommerce.drug_store.repository.OrderRepository;

@Service
public class TgServerApiService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public TgServerApiService(OrderRepository orderRepository, OrderMapper orderMapper,
            ObjectMapper objectMapper) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public OrderDto placeOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        OrderDto orderDto = orderMapper.toDto(order);

        try {
            String jsonBody = objectMapper.writeValueAsString(orderDto);
            final String api = "http://127.0.0.1:8000/send/invoice";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(api))
                    .version(HttpClient.Version.HTTP_1_1)
                    .header("Content-Type", "application/json")
                    .header("Accept", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 400) {
                throw new RuntimeException("Telegram bot returned " + response.statusCode() + ": " + response.body());
            }
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to send order to Telegram bot: " + e.getMessage(), e);
        }

        order.setOrderStatus(OrderStatus.PENDING_PAYMENT);
        orderRepository.save(order);

        return orderMapper.toDto(order);
    }

}

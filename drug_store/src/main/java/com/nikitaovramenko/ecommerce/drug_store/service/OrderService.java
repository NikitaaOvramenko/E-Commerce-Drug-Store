package com.nikitaovramenko.ecommerce.drug_store.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.dto.OrderDto;
import com.nikitaovramenko.ecommerce.drug_store.enums.OrderStatus;
import com.nikitaovramenko.ecommerce.drug_store.mapper.OrderMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.Basket;
import com.nikitaovramenko.ecommerce.drug_store.model.Order;
import com.nikitaovramenko.ecommerce.drug_store.model.OrderDrug;
import com.nikitaovramenko.ecommerce.drug_store.model.User;
import com.nikitaovramenko.ecommerce.drug_store.repository.OrderRepository;
import com.nikitaovramenko.ecommerce.drug_store.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, OrderMapper orderMapper, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.userRepository = userRepository;
    }

    @Transactional
    public List<OrderDto> getAllByUserEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user.getOrders().stream().map(orderMapper::toDto).toList();

    }

    @Transactional
    public OrderDto checkout(String email) {
        // Find user by email (from JWT authentication)
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Basket basket = user.getBasket();
        if (basket == null || basket.getBasketDrugs().isEmpty()) {
            throw new RuntimeException("Basket is empty");
        }

        Order order = new Order();
        order.setLocalDateTime(LocalDateTime.now());
        order.setUser(user);
        order.setOrderStatus(OrderStatus.CHECKOUT);

        List<OrderDrug> orderDrugs = basket.getBasketDrugs().stream()
                .map(drug -> orderMapper.toOrderDrug(drug, order))
                .toList();
        order.setOrderDrugs(orderDrugs);

        long sum = 0L;
        for (OrderDrug orderDrug : orderDrugs) {
            sum += orderDrug.getPriceAtPurchase() * orderDrug.getQuantity();
        }
        order.setTotalPrice(sum);

        orderRepository.save(order);

        return orderMapper.toDto(order);
    }
}

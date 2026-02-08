package com.nikitaovramenko.ecommerce.drug_store.service;

import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.dto.OrderDto;
import com.nikitaovramenko.ecommerce.drug_store.mapper.OrderMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.Basket;
import com.nikitaovramenko.ecommerce.drug_store.model.BasketDrug;
import com.nikitaovramenko.ecommerce.drug_store.model.Order;
import com.nikitaovramenko.ecommerce.drug_store.model.OrderDrug;
import com.nikitaovramenko.ecommerce.drug_store.model.User;
import com.nikitaovramenko.ecommerce.drug_store.repository.BasketRepository;
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
    public OrderDto checkout(OrderDto dto) {

        Order order = orderMapper.toEntity(dto);

        order.setLocalDateTime(LocalDateTime.now());
        User user = userRepository.findByTgUserId(dto.tg_user_id());
        order.setUser(user);
        Basket basket = user.getBasket();

        List<OrderDrug> orderDrugs = basket.getBasketDrugs().stream().map(drug -> orderMapper.toOrderDrug(drug, order))
                .toList();
        order.setOrderDrugs(orderDrugs);

        double sum = 0;
        for (int i = 0; i < orderDrugs.size(); i++) {
            for (int j = 0; j < orderDrugs.get(i).getQuantity(); j++) {
                sum += orderDrugs.get(i).getPriceAtPurchase();
            }
        }
        order.setTotalPrice(sum);

        orderRepository.save(order);

        OrderDto orderDto = orderMapper.toDto(order);

        return orderDto;

    }

}

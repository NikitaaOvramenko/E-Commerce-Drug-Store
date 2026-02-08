package com.nikitaovramenko.ecommerce.drug_store.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.dto.OrderDto;
import com.nikitaovramenko.ecommerce.drug_store.dto.OrderDrugDto;
import com.nikitaovramenko.ecommerce.drug_store.general.Mapper;
import com.nikitaovramenko.ecommerce.drug_store.model.BasketDrug;
import com.nikitaovramenko.ecommerce.drug_store.model.Order;
import com.nikitaovramenko.ecommerce.drug_store.model.OrderDrug;
import com.nikitaovramenko.ecommerce.drug_store.model.User;

@Component
public class OrderMapper implements Mapper<Order, OrderDto> {

    @Override
    public OrderDto toDto(Order order) {
        User user = order.getUser();

        List<OrderDrugDto> items = order.getOrderDrugs().stream()
                .map(this::toOrderDrugDto)
                .toList();

        return new OrderDto(
                order.getId(),
                user != null ? user.getTgUserId() : null,
                user != null ? user.getTgChatId() : null,
                order.getCreatedAt(),
                order.getTotalPrice(),
                order.getOrderStatus(),
                items
        );
    }

    private OrderDrugDto toOrderDrugDto(OrderDrug orderDrug) {
        return new OrderDrugDto(
                orderDrug.getId(),
                orderDrug.getDrug() != null ? orderDrug.getDrug().getName() : null,
                orderDrug.getQuantity(),
                orderDrug.getPriceAtPurchase()
        );
    }

    @Override
    public Order toEntity(OrderDto d) {
        Order order = new Order();
        return order;
    }

    public OrderDrug toOrderDrug(BasketDrug basketDrug, Order order) {
        OrderDrug orderDrug = new OrderDrug();
        orderDrug.setDrug(basketDrug.getDrug());
        orderDrug.setQuantity(basketDrug.getQuantity());
        orderDrug.setPriceAtPurchase(basketDrug.getDrug().getPrice());
        orderDrug.setOrder(order);
        return orderDrug;
    }
}

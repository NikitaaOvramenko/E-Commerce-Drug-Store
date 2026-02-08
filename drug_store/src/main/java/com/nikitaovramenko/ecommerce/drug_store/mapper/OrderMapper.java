package com.nikitaovramenko.ecommerce.drug_store.mapper;

import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.dto.OrderDto;
import com.nikitaovramenko.ecommerce.drug_store.general.Mapper;
import com.nikitaovramenko.ecommerce.drug_store.model.BasketDrug;
import com.nikitaovramenko.ecommerce.drug_store.model.Order;
import com.nikitaovramenko.ecommerce.drug_store.model.OrderDrug;

@Component
public class OrderMapper implements Mapper<Order, OrderDto> {

    @Override
    public OrderDto toDto(Order e) {

        throw new UnsupportedOperationException("Unimplemented method 'toDto'");
    }

    @Override
    public Order toEntity(OrderDto d) {
        Order order = new Order();

        return order;

    }

    public OrderDrug toOrderDrug(BasketDrug basketDrug, Order order) {
        OrderDrug orderDrug = new OrderDrug();
        orderDrug.setQuantity(basketDrug.getQuantity());
        orderDrug.setPriceAtPurchase(basketDrug.getDrug().getPrice());
        orderDrug.setOrder(order);

        return orderDrug;
    }

}

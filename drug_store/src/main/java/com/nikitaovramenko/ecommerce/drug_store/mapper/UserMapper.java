package com.nikitaovramenko.ecommerce.drug_store.mapper;

import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.dto.UserDto;
import com.nikitaovramenko.ecommerce.drug_store.model.User;

@Component
public class UserMapper {
    public static UserDto toDto(User user) {
        return new UserDto(user.getEmail(), user.getBasket().getBasketDrugs());
    }
}

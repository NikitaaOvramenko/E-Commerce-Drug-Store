package com.nikitaovramenko.ecommerce.drug_store.mapper;

import java.util.stream.Collector;

import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.dto.UserDto;
import com.nikitaovramenko.ecommerce.drug_store.model.User;

@Component
public class UserMapper {

    private BasketDrugMapper basketDrugMapper;

    public UserMapper(BasketDrugMapper basketDrugMapper) {
        this.basketDrugMapper = basketDrugMapper;
    }

    public UserDto toDto(User user) {
        UserDto userDto = new UserDto(user.getEmail(),
                user.getBasket().getBasketDrugs().stream().map(b -> basketDrugMapper.toDto(b)).toList());
        return userDto;

    }

    public User toUser(UserDto dto) {
        return new User();
    }
}

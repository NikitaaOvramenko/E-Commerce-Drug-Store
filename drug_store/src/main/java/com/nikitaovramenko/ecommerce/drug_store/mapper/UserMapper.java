package com.nikitaovramenko.ecommerce.drug_store.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.dto.UserDto;
import com.nikitaovramenko.ecommerce.drug_store.general.Mapper;
import com.nikitaovramenko.ecommerce.drug_store.model.User;

@Component
public class UserMapper implements Mapper<User, UserDto> {

    private BasketDrugMapper basketDrugMapper;

    public UserMapper(BasketDrugMapper basketDrugMapper) {
        this.basketDrugMapper = basketDrugMapper;
    }

    @Override
    public UserDto toDto(User user) {
        UserDto userDto = new UserDto(
                user.getEmail(),
                user.getTgChatId(),
                user.getBasket() != null ? user.getBasket().getId() : null,
                user.getBasket() != null
                        ? user.getBasket().getBasketDrugs().stream().map(b -> basketDrugMapper.toDto(b)).toList()
                        : List.of());
        return userDto;
    }

    @Override
    public User toEntity(UserDto dto) {
        return new User();
    }
}

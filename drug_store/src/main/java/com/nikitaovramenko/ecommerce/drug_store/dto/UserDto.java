package com.nikitaovramenko.ecommerce.drug_store.dto;

import java.util.List;

public class UserDto {
    private String email;
    private List<BasketDrugDto> basketItems;

    public UserDto(String email, List<BasketDrugDto> basketItems) {
        this.email = email;
        this.basketItems = basketItems;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<BasketDrugDto> getBasketItems() {
        return basketItems;
    }

    public void setBasketItems(List<BasketDrugDto> basketItems) {
        this.basketItems = basketItems;
    }

}

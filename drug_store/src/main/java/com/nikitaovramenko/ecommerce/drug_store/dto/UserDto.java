package com.nikitaovramenko.ecommerce.drug_store.dto;

import java.util.List;

import com.nikitaovramenko.ecommerce.drug_store.model.BasketDrug;

public class UserDto {
    private String email;
    private List<BasketDrug> basketItems;

    public UserDto(String email, List<BasketDrug> basketItems) {
        this.email = email;
        this.basketItems = basketItems;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<BasketDrug> getBasketItems() {
        return basketItems;
    }

    public void setBasketItems(List<BasketDrug> basketItems) {
        this.basketItems = basketItems;
    }

}

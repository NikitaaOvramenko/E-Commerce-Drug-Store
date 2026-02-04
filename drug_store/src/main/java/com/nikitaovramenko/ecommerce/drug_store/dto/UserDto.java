package com.nikitaovramenko.ecommerce.drug_store.dto;

import java.util.List;

public class UserDto {
    private String email;
    private Long basketId;
    private List<BasketDrugDto> basketItems;

    public UserDto(String email, Long basketId, List<BasketDrugDto> basketItems) {
        this.email = email;
        this.basketId = basketId;
        this.basketItems = basketItems;
    }

    public Long getBasketId() {
        return basketId;
    }

    public void setBasketId(Long basketId) {
        this.basketId = basketId;
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

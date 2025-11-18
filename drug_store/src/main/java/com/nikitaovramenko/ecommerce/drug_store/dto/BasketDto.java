package com.nikitaovramenko.ecommerce.drug_store.dto;

public class BasketDto {

    private Long basketId;
    private Long drugId;

    public BasketDto() {
    }

    public Long getBasketId() {
        return basketId;
    }

    public void setBasketId(Long basketId) {
        this.basketId = basketId;
    }

    public Long getDrugId() {
        return drugId;
    }

    public void setDrugId(Long drugId) {
        this.drugId = drugId;
    }

}

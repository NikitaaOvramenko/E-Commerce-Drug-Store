package com.nikitaovramenko.ecommerce.drug_store.dto;

public class BasketDto {

    private Long basketId;
    private Long drugId;
    private double totalPrice;
    private java.util.List<BasketDrugDto> items;

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

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public java.util.List<BasketDrugDto> getItems() {
        return items;
    }

    public void setItems(java.util.List<BasketDrugDto> items) {
        this.items = items;
    }

}

package com.nikitaovramenko.ecommerce.drug_store.dto;

public class DrugDto {
    private String name;
    private Double price;
    private Integer stock;
    private String img;
    private Long typeId;
    private Long brandId;

    public DrugDto(String name, Double price, Integer stock, String img, Long typeId, Long brandId) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.img = img;
        this.typeId = typeId;
        this.brandId = brandId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long typeId) {
        this.typeId = typeId;
    }

    public Long getBrandId() {
        return brandId;
    }

    public void setBrandId(Long brandId) {
        this.brandId = brandId;
    }

}

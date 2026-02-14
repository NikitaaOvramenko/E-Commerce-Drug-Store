package com.nikitaovramenko.ecommerce.drug_store.dto;

import java.util.List;

public class DrugDto {
    private Long id;
    private String name;
    private Long price;
    private Integer stock;
    private String img;
    private Long typeId;
    private Long brandId;
    private String typeName;
    private String brandName;
    private List<DrugInfoDto> drugInfoDto;

    public DrugDto() {
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<DrugInfoDto> getDrugInfoDto() {
        return drugInfoDto;
    }

    public void setDrugInfoDto(List<DrugInfoDto> drugInfoDto) {
        this.drugInfoDto = drugInfoDto;
    }

}

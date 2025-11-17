package com.nikitaovramenko.ecommerce.drug_store.dto;

import java.util.List;

public class BrandDto {
    private String name;
    private List<Long> typeIds;
    private Long id;
    private List<String> typeNames;

    public BrandDto(String name, List<Long> typeIds) {
        this.name = name;
        this.typeIds = typeIds;
    }

    public BrandDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Long> getTypeIds() {
        return typeIds;
    }

    public void setTypeIds(List<Long> typeIds) {
        this.typeIds = typeIds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getTypeNames() {
        return typeNames;
    }

    public void setTypeNames(List<String> typeNames) {
        this.typeNames = typeNames;
    }

}

package com.nikitaovramenko.ecommerce.drug_store.dto;

import java.util.List;

public class TypeDto {
    private String name;
    private List<Long> brandIds;
    private Long id;
    private List<String> brandNames;

    public TypeDto(String name, List<Long> brandIds) {
        this.name = name;
        this.brandIds = brandIds;
    }

    public TypeDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Long> getBrandIds() {
        return brandIds;
    }

    public void setBrandIds(List<Long> brandIds) {
        this.brandIds = brandIds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getBrandNames() {
        return brandNames;
    }

    public void setBrandNames(List<String> brandNames) {
        this.brandNames = brandNames;
    }

}

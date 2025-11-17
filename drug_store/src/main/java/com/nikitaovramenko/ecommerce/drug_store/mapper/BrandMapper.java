package com.nikitaovramenko.ecommerce.drug_store.mapper;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.dto.BrandDto;
import com.nikitaovramenko.ecommerce.drug_store.model.Brand;

@Component
public class BrandMapper {

    public BrandMapper() {
    }

    public Brand toBrand(BrandDto dto) {
        Brand brand = new Brand(dto.getName());
        return brand;
    }

    public BrandDto toDto(Brand brand) {
        return new BrandDto(brand.getName(),
                brand.getTypes().stream().map(type -> type.getId()).collect(Collectors.toList()));
    }

    public BrandDto toDtoWithNames(Brand brand) {
        BrandDto dto = new BrandDto();
        dto.setId(brand.getId());
        dto.setName(brand.getName());
        dto.setTypeIds(brand.getTypes().stream().map(type -> type.getId()).collect(Collectors.toList()));
        dto.setTypeNames(brand.getTypes().stream().map(type -> type.getName()).toList());

        return dto;

    }

}

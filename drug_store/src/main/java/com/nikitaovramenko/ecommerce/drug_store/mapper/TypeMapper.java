package com.nikitaovramenko.ecommerce.drug_store.mapper;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.dto.TypeDto;
import com.nikitaovramenko.ecommerce.drug_store.model.Brand;
import com.nikitaovramenko.ecommerce.drug_store.model.Type;

@Component
public class TypeMapper {

    public TypeMapper() {
    }

    public Type toType(TypeDto dto) {
        Type type = new Type(dto.getName());
        return type;
    }

    public TypeDto toDto(Type type) {
        return new TypeDto(type.getName(),
                type.getBrands().stream().map(brand -> brand.getId()).collect(Collectors.toList()));
    }

    public TypeDto toDtoWithNames(Type type) {

        TypeDto dto = new TypeDto();
        dto.setId(type.getId());
        dto.setName(type.getName());
        dto.setBrandIds(type.getBrands().stream().map(brand -> brand.getId()).collect(Collectors.toList()));
        dto.setBrandNames(type.getBrands().stream().map(brand -> brand.getName()).toList());

        return dto;

    }
}

package com.nikitaovramenko.ecommerce.drug_store.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.dto.DrugDto;
import com.nikitaovramenko.ecommerce.drug_store.model.Brand;
import com.nikitaovramenko.ecommerce.drug_store.model.Drug;
import com.nikitaovramenko.ecommerce.drug_store.model.Rating;
import com.nikitaovramenko.ecommerce.drug_store.model.Type;

@Component
public class DrugMapper {

    public Drug toDrug(DrugDto drugDto) {

        Drug drug = new Drug();

        drug.setName(drugDto.getName());
        drug.setPrice(drugDto.getPrice());
        drug.setStock(drugDto.getStock());
        drug.setImg(drugDto.getImg());

        return drug;
    }

    public DrugDto toDto(Drug drug) {

        DrugDto dto = new DrugDto();

        dto.setId(drug.getId());
        dto.setName(drug.getName());
        dto.setPrice(drug.getPrice());
        dto.setStock(drug.getStock());
        dto.setImg(drug.getImg());
        dto.setBrandName(drug.getBrand().getName());
        dto.setTypeName(drug.getType().getName());
        dto.setBrandId(drug.getBrand().getId());
        dto.setTypeId(drug.getType().getId());

        return dto;

    }
}

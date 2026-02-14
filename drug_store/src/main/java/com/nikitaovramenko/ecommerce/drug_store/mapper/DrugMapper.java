package com.nikitaovramenko.ecommerce.drug_store.mapper;

import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.dto.DrugDto;
import com.nikitaovramenko.ecommerce.drug_store.model.Drug;

@Component
public class DrugMapper {

    private final DrugInfoMapper drugInfoMapper;

    public DrugMapper(DrugInfoMapper drugInfoMapper) {
        this.drugInfoMapper = drugInfoMapper;
    }

    public Drug toDrug(DrugDto drugDto) {

        Drug drug = new Drug();

        drug.setDrugInfos(drugDto.getDrugInfoDto().stream().map(drugInfoMapper::toEntity).toList());
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
        dto.setDrugInfoDto(drug.getDrugInfos().stream().map(drugInfoMapper::toDto).toList());

        return dto;

    }
}

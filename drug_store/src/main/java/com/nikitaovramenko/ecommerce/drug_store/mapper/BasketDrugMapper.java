package com.nikitaovramenko.ecommerce.drug_store.mapper;

import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.dto.BasketDrugDto;
import com.nikitaovramenko.ecommerce.drug_store.model.BasketDrug;

@Component
public class BasketDrugMapper {

    private DrugMapper drugMapper;

    public BasketDrugMapper(DrugMapper drugMapper) {
        this.drugMapper = drugMapper;
    }

    public BasketDrugDto toDto(BasketDrug basketDrug) {
        BasketDrugDto basketDrugDto = new BasketDrugDto(drugMapper.toDto(basketDrug.getDrug()),
                basketDrug.getQuantity());
        return basketDrugDto;

    }

}

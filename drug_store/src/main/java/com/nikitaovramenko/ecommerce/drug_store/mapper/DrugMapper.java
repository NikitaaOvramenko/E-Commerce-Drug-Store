package com.nikitaovramenko.ecommerce.drug_store.mapper;

import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.dto.DrugDto;
import com.nikitaovramenko.ecommerce.drug_store.model.Brand;
import com.nikitaovramenko.ecommerce.drug_store.model.Drug;
import com.nikitaovramenko.ecommerce.drug_store.model.Type;

@Component
public class DrugMapper {

    public static Drug toDrug(DrugDto drugDto, Type type, Brand brand) {
        String name = drugDto.getName();
        Double price = drugDto.getPrice();
        Integer stock = drugDto.getStock();
        String img = drugDto.getImg();

        return new Drug(name, price, stock, img, type, brand);
    }
}

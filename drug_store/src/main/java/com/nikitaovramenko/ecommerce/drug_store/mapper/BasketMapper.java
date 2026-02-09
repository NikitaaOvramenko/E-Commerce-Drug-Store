package com.nikitaovramenko.ecommerce.drug_store.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.dto.BasketDrugDto;
import com.nikitaovramenko.ecommerce.drug_store.dto.BasketDto;
import com.nikitaovramenko.ecommerce.drug_store.general.Mapper;
import com.nikitaovramenko.ecommerce.drug_store.model.Basket;

@Component
public class BasketMapper implements Mapper<Basket, BasketDto> {

    private final BasketDrugMapper basketDrugMapper;

    public BasketMapper(BasketDrugMapper basketDrugMapper) {
        this.basketDrugMapper = basketDrugMapper;
    }

    @Override
    public BasketDto toDto(Basket e) {
        BasketDto bd = new BasketDto();
        bd.setBasketId(e.getId());
        bd.setTotalPrice(e.getTotalPrice());

        List<BasketDrugDto> items = e.getBasketDrugs().stream()
                .map(basketDrugMapper::toDto)
                .toList();
        bd.setItems(items);

        return bd;
    }

    @Override
    public Basket toEntity(BasketDto d) {
        Basket basket = new Basket();
        basket.setTotalPrice(d.getTotalPrice());
        return basket;
    }

}

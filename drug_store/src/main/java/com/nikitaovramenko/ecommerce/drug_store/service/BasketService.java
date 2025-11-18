package com.nikitaovramenko.ecommerce.drug_store.service;

import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.model.Basket;
import com.nikitaovramenko.ecommerce.drug_store.model.BasketDrug;
import com.nikitaovramenko.ecommerce.drug_store.model.Drug;
import com.nikitaovramenko.ecommerce.drug_store.repository.BasketRepository;

import jakarta.transaction.Transactional;

@Service
public class BasketService {

    private final BasketRepository basketRepository;

    public BasketService(BasketRepository basketRepository) {
        this.basketRepository = basketRepository;
    }

    @Transactional
    public Basket createBasket(Basket basket) {
        return basketRepository.save(basket);
    }

    @Transactional
    public void addToBasket(Basket basket, Drug drug) {

        BasketDrug exists = basket.getBasketDrugs().stream().filter(b -> b.getDrug().getId().equals(drug.getId()))
                .findFirst().orElse(null);

        if (exists != null) {
            exists.setQuantity(exists.getQuantity() + 1);
            return;
        }

        BasketDrug basketDrug = new BasketDrug();
        basketDrug.setBasket(basket);
        basketDrug.setDrug(drug);
        basketDrug.setQuantity(1);

        basket.getBasketDrugs().add(basketDrug);

    }

    @Transactional
    public Basket findBasket(Long id) {
        return basketRepository.getReferenceById(id);
    }

}

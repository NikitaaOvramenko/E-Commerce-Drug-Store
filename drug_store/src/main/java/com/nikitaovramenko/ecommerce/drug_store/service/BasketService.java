package com.nikitaovramenko.ecommerce.drug_store.service;

import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.model.Basket;
import com.nikitaovramenko.ecommerce.drug_store.repository.BasketRepository;

@Service
public class BasketService {

    private final BasketRepository basketRepository;

    public BasketService(BasketRepository basketRepository) {
        this.basketRepository = basketRepository;
    }

    public Basket createBasket(Basket basket) {
        return basketRepository.save(basket);
    }

}

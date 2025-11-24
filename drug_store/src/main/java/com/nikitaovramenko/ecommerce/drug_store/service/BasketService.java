package com.nikitaovramenko.ecommerce.drug_store.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.model.Basket;
import com.nikitaovramenko.ecommerce.drug_store.model.BasketDrug;
import com.nikitaovramenko.ecommerce.drug_store.model.Drug;
import com.nikitaovramenko.ecommerce.drug_store.repository.BasketRepository;
import com.nikitaovramenko.ecommerce.drug_store.repository.BrandRepository;
import com.nikitaovramenko.ecommerce.drug_store.repository.DrugRepository;
import jakarta.transaction.Transactional;

@Service
public class BasketService {

    private final BrandRepository brandRepository;

    private final DrugRepository drugRepository;

    private final BasketRepository basketRepository;

    public BasketService(BasketRepository basketRepository, DrugRepository drugRepository,
            BrandRepository brandRepository) {
        this.basketRepository = basketRepository;
        this.drugRepository = drugRepository;
        this.brandRepository = brandRepository;
    }

    @Transactional
    public Basket createBasket(Basket basket) {
        return basketRepository.save(basket);
    }

    @Transactional
    public Basket updateBasket(Basket basket) {
        return basketRepository.save(basket);
    }

    @Transactional
    public void removeBasket(Long id) {
        if (brandRepository.existsById(id)) {
            basketRepository.deleteById(id);
        }
    }

    @Transactional
    public void addToBasket(Basket basket, Long drugId) {

        Drug drug = drugRepository.getReferenceById(drugId);
        BasketDrug exists = basket.getBasketDrugs().stream().filter(b -> b.getDrug().getId().equals(drugId))
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

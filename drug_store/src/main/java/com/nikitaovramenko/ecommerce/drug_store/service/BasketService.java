package com.nikitaovramenko.ecommerce.drug_store.service;

import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.model.Basket;
import com.nikitaovramenko.ecommerce.drug_store.model.BasketDrug;
import com.nikitaovramenko.ecommerce.drug_store.model.Drug;
import com.nikitaovramenko.ecommerce.drug_store.repository.BasketRepository;
import com.nikitaovramenko.ecommerce.drug_store.repository.DrugRepository;
import jakarta.transaction.Transactional;

@Service
public class BasketService {

    private final DrugRepository drugRepository;

    private final BasketRepository basketRepository;

    public BasketService(BasketRepository basketRepository, DrugRepository drugRepository) {
        this.basketRepository = basketRepository;
        this.drugRepository = drugRepository;
    }

    @Transactional
    public Basket createBasket(Basket basket) {
        basket.setTotalPrice(0);
        return basketRepository.save(basket);
    }

    @Transactional
    public Basket updateBasket(Basket basket) {

        return basketRepository.save(basket);
    }

    @Transactional
    public void removeBasket(Long id) {
        if (basketRepository.existsById(id)) {
            basketRepository.deleteById(id);
        }
    }

    @Transactional
    public void addToBasket(Long basketId, Long drugId) {
        Basket basket = findBasket(basketId);
        Drug drug = drugRepository.getReferenceById(drugId);
        BasketDrug exists = basket.getBasketDrugs().stream()
                .filter(b -> b.getDrug().getId().equals(drugId))
                .findFirst().orElse(null);

        if (exists != null) {
            exists.setQuantity(exists.getQuantity() + 1);
        } else {
            BasketDrug basketDrug = new BasketDrug();
            basketDrug.setBasket(basket);
            basketDrug.setDrug(drug);
            basketDrug.setQuantity(1);
            basket.getBasketDrugs().add(basketDrug);
        }

        recalculateTotalPrice(basket);
        basketRepository.save(basket);
    }

    @Transactional
    public void removeFromBasket(Basket basket, Long drugId) {
        basket.getBasketDrugs().removeIf(bd -> bd.getDrug().getId().equals(drugId));
        recalculateTotalPrice(basket);
        basketRepository.save(basket);
    }

    @Transactional
    public void updateQuantity(Basket basket, Long drugId, int quantity) {
        BasketDrug exists = basket.getBasketDrugs().stream()
                .filter(b -> b.getDrug().getId().equals(drugId))
                .findFirst().orElse(null);

        if (exists != null) {
            if (quantity <= 0) {
                basket.getBasketDrugs().remove(exists);
            } else {
                exists.setQuantity(quantity);
            }
            recalculateTotalPrice(basket);
            basketRepository.save(basket);
        }
    }

    @Transactional
    public void clearBasket(Basket basket) {
        basket.getBasketDrugs().clear();
        basket.setTotalPrice(0);
        basketRepository.save(basket);
    }

    private void recalculateTotalPrice(Basket basket) {
        double sum = basket.getBasketDrugs().stream()
                .mapToDouble(bd -> bd.getDrug().getPrice() * bd.getQuantity())
                .sum();
        basket.setTotalPrice(sum);
    }

    @Transactional
    public Basket findBasket(Long id) {
        return basketRepository.findById(id).orElseThrow(() -> new RuntimeException("Basket not found"));
    }

}

package com.nikitaovramenko.ecommerce.drug_store.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nikitaovramenko.ecommerce.drug_store.dto.BasketDto;
import com.nikitaovramenko.ecommerce.drug_store.model.Basket;
import com.nikitaovramenko.ecommerce.drug_store.model.Drug;
import com.nikitaovramenko.ecommerce.drug_store.service.BasketService;
import com.nikitaovramenko.ecommerce.drug_store.service.DrugService;

@RestController
@RequestMapping("/api")
public class BasketController {

    private final BasketService basketService;
    private final DrugService drugService;

    public BasketController(BasketService basketService, DrugService drugService) {
        this.basketService = basketService;
        this.drugService = drugService;

    }

    @PostMapping("/basket/add")
    public ResponseEntity<String> addToBasket(@RequestBody BasketDto basketDto) {

        Basket basket = basketService.findBasket(basketDto.getBasketId());
        Drug drug = drugService.findDrug(basketDto.getDrugId());
        basketService.addToBasket(basket, drug);

        return ResponseEntity.ok("Drug Added !");

    }

}

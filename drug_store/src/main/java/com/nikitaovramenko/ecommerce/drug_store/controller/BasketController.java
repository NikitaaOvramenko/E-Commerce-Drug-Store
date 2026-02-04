package com.nikitaovramenko.ecommerce.drug_store.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nikitaovramenko.ecommerce.drug_store.dto.BasketDto;
import com.nikitaovramenko.ecommerce.drug_store.dto.BasketDrugDto;
import com.nikitaovramenko.ecommerce.drug_store.dto.DrugDto;
import com.nikitaovramenko.ecommerce.drug_store.mapper.BasketDrugMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.Basket;
import com.nikitaovramenko.ecommerce.drug_store.model.Drug;
import com.nikitaovramenko.ecommerce.drug_store.service.BasketService;
import com.nikitaovramenko.ecommerce.drug_store.service.DrugService;

@RestController
@RequestMapping("/api/basket")
public class BasketController {

    private final BasketService basketService;
    private final DrugService drugService;
    private final BasketDrugMapper basketDrugMapper;

    public BasketController(BasketService basketService, DrugService drugService, BasketDrugMapper basketDrugMapper) {
        this.basketService = basketService;
        this.drugService = drugService;
        this.basketDrugMapper = basketDrugMapper;
    }

    @GetMapping("/{basketId}")
    public ResponseEntity<List<BasketDrugDto>> getBasket(@PathVariable Long basketId) {
        Basket basket = basketService.findBasket(basketId);
        List<BasketDrugDto> items = basket.getBasketDrugs().stream()
                .map(basketDrugMapper::toDto)
                .toList();
        return ResponseEntity.ok(items);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToBasket(@RequestBody BasketDto basketDto) {
        Basket basket = basketService.findBasket(basketDto.getBasketId());
        DrugDto drug = drugService.findDrug(basketDto.getDrugId());
        basketService.addToBasket(basket, drug.getId());
        return ResponseEntity.ok("Drug Added !");
    }

    @DeleteMapping("/{basketId}/item/{drugId}")
    public ResponseEntity<String> removeFromBasket(@PathVariable Long basketId, @PathVariable Long drugId) {
        Basket basket = basketService.findBasket(basketId);
        basketService.removeFromBasket(basket, drugId);
        return ResponseEntity.ok("Drug Removed !");
    }

    @PutMapping("/{basketId}/item/{drugId}")
    public ResponseEntity<String> updateQuantity(
            @PathVariable Long basketId,
            @PathVariable Long drugId,
            @RequestBody UpdateQuantityRequest request) {
        Basket basket = basketService.findBasket(basketId);
        basketService.updateQuantity(basket, drugId, request.getQuantity());
        return ResponseEntity.ok("Quantity Updated !");
    }

    @DeleteMapping("/{basketId}/clear")
    public ResponseEntity<String> clearBasket(@PathVariable Long basketId) {
        Basket basket = basketService.findBasket(basketId);
        basketService.clearBasket(basket);
        return ResponseEntity.ok("Basket Cleared !");
    }

    // Inner class for update quantity request
    public static class UpdateQuantityRequest {
        private int quantity;

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }
}

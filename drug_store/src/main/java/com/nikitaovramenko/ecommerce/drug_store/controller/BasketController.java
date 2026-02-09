package com.nikitaovramenko.ecommerce.drug_store.controller;

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
import com.nikitaovramenko.ecommerce.drug_store.mapper.BasketMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.Basket;
import com.nikitaovramenko.ecommerce.drug_store.service.BasketService;

@RestController
@RequestMapping("/api/basket")
public class BasketController {

    private final BasketService basketService;
    private final BasketMapper basketMapper;

    public BasketController(BasketService basketService, BasketMapper basketMapper) {
        this.basketService = basketService;
        this.basketMapper = basketMapper;
    }

    @GetMapping("/{basketId}")
    public ResponseEntity<BasketDto> getBasket(@PathVariable Long basketId) {
        Basket basket = basketService.findBasket(basketId);
        return ResponseEntity.ok(basketMapper.toDto(basket));
    }

    @PostMapping("/add")
    public ResponseEntity<BasketDto> addToBasket(@RequestBody BasketDto basketDto) {
        basketService.addToBasket(basketDto.getBasketId(), basketDto.getDrugId());
        Basket basket = basketService.findBasket(basketDto.getBasketId());
        return ResponseEntity.ok(basketMapper.toDto(basket));
    }

    @DeleteMapping("/{basketId}/item/{drugId}")
    public ResponseEntity<BasketDto> removeFromBasket(@PathVariable Long basketId, @PathVariable Long drugId) {
        Basket basket = basketService.findBasket(basketId);
        basketService.removeFromBasket(basket, drugId);
        return ResponseEntity.ok(basketMapper.toDto(basketService.findBasket(basketId)));
    }

    @PutMapping("/{basketId}/item/{drugId}")
    public ResponseEntity<BasketDto> updateQuantity(
            @PathVariable Long basketId,
            @PathVariable Long drugId,
            @RequestBody UpdateQuantityRequest request) {
        Basket basket = basketService.findBasket(basketId);
        basketService.updateQuantity(basket, drugId, request.getQuantity());
        return ResponseEntity.ok(basketMapper.toDto(basketService.findBasket(basketId)));
    }

    @DeleteMapping("/{basketId}/clear")
    public ResponseEntity<BasketDto> clearBasket(@PathVariable Long basketId) {
        Basket basket = basketService.findBasket(basketId);
        basketService.clearBasket(basket);
        return ResponseEntity.ok(basketMapper.toDto(basketService.findBasket(basketId)));
    }

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

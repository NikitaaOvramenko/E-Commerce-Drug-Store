package com.nikitaovramenko.ecommerce.drug_store.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nikitaovramenko.ecommerce.drug_store.dto.RatingDto;
import com.nikitaovramenko.ecommerce.drug_store.service.RatingService;

@RestController
@RequestMapping("/api")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("/rate")
    public ResponseEntity<String> addRating(@RequestBody RatingDto ratingDto) {
        ratingService.addRating(ratingDto);

        return ResponseEntity.ok("User with Id: " + ratingDto.getUserId() + " Rated Drug with Id: "
                + ratingDto.getDrugId() + " With rate of: " + ratingDto.getRate());

    }

}

package com.nikitaovramenko.ecommerce.drug_store.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nikitaovramenko.ecommerce.drug_store.service.TgServerApiService;

import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api")
public class TgServerApiController {
    private final TgServerApiService serverApiService;

    public TgServerApiController(TgServerApiService serverApiService) {
        this.serverApiService = serverApiService;
    }

    // @PostMapping("/send/invoice")
    // public ResponseEntity<OrderDto> postMethodName(@RequestBody OrderDto
    // orderDto) {

    // return entity;
    // }

}

package com.nikitaovramenko.ecommerce.drug_store.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;

import com.nikitaovramenko.ecommerce.drug_store.dto.BrandDto;
import com.nikitaovramenko.ecommerce.drug_store.mapper.BrandMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.Brand;
import com.nikitaovramenko.ecommerce.drug_store.service.BrandService;

import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BrandController {

    private final BrandService brandService;
    private final BrandMapper brandMapper;

    public BrandController(BrandService brandService, BrandMapper brandMapper) {
        this.brandService = brandService;
        this.brandMapper = brandMapper;
    }

    @PostMapping("/brand/create")
    public ResponseEntity<BrandDto> createBrand(@RequestBody BrandDto brandDto) {
        BrandDto brand = brandService.createBrand(brandDto);
        return ResponseEntity.ok(brand);
    }

    @DeleteMapping("/brand/{id}")
    public ResponseEntity<String> removeBrand(@PathVariable Long id) {
        brandService.deleteBrand(id);
        return ResponseEntity.ok("Brand with Id: " + id + " is Deleted !");
    }

    @GetMapping("/brand/{id}")
    public BrandDto findById(@PathVariable Long id) {
        return brandService.findBrand(id);
    }

    @GetMapping("/brand")
    public List<BrandDto> findAll() {
        return brandService.findAllBrands();
    }

    @PutMapping("/brand/{id}")
    public ResponseEntity<BrandDto> updateBrand(@PathVariable Long id, @RequestBody BrandDto dto) {
        BrandDto updated = brandService.updateBrand(id, dto);
        return ResponseEntity.ok(updated);
    }

}

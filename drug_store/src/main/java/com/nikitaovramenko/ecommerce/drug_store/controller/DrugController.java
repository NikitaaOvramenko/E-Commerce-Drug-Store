package com.nikitaovramenko.ecommerce.drug_store.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nikitaovramenko.ecommerce.drug_store.dto.DrugDto;
import com.nikitaovramenko.ecommerce.drug_store.mapper.DrugMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.Brand;
import com.nikitaovramenko.ecommerce.drug_store.model.Drug;
import com.nikitaovramenko.ecommerce.drug_store.model.Type;
import com.nikitaovramenko.ecommerce.drug_store.service.BrandService;
import com.nikitaovramenko.ecommerce.drug_store.service.DrugService;
import com.nikitaovramenko.ecommerce.drug_store.service.TypeService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.net.http.HttpClient;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api")
public class DrugController {

    private final DrugService drugService;
    private final TypeService typeService;
    private final BrandService brandService;
    private final DrugMapper drugMapper;

    public DrugController(DrugService drugService, TypeService typeService, BrandService brandService,
            DrugMapper drugMapper) {
        this.drugService = drugService;
        this.typeService = typeService;
        this.brandService = brandService;
        this.drugMapper = drugMapper;
    }

    @PostMapping("/drug/create")
    public ResponseEntity<DrugDto> createDrug(@RequestBody DrugDto dto) {
        Drug drug = drugService.createDrug(dto);
        return ResponseEntity.ok(drugMapper.toDto(drug));
    }

    @DeleteMapping("/drug/{id}")
    public ResponseEntity<String> removeDrug(@PathVariable Long id) {
        drugService.deleteDrug(id);
        return ResponseEntity.ok("Drug with Id: " + id + " is Deleted !");
    }

    @GetMapping("/drug/{id}")
    public Drug findById(@PathVariable Long id) {
        return drugService.findDrug(id);
    }

    @GetMapping("/drug/type/{id}")
    public List<Drug> findAllByTypeId(@PathVariable Long id) {
        Type type = typeService.findType(id);
        return drugService.findDrugsByType(type);
    }

    @GetMapping("/drug/brand/{id}")
    public List<Drug> findAllByBrandId(@PathVariable Long id) {
        Brand brand = brandService.findBrand(id);
        return drugService.findDrugsByBrand(brand);
    }

    @GetMapping("/search")
    public List<Drug> findAllByTypeAndBrand(@RequestParam Long typeId, @RequestParam Long brandId) throws Exception {

        Type type = typeService.findType(typeId);

        if (type == null) {
            throw new Exception("type not found");
        }

        Brand brand = brandService.findBrand(brandId);

        if (brand == null) {
            throw new Exception("brand not found");
        }

        return drugService.findDrugsByTypeAndBrand(type, brand);

    }

}

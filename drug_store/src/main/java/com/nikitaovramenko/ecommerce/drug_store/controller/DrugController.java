package com.nikitaovramenko.ecommerce.drug_store.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nikitaovramenko.ecommerce.drug_store.dto.BrandDto;
import com.nikitaovramenko.ecommerce.drug_store.dto.DrugDto;
import com.nikitaovramenko.ecommerce.drug_store.dto.TypeDto;
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

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api")
public class DrugController {

    private final DrugService drugService;
    private final TypeService typeService;
    private final BrandService brandService;

    public DrugController(DrugService drugService, TypeService typeService, BrandService brandService) {
        this.drugService = drugService;
        this.typeService = typeService;
        this.brandService = brandService;
    }

    @PostMapping("/drug/create")
    public ResponseEntity<DrugDto> createDrug(@RequestBody DrugDto dto) {
        DrugDto drug = drugService.createDrug(dto);
        return ResponseEntity.ok(drug);
    }

    @DeleteMapping("/drug/{id}")
    public ResponseEntity<String> removeDrug(@PathVariable Long id) {
        drugService.deleteDrug(id);
        return ResponseEntity.ok("Drug with Id: " + id + " is Deleted !");
    }

    @GetMapping("/drug/{id}")
    public ResponseEntity<DrugDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(drugService.findDrug(id));
    }

    @PutMapping("/drug/{id}")
    public ResponseEntity<DrugDto> updateDrug(@PathVariable Long id, @RequestBody DrugDto dto) {
        DrugDto updated = drugService.updateDrug(id, dto);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/drug/type/{id}")
    public List<DrugDto> findAllByTypeId(@PathVariable Long id) {
        TypeDto type = typeService.findType(id);
        return drugService.findDrugsByType(type);
    }

    @GetMapping("/drug/brand/{id}")
    public List<DrugDto> findAllByBrandId(@PathVariable Long id) {
        BrandDto brand = brandService.findBrand(id);
        return drugService.findDrugsByBrand(brand);
    }

    @GetMapping("/search")
    public List<DrugDto> findAllByTypeAndBrand(@RequestParam Long typeId, @RequestParam Long brandId) throws Exception {

        TypeDto type = typeService.findType(typeId);

        if (type == null) {
            throw new Exception("type not found");
        }

        BrandDto brand = brandService.findBrand(brandId);

        if (brand == null) {
            throw new Exception("brand not found");
        }

        return drugService.findDrugsByTypeAndBrand(type, brand);

    }

    @GetMapping("/drug")
    public Page<Drug> getAllDrugs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") Boolean ascending) {

        Sort sort = ascending ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return drugService.findAll(pageable);
    }

}

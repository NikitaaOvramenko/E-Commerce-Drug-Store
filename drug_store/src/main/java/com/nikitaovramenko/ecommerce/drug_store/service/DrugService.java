package com.nikitaovramenko.ecommerce.drug_store.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.dto.DrugDto;
import com.nikitaovramenko.ecommerce.drug_store.mapper.DrugMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.Brand;
import com.nikitaovramenko.ecommerce.drug_store.model.Drug;
import com.nikitaovramenko.ecommerce.drug_store.model.Type;
import com.nikitaovramenko.ecommerce.drug_store.repository.DrugRepository;

@Service
public class DrugService {

    private final DrugRepository drugRepository;
    private final BrandService brandService;
    private final TypeService typeService;
    private final DrugMapper drugMapper;

    public DrugService(DrugRepository drugRepository, BrandService brandService, TypeService typeService,
            DrugMapper drugMapper) {
        this.drugRepository = drugRepository;
        this.brandService = brandService;
        this.typeService = typeService;
        this.drugMapper = drugMapper;
    }

    public Drug createDrug(DrugDto dto) {

        Type type = typeService.findType(dto.getTypeId());
        Brand brand = brandService.findBrand(dto.getBrandId());
        Drug drug = drugMapper.toDrug(dto, type, brand);
        Drug saved = drugRepository.save(drug);

        return saved;
    }

    public void deleteDrug(Long id) {
        drugRepository.deleteById(id);
    }

    public Drug findDrug(Long id) {
        Drug found = drugRepository.getReferenceById(id);
        return found;
    }

    public List<Drug> findDrugsByType(Type type) {
        List<Drug> found = drugRepository.findByType(type);
        return found;
    }

    public List<Drug> findDrugsByBrand(Brand brand) {
        List<Drug> found = drugRepository.findByBrand(brand);
        return found;
    }

    public List<Drug> findDrugsByTypeAndBrand(Type type, Brand brand) {
        List<Drug> found = drugRepository.findByTypeAndBrand(type, brand);
        return found;
    }

}

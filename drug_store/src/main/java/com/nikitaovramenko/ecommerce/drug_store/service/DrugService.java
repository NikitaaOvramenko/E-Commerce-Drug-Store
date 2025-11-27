package com.nikitaovramenko.ecommerce.drug_store.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.dto.BrandDto;
import com.nikitaovramenko.ecommerce.drug_store.dto.DrugDto;
import com.nikitaovramenko.ecommerce.drug_store.dto.TypeDto;
import com.nikitaovramenko.ecommerce.drug_store.mapper.DrugMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.Brand;
import com.nikitaovramenko.ecommerce.drug_store.model.Drug;
import com.nikitaovramenko.ecommerce.drug_store.model.Rating;
import com.nikitaovramenko.ecommerce.drug_store.model.Type;
import com.nikitaovramenko.ecommerce.drug_store.repository.BrandRepository;
import com.nikitaovramenko.ecommerce.drug_store.repository.DrugRepository;
import com.nikitaovramenko.ecommerce.drug_store.repository.TypeRepository;

@Service
public class DrugService {

    private final DrugRepository drugRepository;
    private final TypeRepository typeRepository;
    private final BrandRepository brandRepository;
    private final DrugMapper drugMapper;
    private final RatingService ratingService;

    public DrugService(DrugRepository drugRepository, TypeRepository typeRepository, BrandRepository brandRepository,
            DrugMapper drugMapper, RatingService ratingService) {
        this.drugRepository = drugRepository;
        this.drugMapper = drugMapper;
        this.ratingService = ratingService;
        this.typeRepository = typeRepository;
        this.brandRepository = brandRepository;
    }

    public DrugDto createDrug(DrugDto dto) {

        List<Rating> ratings = new ArrayList<>();

        Type type = typeRepository.getReferenceById(dto.getTypeId());
        Brand brand = brandRepository.getReferenceById(dto.getBrandId());

        Drug drug = drugMapper.toDrug(dto);

        drug.setRatings(ratings);
        drug.setType(type);
        drug.setBrand(brand);

        Drug saved = drugRepository.save(drug);

        return drugMapper.toDto(saved);
    }

    public Page<Drug> findAll(Pageable pageable) {
        return drugRepository.findAll(pageable);
    }

    public Page<Drug> findAllByType(Type type, Pageable pageable) {
        return drugRepository.findAllByType(type, pageable);
    }

    public Page<Drug> findAllByBrand(Brand brand, Pageable pageable) {
        return drugRepository.findAllByBrand(brand, pageable);
    }

    public void deleteDrug(Long id) {
        drugRepository.deleteById(id);
    }

    public DrugDto findDrug(Long id) {
        Drug found = drugRepository.getReferenceById(id);
        return drugMapper.toDto(found);
    }

    public DrugDto updateDrug(Long id, DrugDto dto) {
        Drug existing = drugRepository.getReferenceById(id);
        return drugMapper.toDto(drugRepository.save(existing));
    }

    public List<DrugDto> findDrugsByType(TypeDto typeDto) {
        Type type = typeRepository.getReferenceById(typeDto.getId());
        List<DrugDto> found = drugRepository.findByType(type).stream().map(drugMapper::toDto).toList();
        return found;
    }

    public List<DrugDto> findDrugsByBrand(BrandDto brandDto) {
        Brand brand = brandRepository.getReferenceById(brandDto.getId());
        List<DrugDto> found = drugRepository.findByBrand(brand).stream().map(drugMapper::toDto).toList();
        ;
        return found;
    }

    public List<DrugDto> findDrugsByTypeAndBrand(TypeDto typeDto, BrandDto brandDto) {
        Type type = typeRepository.getReferenceById(typeDto.getId());
        Brand brand = brandRepository.getReferenceById(brandDto.getId());
        List<DrugDto> found = drugRepository.findByTypeAndBrand(type, brand).stream().map(drugMapper::toDto).toList();
        ;
        return found;
    }

}

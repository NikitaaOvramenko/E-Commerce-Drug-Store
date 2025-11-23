package com.nikitaovramenko.ecommerce.drug_store.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.dto.BrandDto;
import com.nikitaovramenko.ecommerce.drug_store.mapper.BrandMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.Brand;
import com.nikitaovramenko.ecommerce.drug_store.model.Type;
import com.nikitaovramenko.ecommerce.drug_store.repository.BrandRepository;
import com.nikitaovramenko.ecommerce.drug_store.repository.TypeRepository;

import jakarta.transaction.Transactional;

@Service
public class BrandService {

    private final BrandRepository brandRepository;
    private final BrandMapper brandMapper;
    private final TypeRepository typeRepository;

    public BrandService(BrandRepository brandRepository, BrandMapper brandMapper, TypeRepository typeRepository) {
        this.brandRepository = brandRepository;
        this.brandMapper = brandMapper;
        this.typeRepository = typeRepository;
    }

    @Transactional
    public BrandDto createBrand(BrandDto brandDto) {
        Brand brand = brandMapper.toBrand(brandDto);
        List<Long> typeIds = brandDto.getTypeIds();
        if (typeIds != null && !typeIds.isEmpty()) {
            List<Type> types = typeIds.stream().map(id -> typeRepository.getReferenceById(id))
                    .collect(Collectors.toList());
            brand.setTypes(types);
        }
        return brandMapper.toDto(brandRepository.save(brand));
    }

    @Transactional
    public void deleteBrand(Long id) {
        brandRepository.deleteById(id);
    }

    @Transactional
    public BrandDto updateBrand(Long id, BrandDto brandDto) {
        Brand existing = brandRepository.getReferenceById(id);
        if (brandDto.getName() != null) {
            existing.setName(brandDto.getName());
        }
        List<Long> typeIds = brandDto.getTypeIds();
        if (typeIds != null) {
            List<Type> types = typeIds.stream()
                    .map(tid -> typeRepository.getReferenceById(tid))
                    .collect(Collectors.toList());
            existing.setTypes(types);
        }
        return brandMapper.toDto(brandRepository.save(existing));
    }

    @Transactional
    public BrandDto findBrand(Long id) {
        return brandMapper.toDto(brandRepository.getReferenceById(id));
    }

    @Transactional
    public List<BrandDto> findAllBrands() {
        return brandRepository.findAll().stream().map(brandMapper::toDto).toList();
    }

}

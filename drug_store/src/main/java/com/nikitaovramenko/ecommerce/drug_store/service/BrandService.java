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

    public Brand createBrand(BrandDto brandDto) {
        Brand brand = brandMapper.toBrand(brandDto);
        List<Long> typeIds = brandDto.getTypeIds();
        if (typeIds != null && !typeIds.isEmpty()) {
            List<Type> types = typeIds.stream()
                    .map(id -> typeRepository.getReferenceById(id))
                    .collect(Collectors.toList());
            brand.setTypes(types);
        }
        return brandRepository.save(brand);
    }

    public void deleteBrand(Long id) {
        brandRepository.deleteById(id);
    }

    public Brand findBrand(Long id) {
        return brandRepository.getReferenceById(id);
    }

    public List<Brand> findAllBrands() {
        return brandRepository.findAll();
    }

}

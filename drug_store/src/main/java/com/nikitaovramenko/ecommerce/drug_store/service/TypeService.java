package com.nikitaovramenko.ecommerce.drug_store.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.dto.TypeDto;
import com.nikitaovramenko.ecommerce.drug_store.mapper.TypeMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.Type;
import com.nikitaovramenko.ecommerce.drug_store.model.Brand;
import com.nikitaovramenko.ecommerce.drug_store.repository.TypeRepository;
import com.nikitaovramenko.ecommerce.drug_store.repository.BrandRepository;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;

@Service
public class TypeService {

    private final TypeRepository typeRepository;
    private final TypeMapper typeMapper;
    private final BrandRepository brandRepository;

    public TypeService(TypeRepository typeRepository, TypeMapper typeMapper, BrandRepository brandRepository) {
        this.typeRepository = typeRepository;
        this.typeMapper = typeMapper;
        this.brandRepository = brandRepository;
    }

    @Transactional
    public Type createType(TypeDto typeDto) {
        Type type = typeMapper.toType(typeDto);
        List<Brand> brands = typeDto.getBrandIds().stream().map(id -> brandRepository.getReferenceById(id))
                .collect(Collectors.toList());
        type.setBrands(brands);
        return typeRepository.save(type);
    }

    @Transactional
    public void deleteType(Long id) {
        typeRepository.deleteById(id);
    }

    @Transactional
    public Type findType(Long id) {
        return typeRepository.getReferenceById(id);
    }

    @Transactional
    public List<Type> findAllTypes() {
        return typeRepository.findAll();
    }

}

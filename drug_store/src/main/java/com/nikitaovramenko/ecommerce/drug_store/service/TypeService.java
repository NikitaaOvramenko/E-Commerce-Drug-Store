package com.nikitaovramenko.ecommerce.drug_store.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.model.Type;
import com.nikitaovramenko.ecommerce.drug_store.repository.TypeRepository;

@Service
public class TypeService {

    private final TypeRepository typeRepository;

    public TypeService(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    public Type createType(Type type) {
        return typeRepository.save(type);
    }

    public void deleteType(Long id) {
        typeRepository.deleteById(id);
    }

    public Type findType(Long id) {
        return typeRepository.getReferenceById(id);
    }

    public List<Type> findAllTypes() {
        return typeRepository.findAll();
    }

}

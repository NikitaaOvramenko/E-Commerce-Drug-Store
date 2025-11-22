package com.nikitaovramenko.ecommerce.drug_store.service;

import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.dto.CategoryDto;
import com.nikitaovramenko.ecommerce.drug_store.model.Category;
import com.nikitaovramenko.ecommerce.drug_store.repository.CategoryRepository;

@Service
public class CategoryService {

    private CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);

    }

}

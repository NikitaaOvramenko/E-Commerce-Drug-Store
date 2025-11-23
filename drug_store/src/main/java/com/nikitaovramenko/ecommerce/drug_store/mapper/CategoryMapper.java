package com.nikitaovramenko.ecommerce.drug_store.mapper;

import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.dto.CategoryDto;
import com.nikitaovramenko.ecommerce.drug_store.model.Category;

@Component
public class CategoryMapper {
    private DrugMapper drugMapper;

    public CategoryMapper(DrugMapper drugMapper) {
        this.drugMapper = drugMapper;
    }

    public Category toCategory(CategoryDto categoryDto) {
        Category category = new Category();
        category.setId(categoryDto.id());
        category.setName(categoryDto.name());

        return category;

    }

    public CategoryDto toDto(Category category) {

        return new CategoryDto(
                category.getId(),
                category.getName(),
                category.getDrugs().stream()
                        .map(d -> d.getId())
                        .toList());
    }
}

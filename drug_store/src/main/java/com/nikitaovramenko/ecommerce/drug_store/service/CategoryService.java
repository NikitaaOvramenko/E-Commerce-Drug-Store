package com.nikitaovramenko.ecommerce.drug_store.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.dto.CategoryDto;
import com.nikitaovramenko.ecommerce.drug_store.mapper.CategoryMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.Category;
import com.nikitaovramenko.ecommerce.drug_store.repository.CategoryRepository;
import com.nikitaovramenko.ecommerce.drug_store.repository.DrugRepository;
import jakarta.transaction.Transactional;

@Service
public class CategoryService {

    private final DrugRepository drugRepository;

    private CategoryRepository categoryRepository;
    private CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper,
            DrugRepository drugRepository) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
        this.drugRepository = drugRepository;
    }

    @Transactional
    public CategoryDto createCategory(CategoryDto categoryDto) {

        Category category = categoryMapper.toCategory(categoryDto);
        category.setDrugs(categoryDto.drugsId().stream().map(id -> drugRepository.getReferenceById(id)).toList());
        categoryRepository.save(category);

        CategoryDto returnDto = categoryMapper.toDto(category);
        return returnDto;

    }

    @Transactional
    public CategoryDto updateCategory(CategoryDto categoryDto) {
        Category category = categoryMapper.toCategory(categoryDto);
        category.setDrugs(categoryDto.drugsId().stream().map(id -> drugRepository.getReferenceById(id)).toList());
        categoryRepository.save(category);
        CategoryDto returnDto = categoryMapper.toDto(category);
        return returnDto;
    }

    @Transactional
    public void deleteCategory(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
        }

    }

    @Transactional
    public CategoryDto findCategory(Long id) {
        return categoryMapper.toDto(categoryRepository.getReferenceById(id));
    }

    @Transactional
    public List<CategoryDto> findAllCategories() {
        return categoryRepository.findAll().stream().map(categoryMapper::toDto).toList();
    }

}

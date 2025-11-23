package com.nikitaovramenko.ecommerce.drug_store.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nikitaovramenko.ecommerce.drug_store.dto.CategoryDto;
import com.nikitaovramenko.ecommerce.drug_store.model.Category;
import com.nikitaovramenko.ecommerce.drug_store.service.CategoryService;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // CREATE
    @PostMapping("category/create")
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto dto) {
        CategoryDto created = categoryService.createCategory(dto);
        return ResponseEntity.ok(created);
    }

    // READ ALL
    @GetMapping("category/getAll")
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        return ResponseEntity.ok(categoryService.findAllCategories());
    }

    // READ ONE
    @GetMapping("category/{id}")
    public ResponseEntity<CategoryDto> getCategory(@PathVariable Long id) {
        CategoryDto category = categoryService.findCategory(id);
        return ResponseEntity.ok(category);
    }

    // UPDATE
    @PutMapping("category/{id}")
    public ResponseEntity<CategoryDto> updateCategory(@PathVariable Long id,
            @RequestBody CategoryDto dto) {
        CategoryDto updated = categoryService.updateCategory(dto);
        return ResponseEntity.ok(updated);
    }

    // DELETE
    @DeleteMapping("category/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("Category deleted successfully with id: " + id);
    }
}

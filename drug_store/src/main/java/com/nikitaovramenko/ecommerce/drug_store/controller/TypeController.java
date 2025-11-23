package com.nikitaovramenko.ecommerce.drug_store.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;

import com.nikitaovramenko.ecommerce.drug_store.dto.TypeDto;
import com.nikitaovramenko.ecommerce.drug_store.service.TypeService;

import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TypeController {

    private final TypeService typeService;

    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @PostMapping("/type/create")
    public ResponseEntity<TypeDto> createType(@RequestBody TypeDto typeDto) {
        TypeDto type = typeService.createType(typeDto);
        return ResponseEntity.ok(type);
    }

    @DeleteMapping("/type/{id}")
    public ResponseEntity<String> removeType(@PathVariable Long id) {
        typeService.deleteType(id);
        return ResponseEntity.ok("Type with Id: " + id + " is Deleted !");
    }

    @GetMapping("/type/{id}")
    public ResponseEntity<TypeDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(typeService.findType(id));
    }

    @GetMapping("/type")
    public ResponseEntity<List<TypeDto>> findAll() {
        return ResponseEntity.ok(typeService.findAllTypes());
    }

    @PutMapping("/type/{id}")
    public ResponseEntity<TypeDto> updateType(@PathVariable Long id, @RequestBody TypeDto dto) {
        TypeDto updated = typeService.updateType(id, dto);
        return ResponseEntity.ok(updated);
    }

}

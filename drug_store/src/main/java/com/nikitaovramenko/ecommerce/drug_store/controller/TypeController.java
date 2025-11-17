package com.nikitaovramenko.ecommerce.drug_store.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;

import com.nikitaovramenko.ecommerce.drug_store.dto.TypeDto;
import com.nikitaovramenko.ecommerce.drug_store.mapper.TypeMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.Type;
import com.nikitaovramenko.ecommerce.drug_store.service.TypeService;

import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TypeController {

    private final TypeService typeService;
    private final TypeMapper typeMapper;

    public TypeController(TypeService typeService, TypeMapper typeMapper) {
        this.typeService = typeService;
        this.typeMapper = typeMapper;
    }

    @PostMapping("/type/create")
    public ResponseEntity<TypeDto> createType(@RequestBody TypeDto typeDto) {
        Type type = typeService.createType(typeDto);
        return ResponseEntity.ok(typeMapper.toDtoWithNames(type));
    }

    @DeleteMapping("/type/{id}")
    public ResponseEntity<String> removeType(@PathVariable Long id) {
        typeService.deleteType(id);
        return ResponseEntity.ok("Type with Id: " + id + " is Deleted !");
    }

    @GetMapping("/type/{id}")
    public Type findById(@PathVariable Long id) {
        return typeService.findType(id);
    }

    @GetMapping("/type")
    public List<Type> findAll() {
        return typeService.findAllTypes();
    }

}

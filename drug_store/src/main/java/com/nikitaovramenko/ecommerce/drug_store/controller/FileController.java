package com.nikitaovramenko.ecommerce.drug_store.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nikitaovramenko.ecommerce.drug_store.dto.UrlResponse;
import com.nikitaovramenko.ecommerce.drug_store.service.FileService;

@RestController
@RequestMapping("/api")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/upload/{name}")
    public ResponseEntity<UrlResponse> upload(@PathVariable String name) {

        String url = fileService.createPresignedUrl(name, null);
        UrlResponse urlResponse = new UrlResponse(url);

        return ResponseEntity.ok(urlResponse);
    }

}

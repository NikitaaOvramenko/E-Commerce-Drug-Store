package com.nikitaovramenko.ecommerce.drug_store.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nikitaovramenko.ecommerce.drug_store.dto.EmailVerifyDto;
import com.nikitaovramenko.ecommerce.drug_store.service.EmailVerificationService;
import com.nikitaovramenko.ecommerce.drug_store.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class EmailController {

    private final EmailVerificationService emailVerificationService;

    public EmailController(EmailVerificationService emailVerificationService) {
        this.emailVerificationService = emailVerificationService;
    }

    @PostMapping("/send_verify")
    public ResponseEntity<String> postMethodName(@RequestBody EmailVerifyDto emailVerifyDto) {
        emailVerificationService.sendVerify(emailVerifyDto);
        return ResponseEntity.ok("Verification email sent to: " + emailVerifyDto.to());
    }

    @GetMapping("/verify/{uuid}")
    public ResponseEntity<String> verifyEmail(@PathVariable String uuid) {
        Boolean verified = emailVerificationService.verify(uuid);

        if (verified) {
            return ResponseEntity.ok("Email with UUID: " + uuid + " is verified !");
        }

        return ResponseEntity.badRequest().build();

    }

}

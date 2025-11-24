package com.nikitaovramenko.ecommerce.drug_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nikitaovramenko.ecommerce.drug_store.model.EmailVerify;

public interface EmailVerifyRepository extends JpaRepository<EmailVerify, Long> {
    public EmailVerify findByUuid(String uuid);
}

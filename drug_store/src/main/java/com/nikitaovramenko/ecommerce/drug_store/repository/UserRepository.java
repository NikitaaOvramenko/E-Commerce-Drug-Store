package com.nikitaovramenko.ecommerce.drug_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nikitaovramenko.ecommerce.drug_store.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByTgUserId(int id);
}

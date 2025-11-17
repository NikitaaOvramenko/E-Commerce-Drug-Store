package com.nikitaovramenko.ecommerce.drug_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nikitaovramenko.ecommerce.drug_store.model.Type;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {

}

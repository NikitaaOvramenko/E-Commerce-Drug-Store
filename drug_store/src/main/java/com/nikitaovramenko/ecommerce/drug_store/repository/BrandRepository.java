package com.nikitaovramenko.ecommerce.drug_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nikitaovramenko.ecommerce.drug_store.model.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

}

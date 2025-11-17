package com.nikitaovramenko.ecommerce.drug_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nikitaovramenko.ecommerce.drug_store.model.DrugInfo;

public interface DrugInfoRepository extends JpaRepository<DrugInfo, Long> {

}

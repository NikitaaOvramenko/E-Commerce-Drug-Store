package com.nikitaovramenko.ecommerce.drug_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nikitaovramenko.ecommerce.drug_store.model.Brand;
import com.nikitaovramenko.ecommerce.drug_store.model.Drug;
import com.nikitaovramenko.ecommerce.drug_store.model.Type;

import java.util.List;
import java.util.Optional;

@Repository
public interface DrugRepository extends JpaRepository<Drug, Long> {

    public List<Drug> findByType(Type type);

    public List<Drug> findByBrand(Brand brand);

    public List<Drug> findByTypeAndBrand(Type type, Brand brand);
}

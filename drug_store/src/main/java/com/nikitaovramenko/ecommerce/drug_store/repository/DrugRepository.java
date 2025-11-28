package com.nikitaovramenko.ecommerce.drug_store.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nikitaovramenko.ecommerce.drug_store.model.Brand;
import com.nikitaovramenko.ecommerce.drug_store.model.Drug;
import com.nikitaovramenko.ecommerce.drug_store.model.Type;

import java.util.List;

@Repository
public interface DrugRepository extends JpaRepository<Drug, Long> {

    public List<Drug> findByType(Type type);

    public List<Drug> findByBrand(Brand brand);

    public List<Drug> findByTypeAndBrand(Type type, Brand brand);

    public Page<Drug> findAllByType(Type type, Pageable pageable);

    public Page<Drug> findAllByTypeAndBrand(Type type, Brand brand, Pageable pageable);

    public Page<Drug> findAllByBrand(Brand brand, Pageable pageable);
}

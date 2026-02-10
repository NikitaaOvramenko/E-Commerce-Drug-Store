package com.nikitaovramenko.ecommerce.drug_store.repository;

import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nikitaovramenko.ecommerce.drug_store.model.Order;
import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}

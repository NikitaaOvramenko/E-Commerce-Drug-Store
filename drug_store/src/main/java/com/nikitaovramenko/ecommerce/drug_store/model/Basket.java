package com.nikitaovramenko.ecommerce.drug_store.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Basket {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Long totalPrice;

    @OneToMany(mappedBy = "basket", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BasketDrug> basketDrugs = new ArrayList<>();

    public Basket() {
    }

    public Basket(Long id, User user, List<BasketDrug> basketDrugs, Long totalPrice) {
        this.id = id;
        this.user = user;
        this.basketDrugs = basketDrugs;
        this.totalPrice = totalPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<BasketDrug> getBasketDrugs() {
        return basketDrugs;
    }

    public void setBasketDrugs(List<BasketDrug> basketDrugs) {
        this.basketDrugs = basketDrugs;
    }

    public Long getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }

}

package com.nikitaovramenko.ecommerce.drug_store.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

@Entity
public class Drug {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Long price;
    private Integer stock;
    private String img;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private Type type;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @OneToMany(mappedBy = "drug")
    private List<BasketDrug> basketDrugs = new ArrayList<>();

    @OneToMany(mappedBy = "drug", cascade = CascadeType.ALL)
    private List<DrugInfo> drugInfos = new ArrayList<>();

    @OneToMany(mappedBy = "drug", cascade = CascadeType.ALL)
    private List<Rating> ratings = new ArrayList<>();

    @ManyToMany(mappedBy = "drugs")
    private List<Category> categories = new ArrayList<>();

    public Drug() {
    }

    public Drug(Long id, String name, Long price, Integer stock, String img, Type type, Brand brand) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.img = img;
        this.type = type;
        this.brand = brand;
    }

    public Drug(String name, Long price, Integer stock, String img, Type type, Brand brand) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.img = img;
        this.type = type;
        this.brand = brand;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public List<BasketDrug> getBasketDrugs() {
        return basketDrugs;
    }

    public void setBasketDrugs(List<BasketDrug> basketDrugs) {
        this.basketDrugs = basketDrugs;
    }

    public void addBasketDrug(BasketDrug bd) {
        basketDrugs.add(bd);
        bd.setDrug(this);
    }

    public void removeBasketDrug(BasketDrug bd) {
        basketDrugs.remove(bd);
        bd.setDrug(null);
    }

    public List<DrugInfo> getDrugInfos() {
        return drugInfos;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public void setDrugInfos(List<DrugInfo> drugInfos) {
        this.drugInfos = drugInfos;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

}

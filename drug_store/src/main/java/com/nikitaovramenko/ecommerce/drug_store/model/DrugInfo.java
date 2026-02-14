package com.nikitaovramenko.ecommerce.drug_store.model;

import com.nikitaovramenko.ecommerce.drug_store.enums.Lang;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity
public class DrugInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "drug_id")
    private Drug drug;

    private String sm_description;

    private String title;

    private String manufacturer;

    @Enumerated(EnumType.STRING)
    private Lang lang;

    @Column(columnDefinition = "TEXT")
    private String description_md;

    private String barcode;
    private String sku;
    private String dosageForm;
    private String volume;
    private String activeIngredient;
    private String strength;
    private String countryOfOrigin;
    private String storageConditions;
    private Integer ageRestriction;

    public DrugInfo() {
    }

    public DrugInfo(Long id, Drug drug, String title, String manufacturer, String description_md,
            String sm_description) {
        this.id = id;
        this.drug = drug;
        this.title = title;
        this.manufacturer = manufacturer;
        this.sm_description = sm_description;
        this.description_md = description_md;
    }

    public Long getId() {
        return id;
    }

    public String getSm_description() {
        return sm_description;
    }

    public void setSm_description(String sm_description) {
        this.sm_description = sm_description;
    }

    public Lang getLang() {
        return lang;
    }

    public void setLang(Lang lang) {
        this.lang = lang;
    }

    public String getDescription_md() {
        return description_md;
    }

    public void setDescription_md(String description_md) {
        this.description_md = description_md;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Drug getDrug() {
        return drug;
    }

    public void setDrug(Drug drug) {
        this.drug = drug;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getDosageForm() {
        return dosageForm;
    }

    public void setDosageForm(String dosageForm) {
        this.dosageForm = dosageForm;
    }

    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public String getActiveIngredient() {
        return activeIngredient;
    }

    public void setActiveIngredient(String activeIngredient) {
        this.activeIngredient = activeIngredient;
    }

    public String getStrength() {
        return strength;
    }

    public void setStrength(String strength) {
        this.strength = strength;
    }

    public String getCountryOfOrigin() {
        return countryOfOrigin;
    }

    public void setCountryOfOrigin(String countryOfOrigin) {
        this.countryOfOrigin = countryOfOrigin;
    }

    public String getStorageConditions() {
        return storageConditions;
    }

    public void setStorageConditions(String storageConditions) {
        this.storageConditions = storageConditions;
    }

    public Integer getAgeRestriction() {
        return ageRestriction;
    }

    public void setAgeRestriction(Integer ageRestriction) {
        this.ageRestriction = ageRestriction;
    }

}

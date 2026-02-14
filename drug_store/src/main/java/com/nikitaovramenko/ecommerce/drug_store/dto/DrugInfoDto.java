package com.nikitaovramenko.ecommerce.drug_store.dto;

public record DrugInfoDto(String manufacturer, String title, String lang, String description_md,
                String sm_description, String barcode, String sku, String dosageForm, String volume,
                String activeIngredient, String strength, String countryOfOrigin, String storageConditions,
                Integer ageRestriction) {

}

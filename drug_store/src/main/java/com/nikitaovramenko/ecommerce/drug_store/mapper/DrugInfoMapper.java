package com.nikitaovramenko.ecommerce.drug_store.mapper;

import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.dto.DrugInfoDto;
import com.nikitaovramenko.ecommerce.drug_store.enums.Lang;
import com.nikitaovramenko.ecommerce.drug_store.general.Mapper;
import com.nikitaovramenko.ecommerce.drug_store.model.DrugInfo;

@Component
public class DrugInfoMapper implements Mapper<DrugInfo, DrugInfoDto> {

    @Override
    public DrugInfoDto toDto(DrugInfo e) {
        return new DrugInfoDto(

                e.getManufacturer(),
                e.getTitle(),
                e.getLang() != null ? e.getLang().name() : null,
                e.getDescription_md(),
                e.getSm_description(),
                e.getBarcode(),
                e.getSku(),
                e.getDosageForm(),
                e.getVolume(),
                e.getActiveIngredient(),
                e.getStrength(),
                e.getCountryOfOrigin(),
                e.getStorageConditions(),
                e.getAgeRestriction());
    }

    @Override
    public DrugInfo toEntity(DrugInfoDto d) {
        DrugInfo info = new DrugInfo();
        info.setManufacturer(d.manufacturer());
        info.setTitle(d.title());
        info.setLang(d.lang() != null ? Lang.valueOf(d.lang()) : null);
        info.setDescription_md(d.description_md());
        info.setSm_description(d.sm_description());
        info.setBarcode(d.barcode());
        info.setSku(d.sku());
        info.setDosageForm(d.dosageForm());
        info.setVolume(d.volume());
        info.setActiveIngredient(d.activeIngredient());
        info.setStrength(d.strength());
        info.setCountryOfOrigin(d.countryOfOrigin());
        info.setStorageConditions(d.storageConditions());
        info.setAgeRestriction(d.ageRestriction());
        return info;
    }

}
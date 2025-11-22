package com.nikitaovramenko.ecommerce.drug_store.dto;

import java.util.List;

public record CategoryDto(
        Long id,
        String name,
        List<DrugDto> drugs) {

}

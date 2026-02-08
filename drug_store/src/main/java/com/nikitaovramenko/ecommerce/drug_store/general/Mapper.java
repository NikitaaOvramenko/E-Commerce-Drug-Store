package com.nikitaovramenko.ecommerce.drug_store.general;

public interface Mapper<E, D> {

    public D toDto(E e);

    public E toEntity(D d);

}

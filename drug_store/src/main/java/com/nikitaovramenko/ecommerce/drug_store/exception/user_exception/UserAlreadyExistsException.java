package com.nikitaovramenko.ecommerce.drug_store.exception.user_exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String message) {
        super(message);
    }

}

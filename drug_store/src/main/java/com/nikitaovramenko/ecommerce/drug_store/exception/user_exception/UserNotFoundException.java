package com.nikitaovramenko.ecommerce.drug_store.exception.user_exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}

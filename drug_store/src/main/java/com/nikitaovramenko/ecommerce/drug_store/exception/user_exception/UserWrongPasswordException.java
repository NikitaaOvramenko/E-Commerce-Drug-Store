package com.nikitaovramenko.ecommerce.drug_store.exception.user_exception;

public class UserWrongPasswordException extends RuntimeException {
    public UserWrongPasswordException(String message) {
        super(message);
    }
}

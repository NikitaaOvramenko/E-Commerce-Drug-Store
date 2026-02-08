package com.nikitaovramenko.ecommerce.drug_store.dto;

public class LoginRequest {
    private String email;
    private String password;
    private Long tgUserId;
    private Long tgChatId;
    private Boolean emailVerified;

    public LoginRequest() {
    }

    public Long getTgUserId() {
        return tgUserId;
    }

    public void setTgUserId(Long tgUserId) {
        this.tgUserId = tgUserId;
    }

    public Long getTgChatId() {
        return tgChatId;
    }

    public void setTgChatId(Long tgChatId) {
        this.tgChatId = tgChatId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

}

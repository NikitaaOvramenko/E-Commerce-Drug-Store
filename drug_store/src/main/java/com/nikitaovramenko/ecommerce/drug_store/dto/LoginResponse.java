package com.nikitaovramenko.ecommerce.drug_store.dto;

public class LoginResponse {
    private UserDto userDto;
    private String token;

    public LoginResponse(UserDto userDto, String token) {
        this.userDto = userDto;
        this.token = token;
    }

    public UserDto getUserDto() {
        return userDto;
    }

    public void setUserDto(UserDto userDto) {
        this.userDto = userDto;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}

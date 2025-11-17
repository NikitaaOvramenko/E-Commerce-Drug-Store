package com.nikitaovramenko.ecommerce.drug_store.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nikitaovramenko.ecommerce.drug_store.dto.LoginRequest;
import com.nikitaovramenko.ecommerce.drug_store.dto.UserDto;
import com.nikitaovramenko.ecommerce.drug_store.mapper.UserMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.User;
import com.nikitaovramenko.ecommerce.drug_store.service.AuthService;
import com.nikitaovramenko.ecommerce.drug_store.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;
    private final AuthService authService;
    private final UserMapper userMapper;

    public UserController(UserService userService, AuthService authService, UserMapper userMapper) {
        this.userService = userService;
        this.authService = authService;
        this.userMapper = userMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userMapper.toDto(userService.registerUser(user)));
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginRequest request) {

        Boolean check = authService.authentication(request.getEmail(), request.getPassword());

        if (check) {
            User user = userService.findUserByEmail(request.getEmail());
            UserDto userDto = userMapper.toDto(user);
            return ResponseEntity.ok(userDto);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}

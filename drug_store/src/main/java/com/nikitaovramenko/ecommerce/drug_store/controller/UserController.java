package com.nikitaovramenko.ecommerce.drug_store.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nikitaovramenko.ecommerce.drug_store.dto.LoginRequest;
import com.nikitaovramenko.ecommerce.drug_store.dto.LoginResponse;
import com.nikitaovramenko.ecommerce.drug_store.dto.UserDto;
import com.nikitaovramenko.ecommerce.drug_store.enums.Role;
import com.nikitaovramenko.ecommerce.drug_store.exception.user_exception.UserNotVerifiedException;
import com.nikitaovramenko.ecommerce.drug_store.mapper.UserMapper;
import com.nikitaovramenko.ecommerce.drug_store.model.User;
import com.nikitaovramenko.ecommerce.drug_store.service.AuthService;
import com.nikitaovramenko.ecommerce.drug_store.service.JwtService;
import com.nikitaovramenko.ecommerce.drug_store.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;
    private final AuthService authService;
    private final UserMapper userMapper;
    private final JwtService jwtService;

    public UserController(UserService userService, AuthService authService, UserMapper userMapper,
            JwtService jwtService) {
        this.userService = userService;
        this.authService = authService;
        this.userMapper = userMapper;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody User user) {
        return ResponseEntity.ok(userMapper.toDto(userService.registerUser(user)));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        Boolean check = authService.authentication(request.getEmail(), request.getPassword());

        if (check) {
            User user = userService.findUserByEmail(request.getEmail());

            if (!user.getEmailVerified()) {
                throw new UserNotVerifiedException("Email is not verified !");
            }

            user.setTgChatId(request.getTgChatId());
            user.setTgUserId(request.getTgUserId());

            UserDto userDto = userMapper.toDto(user);

            Map<String, Object> map = new HashMap<>();

            map.put("role", user.getRole().toString());

            String token = jwtService.generateToken(user.getEmail(), map);
            LoginResponse loginResponse = new LoginResponse(userDto, token);
            return ResponseEntity.ok(loginResponse);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}

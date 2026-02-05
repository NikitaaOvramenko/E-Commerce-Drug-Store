package com.nikitaovramenko.ecommerce.drug_store.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.enums.Role;
import com.nikitaovramenko.ecommerce.drug_store.exception.user_exception.UserAlreadyExistsException;
import com.nikitaovramenko.ecommerce.drug_store.exception.user_exception.UserNotFoundException;
import com.nikitaovramenko.ecommerce.drug_store.model.Basket;
import com.nikitaovramenko.ecommerce.drug_store.model.User;
import com.nikitaovramenko.ecommerce.drug_store.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User findUserByEmail(String email) {

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserNotFoundException("User Not Found !");
        }
        return user;
    }

    @Transactional
    public User registerUser(User user) {

        User exist = userRepository.findByEmail(user.getEmail());

        if (exist != null) {
            throw new UserAlreadyExistsException("User with this email already exists !");
        }

        user.setEmailVerified(false);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }
        Basket basket = new Basket();
        user.setBasket(basket);
        basket.setUser(user);
        User saved = userRepository.save(user);
        return saved;
    }

    @Transactional
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = findUserByEmail(email);

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();

    }

}

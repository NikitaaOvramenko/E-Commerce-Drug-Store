package com.nikitaovramenko.ecommerce.drug_store.configuration;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.nikitaovramenko.ecommerce.drug_store.enums.Role;
import com.nikitaovramenko.ecommerce.drug_store.model.Basket;
import com.nikitaovramenko.ecommerce.drug_store.model.User;
import com.nikitaovramenko.ecommerce.drug_store.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Create admin user if not exists
        if (userRepository.findByEmail("admin@admin.com") == null) {
            User admin = new User();
            admin.setEmail("admin@admin.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setEmailVerified(true);

            Basket basket = new Basket();
            admin.setBasket(basket);
            basket.setUser(admin);

            userRepository.save(admin);
            System.out.println("Admin user created: admin@admin.com / admin123");
        }
    }
}

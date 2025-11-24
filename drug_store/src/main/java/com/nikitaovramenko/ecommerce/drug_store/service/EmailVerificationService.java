package com.nikitaovramenko.ecommerce.drug_store.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.nikitaovramenko.ecommerce.drug_store.dto.EmailVerifyDto;
import com.nikitaovramenko.ecommerce.drug_store.dto.UserDto;
import com.nikitaovramenko.ecommerce.drug_store.model.EmailVerify;
import com.nikitaovramenko.ecommerce.drug_store.model.User;
import com.nikitaovramenko.ecommerce.drug_store.repository.EmailVerifyRepository;
import com.nikitaovramenko.ecommerce.drug_store.repository.UserRepository;

@Service
public class EmailVerificationService {

    @Value("${spring.mail.username}")
    private String sender;

    private final JavaMailSender javaMailSender;
    private final EmailVerifyRepository emailVerifyRepository;
    private final UserRepository userRepository;

    public EmailVerificationService(JavaMailSender javaMailSender, EmailVerifyRepository emailVerifyRepository,
            UserRepository userRepository) {
        this.javaMailSender = javaMailSender;
        this.emailVerifyRepository = emailVerifyRepository;
        this.userRepository = userRepository;
    }

    public void sendVerify(EmailVerifyDto emailVerifyDto) {
        String uuid = UUID.randomUUID().toString();
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(sender);
        simpleMailMessage.setTo(emailVerifyDto.to());
        simpleMailMessage.setSubject("Email Verification");
        simpleMailMessage.setText("http://localhost:8080/api/verify/" + uuid);
        javaMailSender.send(simpleMailMessage);

        EmailVerify emailVerify = new EmailVerify();
        User user = userRepository.findByEmail(emailVerifyDto.to());

        emailVerify.setCreated_at(LocalDateTime.now());
        emailVerify.setExpired_at(emailVerify.getCreated_at().plusSeconds(60));
        emailVerify.setIs_expired(false);
        emailVerify.setUuid(uuid);
        emailVerify.setUser(user);
        user.getEmailVerifies().add(emailVerify);

        userRepository.save(user);
        emailVerifyRepository.save(emailVerify);

    }

    public Boolean verify(String uuid) {

        if (uuid == null) {
            return false;
        }

        EmailVerify emailVerify = emailVerifyRepository.findByUuid(uuid);

        if (emailVerify == null) {
            return false;
        }

        if (LocalDateTime.now().isBefore(emailVerify.getExpired_at())) {
            emailVerify.setIs_expired(false);
        } else {
            emailVerify.setIs_expired(true);
        }

        if (emailVerify.getIs_expired() == true) {
            emailVerifyRepository.delete(emailVerify);
            return false;
        }

        User user = emailVerify.getUser();

        user.setEmailVerified(true);

        userRepository.save(user);
        emailVerifyRepository.delete(emailVerify);
        return true;
    }

}

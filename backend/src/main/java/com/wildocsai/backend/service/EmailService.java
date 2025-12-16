package com.wildocsai.backend.service;

import com.wildocsai.backend.dto.VerificationResponse;
import com.wildocsai.backend.entity.UserEntity;
import com.wildocsai.backend.entity.VerificationEntity;
import com.wildocsai.backend.repository.UserRepository;
import com.wildocsai.backend.repository.VerificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmailService
{
    private final VerificationRepository verificationRepository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

    public void sendVerificationEmail(String toEmail, String token)
    {
        // TO DO: Once you have a frontend, replace verification link with email verification page
        String verificationLink = "http://localhost:8080/api/auth/verify?token=" + token;
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("Wildocs AI - Email Verification");
        message.setText("Please verify your email by clicking the link: " + verificationLink);

        mailSender.send(message);
    }

    public VerificationResponse verifyEmail(String token)
    {
        VerificationEntity verificationToken = verificationRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid verification token"));

        UserEntity user = verificationToken.getUser();

        if(user.isVerified())
        {
            throw new RuntimeException("Email already verified");
        }

        user.setVerified(true);
        verificationToken.setVerifiedAt(LocalDateTime.now());
        userRepository.save(user);
        verificationRepository.save(verificationToken);

        return new VerificationResponse("Email verification successful", user.getEmail(), verificationToken.getVerifiedAt());
    }
}

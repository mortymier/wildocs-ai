package com.wildocsai.backend.service;

import com.wildocsai.backend.dto.LoginRequest;
import com.wildocsai.backend.dto.LoginResponse;
import com.wildocsai.backend.dto.RegisterRequest;
import com.wildocsai.backend.dto.RegisterResponse;
import com.wildocsai.backend.entity.UserEntity;
import com.wildocsai.backend.entity.UserRole;
import com.wildocsai.backend.entity.VerificationEntity;
import com.wildocsai.backend.repository.UserRepository;
import com.wildocsai.backend.repository.VerificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService
{
    private final UserRepository userRepository;
    private final VerificationRepository verificationRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest request)
    {
        // Check if user exists
        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // Check if password matches
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword()))
        {
            throw new RuntimeException("Invalid credentials");
        }

        // Check if email is verified
        if(!user.isVerified())
        {
            throw new RuntimeException("Email is not yet verified. Please verify to login");
        }

        return new LoginResponse
        (user.getFirstName(), user.getLastName(), user.getEmail(), user.getIdNum(), user.getRole().name());
    }

    public RegisterResponse register(RegisterRequest request, UserRole role)
    {
        // Check if ID number is already used
        if(userRepository.existsByIdNum(request.getIdNum()))
        {
            throw new RuntimeException("ID number is already used");
        }

        // Check if email is already used
        if(userRepository.existsByEmail(request.getEmail()))
        {
            throw new RuntimeException("Email is already used");
        }

        // Map DTO to entity
        UserEntity user = new UserEntity();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setIdNum(request.getIdNum());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        // Save user in database
        userRepository.save(user);

        // Generate email verification token
        String token = UUID.randomUUID().toString();
        VerificationEntity verificationToken = new VerificationEntity();
        verificationToken.setToken(token);
        verificationToken.setUser(user);

        // Save verification token in database and send verification email
        verificationRepository.save(verificationToken);
        emailService.sendVerificationEmail(user.getEmail(), token);

        // Create custom message
        String message = "Registration successful for " + user.getRole() +": "
                + user.getFirstName() + " " + user.getLastName() + "!"
                + " Please verify your email: " + user.getEmail();

        return new RegisterResponse(message);
    }
}

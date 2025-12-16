package com.wildocsai.backend.controller;

import com.wildocsai.backend.dto.*;
import com.wildocsai.backend.entity.UserRole;
import com.wildocsai.backend.security.JwtUtil;
import com.wildocsai.backend.service.AuthService;
import com.wildocsai.backend.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController
{
    private final AuthService authService;
    private final EmailService emailService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request)
    {
        try
        {
            LoginResponse response = authService.login(request);

            // Generate JWT token
            String token = jwtUtil.generateToken(response.getEmail());

            // Create HttpOnly cookie
            ResponseCookie cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .secure(false)  // set to true in production with HTTPS
                    .path("/")
                    .maxAge(24 * 60 * 60)
                    .sameSite("Strict")
                    .build();

            return ResponseEntity.ok().header("Set-Cookie", cookie.toString()).body(response);
        }
        catch(RuntimeException e)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
    
    @PostMapping("/register/student")
    public ResponseEntity<?> registerStudent(@Valid @RequestBody RegisterRequest request)
    {
        try
        {
            RegisterResponse response = authService.register(request, UserRole.STUDENT);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        catch(RuntimeException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout()
    {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)  // set to true in production with HTTPS
                .path("/")
                .maxAge(0)  // immediately expire cookie
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok().header("Set-Cookie", cookie.toString()).body("Logged out successfully");
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String token)
    {
        try
        {
            VerificationResponse response = emailService.verifyEmail(token);
            return ResponseEntity.ok(response);
        }
        catch(RuntimeException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}

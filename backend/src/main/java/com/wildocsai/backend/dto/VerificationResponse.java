package com.wildocsai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class VerificationResponse
{
    private String message;
    private String email;
    private LocalDateTime verifiedAt;
}

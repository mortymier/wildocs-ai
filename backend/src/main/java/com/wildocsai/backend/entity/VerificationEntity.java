package com.wildocsai.backend.entity;

// This entity is for email verification tokens
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_vtokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerificationEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}

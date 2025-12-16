package com.wildocsai.backend.repository;

import com.wildocsai.backend.entity.VerificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface VerificationRepository extends JpaRepository<VerificationEntity, Long>
{
    Optional<VerificationEntity> findByToken(String token);
}

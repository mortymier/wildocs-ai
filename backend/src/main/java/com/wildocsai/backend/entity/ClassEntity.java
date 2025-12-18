package com.wildocsai.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_classes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String classCode;
    private String className;
    private String schoolYear;
    private String semester;
    private String section;

    @OneToOne
    @JoinColumn(name = "teacher_id")
    private UserEntity teacher;
}

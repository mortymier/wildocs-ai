package com.wildocsai.backend.service;

import com.wildocsai.backend.dto.CreateClassRequest;
import com.wildocsai.backend.entity.ClassEntity;
import com.wildocsai.backend.entity.UserEntity;
import com.wildocsai.backend.repository.ClassRepository;
import com.wildocsai.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassService
{
    private final ClassRepository classRepository;
    private final UserRepository userRepository;

    public ClassEntity createClass(CreateClassRequest request, String email)
    {
        ClassEntity newClass = new ClassEntity();
        newClass.setClassCode(request.getClassCode());
        newClass.setClassName(request.getClassName());
        newClass.setSchoolYear(request.getSchoolYear());
        newClass.setSemester(request.getSemester());
        newClass.setSection(request.getSection());

        UserEntity teacher = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User with email " + email + " does not exist"));

        newClass.setTeacher(teacher);

        return classRepository.save(newClass);
    }

    public List<ClassEntity> getClassesByEmail(String email)
    {
        UserEntity teacher = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User with email " + email + " does not exist"));

        return classRepository.findByTeacher(teacher);
    }
}

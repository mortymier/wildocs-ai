package com.wildocsai.backend.dto;

import lombok.Data;

@Data
public class CreateClassRequest
{
    private String classCode;
    private String className;
    private String schoolYear;
    private String semester;
    private String section;
}

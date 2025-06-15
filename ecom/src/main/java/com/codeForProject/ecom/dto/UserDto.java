package com.codeForProject.ecom.dto;

import com.codeForProject.ecom.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String email;
    private String name;
    private UserRole userRole;

}

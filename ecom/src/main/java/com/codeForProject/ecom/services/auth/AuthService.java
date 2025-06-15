package com.codeForProject.ecom.services.auth;

import com.codeForProject.ecom.dto.SignupRequest;
import com.codeForProject.ecom.dto.UserDto;

public interface AuthService {

    UserDto createUser(SignupRequest signupRequest);

    Boolean hasUserWithEmail(String email);

}

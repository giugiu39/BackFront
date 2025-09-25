package com.codeForProject.ecom.controller;

import com.codeForProject.ecom.dto.AuthenticationRequest;
import com.codeForProject.ecom.dto.SignupRequest;
import com.codeForProject.ecom.dto.UserDto;
import com.codeForProject.ecom.entity.User;
import com.codeForProject.ecom.repository.UserRepository;
import com.codeForProject.ecom.services.auth.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticatedPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsService;

    private final UserRepository userRepository;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    private final AuthService authService;

    @PostMapping("/authenticate")
    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws IOException, JSONException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        
        // Note: This endpoint is for local authentication, not Keycloak
        // For Keycloak authentication, tokens are handled by the OAuth2 resource server
        
        if (optionalUser.isPresent()) {
            response.getWriter().write(new JSONObject()
                    .put("userId", optionalUser.get().getId())
                    .put("role", optionalUser.get().getRole())
                    .toString());

            response.addHeader("Access-Control-Expose-Headers", "Authorization");
            response.addHeader("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, " +
                                "X-Requested-With, Content-Type, Accept, X-Custom-Header");
            // JWT generation removed - using Keycloak tokens instead
        }
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest) {
        if(authService.hasUserWithEmail(signupRequest.getEmail())) {
            return new ResponseEntity<>("Email already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto userDto = authService.createUser(signupRequest);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<String> info() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(principal == null) {
            return new ResponseEntity<>("Authentication failed", HttpStatus.UNAUTHORIZED);
        }

        // Tipo della classe del principal
        String principalType = principal.getClass().getName();

        // Contenuto da restituire nel body
        String body = "Principal info: " + principal.toString();

        // Header da aggiungere
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Principal-Type", principalType);

        return ResponseEntity.ok()
                .headers(headers)
                .body(body);
    }

}

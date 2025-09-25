package com.codeForProject.ecom.controller;

import com.codeForProject.ecom.entity.Order;
import com.codeForProject.ecom.entity.User;
import com.codeForProject.ecom.enums.OrderStatus;
import com.codeForProject.ecom.enums.UserRole;
import com.codeForProject.ecom.repository.OrderRepository;
import com.codeForProject.ecom.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        try {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            String keycloakId = jwt.getSubject();
            String email = jwt.getClaimAsString("email");
            String name = jwt.getClaimAsString("preferred_username");
            
            // Cerca l'utente nel database locale usando l'ID di Keycloak
            Optional<User> optionalUser = userRepository.findByKeycloakId(keycloakId);
            
            User user;
            if (optionalUser.isEmpty()) {
                // Crea un nuovo utente se non esiste
                user = new User();
                user.setKeycloakId(keycloakId);
                user.setEmail(email);
                user.setName(name != null ? name : email);
                
                // Determina il ruolo dall'JWT
                if (jwt.getClaimAsStringList("realm_access") != null) {
                    var realmAccess = jwt.getClaimAsMap("realm_access");
                    var roles = (java.util.List<String>) realmAccess.get("roles");
                    if (roles != null && roles.contains("admin")) {
                        user.setRole(UserRole.ADMIN);
                    } else {
                        user.setRole(UserRole.COSTUMER);
                    }
                } else {
                    user.setRole(UserRole.COSTUMER);
                }
                
                user = userRepository.save(user);
                
                // Crea un ordine pending per il nuovo utente customer
                if (user.getRole() == UserRole.COSTUMER) {
                    Order order = new Order();
                    order.setAmount(0L);
                    order.setTotalAmount(0L);
                    order.setDiscount(0L);
                    order.setUser(user);
                    order.setOrderStatus(OrderStatus.Pending);
                    orderRepository.save(order);
                }
            } else {
                user = optionalUser.get();
            }
            
            return ResponseEntity.ok(user);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving user profile: " + e.getMessage());
        }
    }
}
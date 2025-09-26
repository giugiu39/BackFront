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

import java.util.List;
import java.util.Map;
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
            System.out.println("Authentication object: " + authentication);
            System.out.println("Authentication class: " + (authentication != null ? authentication.getClass().getName() : "null"));
            
            if (authentication == null || authentication.getPrincipal() == null) {
                System.err.println("No authentication found");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Authentication required");
            }
            
            System.out.println("Principal class: " + authentication.getPrincipal().getClass().getName());
            
            Jwt jwt = (Jwt) authentication.getPrincipal();
            String keycloakId = jwt.getSubject();
            String email = jwt.getClaimAsString("email");
            String name = jwt.getClaimAsString("preferred_username");
            
            System.out.println("JWT Claims: " + jwt.getClaims());
            System.out.println("Keycloak ID: " + keycloakId);
            System.out.println("Email: " + email);
            System.out.println("Name: " + name);
            
            // Cerca l'utente nel database locale usando l'ID di Keycloak
            Optional<User> optionalUser = userRepository.findByKeycloakId(keycloakId);
            
            User user;
            if (optionalUser.isEmpty()) {
                System.out.println("Creating new user for Keycloak ID: " + keycloakId);
                // Crea un nuovo utente se non esiste
                user = new User();
                user.setKeycloakId(keycloakId);
                user.setEmail(email);
                user.setName(name != null ? name : email);
                
                // Determina il ruolo dall'JWT
                Map<String, Object> realmAccess = jwt.getClaimAsMap("realm_access");
                System.out.println("Realm access: " + realmAccess);
                
                if (realmAccess != null && realmAccess.containsKey("roles")) {
                    @SuppressWarnings("unchecked")
                    List<String> roles = (List<String>) realmAccess.get("roles");
                    System.out.println("User roles: " + roles);
                    if (roles != null && roles.contains("admin")) {
                        user.setRole(UserRole.ADMIN);
                    } else {
                        user.setRole(UserRole.COSTUMER);
                    }
                } else {
                    System.out.println("No realm_access found, setting default role");
                    user.setRole(UserRole.COSTUMER);
                }
                
                user = userRepository.save(user);
                System.out.println("User saved with ID: " + user.getId());
                
                // Crea un ordine pending per il nuovo utente customer
                if (user.getRole() == UserRole.COSTUMER) {
                    Order order = new Order();
                    order.setAmount(0L);
                    order.setTotalAmount(0L);
                    order.setDiscount(0L);
                    order.setUser(user);
                    order.setOrderStatus(OrderStatus.Pending);
                    orderRepository.save(order);
                    System.out.println("Created pending order for new customer");
                }
            } else {
                user = optionalUser.get();
                System.out.println("Found existing user with ID: " + user.getId());
                
                // Aggiorna il ruolo anche per utenti esistenti basandosi sul JWT corrente
                Map<String, Object> realmAccess = jwt.getClaimAsMap("realm_access");
                System.out.println("Updating role for existing user. Realm access: " + realmAccess);
                
                if (realmAccess != null && realmAccess.containsKey("roles")) {
                    @SuppressWarnings("unchecked")
                    List<String> roles = (List<String>) realmAccess.get("roles");
                    System.out.println("Current user roles from JWT: " + roles);
                    
                    UserRole newRole;
                    if (roles != null && roles.contains("admin")) {
                        newRole = UserRole.ADMIN;
                    } else {
                        newRole = UserRole.COSTUMER;
                    }
                    
                    if (user.getRole() != newRole) {
                        System.out.println("Updating user role from " + user.getRole() + " to " + newRole);
                        user.setRole(newRole);
                        user = userRepository.save(user);
                    } else {
                        System.out.println("User role is already correct: " + user.getRole());
                    }
                }
            }
            
            return ResponseEntity.ok(user);
            
        } catch (ClassCastException e) {
            System.err.println("ClassCastException: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid authentication token format: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Exception in getUserProfile: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving user profile: " + e.getMessage());
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody Map<String, Object> profileData, Authentication authentication) {
        try {
            if (authentication == null || authentication.getPrincipal() == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Authentication required");
            }
            
            Jwt jwt = (Jwt) authentication.getPrincipal();
            String keycloakId = jwt.getSubject();
            
            Optional<User> optionalUser = userRepository.findByKeycloakId(keycloakId);
            
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found");
            }
            
            User user = optionalUser.get();
            
            // Aggiorna i campi del profilo
            if (profileData.containsKey("name")) {
                user.setName((String) profileData.get("name"));
            }
            if (profileData.containsKey("email")) {
                user.setEmail((String) profileData.get("email"));
            }
            if (profileData.containsKey("img")) {
                user.setImg((String) profileData.get("img"));
            }
            
            user = userRepository.save(user);
            
            return ResponseEntity.ok(user);
            
        } catch (Exception e) {
            System.err.println("Exception in updateUserProfile: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating user profile: " + e.getMessage());
        }
    }
}
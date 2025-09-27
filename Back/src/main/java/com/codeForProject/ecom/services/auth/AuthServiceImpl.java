package com.codeForProject.ecom.services.auth;

import com.codeForProject.ecom.dto.SignupRequest;
import com.codeForProject.ecom.dto.UserDto;
import com.codeForProject.ecom.entity.Order;
import com.codeForProject.ecom.entity.User;
import com.codeForProject.ecom.enums.OrderStatus;
import com.codeForProject.ecom.enums.UserRole;
import com.codeForProject.ecom.repository.OrderRepository;
import com.codeForProject.ecom.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private OrderRepository orderRepository;

    public UserDto createUser(SignupRequest signupRequest) {
        User user = new User();

        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(signupRequest.getPassword()));
        user.setRole(UserRole.COSTUMER);
        User createdUser = userRepository.save(user);

        Order order = new Order();
        order.setAmount(0L);
        order.setTotalAmount(0L);
        order.setDiscount(0L);
        order.setUser(createdUser);
        order.setOrderStatus(OrderStatus.Pending);
        orderRepository.save(order);

        UserDto userDto = new UserDto();
        userDto.setId((long) createdUser.getId());

        return userDto;
    }

    public Boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    @PostConstruct
    public void createAdminAccount() {
        try {
            Optional<User> adminAccountOpt = userRepository.findByRole(UserRole.ADMIN);
            if (adminAccountOpt.isEmpty()) {
                User user = new User();
                user.setEmail("admin@test.com");
                user.setName("admin");
                user.setRole(UserRole.ADMIN);
                user.setPassword(bCryptPasswordEncoder.encode("admin"));
                userRepository.save(user);
                System.out.println("Admin account created successfully");
            } else {
                System.out.println("Admin account already exists");
            }
        } catch (Exception e) {
            System.err.println("Error creating admin account: " + e.getMessage());
            // Non lanciare l'eccezione per permettere l'avvio dell'applicazione
        }
    }

}

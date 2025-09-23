package com.codeForProject.ecom.repository;

import com.codeForProject.ecom.entity.User;
import com.codeForProject.ecom.enums.UserRole;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findFirstByEmail(String email);

    User findByRole(UserRole userRole);

}

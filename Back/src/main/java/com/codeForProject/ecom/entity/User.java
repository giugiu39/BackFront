package com.codeForProject.ecom.entity;

import com.codeForProject.ecom.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String keycloakId;

    private String email;

    private String password;

    private String name;

    // New profile fields
    private String firstName;

    private String lastName;

    @Column(name = "username")
    private String username;

    private String phone;

    @Embedded
    private Address address;

    private UserRole role;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] image;

    private String img; // URL dell'immagine del profilo

}

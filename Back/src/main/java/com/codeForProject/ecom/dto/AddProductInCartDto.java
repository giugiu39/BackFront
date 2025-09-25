package com.codeForProject.ecom.dto;

import lombok.Data;

@Data
public class AddProductInCartDto {

    private String userId; // Cambiato da Long a String per keycloakId

    private Long productId;
}

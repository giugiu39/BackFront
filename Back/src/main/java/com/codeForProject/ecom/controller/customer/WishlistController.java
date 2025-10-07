package com.codeForProject.ecom.controller.customer;

import com.codeForProject.ecom.dto.WishlistDto;
import com.codeForProject.ecom.services.customer.wishlist.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class WishlistController {

    private final WishlistService wishlistService;

    @PostMapping("/wishlist")
    public ResponseEntity<?> addProductToWishlist(@RequestBody WishlistDto wishlistDto, Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String keycloakId = jwt.getSubject();
        wishlistDto.setUserId(keycloakId);
        
        System.out.println("Adding product to wishlist - keycloakId: " + keycloakId + ", productId: " + wishlistDto.getProductId());
        
        WishlistDto postedWishlistDto = wishlistService.addProductToWishlist(wishlistDto);
        if (postedWishlistDto == null) {
            System.out.println("Failed to add product to wishlist");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong.");
        }
        System.out.println("Successfully added product to wishlist with ID: " + postedWishlistDto.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(postedWishlistDto);
    }

    @GetMapping("/wishlist")
    public ResponseEntity<List<WishlistDto>> getWishlistByUserId(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String keycloakId = jwt.getSubject();
        System.out.println("Getting wishlist for user with keycloakId: " + keycloakId);
        List<WishlistDto> wishlist = wishlistService.getWishlistByUserId(keycloakId);
        System.out.println("Wishlist size: " + wishlist.size());
        return ResponseEntity.ok(wishlist);
    }

}

package com.codeForProject.ecom.services.customer.wishlist;

import com.codeForProject.ecom.dto.WishlistDto;
import com.codeForProject.ecom.entity.Product;
import com.codeForProject.ecom.entity.User;
import com.codeForProject.ecom.entity.Wishlist;
import com.codeForProject.ecom.repository.ProductRepository;
import com.codeForProject.ecom.repository.UserRepository;
import com.codeForProject.ecom.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final WishlistRepository wishlistRepository;

    public WishlistDto addProductToWishlist(WishlistDto wishlistDto) {
        System.out.println("WishlistService: Adding product - productId: " + wishlistDto.getProductId() + ", userId: " + wishlistDto.getUserId());
        Optional<Product> optionalProduct = productRepository.findById(wishlistDto.getProductId());
        Optional<User> optionalUser = userRepository.findByKeycloakId(wishlistDto.getUserId());

        if (optionalProduct.isPresent() && optionalUser.isPresent()) {
            System.out.println("WishlistService: Both product and user found, creating wishlist entry");
            Wishlist wishlist = new Wishlist();
            wishlist.setProduct(optionalProduct.get());
            wishlist.setUser(optionalUser.get());

            Wishlist savedWishlist = wishlistRepository.save(wishlist);
            System.out.println("WishlistService: Wishlist saved with ID: " + savedWishlist.getId());
            return savedWishlist.getWishlistDto();
        }
        System.out.println("WishlistService: Product or user not found - product present: " + optionalProduct.isPresent() + ", user present: " + optionalUser.isPresent());
        return null;
    }

    public List<WishlistDto> getWishlistByUserId(String keycloakId) {
        System.out.println("WishlistService: Looking for user with keycloakId: " + keycloakId);
        Optional<User> optionalUser = userRepository.findByKeycloakId(keycloakId);
        if (optionalUser.isEmpty()) {
            System.out.println("WishlistService: User not found with keycloakId: " + keycloakId);
            return List.of();
        }
        User user = optionalUser.get();
        System.out.println("WishlistService: Found user with ID: " + user.getId());
        
        List<Wishlist> wishlists = wishlistRepository.findAllByUserId((long) user.getId());
        System.out.println("WishlistService: Found " + wishlists.size() + " wishlist items");
        
        return wishlists.stream()
                .map(Wishlist::getWishlistDto).collect(Collectors.toList());
    }

}

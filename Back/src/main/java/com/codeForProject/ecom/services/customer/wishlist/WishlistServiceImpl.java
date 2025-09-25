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
        Optional<Product> optionalProduct = productRepository.findById(wishlistDto.getProductId());
        Optional<User> optionalUser = userRepository.findByKeycloakId(wishlistDto.getUserId());

        if (optionalProduct.isPresent() && optionalUser.isPresent()) {
            Wishlist wishlist = new Wishlist();
            wishlist.setProduct(optionalProduct.get());
            wishlist.setUser(optionalUser.get());

            return wishlistRepository.save(wishlist).getWishlistDto();
        }
        return null;
    }

    public List<WishlistDto> getWishlistByUserId(String keycloakId) {
        Optional<User> optionalUser = userRepository.findByKeycloakId(keycloakId);
        if (optionalUser.isEmpty()) {
            return List.of();
        }
        User user = optionalUser.get();
        
        return wishlistRepository.findAllByUserId((long) user.getId()).stream()
                .map(Wishlist::getWishlistDto).collect(Collectors.toList());
    }

}

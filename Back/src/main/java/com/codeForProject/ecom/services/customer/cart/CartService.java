package com.codeForProject.ecom.services.customer.cart;

import com.codeForProject.ecom.dto.AddProductInCartDto;
import com.codeForProject.ecom.dto.OrderDto;
import com.codeForProject.ecom.dto.PlaceOrderDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

public interface CartService {

    ResponseEntity<?> addProductToCart(AddProductInCartDto addProductInCartDto);

    OrderDto getCartByUserId(String keycloakId);

    OrderDto applyCoupon(String keycloakId, String code);

    OrderDto increaseProductQuantity(AddProductInCartDto addProductInCartDto);

    OrderDto decreaseProductQuantity(AddProductInCartDto addProductInCartDto);

    OrderDto placeOrder(PlaceOrderDto placeOrderDto);

    List<OrderDto> getMyPlacedOrders(String keycloakId);

    OrderDto searchOrderByTrackingId(UUID trackingId);

}

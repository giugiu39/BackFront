package com.codeForProject.ecom.services.customer.cart;

import com.codeForProject.ecom.dto.AddProductInCartDto;
import com.codeForProject.ecom.dto.CartItemsDto;
import com.codeForProject.ecom.dto.OrderDto;
import com.codeForProject.ecom.dto.PlaceOrderDto;
import com.codeForProject.ecom.entity.*;
import com.codeForProject.ecom.enums.OrderStatus;
import com.codeForProject.ecom.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartItemsRepository cartItemsRepository;

    @Autowired
    private ProductRepository productRepository;
    

    @Override
    public ResponseEntity<?> addProductToCart(AddProductInCartDto addProductInCartDto) {
        try {
            // Trova l'utente tramite keycloakId invece di userId
            Optional<User> optionalUser = userRepository.findByKeycloakId(addProductInCartDto.getUserId());
            Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());

            if (optionalProduct.isPresent() && optionalUser.isPresent()) {
                User user = optionalUser.get();
                
                // Trova l'ordine pending dell'utente
                Order order = orderRepository.findByUserIdAndOrderStatus((long) user.getId(), OrderStatus.Pending);
                if (order == null) {
                    // Crea un nuovo ordine se non esiste
                    order = new Order();
                    order.setAmount(0L);
                    order.setTotalAmount(0L);
                    order.setUser(user);
                    order.setOrderStatus(OrderStatus.Pending);
                    order = orderRepository.save(order);
                }

                Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                        addProductInCartDto.getProductId(), order.getId(), (long) user.getId()
                );

                if (optionalCartItems.isPresent()) {
                    // Prodotto già presente nel carrello: restituisci lo stato completo del carrello
                    OrderDto orderDto = getCartByUserId(addProductInCartDto.getUserId());
                    return ResponseEntity.status(HttpStatus.OK).body(orderDto);
                } else {
                    Product product = optionalProduct.get();
                    CartItems cart = new CartItems();
                    cart.setProduct(product);
                    cart.setPrice(product.getPrice());
                    cart.setUser(user);
                    cart.setOrder(order);

                    cartItemsRepository.save(cart);

                    long currentTotal = order.getTotalAmount() == null ? 0L : order.getTotalAmount();
                    long currentAmount = order.getAmount() == null ? 0L : order.getAmount();
                    long itemPrice = cart.getPrice() == null ? 0L : cart.getPrice();

                    order.setTotalAmount(currentTotal + itemPrice);
                    order.setAmount(currentAmount + itemPrice);

                    orderRepository.save(order);

                    // Restituisci un DTO completo dell'ordine aggiornato
                    OrderDto orderDto = getCartByUserId(addProductInCartDto.getUserId());
                    return ResponseEntity.status(HttpStatus.CREATED).body(orderDto);
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Product not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding product to cart: " + e.getMessage());
        }
    }

    public OrderDto getCartByUserId(String keycloakId) {
        // Trova l'utente tramite keycloakId
        Optional<User> optionalUser = userRepository.findByKeycloakId(keycloakId);
        if (optionalUser.isEmpty()) {
            return null;
        }
        User user = optionalUser.get();
        
        // Recupera l'ordine Pending dell'utente; se non esiste, creane uno vuoto
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus((long) user.getId(), OrderStatus.Pending);
        if (activeOrder == null) {
            activeOrder = new Order();
            activeOrder.setAmount(0L);
            activeOrder.setTotalAmount(0L);
            activeOrder.setUser(user);
            activeOrder.setOrderStatus(OrderStatus.Pending);
            activeOrder = orderRepository.save(activeOrder);
        }

        List<CartItemsDto> cartItemsDtoList = activeOrder.getCartItems() == null
                ? List.of()
                : activeOrder.getCartItems().stream().map(CartItems::getCartDto).collect(Collectors.toList());

        OrderDto orderDto = new OrderDto();
        orderDto.setAmount(activeOrder.getAmount() == null ? 0L : activeOrder.getAmount());
        orderDto.setId(activeOrder.getId());
        orderDto.setOrderStatus(activeOrder.getOrderStatus());
        orderDto.setTotalAmount(activeOrder.getTotalAmount() == null ? 0L : activeOrder.getTotalAmount());
        orderDto.setCartItems(cartItemsDtoList);
        orderDto.setUserName(user.getName());

        return orderDto;
    }

    // Funzionalità coupon rimossa

    public OrderDto increaseProductQuantity(AddProductInCartDto addProductInCartDto) {
        // Trova l'utente tramite keycloakId
        Optional<User> optionalUser = userRepository.findByKeycloakId(addProductInCartDto.getUserId());
        if (optionalUser.isEmpty()) {
            return null;
        }
        User user = optionalUser.get();
        
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus((long) user.getId(), OrderStatus.Pending);
        Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());

        Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                addProductInCartDto.getProductId(), activeOrder.getId(), (long) user.getId()
        );

        if(optionalProduct.isPresent() && optionalCartItems.isPresent()) {
            CartItems cartItems = optionalCartItems.get();
            Product product = optionalProduct.get();

            // Quantity adjustments are not supported; return current cart
            return activeOrder.getOrderDto();
        }
        return null;
    }

    public OrderDto decreaseProductQuantity(AddProductInCartDto addProductInCartDto) {
        // Trova l'utente tramite keycloakId
        Optional<User> optionalUser = userRepository.findByKeycloakId(addProductInCartDto.getUserId());
        if (optionalUser.isEmpty()) {
            return null;
        }
        User user = optionalUser.get();
        
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus((long) user.getId(), OrderStatus.Pending);
        Optional<Product> optionalProduct = productRepository.findById(addProductInCartDto.getProductId());

        Optional<CartItems> optionalCartItems = cartItemsRepository.findByProductIdAndOrderIdAndUserId(
                addProductInCartDto.getProductId(), activeOrder.getId(), (long) user.getId()
        );

        if(optionalProduct.isPresent() && optionalCartItems.isPresent()) {
            CartItems cartItems = optionalCartItems.get();
            Product product = optionalProduct.get();

            // Quantity adjustments are not supported; return current cart
            return activeOrder.getOrderDto();
        }
        return null;
    }

    public OrderDto placeOrder(PlaceOrderDto placeOrderDto) {
        // Trova l'utente tramite keycloakId
        Optional<User> optionalUser = userRepository.findByKeycloakId(placeOrderDto.getUserId());
        if (optionalUser.isEmpty()) {
            return null;
        }
        User user = optionalUser.get();
        
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus((long) user.getId(), OrderStatus.Pending);

        if(activeOrder != null) {
            activeOrder.setOrderDescription(placeOrderDto.getOrderDescription());
            activeOrder.setAddress(placeOrderDto.getAddress());
            activeOrder.setDate(new Date());
            activeOrder.setOrderStatus(OrderStatus.Placed);
            activeOrder.setTrackingId(UUID.randomUUID());

            orderRepository.save(activeOrder);

            Order order = new Order();
            order.setAmount(0L);
            order.setTotalAmount(0L);
            order.setUser(user);
            order.setOrderStatus(OrderStatus.Pending);
            orderRepository.save(order);

            return activeOrder.getOrderDto();
        }
        return null;
    }

    public List<OrderDto> getMyPlacedOrders(String keycloakId) {
        // Trova l'utente tramite keycloakId
        Optional<User> optionalUser = userRepository.findByKeycloakId(keycloakId);
        if (optionalUser.isEmpty()) {
            return List.of();
        }
        User user = optionalUser.get();
        
        return orderRepository.findByUserIdAndOrderStatusIn((long) user.getId(), List.of(OrderStatus.Placed, OrderStatus.Shipped, OrderStatus.Delivered))
                .stream().map(Order::getOrderDto).collect(Collectors.toList());
    }

    public OrderDto searchOrderByTrackingId(UUID trackingId) {
        Optional<Order> optionalOrder = orderRepository.findByTrackingId(trackingId);
        if(optionalOrder.isPresent()) {
            return optionalOrder.get().getOrderDto();
        }
        return null;
    }

    @Override
    public void removeCartItem(Long cartItemId, String keycloakId) {
        Optional<User> optionalUser = userRepository.findByKeycloakId(keycloakId);
        if (optionalUser.isEmpty()) {
            return;
        }
        User user = optionalUser.get();

        Order activeOrder = orderRepository.findByUserIdAndOrderStatus((long) user.getId(), OrderStatus.Pending);
        if (activeOrder == null) {
            return;
        }

        Optional<CartItems> optionalCartItem = cartItemsRepository.findById(cartItemId);
        if (optionalCartItem.isEmpty()) {
            return;
        }
        CartItems cartItem = optionalCartItem.get();
        if (cartItem.getUser().getId() != user.getId()) {
            return;
        }

        long decrement = cartItem.getPrice();
        activeOrder.setAmount(Math.max(0, activeOrder.getAmount() - decrement));
        activeOrder.setTotalAmount(Math.max(0, activeOrder.getTotalAmount() - decrement));

        cartItemsRepository.deleteById(cartItemId);
        orderRepository.save(activeOrder);
    }

    @Override
    public void clearCart(String keycloakId) {
        Optional<User> optionalUser = userRepository.findByKeycloakId(keycloakId);
        if (optionalUser.isEmpty()) {
            return;
        }
        User user = optionalUser.get();

        Order activeOrder = orderRepository.findByUserIdAndOrderStatus((long) user.getId(), OrderStatus.Pending);
        if (activeOrder == null) {
            return;
        }

        List<CartItems> items = cartItemsRepository.findByOrderIdAndUserId(activeOrder.getId(), (long) user.getId());
        if (!items.isEmpty()) {
            cartItemsRepository.deleteAll(items);
        }

        activeOrder.setAmount(0L);
        activeOrder.setTotalAmount(0L);
        orderRepository.save(activeOrder);
    }

}

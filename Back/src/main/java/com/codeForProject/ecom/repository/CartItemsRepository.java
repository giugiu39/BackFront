package com.codeForProject.ecom.repository;

import com.codeForProject.ecom.entity.CartItems;
import com.codeForProject.ecom.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface CartItemsRepository extends JpaRepository<CartItems, Long> {

    Optional<CartItems> findByProductIdAndOrderIdAndUserId(Long productId, Long orderId, Long userId);

    // Recupera tutti gli items per un ordine e utente specifico
    List<CartItems> findByOrderIdAndUserId(Long orderId, Long userId);

    // Elimina tutti gli items per un ordine e utente specifico
    void deleteAllByOrderIdAndUserId(Long orderId, Long userId);

}

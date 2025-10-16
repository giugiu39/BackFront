import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { customerApi } from '../services/ApiService';
import { useAuth } from './AuthContext';

interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user, isAdmin } = useAuth();

  const addToCart = async (productId: number) => {
    if (!isAuthenticated || !user) {
      console.error('User not authenticated');
      return;
    }

    setLoading(true);
    try {
      await customerApi.addToCart(productId);
      // Ricarica il carrello dopo l'aggiunta
      await loadCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Propaga l'errore al chiamante, così il UI mostra il messaggio corretto
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    if (!isAuthenticated || !user) return;

    try {
      const cartData = await customerApi.getCart();
      // Il backend restituisce un OrderDto con cartItems, non un array grezzo
      const rawItems = Array.isArray(cartData) ? cartData : (cartData?.cartItems || []);
      const cartItems: CartItem[] = rawItems.map((item: any) => ({
        id: item.id?.toString?.() ?? String(item.id),
        productId: item.product?.id ?? item.productId,
        // Usa il nome prodotto dal DTO: preferisci product.name, poi productName, infine name
        name: item.product?.name ?? item.productName ?? item.name,
        price: item.price,
        quantity: Number(item.quantity ?? 1),
        // Le immagini dal backend arrivano come byte[] serializzati in base64.
        // Per i cart items, il campo corretto è `returnedImg`; in alternativa, alcuni
        // ProductDto usano `byteImg`. Usiamo il primo disponibile.
        image: item.returnedImg ?? item.product?.byteImg ?? item.image ?? item.product?.img
      }));
      setItems(cartItems);
    } catch (error) {
      console.error('Error loading cart:', error);
      setItems([]);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      await customerApi.removeFromCart(itemId);
      setItems(items.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    try {
      await customerApi.updateCartItem(itemId, quantity);
      setItems(items.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      await customerApi.clearCart();
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Carica il carrello quando l'utente è autenticato (solo per i customer, non per gli admin)
  useEffect(() => {
    if (isAuthenticated && user && !isAdmin) {
      loadCart();
    } else {
      setItems([]);
    }
  }, [isAuthenticated, user, isAdmin]);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
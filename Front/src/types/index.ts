export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'customer';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  categoryId: string;
  category?: Category;
  reviewCount: number;
  isFeatured: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customer?: User;
  items: OrderItem[];
  totalAmount: number;
  discountAmount?: number;
  couponId?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingId: string;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customer: User;
  comment: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  expiresAt: string;
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
}

export interface FAQ {
  id: string;
  productId?: string;
  question: string;
  answer: string;
  isGeneral: boolean;
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  customerId: string;
  productId: string;
  product: Product;
  createdAt: string;
}

export interface Analytics {
  totalOrders: number;
  ordersThisMonth: number;
  ordersPreviousMonth: number;
  totalRevenue: number;
  revenueThisMonth: number;
  revenuePreviousMonth: number;
  ordersByStatus: {
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
  topProducts: Array<{
    product: Product;
    quantity: number;
    revenue: number;
  }>;
}
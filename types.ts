export enum IntegrationStatus {
  CONNECTED = 'Connected',
  DISCONNECTED = 'Not Connected',
  TESTING = 'Testing...',
}

export interface IntegrationService {
  id: string;
  name: string;
  description: string;
  logo: React.ReactNode;
  status: IntegrationStatus;
  values: { [key: string]: string };
  fields: {
    id: string;
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    helpText: string;
  }[];
}

// Customer Facing Types
export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  productCount?: number;
}

export interface Review {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  pv: number;
  dietary_tags?: string[];
  shopName: string;
  rating: number;
  category: string;
  brand: string;
  description: string;
  images: string[];
  reviews?: Review[];
  sku?: string;
  stock?: number;
  status?: 'Active' | 'Inactive';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
}

export interface ShippingMethod {
    id: string;
    name: string;
    price: number;
    eta: string;
}

export type PaymentMethod = 'credit-card' | 'bank-transfer' | 'cod';

export type UserRole = 'customer' | 'seller' | 'admin' | 'affiliate';
export type UserStatus = 'Active' | 'Banned';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinDate: string;
  status: UserStatus;
  shopDescription?: string;
}


// Seller Dashboard Types
export interface SellerStat {
    label: string;
    value: string;
    change?: string;
    changeType?: 'increase' | 'decrease';
    icon: React.ReactNode;
}

// Admin Dashboard Types
export enum OrderStatus {
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export interface OrderItem {
  productId: string;
  quantity: number;
  productName: string;
}

export interface PaymentDetails {
    method: PaymentMethod;
    transactionId: string;
    date: string;
}

export interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    date: string;
    total: number;
    totalPV: number;
    status: OrderStatus;
    items: OrderItem[];
    shopName: string; // This might be better as an array if an order can have items from multiple shops
    shippingAddress: ShippingAddress;
    paymentDetails: PaymentDetails;
}


export interface Affiliate {
  id: string;
  name: string;
  email: string;
  commissionRate: number; // Stored as a decimal, e.g., 0.10 for 10%
}

// Affiliate Dashboard Types
export interface AffiliateStat {
    label: string;
    value: string;
    icon: React.ReactNode;
}

export type CommissionStatus = 'Pending' | 'Approved' | 'Paid';

export interface Commission {
    id: string;
    orderId: string;
    affiliateId: string;
    date: string;
    productName: string;
    saleAmount: number;
    commissionRate: number;
    commissionEarned: number;
    status: CommissionStatus;
}

// MLM Types
export interface DownlineMember {
  id: string;
  name: string;
  level: number;
  joinDate: string;
  downlineCount: number;
  totalPV: number;
  totalCommission: number;
  children: DownlineMember[];
}

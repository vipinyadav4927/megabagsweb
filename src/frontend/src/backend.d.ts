import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    specs: string;
    imageUrl: string;
    applications: string;
}
export type Time = bigint;
export type ProductId = bigint;
export interface Order {
    id: OrderId;
    customerName: string;
    status: OrderStatus;
    createdAt: Time;
    productName: string;
    email: string;
    address: string;
    notes: string;
    quantity: bigint;
    phone: string;
}
export type OrderId = bigint;
export interface UserProfile {
    name: string;
}
export enum OrderStatus {
    dispatched = "dispatched",
    orderPlaced = "orderPlaced",
    delivered = "delivered",
    processing = "processing"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: Product): Promise<ProductId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createOrder(order: Order): Promise<OrderId>;
    deleteProduct(id: ProductId): Promise<void>;
    getAllOrders(): Promise<Array<Order>>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrder(id: OrderId): Promise<Order>;
    getProduct(id: ProductId): Promise<Product>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateOrderStatus(orderId: OrderId, status: OrderStatus): Promise<void>;
    updateProduct(product: Product): Promise<void>;
}

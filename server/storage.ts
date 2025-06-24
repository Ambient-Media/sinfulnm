import { products, cartItems, type Product, type InsertProduct, type CartItem, type InsertCartItem, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
}

// Order types
export type Order = {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  createdAt: string;
};

export type InsertOrder = Omit<Order, 'id' | 'createdAt'>;

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>; // Added orders map
  private currentUserId: number;
  private currentProductId: number;
  private currentCartId: number;
  private currentOrderId: number; // Added order id counter

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map(); // Initialize orders map
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentCartId = 1;
    this.currentOrderId = 1; // Initialize order id counter

    // Initialize with premium juice products
    this.initializeProducts();
  }

  private initializeProducts() {
    const initialProducts: InsertProduct[] = [
      {
        name: "Blue Razz Euphoria",
        description: "THC + CBG Infused - 50mg THC + 50mg CBG",
        imageUrl: "/products/blue-razz-euphoria.webp",
        ingredients: "THC, CBG, Natural Blue Raspberry Flavor",
        category: "THC Infused"
      },
      {
        name: "Huckleberry Body",
        description: "THC + CBD Infused - 50mg THC + 50mg CBD",
        imageUrl: "/products/huckleberry-body.webp",
        ingredients: "THC, CBD, Natural Huckleberry Flavor",
        category: "THC Infused"
      },
      {
        name: "Orange Vanilla Party",
        description: "THC Infused Orange Vanilla - 50mg THC",
        imageUrl: "/products/orange-vanilla.webp",
        ingredients: "THC, Natural Orange Flavor, Vanilla Extract",
        category: "THC Infused"
      },
      {
        name: "Strawberry Party",
        description: "THC Infused Strawberry - 50mg THC",
        imageUrl: "/products/strawberry.webp",
        ingredients: "THC, Natural Strawberry Flavor",
        category: "THC Infused"
      }
    ];

    initialProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      (item) => item.productId === insertCartItem.productId && item.sessionId === insertCartItem.sessionId
    );

    if (existingItem) {
      // Update quantity
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + (insertCartItem.quantity || 1) };
      this.cartItems.set(existingItem.id, updatedItem);
      return updatedItem;
    } else {
      // Create new cart item
      const id = this.currentCartId++;
      const cartItem: CartItem = { ...insertCartItem, id, quantity: insertCartItem.quantity || 1 };
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      const updatedItem = { ...item, quantity };
      this.cartItems.set(id, updatedItem);
      return updatedItem;
    }
    return undefined;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const itemsToRemove = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.sessionId === sessionId);

    itemsToRemove.forEach(([id, _]) => {
      this.cartItems.delete(id);
    });

    return true;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const newOrder: Order = {
      id: this.currentOrderId++,
      ...order,
      createdAt: new Date().toISOString(),
    };
    this.orders.set(newOrder.id, newOrder);
    return newOrder;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();
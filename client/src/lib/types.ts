export interface CartItemWithProduct {
  id: number;
  productId: number;
  quantity: number;
  sessionId: string;
  product: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    ingredients: string;
    category: string;
  };
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
  sessionId: string;
}

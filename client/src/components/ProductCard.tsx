import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Check } from "lucide-react";
import type { Product, AddToCartRequest } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

function getSessionId(): string {
  let sessionId = localStorage.getItem('sinful-session-id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substr(2, 9);
    localStorage.setItem('sinful-session-id', sessionId);
  }
  return sessionId;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async (data: AddToCartRequest) => {
      return apiRequest("POST", "/api/cart", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    },
  });

  const handleAddToCart = () => {
    const sessionId = getSessionId();
    addToCartMutation.mutate({
      productId: product.id,
      quantity,
      sessionId,
    });
  };

  return (
    <div className={`bg-white rounded-3xl shadow-xl overflow-hidden hover-lift group ${className}`}>
      <img 
        src={product.imageUrl} 
        alt={product.name}
        className="w-full h-48 lg:h-64 object-contain group-hover:scale-105 transition-transform duration-500" 
      />
      <div className="p-4 lg:p-6">
        <h3 className="text-lg lg:text-2xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 text-sm lg:text-base">{product.description}</p>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-800">Number of Cases</label>
            <Input
              type="number"
              min="1"
              max="50"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 text-center quantity-input"
            />
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={addToCartMutation.isPending}
            className={`w-full transition-all duration-200 font-medium rounded-xl ${
              justAdded 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Added!
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

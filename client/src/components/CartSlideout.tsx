import { useState } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
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

interface CartSlideoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  sessionId: string;
}

export default function CartSlideout({ isOpen, onClose, cartItems, sessionId }: CartSlideoutProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateCartMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      if (!import.meta.env.VITE_API_URL) {
        return { success: true };
      }
      return apiRequest("PUT", `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (id: number) => {
      if (!import.meta.env.VITE_API_URL) {
        return { success: true };
      }
      return apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
      toast({
        title: "Item removed from cart",
        duration: 2000,
      });
    },
  });

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCartMutation.mutate(id);
    } else {
      updateCartMutation.mutate({ id, quantity: newQuantity });
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Slideout */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              Your Cart ({totalItems} {totalItems === 1 ? 'case' : 'cases'})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L3 3m0 0h0m4.4 7.6L7 13h10M7 13l-1.1 5.4M7 13h0m10 0l1.1 5.4M7 13h0m0 0v0m10 0v0M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-2">Add some cases to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-full object-contain bg-white p-2"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {item.product.category}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={updateCartMutation.isPending}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={updateCartMutation.isPending}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCartMutation.mutate(item.id)}
                        disabled={removeFromCartMutation.isPending}
                        className="p-1 hover:bg-red-100 text-red-600 rounded-full transition-colors ml-2 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 bg-gray-50">
              <div className="mb-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Cases:</span>
                  <span>{totalItems}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Each case contains 20 units
                </p>
              </div>
              
              <Button 
                onClick={() => {
                  toast({
                    title: "Thank you for your interest!",
                    description: "Please contact us to complete your wholesale order.",
                    duration: 4000,
                  });
                  onClose();
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Contact Us to Order
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
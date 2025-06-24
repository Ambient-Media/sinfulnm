import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { CartItemWithProduct } from "@/lib/types";
import sinfulLogoPath from "@assets/Rounded-2023-Sinful-Logo-White_1750732218496.png";

function getSessionId(): string {
  let sessionId = localStorage.getItem('sinful-session-id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substr(2, 9);
    localStorage.setItem('sinful-session-id', sessionId);
  }
  return sessionId;
}

export default function Header() {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  const { data: cartItems = [] } = useQuery<CartItemWithProduct[]>({
    queryKey: ['/api/cart', sessionId],
    enabled: !!sessionId,
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={sinfulLogoPath} 
              alt="Sinful Logo" 
              className="h-12 w-auto"
            />
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium">Products</a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium">About</a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium">Contact</a>
          </nav>
          
          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-700 hover:text-red-600 transition-colors duration-200">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-gray-700 hover:text-red-600 transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

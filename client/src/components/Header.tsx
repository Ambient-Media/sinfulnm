import { ShoppingCart, Menu, X, User, HelpCircle, MessageCircle, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { CartItemWithProduct } from "@/lib/types";
import sinfulLogoPath from "@assets/Rounded-2023-Sinful-Logo-White_1750732218496.png";
import LoginModal from "@/components/LoginModal";
import OrderForm from "@/components/OrderForm";
import CartSlideout from "@/components/CartSlideout";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const currentSessionId = getSessionId();

    setSessionId(currentSessionId);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const { data: cartItems = [] } = useQuery<CartItemWithProduct[]>({
    queryKey: ['/api/cart', sessionId],
    enabled: !!sessionId,
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  



  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={sinfulLogoPath} 
                alt="Sinful Logo" 
                className="h-12 w-auto"
              />
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button onClick={() => setIsLoginModalOpen(true)} className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Support</span>
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium flex items-center space-x-2">
                <HelpCircle className="w-4 h-4" />
                <span>FAQ</span>
              </a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium flex items-center space-x-2">
                <Info className="w-4 h-4" />
                <span>About</span>
              </a>
            </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center ml-6">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-red-600 transition-colors duration-200"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full min-w-5 h-5 px-1 flex items-center justify-center text-xs font-bold border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </button>
              <button 
                className="md:hidden p-2 ml-2 text-gray-700 hover:text-red-600 transition-colors duration-200"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-20 right-0 h-[calc(100vh-5rem)] w-80 bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="p-6 space-y-4">
            <button 
              onClick={() => {
                closeMobileMenu();
                setIsLoginModalOpen(true);
              }}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Login</span>
            </button>

            <button 
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Cart</span>
              {totalItems > 0 && (
                <span className="ml-auto bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            <button 
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
            >
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Support</span>
            </button>

            <button 
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
            >
              <HelpCircle className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">FAQ</span>
            </button>

            <button 
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
            >
              <Info className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">About</span>
            </button>
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />

      <CartSlideout
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        sessionId={sessionId}
      />

      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        cartItems={cartItems}
        sessionId={sessionId}
        onOrderSuccess={() => {
          // Refresh cart data
          window.location.reload();
        }}
      />
    </>
  );
}
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import type { Product } from "@shared/schema";

// Fallback products for when API is not available
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Blue Razz Euphoria",
    description: "THC-infused blue raspberry flavor that delivers a burst of fruity bliss",
    imageUrl: "/products/blue-razz-euphoria.webp",
    ingredients: "THC distillate, blue raspberry flavoring, natural sweeteners",
    category: "THC Beverages"
  },
  {
    id: 2,
    name: "Huckleberry Body",
    description: "Rich huckleberry taste with full-body relaxation effects",
    imageUrl: "/products/huckleberry-body.webp",
    ingredients: "THC distillate, huckleberry extract, organic cane sugar",
    category: "THC Beverages"
  },
  {
    id: 3,
    name: "Orange Vanilla Dream",
    description: "Creamy orange vanilla blend for the perfect mellow experience",
    imageUrl: "/products/orange-vanilla.webp",
    ingredients: "THC distillate, orange extract, vanilla, coconut cream",
    category: "THC Beverages"
  },
  {
    id: 4,
    name: "Strawberry Bliss",
    description: "Fresh strawberry flavor with uplifting and energizing effects",
    imageUrl: "/products/strawberry.webp",
    ingredients: "THC distillate, strawberry puree, natural fruit acids",
    category: "THC Beverages"
  }
];

export default function MobileCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Use fallback products if API fails or is not available
  const displayProducts = products && products.length > 0 ? products : FALLBACK_PRODUCTS;

  useEffect(() => {
    if (displayProducts.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(displayProducts.length, 4));
    }, 6000); // Slowed down by 50% (4000ms -> 6000ms)

    return () => clearInterval(interval);
  }, [displayProducts.length, isPaused]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    setIsPaused(true);
    // Resume auto-advance after 8 seconds
    setTimeout(() => setIsPaused(false), 8000);
  };

  const handleTouch = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  if (isLoading) {
    return (
      <div className="lg:hidden relative">
        <div className="bg-gray-200 rounded-3xl shadow-xl overflow-hidden animate-pulse">
          <div className="w-full h-64 bg-gray-300"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:hidden relative" onTouchStart={handleTouch}>
      <div className="bg-white rounded-3xl shadow-xl">
        {displayProducts.slice(0, 4).map((product, index) => (
          <div
            key={product.id}
            style={{
              display: index === currentSlide ? 'block' : 'none'
            }}
          >
            <ProductCard product={product} className="rounded-3xl shadow-none" />
          </div>
        ))}
      </div>

      {/* Carousel Controls - Product Previews */}
      <div className="flex justify-center mt-6 space-x-3">
        {displayProducts.slice(0, 4).map((product, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-12 h-12 rounded-full transition-all duration-200 border-2 overflow-hidden ${
              index === currentSlide ? 'border-red-600 scale-110' : 'border-gray-300'
            }`}
          >
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import type { Product } from "@shared/schema";

export default function MobileCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  useEffect(() => {
    if (products.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length, isPaused]);

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
      <div className="carousel-container relative overflow-hidden rounded-3xl">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`carousel-item ${
              index === currentSlide ? 'active' : ''
            }`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide ? 'bg-red-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

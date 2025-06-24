import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import type { Product } from "@shared/schema";

export default function BentoGrid() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  if (isLoading) {
    return (
      <div className="hidden lg:block">
        <div className="bento-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`bento-item-${i + 1} bg-gray-200 rounded-3xl animate-pulse`}>
              <div className="w-full h-full bg-gray-300 rounded-3xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block">
      <div className="bento-grid">
        {products.slice(0, 4).map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            className={`bento-item-${index + 1} bg-white`}
          />
        ))}
      </div>
      
      {/* Units per case text */}
      <div className="text-center mt-6">
        <p className="text-gray-600 italic">20 units per case</p>
      </div>
    </div>
  );
}

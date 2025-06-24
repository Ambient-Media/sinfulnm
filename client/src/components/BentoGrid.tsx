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

export default function BentoGrid() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Use fallback products if API fails or is not available
  const displayProducts = products && products.length > 0 ? products : FALLBACK_PRODUCTS;

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
      {error && (
        <div className="text-center mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            Using offline product catalog. Live pricing and availability may vary.
          </p>
        </div>
      )}
      <div className="bento-grid">
        {displayProducts.slice(0, 4).map((product, index) => (
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

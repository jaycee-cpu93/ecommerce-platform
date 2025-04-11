"use client"

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/types";
import { useDarkModeStore } from "@/store/darkMode";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const darkMode = useDarkModeStore((state) => state.darkMode);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setError("Failed to fetch products."))
      .finally(() => setLoading(false)); //fetch data
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Search products..."
          className={`w-[50%] p-2 mb-4 border rounded ${darkMode ? 
            "text-white bg-night placeholder-gray-300 focus:placeholder-gray-200" : 
            "text-night bg-white placeholder-gray-500 focus:placeholder-gray-700"
          }`}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
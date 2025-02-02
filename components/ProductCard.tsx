import { useCartStore } from "../store/cart";
import { Product } from "@/types/types";
import { useDarkModeStore } from "@/store/darkMode";
import Image from "next/image";

const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const darkMode = useDarkModeStore((state) => state.darkMode);
  return (
    <div className="border rounded-lg p-4 shadow-lg">
      <Image src={product.image} alt={product.title} className="h-40 mx-auto" width={200} height={200} />
      <h2  className={`text-lg font-semibold mt-2 ${
          darkMode ? "text-black" : "text-white"
        }`}
      >
        {product.title}
      </h2>
      <p  className={darkMode ? "text-gray-600" : "text-white"}>${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-blue-500 text-white p-2 rounded mt-3"
      >
        Add to Cart
      </button>
    </div>
  );
};
export default ProductCard;
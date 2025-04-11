import { useState } from "react";
import { Product } from "@/types/types";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDarkModeStore } from "@/store/darkMode"; 


const CartItem = ({ product, removeFromCart }: { product: Product, removeFromCart: (id: number) => void }) => {
  const [quantity, setQuantity] = useState(1);
  const { darkMode } = useDarkModeStore();

  return (
    <div className={`flex justify-between items-center p-2 border-b ${darkMode ? 'text-white': 'text-night'}`}>
      <p>{product.title}</p>
      <p>${(product.price * quantity).toFixed(2)}</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className={`w-16 p-1 border rounded ${darkMode ? 'text-white bg-night': 'text-night bg-white'}`}
        min="1"
      />
      <button onClick={() => removeFromCart(product.id)} className="px-2 py-1 rounded">
        <FaRegTrashAlt/>
      </button>
    </div>
  );
};

export default CartItem;
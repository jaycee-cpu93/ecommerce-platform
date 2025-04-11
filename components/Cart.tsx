'use client'
import { useCartStore } from "../store/cart";
import CartItem from "./CartItem";
import { useDarkModeStore } from "@/store/darkMode"; 

const Cart = () => {
  const { cart, removeFromCart } = useCartStore();
  const { darkMode } = useDarkModeStore();

  // Calculate the total price of items in the cart
  const total = cart.reduce((sum, product) => sum + product.price, 0);
 
  return (
    <div className={`p-4 border rounded-lg ${darkMode? "text-white": "text-night"}`}>
      <h2 className="text-xl font-bold">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((product) => (
            <CartItem key={product.id} product={product} removeFromCart={removeFromCart} />
          ))}
          <div className="mt-4 pt-4 border-t">
            <p className="text-lg font-semibold">
              Total: ${total.toFixed(2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
/* 'use client'
import { useCartStore } from "../store/cart";
import CartItem from "./CartItem";

const Cart = () => {
  const { cart, removeFromCart } = useCartStore();

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Shopping Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : cart.map((product) => (
        <CartItem key={product.id} product={product} removeFromCart={removeFromCart} />
      ))}
    </div>
  );
};
export default Cart; */
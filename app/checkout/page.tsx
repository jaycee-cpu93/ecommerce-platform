"use client"
import Cart from "../../components/Cart";
import CheckoutForm from "../../components/CheckoutForm";

export default function Checkout() {

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Cart/>
      <CheckoutForm />
    </div>
  );
}

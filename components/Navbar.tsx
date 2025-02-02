"use client" 
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { FaCartArrowDown } from "react-icons/fa";

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link href="/">
        <p className="text-xl font-bold">E-Commerce</p>
      </Link>
        <Link href="/checkout">
        <div className="relative flex items-center gap-2">
          <FaCartArrowDown className="text-xl" />
          <span>Cart ({cart.length})</span>
        </div>
        </Link>
    </nav>
  );
};

export default Navbar;

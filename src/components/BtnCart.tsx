"use client";

import { ShoppingCart } from "@phosphor-icons/react";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export const BtnCart = () => {
  const { count } = useCart();

  return (
    <Link href={`/cart`}>
      <ShoppingCart color="#E6B800" size="35" />
      {count > 0 && (
        <div className="relative">
          <div className="absolute bg-gold-700 text-white bottom-0 left-6 rounded-full px-2 text-right">
            {count}
          </div>
        </div>
      )}
    </Link>
  );
};

export default BtnCart;

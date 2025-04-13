"use client";
import BtnAddToCart from "@/components/BtnAddToCart";
import { Poster } from "@/types/dataTypes";
import { useState } from "react";

interface QuantityAddToCartProps {
  poster: Poster;
}

export const QuantityAddToCart = ({ poster }: QuantityAddToCartProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <div className="flex items-center border-1 border-gold-600 text-xl">
        <button
          onClick={handleDecrease}
          className="flex-none px-4 py-2 bg-gold-800 text-gold hover:bg-gold-400 hover:text-gold-700 "
          aria-label="Decrease quantity"
        >
          -
        </button>
        <div className="flex-auto px-4 py-2 text-center text-gold-200 min-w-[2.5rem]">
          {quantity}
        </div>
        <button
          onClick={handleIncrease}
          className="flex-none px-4 py-2 bg-gold-800 text-gold hover:bg-gold-400 hover:text-gold-700"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <BtnAddToCart poster={poster} quantity={quantity} />
    </>
  );
};

export default QuantityAddToCart;

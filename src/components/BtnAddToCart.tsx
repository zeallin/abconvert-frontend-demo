"use client";

import { useCartAction, useModal } from "../context/CartContext";
import { Poster } from "../types/dataTypes";

interface BtnAddToCartProp {
  poster: Poster;
  quantity?: number;
}

export const BtnAddToCart = ({ poster, quantity = 1 }: BtnAddToCartProp) => {
  const { addCartItem } = useCartAction();
  const { setModalOpen } = useModal();

  return (
    <>
      <button
        onClick={() => {
          addCartItem(poster, quantity);
          setModalOpen(true, poster, quantity);
        }}
        className="w-full mt-1 text-center p-2 bg-gold-800 text-gold hover:bg-gold-400 hover:text-gold-700"
      >
        Add to cart
      </button>
    </>
  );
};

export default BtnAddToCart;

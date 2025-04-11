"use client";

import { useCartAction, useModal } from "../app/context/CartContext";
import { Poster } from "../types/dataTypes";
// import { ModalDialog } from "./Modal";

interface BtnAddToCartProp {
  poster: Poster;
}

export const BtnAddToCart = ({ poster }: BtnAddToCartProp) => {
  const { addCartItem } = useCartAction();
  const { setModalOpen } = useModal();

  return (
    <>
      <button
        onClick={() => {
          addCartItem(poster, 1);
          setModalOpen(true);
        }}
        className="w-full mt-1 text-center p-2 bg-gold-800 text-gold hover:bg-gold-400 hover:text-gold-700"
      >
        Add to cart
      </button>
    </>
  );
};

export default BtnAddToCart;

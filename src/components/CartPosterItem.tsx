import { useCartAction } from "@/context/CartContext";
import Image from "next/image";
import { CartItem } from "../types/dataTypes";

interface CartItemProps {
  cartItem: CartItem;
}

export const CartPosterItem = ({ cartItem }: CartItemProps) => {
  const { addCartItem, removeCartItem } = useCartAction();
  const poster = cartItem.poster;
  const quantity = cartItem.quantity;

  const totalPrice = (poster?.price * quantity).toFixed(2);

  return (
    <div className="border-1 border-gold my-4">
      <div className="flex gap-4 p-2">
        <div className="w-48">
          <Image
            width={256}
            height={256}
            alt={poster?.name ?? "unknown"}
            className="w-full"
            src={`/pictures/thumb/${poster?.thumbPath}`}
          />
        </div>
        <div className="w-[20vw]">
          <div className="text-xl font-semibold">{poster?.name}</div>

          <div className="text-stone-400">{poster?.year}</div>
          <div className="text-stone-400">
            {poster?.sizeWidthInch}&quot; × {poster?.sizeHeightInch}&quot;
          </div>

          <div className="flex items-center border-1 border-gold-600 text-lg mt-4 w-48">
            <button
              onClick={() => {
                removeCartItem(poster, 1);
              }}
              className="flex-none px-2 py-1 bg-gold-800 text-gold hover:bg-gold-400 hover:text-gold-700 "
              aria-label="Decrease quantity"
            >
              -
            </button>
            <div className="flex-auto px-2 py-1 text-center text-gold-200 min-w-[2.5rem]">
              {quantity}
            </div>
            <button
              onClick={() => {
                addCartItem(poster, 1);
              }}
              className="flex-none px-2 py-1 bg-gold-800 text-gold hover:bg-gold-400 hover:text-gold-700"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex">
            <div className="text-xl text-gold-400 text-right">
              ${totalPrice} USD
            </div>
          </div>
          <div className="flex">
            <button
              className="btn-gold"
              onClick={() => {
                removeCartItem(poster, 0);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPosterItem;

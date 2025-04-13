import { useCartAction } from "@/context/CartContext";
import Image from "next/image";
import { CartItem } from "../types/dataTypes";

interface CartCheckoutItemProps {
  cartItem: CartItem;
}

export const CartCheckoutItem = ({ cartItem }: CartCheckoutItemProps) => {
  const { addCartItem, removeCartItem } = useCartAction();
  const poster = cartItem.poster;
  const quantity = cartItem.quantity;

  const totalPrice = (poster?.price * quantity).toFixed(2);

  return (
    <div className="border-1 border-gold my-4">
      <div className="flex gap-4 p-2">
        <div className="w-32">
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
          <div className="text-xl text-gold-400 py-2">
            ${totalPrice} USD{" "}
            <span className="text-stone-400 text-lg">@ ${poster?.price}</span>
          </div>
          <div className="text-stone-400">{poster?.year}</div>
          <div className="text-stone-400">
            {poster?.sizeWidthInch}&quot; × {poster?.sizeHeightInch}&quot;
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <div className="flex">
            <div className="text-lg text-gold-400 text-right">
              Qty: {quantity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCheckoutItem;

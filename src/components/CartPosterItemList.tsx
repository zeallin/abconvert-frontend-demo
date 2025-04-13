"use client";
import CartPosterItem from "@/components/CartPosterItem";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
export const CartPosterItemList = () => {
  const router = useRouter();
  const { cartItems } = useCart();

  const totalPrice = cartItems
    .reduce((price, cartItem) => {
      return price + cartItem.poster.price * cartItem.quantity;
    }, 0)
    .toFixed(2);

  const totalCount = cartItems.reduce((count, cartItem) => {
    return count + cartItem.quantity;
  }, 0);

  if (cartItems.length === 0)
    return (
      <div className="pt-4 flex justify-center">
        <div className="max-w-4xl">
          <div className="font-montserrat text-2xl text-gold-300 my-20">
            Cart is empty
          </div>
        </div>
      </div>
    );

  return (
    <div className="pt-4 flex justify-center">
      <div className="max-w-4xl">
        <div className="font-montserrat text-xl text-gold-300 my-2">
          Cart ({totalCount} items)
        </div>
        <div className="">
          {cartItems.map((cartItem, index) => (
            <CartPosterItem key={index} cartItem={cartItem} />
          ))}
        </div>
        <div className="text-right">
          <div className="text-2xl my-4">Total: ${totalPrice} USD</div>
          <button
            onClick={() => {
              router.push(`/checkout`);
            }}
            className="w-48 text-xl mt-1 text-center p-2 bg-gold-800 text-gold hover:bg-gold-400 hover:text-gold-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPosterItemList;

"use client";
import CartCheckoutItem from "@/components/CartCheckoutItem";
import { useCart, useCartAction } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export const CheckoutDetail = () => {
  const router = useRouter();
  const { cartItems } = useCart();
  const { clearCartItem } = useCartAction();

  const subTotalPrice = cartItems.reduce((price, cartItem) => {
    return price + cartItem.poster.price * cartItem.quantity;
  }, 0);

  const shippingPrice = 4.99;
  const totalPrice = subTotalPrice + shippingPrice;

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

  const submitForm = () => {
    // just clear the cart item and go to success
    clearCartItem();
    router.push("/order-success");
  };

  return (
    <div className="pt-4 flex justify-center gap-4">
      <div className="pt-4 max-w-2xl px-4">
        <form className="border border-gold-500 p-6" action={submitForm}>
          <h2 className="font-montserrat text-lg text-gold-300 mb-4">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="email" className="font-montserrat text-gold-100">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full mt-1 p-2 border border-gold-300 bg-gold-100 text-gold-800 font-montserrat focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="name" className="font-montserrat text-gold-100">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full mt-1 p-2 border border-gold-300 bg-gold-100 text-gold-800 font-montserrat focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="John Doe"
              />
            </div>
          </div>

          <h2 className="font-montserrat text-lg text-gold-300 mt-6 mb-4">
            Shipping Address
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                htmlFor="country"
                className="font-montserrat text-gold-100"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                required
                className="w-full mt-1 p-2 border border-gold-300 bg-gold-100 text-gold-800 font-montserrat focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="">Select a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                {/* Add more countries as needed */}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="street" className="font-montserrat text-gold-100">
                Street Address
              </label>
              <input
                type="text"
                id="street"
                name="street"
                required
                className="w-full mt-1 p-2 border border-gold-300 bg-gold-100 text-gold-800 font-montserrat focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="123 Main St"
              />
            </div>
            <div>
              <label htmlFor="city" className="font-montserrat text-gold-100">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                className="w-full mt-1 p-2 border border-gold-300 bg-gold-100 text-gold-800 font-montserrat focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="New York"
              />
            </div>
            <div>
              <label htmlFor="state" className="font-montserrat text-gold-100">
                State / Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                required
                className="w-full mt-1 p-2 border border-gold-300 bg-gold-100 text-gold-800 font-montserrat focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="NY"
              />
            </div>
            <div>
              <label htmlFor="zip" className="font-montserrat text-gold-100">
                ZIP / Postal Code
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                required
                className="w-full mt-1 p-2 border border-gold-300 bg-gold-100 text-gold-800 font-montserrat focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="10001"
              />
            </div>
          </div>

          <h2 className="font-montserrat text-lg text-gold-300 mt-6 mb-4">
            Payment Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                htmlFor="cardNumber"
                className="font-montserrat text-gold-100"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                required
                className="w-full mt-1 p-2 border border-gold-300 bg-gold-100 text-gold-800 font-montserrat focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div>
              <label htmlFor="expiry" className="font-montserrat text-gold-100">
                Expiration Date
              </label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                required
                className="w-full mt-1 p-2 border border-gold-300 bg-gold-100 text-gold-800 font-montserrat focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label htmlFor="cvc" className="font-montserrat text-gold-100">
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                required
                className="w-full mt-1 p-2 border border-gold-300 bg-gold-100 text-gold-800 font-montserrat focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="123"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-6">
            <div className=" text-gold-100">
              Total: ${(Number(totalPrice) || 0).toFixed(2)} USD
            </div>
            <button
              type="submit"
              className="mt-4 w-full p-2 bg-gold-800 text-gold-100 font-montserrat hover:bg-gold-400 hover:text-gold-700 transition"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>

      <div className="">
        <div className="flex flex-col">
          <div className="text-lg">
            <div className="font-montserrat text-xl text-gold-300 my-2">
              Order Summary
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div>Subtotal</div>
                <div>${subTotalPrice.toFixed(2)} USD</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>${shippingPrice} USD</div>
              </div>
              <div className="flex justify-between mt-2 border-t-1">
                <div>Estimated Total</div>
                <div>${totalPrice.toFixed(2)} USD</div>
              </div>
            </div>
          </div>
          <div className="max-w-4xl pt-4">
            <div className="font-montserrat text-xl text-gold-300 my-2">
              Product ({totalCount} items)
            </div>
            <div className="">
              {cartItems.map((cartItem, index) => (
                <CartCheckoutItem key={index} cartItem={cartItem} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetail;

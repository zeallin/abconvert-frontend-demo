"use client";

import Checker from "@/utils/checker";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ModalDialog } from "../components/ModalDialog";
import { CartItem, Poster } from "../types/dataTypes";
import { LocalStoreageMgr } from "../utils/localStorageMgr";

interface CartStateContextType {
  cartItems: CartItem[];
  count: number;
}
interface CartActionContextType {
  addCartItem: (poster: Poster, quantity: number) => void;
  removeCartItem: (poster: Poster, quantity: number) => void;
}
interface ModalContextType {
  setModalOpen: (
    isModalOpen: boolean,
    poster?: Poster,
    quantity?: number
  ) => void;
}

const cartItemKey = "myCart";

const CartStateContext = createContext<CartStateContextType>({
  cartItems: [],
  count: 0,
});
const CartActionContext = createContext<CartActionContextType | undefined>(
  undefined
);
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedCartItem, setAddedCartItem] = useState<CartItem>();

  // delay load for client depedency
  useEffect(() => setCartItems(LocalStoreageMgr.getItems(cartItemKey)), []);

  const addCartItem = useCallback((poster: Poster, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.poster.id === poster.id);
      let updatedCart: CartItem[];

      if (existing) {
        updatedCart = prev.map((item) =>
          item.poster.id === poster.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...prev, { poster, quantity }];
      }

      LocalStoreageMgr.setItems(cartItemKey, updatedCart);
      return updatedCart;
    });
  }, []);

  const removeCartItem = useCallback((poster: Poster) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.poster.id !== poster.id);
      LocalStoreageMgr.setItems(cartItemKey, updatedCart);
      return updatedCart;
    });
  }, []);

  const setModalOpen = useCallback(
    (isOpen: boolean, poster?: Poster, quantity = 1) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setIsModalOpen((prev) => {
        if (Checker.isSetNonNull(poster)) {
          const checkedPoster = poster as Poster;
          const addCartItem: CartItem = { poster: checkedPoster, quantity };
          setAddedCartItem(addCartItem);
        }

        return isOpen;
      });
    },
    []
  );

  const count = cartItems.reduce((itemCount, cartItem) => {
    return itemCount + cartItem.quantity;
  }, 0);

  const actions = useMemo(
    () => ({ addCartItem, removeCartItem }),
    [addCartItem, removeCartItem]
  );

  return (
    <ModalContext.Provider value={{ setModalOpen }}>
      <CartStateContext.Provider value={{ cartItems, count }}>
        <CartActionContext.Provider value={actions}>
          {children}
          <ModalDialog
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            addedCartItem={addedCartItem}
          ></ModalDialog>
        </CartActionContext.Provider>
      </CartStateContext.Provider>
    </ModalContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartStateContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

export function useCartAction() {
  const context = useContext(CartActionContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

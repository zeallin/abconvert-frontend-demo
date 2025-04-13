"use client";
import { CartItem } from "@/types/dataTypes";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { X } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

interface ModalDialogProp {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  addedCartItem?: CartItem;
}

export const ModalDialog = ({
  addedCartItem,
  isOpen,
  onClose,
}: ModalDialogProp) => {
  const poster = addedCartItem?.poster;
  const quantity = addedCartItem?.quantity ?? 1;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      transition
      className="relative z-50 transition duration-300 ease-out  data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel className="max-w-lg  border-gold/80 border-1 bg-background p-2">
          <div className="relative">
            <X
              className="absolute top-0 right-0 cursor-pointer"
              color="#e3b765"
              size="25"
              onClick={onClose}
            />
          </div>
          <div className="px-4 py-6">
            <DialogTitle className="text-2xl text-center">
              Added to cart, great choice!
            </DialogTitle>
            <div className="flex gap-4 py-4">
              <div className="w-1/2">
                <Image
                  width={1024}
                  height={1024}
                  alt={poster?.name ?? "unknown"}
                  className="w-full"
                  src={`/pictures/thumb/${poster?.thumbPath}`}
                />
              </div>
              <div className="w-1/2">
                <div className="text-2xl font-semibold">{poster?.name}</div>
                <div className="text-lg text-gold-400 mt-4">
                  ${poster?.price} USD
                </div>
                <div className="text-stone-400">{poster?.year}</div>
                <div className="text-stone-400">
                  {poster?.sizeWidthInch}&quot; × {poster?.sizeHeightInch}&quot;
                </div>
                <div className="text-white text-lg pt-2">
                  Quantity: {quantity}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="btn-gold" onClick={onClose}>
                Keep shopping
              </button>
              <Link href="/cart">
                <button className="btn-gold" onClick={onClose}>
                  View Cart
                </button>
              </Link>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalDialog;

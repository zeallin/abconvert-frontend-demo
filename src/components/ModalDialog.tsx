"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { X } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

interface ModalDialogProp {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalDialog = ({ isOpen, onClose }: ModalDialogProp) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      transition
      className="relative z-50 transition duration-300 ease-out  data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel className="max-w-lg  border-gold/80 border-2 bg-background p-2">
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
            <div className="flex p-4"></div>
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

"use client";

import { useSyncExternalStore } from "react";
import { getCartProduct } from "../data/cart-products";

export type CartLine = {
  productId: string;
  quantity: number;
};

const cartStorageKey = "ivend-quote-cart:v1";
const cartChangedEvent = "ivend-cart-changed";
const emptyCart: readonly CartLine[] = [];

let cachedRaw: string | null | undefined;
let cachedCart: readonly CartLine[] = emptyCart;
let memoryOnly = false;

function normaliseCart(value: unknown): readonly CartLine[] {
  if (!Array.isArray(value)) return emptyCart;

  const quantities = new Map<string, number>();
  value.forEach((candidate) => {
    if (!candidate || typeof candidate !== "object") return;
    const productId = "productId" in candidate ? candidate.productId : null;
    const quantity = "quantity" in candidate ? candidate.quantity : null;
    if (typeof productId !== "string" || !getCartProduct(productId)) return;
    if (typeof quantity !== "number" || !Number.isFinite(quantity)) return;
    const safeQuantity = Math.min(99, Math.max(1, Math.round(quantity)));
    quantities.set(productId, Math.min(99, (quantities.get(productId) ?? 0) + safeQuantity));
  });

  if (!quantities.size) return emptyCart;
  return Array.from(quantities, ([productId, quantity]) => ({ productId, quantity }));
}

function readCartSnapshot(): readonly CartLine[] {
  if (typeof window === "undefined" || memoryOnly) return cachedCart;

  try {
    const raw = window.localStorage.getItem(cartStorageKey);
    if (raw === cachedRaw) return cachedCart;
    cachedRaw = raw;
    cachedCart = raw ? normaliseCart(JSON.parse(raw)) : emptyCart;
  } catch {
    memoryOnly = true;
  }

  return cachedCart;
}

function notifyCartChanged() {
  window.dispatchEvent(new Event(cartChangedEvent));
}

function writeCart(lines: readonly CartLine[]) {
  const nextCart = normaliseCart(lines);
  const raw = JSON.stringify(nextCart);
  cachedCart = nextCart;
  cachedRaw = raw;

  if (!memoryOnly) {
    try {
      window.localStorage.setItem(cartStorageKey, raw);
    } catch {
      memoryOnly = true;
    }
  }

  notifyCartChanged();
}

function subscribe(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== cartStorageKey && event.key !== null) return;
    cachedRaw = undefined;
    onStoreChange();
  };
  window.addEventListener(cartChangedEvent, onStoreChange);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(cartChangedEvent, onStoreChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export function useCartLines() {
  return useSyncExternalStore(subscribe, readCartSnapshot, () => emptyCart);
}

export function addCartItem(productId: string) {
  if (!getCartProduct(productId)) return;
  const current = readCartSnapshot();
  const existing = current.find((line) => line.productId === productId);
  if (existing) {
    writeCart(current.map((line) => line.productId === productId
      ? { ...line, quantity: Math.min(99, line.quantity + 1) }
      : line));
    return;
  }
  writeCart([...current, { productId, quantity: 1 }]);
}

export function setCartQuantity(productId: string, quantity: number) {
  if (!getCartProduct(productId)) return;
  writeCart(readCartSnapshot().map((line) => line.productId === productId
    ? { ...line, quantity: Math.min(99, Math.max(1, Math.round(quantity))) }
    : line));
}

export function removeCartItem(productId: string) {
  writeCart(readCartSnapshot().filter((line) => line.productId !== productId));
}

export function clearCart() {
  writeCart(emptyCart);
}

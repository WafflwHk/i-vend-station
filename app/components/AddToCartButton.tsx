"use client";

import { useEffect, useRef, useState } from "react";
import { getCartProduct } from "../data/cart-products";
import { addCartItem } from "./cart-store";
import styles from "./add-to-cart-button.module.css";

type Props = {
  productId: string;
  variant?: "default" | "compact" | "light" | "blue";
  className?: string;
};

export default function AddToCartButton({ productId, variant = "default", className = "" }: Props) {
  const product = getCartProduct(productId);
  const [added, setAdded] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
  }, []);

  if (!product) return null;

  const addProduct = () => {
    addCartItem(product.id);
    setAdded(true);
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <>
      <button
        className={`${styles.button} ${styles[variant]} ${className}`.trim()}
        type="button"
        onClick={addProduct}
        aria-label={added ? `${product.name} added to cart` : `Add ${product.name} to cart`}
      >
        <span className={styles.bag} aria-hidden="true" />
        <span>{added ? "Added" : variant === "compact" ? "Add" : "Add to cart"}</span>
      </button>
      <span className={styles.liveStatus} aria-live="polite" aria-atomic="true">{added ? `${product.name} added to the quote cart.` : ""}</span>
    </>
  );
}

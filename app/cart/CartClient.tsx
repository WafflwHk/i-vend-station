"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import MachineArt from "../components/MachineArt";
import {
  clearCart,
  removeCartItem,
  setCartQuantity,
  useCartLines,
} from "../components/cart-store";
import { getCartProduct } from "../data/cart-products";
import styles from "./cart.module.css";

const subscribeToHydration = () => () => {};

export default function CartClient() {
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const lines = useCartLines();
  const [status, setStatus] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);

  const items = useMemo(() => lines.flatMap((line) => {
    const product = getCartProduct(line.productId);
    return product ? [{ ...line, product }] : [];
  }), [lines]);

  const totalUnits = items.reduce((total, item) => total + item.quantity, 0);
  const enquirySummary = useMemo(() => [
    "I Vend Station quotation enquiry",
    "",
    ...items.map((item) => `${item.quantity} × ${item.product.code} — ${item.product.name}`),
    "",
    "Please confirm pricing, availability, final configuration, and specifications.",
    "T05 compatibility, network, and merchant requirements must be checked where applicable.",
  ].join("\n"), [items]);

  const updateQuantity = (productId: string, name: string, quantity: number) => {
    setCartQuantity(productId, quantity);
    setStatus(`${name} quantity updated to ${Math.min(99, Math.max(1, Math.round(quantity)))}.`);
  };

  const removeItem = (productId: string, name: string) => {
    removeCartItem(productId);
    setStatus(`${name} removed from the quote cart.`);
    window.requestAnimationFrame(() => headingRef.current?.focus());
  };

  const clearAllItems = () => {
    if (!window.confirm("Remove every product from your quote cart?")) return;
    clearCart();
    setStatus("Quote cart cleared.");
    window.requestAnimationFrame(() => headingRef.current?.focus());
  };

  const copyEnquiry = async () => {
    try {
      await navigator.clipboard.writeText(enquirySummary);
      setStatus("Enquiry summary copied. You can now send it to I Vend Station.");
    } catch {
      summaryRef.current?.focus();
      summaryRef.current?.select();
      setStatus("The enquiry summary is selected. Copy it manually from the box.");
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>I VEND STATION</p>
        <h1 ref={headingRef} tabIndex={-1}>Your quote cart.</h1>
        <p>Add several machines or devices, then prepare one quotation enquiry. Prices and final configurations are confirmed before purchase.</p>
        <a href="/store">Continue shopping <span aria-hidden="true">&rarr;</span></a>
      </section>

      <p className={styles.liveStatus} aria-live="polite" aria-atomic="true">{status}</p>

      {!hydrated ? (
        <section className={styles.loadingState} aria-live="polite">Loading your quote cart&hellip;</section>
      ) : items.length === 0 ? (
        <section className={styles.emptyState}>
          <div className={styles.emptyBag} aria-hidden="true"><span>0</span></div>
          <p className={styles.eyebrow}>YOUR SELECTION</p>
          <h2>Your quote cart is empty.</h2>
          <p>Browse the machine range or add the T05 cashless device to prepare a multi-product enquiry.</p>
          <div>
            <a href="/machines">Browse machines <span aria-hidden="true">&rarr;</span></a>
            <a href="/products/t05-cashless-device">View cashless device</a>
          </div>
        </section>
      ) : (
        <section className={styles.cartLayout} aria-label="Quote cart contents">
          <div className={styles.cartItems}>
            <div className={styles.listHeading}>
              <div><p className={styles.eyebrow}>YOUR SELECTION</p><h2>{totalUnits} {totalUnits === 1 ? "item" : "items"}</h2></div>
              <button type="button" onClick={clearAllItems}>Clear cart</button>
            </div>

            {items.map(({ product, quantity }) => (
              <article className={styles.cartItem} key={product.id}>
                <div className={styles.productVisual}>
                  {product.image ? (
                    <img src={product.image} alt={product.imageAlt ?? product.name} />
                  ) : (
                    <MachineArt kind={product.art ?? "classic-art"} />
                  )}
                </div>
                <div className={styles.productCopy}>
                  <p>{product.type}</p>
                  <h3>{product.name}</h3>
                  <span>{product.code}</span>
                  <small>{product.id === "t05-cashless-device"
                    ? "Compatibility, network, and merchant setup must be confirmed."
                    : "Configuration, specifications, and availability must be confirmed."}</small>
                  <a href={product.href}>View product details <span aria-hidden="true">&rarr;</span></a>
                </div>
                <div className={styles.lineActions}>
                  <label htmlFor={`quantity-${product.id}`}>Quantity</label>
                  <div className={styles.quantityControl}>
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${product.name}`}
                      disabled={quantity <= 1}
                      onClick={() => updateQuantity(product.id, product.name, quantity - 1)}
                    >&minus;</button>
                    <input
                      id={`quantity-${product.id}`}
                      type="number"
                      min="1"
                      max="99"
                      inputMode="numeric"
                      value={quantity}
                      aria-label={`Quantity of ${product.name}`}
                      onChange={(event) => {
                        const nextQuantity = Number.parseInt(event.target.value, 10);
                        if (Number.isFinite(nextQuantity)) updateQuantity(product.id, product.name, nextQuantity);
                      }}
                    />
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${product.name}`}
                      disabled={quantity >= 99}
                      onClick={() => updateQuantity(product.id, product.name, quantity + 1)}
                    >+</button>
                  </div>
                  <button className={styles.removeButton} type="button" onClick={() => removeItem(product.id, product.name)}>Remove</button>
                </div>
              </article>
            ))}
          </div>

          <aside className={styles.summary} aria-labelledby="cart-summary-title">
            <p className={styles.eyebrow}>QUOTATION ENQUIRY</p>
            <h2 id="cart-summary-title">Ready to ask.</h2>
            <dl>
              <div><dt>Products</dt><dd>{items.length}</dd></div>
              <div><dt>Total quantity</dt><dd>{totalUnits}</dd></div>
              <div><dt>Pricing</dt><dd>Quotation required</dd></div>
            </dl>
            <label htmlFor="enquiry-summary">Your enquiry summary</label>
            <textarea id="enquiry-summary" ref={summaryRef} value={enquirySummary} readOnly rows={Math.min(10, Math.max(6, items.length + 4))} />
            <button className={styles.copyButton} type="button" onClick={copyEnquiry}>Copy enquiry summary</button>
            <a className={styles.contactButton} href="/#contact">Contact I Vend Station <span aria-hidden="true">&#8599;</span></a>
            <small>This prepares a quotation request only. No order has been placed, no stock is reserved, and no payment is processed.</small>
            <small>Your quote cart stays on this device and is not saved to your account.</small>
          </aside>
        </section>
      )}
    </>
  );
}

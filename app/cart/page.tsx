import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import CartClient from "./CartClient";
import styles from "./cart.module.css";

export const metadata: Metadata = {
  title: "Quote Cart | I Vend Station",
  description: "Review vending machines and cashless devices selected for an I Vend Station quotation enquiry.",
};

export default function CartPage() {
  return (
    <main className={styles.page}>
      <CartClient />
      <SiteFooter />
    </main>
  );
}

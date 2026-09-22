import { createWhatsAppQuoteHref } from "../lib/whatsapp";
import styles from "./request-quote-link.module.css";

type Props = {
  code?: string;
  name?: string;
  context?: "machine" | "cashless";
  variant?: "default" | "compact" | "light" | "blue";
  className?: string;
  label?: string;
};

export default function RequestQuoteLink({
  code,
  name,
  context = "machine",
  variant = "default",
  className = "",
  label,
}: Props) {
  const productLabel = [code, name].filter(Boolean).join(" — ");
  const visibleLabel = label ?? (variant === "compact" ? "Request quote" : "Request a Quote");

  return (
    <a
      className={`${styles.button} ${styles[variant]} ${className}`.trim()}
      href={createWhatsAppQuoteHref({ code, name, context })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${visibleLabel}${productLabel ? ` for ${productLabel}` : ""} via WhatsApp (opens in a new tab)`}
    >
      <span>{visibleLabel}</span>
      <b aria-hidden="true">&#8599;</b>
    </a>
  );
}

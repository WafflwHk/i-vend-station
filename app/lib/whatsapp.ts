const whatsappNumber = "601133180812";

type QuoteDetails = {
  code?: string;
  name?: string;
  context?: "machine" | "cashless";
};

export function createWhatsAppQuoteHref(details: QuoteDetails = {}) {
  const product = [details.code, details.name].filter(Boolean).join(" — ");
  const isCashless = details.context === "cashless";
  const message = [
    "Hello I Vend Station, I would like to request a quotation.",
    "",
    product ? `Product: ${product}` : "Support needed (buy, rent, customize, or repair):",
    ...(isCashless ? ["Vending machine model:", "Preferred payment setup:"] : ["Quantity:", "Intended products:"]),
    "Location:",
    "Requirements:",
    "",
    "Please confirm price, availability, configuration, and compatibility.",
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

import { machines } from "../data/machines";

export type AssistantLink = {
  label: string;
  href: string;
};

export type AssistantReply = {
  kind: "catalogue" | "shortlist" | "confirmation" | "guide" | "fallback";
  title: string;
  text: string;
  links: AssistantLink[];
};

type ProductEntity = {
  id: string;
  aliases: string[];
};

const machineEntities: ProductEntity[] = [
  { id: "tcn-d720-10c-v22-10r", aliases: ["tcn d720 10c v22 10r", "10c v22 10r", "double cabinet", "two cabinet", "high capacity"] },
  { id: "tcn-d720-10c-v22", aliases: ["tcn d720 10c v22", "10c v22", "touchscreen vending", "touch screen vending"] },
  { id: "tcn-d720-6g", aliases: ["tcn d720 6g", "d720 6g", "compact vending", "small vending"] },
  { id: "tcn-d720-10g", aliases: ["tcn d720 10g", "d720 10g", "classic vending", "standard vending"] },
  { id: "hot-cold-coffee-machine", aliases: ["hot cold coffee", "coffee machine", "coffee vending", "japan series"] },
];

const normalise = (value: string) => value
  .toLocaleLowerCase("en")
  .normalize("NFKD")
  .replace(/[^a-z0-9]+/g, " ")
  .trim()
  .replace(/\s+/g, " ")
  .slice(0, 240);

const hasPhrase = (value: string, phrase: string) => ` ${value} `.includes(` ${phrase} `);
const hasAny = (value: string, phrases: string[]) => phrases.some((phrase) => hasPhrase(value, phrase));

const machineLink = (slug: string): AssistantLink => {
  const machine = machines.find((item) => item.slug === slug);
  return {
    label: machine ? `View ${machine.name}` : "View machine",
    href: `/machines/${slug}`,
  };
};

const findEntities = (query: string) => machineEntities
  .filter((entity) => entity.aliases.some((alias) => hasPhrase(query, alias)))
  .map((entity) => entity.id);

const machineReply = (slug: string): AssistantReply => {
  const machine = machines.find((item) => item.slug === slug);
  if (!machine) return fallbackReply;
  return {
    kind: "catalogue",
    title: machine.name,
    text: `${machine.code}: ${machine.description}`,
    links: [machineLink(slug), { label: "Open the quote cart", href: "/cart" }],
  };
};

const fallbackReply: AssistantReply = {
  kind: "fallback",
  title: "I can help with the product range",
  text: "Ask me about coffee, compact, classic, touchscreen, or double-cabinet machines, the T05 cashless device, illustrative views, or preparing a quotation.",
  links: [{ label: "Browse all machines", href: "/machines" }, { label: "Open the quote cart", href: "/cart" }],
};

export function getProductAssistantReply(input: string, currentMachineSlug?: string): AssistantReply {
  const query = normalise(input);
  if (!query) return fallbackReply;

  const entities = findEntities(query);
  if (!entities.length && currentMachineSlug && hasAny(query, ["this machine", "this model", "current machine", "current model"])) {
    entities.push(currentMachineSlug);
  }
  const mentionsT05 = hasAny(query, ["t05", "cashless device", "cashless terminal"]);

  if (mentionsT05 && entities.length > 0 && hasAny(query, ["compatible", "compatibility", "work with", "connect to", "fit"])) {
    return {
      kind: "confirmation",
      title: "A compatibility check is required",
      text: "The website does not confirm that exact machine and T05 pairing. I Vend Station must check the machine controller, MDB or another approved interface, network, region, terminal configuration, and merchant requirements first.",
      links: [machineLink(entities[0]), { label: "View T05 compatibility", href: "/products/t05-cashless-device#compatibility" }],
    };
  }

  if (hasAny(query, ["high capacity", "more products", "large selection", "two cabinet", "double cabinet"])) {
    return {
      kind: "shortlist",
      title: "Compare the double-cabinet format",
      text: "The TCN-D720-10C (V22) + 10R is worth comparing for an expanded two-cabinet product plan. Exact capacity and cabinet configuration are project-specific.",
      links: [machineLink("tcn-d720-10c-v22-10r")],
    };
  }

  if (hasAny(query, ["dimension", "dimensions", "measurement", "measurements", "weight", "voltage", "power", "temperature range", "tray count", "slot count", "capacity", "outdoor", "waterproof", "rain proof", "certification"])) {
    return {
      kind: "confirmation",
      title: "That specification needs confirmation",
      text: "Physical dimensions, weight, electrical requirements, capacity, temperature range, outdoor rating, and certification are not published in the current catalogue. The S and L viewer controls change only the on-screen preview scale.",
      links: entities.length ? [machineLink(entities[0])] : [{ label: "Browse machines", href: "/machines" }],
    };
  }

  if (hasAny(query, ["price", "prices", "cost", "discount", "finance", "financing", "stock", "available now", "lead time", "delivery", "shipping", "warranty", "installation", "service plan"])) {
    return {
      kind: "confirmation",
      title: "Quotation and availability are confirmed directly",
      text: "The website does not publish fixed prices, stock, delivery times, warranty, or installation promises. A quotation depends on the exact model, configuration, availability, destination, and payment setup.",
      links: [{ label: "Prepare a quote cart", href: "/cart" }, { label: "Quotation details", href: "/#contact" }],
    };
  }

  if (hasAny(query, ["visa", "mastercard", "duitnow", "touch n go", "grabpay", "shopeepay", "boost", "alipay", "wechat", "paynow"])) {
    return {
      kind: "confirmation",
      title: "Payment brands depend on the approved setup",
      text: "T05 can support approved card, contactless, QR, or e-wallet categories, but this site does not promise a specific payment brand. Availability depends on region, merchant approval, and terminal configuration.",
      links: [{ label: "Explore the T05 device", href: "/products/t05-cashless-device" }],
    };
  }

  if (hasAny(query, ["colour", "color", "finish", "finishes", "blue finish", "size option", "s size", "l size"])) {
    return {
      kind: "guide",
      title: "Viewer choices are illustrative",
      text: "Alternative finishes do not confirm product availability. The S and L choices change only the viewer scale, not real machine dimensions or an orderable machine size. Final configuration is confirmed during quotation.",
      links: entities.length ? [machineLink(entities[0])] : [{ label: "Open the machine viewers", href: "/machines" }],
    };
  }

  if (hasAny(query, ["compare", "difference", "versus", "vs"]) && entities.length >= 2) {
    const first = machines.find((item) => item.slug === entities[0]);
    const second = machines.find((item) => item.slug === entities[1]);
    if (first && second) {
      return {
        kind: "catalogue",
        title: `Compare ${first.code} and ${second.code}`,
        text: `${first.name}: ${first.copy} ${second.name}: ${second.copy} Exact specifications and configurations still need confirmation.`,
        links: [machineLink(first.slug), machineLink(second.slug)],
      };
    }
  }

  if (hasAny(query, ["small space", "tight space", "compact", "limited space", "small location"])) {
    return {
      kind: "shortlist",
      title: "Start with the compact format",
      text: "The China Series compact machine is worth comparing because the catalogue presents it as a compact floor-standing format. Share your actual available floor space before a quotation because physical dimensions are not published here.",
      links: [machineLink("tcn-d720-6g"), { label: "Compare all machines", href: "/machines" }],
    };
  }

  if (mentionsT05 || hasAny(query, ["cashless", "contactless", "qr payment", "e wallet", "card payment", "nfc", "transaction report"])) {
    return {
      kind: "catalogue",
      title: "T05 cashless payment device",
      text: "T05 is a cashless option for compatible vending machines. Approved setups may support contactless or card payments, QR or e-wallet methods, transaction records, reporting, and Wi-Fi or 4G processing. Machine, network, region, terminal, and merchant checks are required.",
      links: [{ label: "Explore T05", href: "/products/t05-cashless-device" }, { label: "Open the quote cart", href: "/cart" }],
    };
  }

  if (hasAny(query, ["quote", "quotation", "order", "buy", "purchase", "cart"])) {
    return {
      kind: "guide",
      title: "Prepare a quotation request",
      text: "Add machines or T05 to the quote cart, set quantities, and copy the enquiry summary. This prepares a quotation list only; it does not place an order or take payment. Final price, availability, configuration, and compatibility are confirmed directly.",
      links: [{ label: "Open quote cart", href: "/cart" }, { label: "Continue shopping", href: "/store" }],
    };
  }

  if (hasAny(query, ["photo", "photos", "360", "spin", "front view", "side view", "rear view", "back view"])) {
    return {
      kind: "guide",
      title: "Machine views help you explore the format",
      text: "The front, side, rear, and spin views are illustrative unless a supplied image is explicitly marked as an actual product photo. Use them to compare the format, then confirm the exact unit before purchase.",
      links: [{ label: "Open machine viewers", href: "/machines" }],
    };
  }

  if (hasAny(query, ["contact", "email", "phone", "whatsapp", "talk to someone", "speak to someone"])) {
    return {
      kind: "guide",
      title: "Contact and quotation planning",
      text: "Prepare the model names, what you plan to sell, your location, available space, temperature needs, and preferred payment method. The quotation section is where I Vend Station’s final contact details can be used.",
      links: [{ label: "Go to quotation section", href: "/#contact" }, { label: "Prepare a quote cart", href: "/cart" }],
    };
  }

  if (hasAny(query, ["faq", "frequently asked", "common questions"])) {
    return {
      kind: "guide",
      title: "Frequently asked questions",
      text: "The FAQ covers the machine range, quotation-based pricing, T05 compatibility, illustrative 360-degree views, and the details needed for a quotation.",
      links: [{ label: "Open the FAQ", href: "/#faq" }],
    };
  }

  if (hasAny(query, ["account", "sign in", "login", "log in"])) {
    return {
      kind: "guide",
      title: "I Vend Station account",
      text: "Use the account page to sign in or view your profile. Your quote cart is stored only on this browser and device; it is not an order history or a completed purchase.",
      links: [{ label: "Open account", href: "/account" }, { label: "Open quote cart", href: "/cart" }],
    };
  }

  if (hasAny(query, ["all machines", "machine list", "what do you sell", "product range", "catalogue", "catalog"])) {
    return {
      kind: "catalogue",
      title: "Five machine formats are listed",
      text: "The catalogue includes a hot-and-cold coffee machine plus compact, classic, touchscreen, and double-cabinet TCN formats. Each product page includes an illustrative interactive viewer.",
      links: [{ label: "Browse all machines", href: "/machines" }],
    };
  }

  if (hasAny(query, ["hello", "hi", "hey", "good morning", "good afternoon", "help me"])) {
    return {
      kind: "guide",
      title: "Hello — what are you planning to sell?",
      text: "Tell me the product type, location or available space, temperature need, and preferred payment experience. I can then suggest machine formats worth comparing.",
      links: [{ label: "See the full range", href: "/machines" }],
    };
  }

  if (entities.length > 0) return machineReply(entities[0]);

  if (hasAny(query, ["coffee", "hot drink", "cold drink", "beverage"])) return machineReply("hot-cold-coffee-machine");
  if (hasAny(query, ["touchscreen", "touch screen", "visual screen"])) return machineReply("tcn-d720-10c-v22");

  return fallbackReply;
}

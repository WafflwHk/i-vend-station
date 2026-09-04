export type Highlight = {
  id: string;
  category: "New Arrival" | "Event" | "Promotion" | "Service" | "Company News" | "Product Update";
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  date?: string; // ISO YYYY-MM-DD; omit until a real publication date is confirmed.
  href?: string;
  linkLabel?: string;
  sample: boolean;
};

// Replace these explicitly labelled samples with approved IVEND announcements.
// Existing product photos illustrate the layout, not a new arrival or offer.
export const highlights: Highlight[] = [
  {
    id: "sample-arrival", category: "New Arrival", sample: true,
    title: "A space for new arrivals.",
    description: "Future machine arrivals will appear here once confirmed. This is a sample, not an availability announcement.",
    image: "/hot-cold-coffee-machine-cutout.png", imageAlt: "Existing Fuji coffee machine used to illustrate a sample update",
    href: "/machines", linkLabel: "Browse current machines",
  },
  {
    id: "sample-product", category: "Product Update", sample: true,
    title: "Product news, in one place.",
    description: "A preview of where future equipment updates will be shared. No product launch is being announced.",
    image: "/t05-views/t05-front-camera-down.webp", imageAlt: "Existing T05 cashless device used to illustrate a sample update",
    href: "/products/t05-cashless-device", linkLabel: "Explore the current T05",
  },
  {
    id: "sample-service", category: "Service", sample: true,
    title: "Stay connected with IVEND.",
    description: "Reserved for future service notices and company news. For current support, contact our team.",
    image: "/tcn-d720-product-cutout.png", imageAlt: "Existing TCN vending machine used to illustrate a sample service card",
    href: "/#contact", linkLabel: "Contact IVEND",
  },
];

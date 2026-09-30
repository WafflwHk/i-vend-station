import { catalogueMachines } from "../data/machines";
import { navigationLinks } from "../data/navigation";

export type SearchEntry = { title: string; description: string; href: string; keywords: string };

const pageDetails: Record<string, { title?: string; description: string; keywords: string }> = {
  "/store": { description: "Browse quotation-based machines and a compatible cashless device.", keywords: "products equipment catalogue" },
  "/machines": { description: "Compare coffee, touchscreen and full-size vending formats.", keywords: "vending machines models catalogue" },
  "/products/t05-cashless-device": { title: "T05 Cashless Device", description: "Contactless, card and QR payments for compatible machines.", keywords: "T05 payment terminal e-wallet cashless" },
  "/#about": { description: "See how IVEND helps plan equipment for unattended retail.", keywords: "IVEND IVS company Japan imported" },
  "/#faq": { description: "Find practical answers about quotations, compatibility and machine views.", keywords: "questions help specifications price" },
  "/#contact": { title: "Vending Machine Sales & Service Enquiries", description: "Ask about buying, renting, customization, repairs or maintenance.", keywords: "contact whatsapp quote quotation support service servicing refurbished second hand repair maintenance" },
};

export const searchIndex: SearchEntry[] = [
  ...catalogueMachines.map((machine) => ({
    title: machine.name,
    description: `${machine.code} · ${machine.comingSoon ? "Coming soon. " : ""}${machine.copy}`,
    href: `/machines/${machine.slug}`,
    keywords: [machine.code, machine.type, machine.description, ...machine.highlights].join(" "),
  })),
  ...navigationLinks.map((link) => ({ ...pageDetails[link.href], title: pageDetails[link.href]?.title ?? link.label, href: link.href })),
  { title: "Privacy Policy", description: "How IVEND handles your information.", href: "/privacy", keywords: "privacy data policy" },
];

const normalise = (text: string) => text.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, " ").trim();

export function searchSite(query: string): SearchEntry[] {
  const terms = normalise(query.slice(0, 160)).split(/\s+/).filter(Boolean);
  if (!terms.length) return query.trim() ? [] : searchIndex.slice(0, 6);
  return searchIndex.map((entry) => {
    const title = normalise(entry.title);
    const content = normalise(`${entry.title} ${entry.description} ${entry.keywords}`);
    return { entry, score: terms.every((term) => content.includes(term)) ? 1 + terms.filter((term) => title.includes(term)).length : 0 };
  }).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).map(({ entry }) => entry);
}

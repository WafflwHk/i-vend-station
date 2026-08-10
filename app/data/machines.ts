export type MachineViewerConfig = {
  body: string;
  trim: string;
  accent: string;
  width: number;
  height: number;
  depth: number;
  variant: "coffee" | "compact" | "classic" | "touch" | "double" | "frozen" | "hot";
};

export type Machine = {
  slug: string;
  code: string;
  name: string;
  type: string;
  art: string;
  image: string | null;
  imageAlt?: string;
  copy: string;
  description: string;
  highlights: string[];
  featured?: boolean;
  viewer: MachineViewerConfig;
};

export const machines: Machine[] = [
  {
    slug: "hot-cold-coffee-machine",
    code: "JAPAN SERIES",
    name: "Hot & Cold Coffee Machine",
    type: "Coffee vending",
    art: "coffee-art",
    image: "/hot-cold-coffee-machine.jpg",
    imageAlt: "Actual hot and cold coffee vending machine available from I Vend Station",
    copy: "The actual hot-and-cold coffee vending machine available from I Vend Station.",
    description:
      "A Japanese-style beverage vending machine for serving a hot-and-cold coffee selection from one cabinet. Final drink configuration, internal setup, and availability are confirmed when you request a quotation.",
    highlights: ["Hot and cold drink format", "Large product selection area", "Quotation based on the exact available unit"],
    featured: true,
    viewer: { body: "#eff0f2", trim: "#24282e", accent: "#c5a04b", width: 232, height: 410, depth: 188, variant: "coffee" },
  },
  {
    slug: "tcn-d720-6g",
    code: "TCN-D720-6G",
    name: "Compact Vending Machine",
    type: "Compact series",
    art: "compact-art",
    image: null,
    copy: "A compact floor-standing format for locations where space and a clean footprint matter.",
    description:
      "A compact TCN floor-standing format for projects that need a smaller footprint. Product layout, temperature configuration, and payment equipment depend on the selected machine setup.",
    highlights: ["Compact cabinet footprint", "Flexible product planning", "Cashless compatibility check available"],
    viewer: { body: "#e6e8eb", trim: "#20242a", accent: "#1d65e8", width: 196, height: 390, depth: 170, variant: "compact" },
  },
  {
    slug: "tcn-d720-10g",
    code: "TCN-D720-10G",
    name: "Classic Vending Machine",
    type: "Standard series",
    art: "classic-art",
    image: null,
    copy: "A full-size machine platform with a larger display area and flexible product configuration.",
    description:
      "A full-size TCN platform with a broad merchandising window. The exact tray layout, cooling configuration, and payment setup must be confirmed for the unit being quoted.",
    highlights: ["Full-size merchandising area", "Configurable product layout", "Multiple payment setup options"],
    viewer: { body: "#20242a", trim: "#090b0e", accent: "#2878ff", width: 226, height: 410, depth: 188, variant: "classic" },
  },
  {
    slug: "tcn-d720-10c-v22",
    code: "TCN-D720-10C (V22)",
    name: "Touchscreen Vending Machine",
    type: "Touchscreen series",
    art: "touch-art",
    image: null,
    copy: "A modern vending format with a visual touchscreen purchasing experience.",
    description:
      "A touchscreen-led TCN vending format designed for a more visual product-selection flow. Screen, tray, temperature, and payment specifications are confirmed before quotation.",
    highlights: ["Large touchscreen format", "Visual product-selection flow", "Configuration confirmed per project"],
    viewer: { body: "#171a1f", trim: "#07090c", accent: "#2c78ff", width: 228, height: 414, depth: 190, variant: "touch" },
  },
  {
    slug: "tcn-d720-10c-v22-10r",
    code: "TCN-D720-10C (V22) + 10R",
    name: "Double Cabinet Machine",
    type: "High-capacity series",
    art: "double-art",
    image: null,
    copy: "An expanded two-cabinet format for larger capacity and a broader product plan.",
    description:
      "An expanded two-cabinet TCN configuration for operators planning more product capacity. The paired cabinet arrangement and all technical specifications require confirmation for the exact project.",
    highlights: ["Two-cabinet format", "Expanded product capacity", "Project-specific configuration"],
    viewer: { body: "#1f2329", trim: "#090b0e", accent: "#2d7eff", width: 330, height: 410, depth: 190, variant: "double" },
  },
  {
    slug: "tcn-fel-9c-v22",
    code: "TCN-FEL-9C (V22)",
    name: "Frozen Food Vending Machine",
    type: "Frozen series",
    art: "frozen-art",
    image: null,
    copy: "A touchscreen machine format designed for frozen products and controlled cold storage.",
    description:
      "A specialised TCN machine format for selected frozen products. Product suitability, temperature requirements, loading format, and collection method need to be checked before purchase.",
    highlights: ["Frozen-product format", "Touchscreen purchasing", "Product suitability check required"],
    viewer: { body: "#d8ebf5", trim: "#477a96", accent: "#2878b8", width: 230, height: 412, depth: 192, variant: "frozen" },
  },
  {
    slug: "tcn-cfm-4c-h32",
    code: "TCN-CFM-4C (H32)",
    name: "Hot Food Vending Machine",
    type: "Hot food series",
    art: "hot-art",
    image: null,
    copy: "An automated machine format for storing and preparing selected packaged meals for collection.",
    description:
      "A specialised TCN format for selected packaged hot-food applications. Food type, heating process, holding conditions, and local operating requirements must be confirmed for the final configuration.",
    highlights: ["Hot-food application format", "Automated collection area", "Exact food setup must be verified"],
    viewer: { body: "#34312f", trim: "#161311", accent: "#f07a39", width: 232, height: 412, depth: 192, variant: "hot" },
  },
];

export function getMachine(slug: string) {
  return machines.find((machine) => machine.slug === slug);
}

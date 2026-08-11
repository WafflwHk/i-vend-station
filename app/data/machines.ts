export type MachineFinishOption = {
  id: string;
  label: string;
  swatch: string;
  body: string;
  trim: string;
  accent: string;
  illustrative?: boolean;
};

export type MachineViewerSizeOption = {
  id: "s" | "l";
  label: "S" | "L";
  description: string;
  previewScale: number;
  illustrative?: boolean;
};

export type MachineViewerConfig = {
  width: number;
  height: number;
  depth: number;
  variant: "coffee" | "compact" | "classic" | "touch" | "double" | "frozen" | "hot";
  finishes: readonly [MachineFinishOption, ...MachineFinishOption[]];
  sizes: readonly [MachineViewerSizeOption, ...MachineViewerSizeOption[]];
  defaultFinishId: string;
  defaultSizeId: MachineViewerSizeOption["id"];
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

const viewerSizeOptions: readonly [MachineViewerSizeOption, MachineViewerSizeOption] = [
  {
    id: "s",
    label: "S",
    description: "Smaller viewer scale",
    previewScale: 0.88,
    illustrative: true,
  },
  {
    id: "l",
    label: "L",
    description: "Current viewer scale",
    previewScale: 1,
  },
];

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
    viewer: {
      width: 232,
      height: 410,
      depth: 188,
      variant: "coffee",
      defaultFinishId: "original-white",
      defaultSizeId: "l",
      sizes: viewerSizeOptions,
      finishes: [
        { id: "original-white", label: "Original white", swatch: "#eff0f2", body: "#eff0f2", trim: "#24282e", accent: "#c5a04b" },
        { id: "midnight-preview", label: "Midnight", swatch: "#292d34", body: "#292d34", trim: "#090b0e", accent: "#c5a04b", illustrative: true },
        { id: "blue-preview", label: "Deep blue", swatch: "#315f91", body: "#315f91", trim: "#10243d", accent: "#d5a942", illustrative: true },
      ],
    },
  },
  {
    slug: "tcn-d720-6g",
    code: "China Series",
    name: "TCN-D720 Classic Touchscreen Vending Machine",
    type: "Compact series",
    art: "compact-art",
    image: "/tcn-d720-product-cutout.png",
    imageAlt: "Front view of the TCN-D720 vending machine with its background removed",
    copy: "A compact floor-standing format for locations where space and a clean footprint matter.",
    description:
      "A compact TCN floor-standing format for projects that need a smaller footprint. Product layout, temperature configuration, and payment equipment depend on the selected machine setup.",
    highlights: ["Compact cabinet footprint", "Flexible product planning", "Cashless compatibility check available"],
    viewer: {
      width: 196,
      height: 390,
      depth: 170,
      variant: "compact",
      defaultFinishId: "soft-silver",
      defaultSizeId: "l",
      sizes: viewerSizeOptions,
      finishes: [
        { id: "soft-silver", label: "Soft silver", swatch: "#e6e8eb", body: "#e6e8eb", trim: "#20242a", accent: "#1d65e8" },
        { id: "graphite-preview", label: "Graphite", swatch: "#30343a", body: "#30343a", trim: "#0d0f12", accent: "#4d91ff", illustrative: true },
        { id: "navy-preview", label: "Navy", swatch: "#274a72", body: "#274a72", trim: "#0e223b", accent: "#69a3ff", illustrative: true },
      ],
    },
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
    viewer: {
      width: 226,
      height: 410,
      depth: 188,
      variant: "classic",
      defaultFinishId: "midnight-black",
      defaultSizeId: "l",
      sizes: viewerSizeOptions,
      finishes: [
        { id: "midnight-black", label: "Midnight black", swatch: "#20242a", body: "#20242a", trim: "#090b0e", accent: "#2878ff" },
        { id: "silver-preview", label: "Silver", swatch: "#dfe2e6", body: "#dfe2e6", trim: "#31363d", accent: "#2878ff", illustrative: true },
        { id: "navy-preview", label: "Navy", swatch: "#233f65", body: "#233f65", trim: "#0d1a2b", accent: "#4f8fff", illustrative: true },
      ],
    },
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
    viewer: {
      width: 228,
      height: 414,
      depth: 190,
      variant: "touch",
      defaultFinishId: "space-black",
      defaultSizeId: "l",
      sizes: viewerSizeOptions,
      finishes: [
        { id: "space-black", label: "Space black", swatch: "#171a1f", body: "#171a1f", trim: "#07090c", accent: "#2c78ff" },
        { id: "silver-preview", label: "Silver", swatch: "#d8dce2", body: "#d8dce2", trim: "#303640", accent: "#367fff", illustrative: true },
        { id: "electric-blue-preview", label: "Electric blue", swatch: "#1b477e", body: "#1b477e", trim: "#0a213e", accent: "#67a4ff", illustrative: true },
      ],
    },
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
    viewer: {
      width: 330,
      height: 410,
      depth: 190,
      variant: "double",
      defaultFinishId: "graphite",
      defaultSizeId: "l",
      sizes: viewerSizeOptions,
      finishes: [
        { id: "graphite", label: "Graphite", swatch: "#1f2329", body: "#1f2329", trim: "#090b0e", accent: "#2d7eff" },
        { id: "silver-preview", label: "Silver", swatch: "#d5d9df", body: "#d5d9df", trim: "#343a43", accent: "#367fff", illustrative: true },
        { id: "blue-preview", label: "Deep blue", swatch: "#244d7e", body: "#244d7e", trim: "#0c2039", accent: "#70a9ff", illustrative: true },
      ],
    },
  },
];

export function getMachine(slug: string) {
  return machines.find((machine) => machine.slug === slug);
}

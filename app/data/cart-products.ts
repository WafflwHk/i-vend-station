import { machines } from "./machines";

export type CartProduct = {
  id: string;
  code: string;
  name: string;
  type: string;
  href: string;
  image: string | null;
  imageAlt?: string;
  art: string | null;
};

export const cartProducts: readonly CartProduct[] = [
  ...machines.map((machine) => ({
    id: machine.slug,
    code: machine.code,
    name: machine.name,
    type: machine.type,
    href: `/machines/${machine.slug}`,
    image: machine.image,
    imageAlt: machine.imageAlt,
    art: machine.art,
  })),
  {
    id: "t05-cashless-device",
    code: "T05",
    name: "T05 Cashless Device",
    type: "Cashless payment device",
    href: "/products/t05-cashless-device",
    image: "/t05-terminal-correct.png",
    imageAlt: "Actual grey T05 cashless payment device supplied by I Vend Station",
    art: null,
  },
];

export function getCartProduct(productId: string) {
  return cartProducts.find((product) => product.id === productId);
}

"use client";

import { useEffect } from "react";

export default function ProductShowcaseMotion() {
  useEffect(() => {
    const root = document.getElementById("product-showcase");
    if (!root) return;

    let active = true;
    let stop: (() => void) | undefined;
    void import("../lib/product-showcase-motion").then(({ startProductShowcaseMotion }) => {
      if (active) stop = startProductShowcaseMotion(root);
    }).catch((error: unknown) => console.warn("The product study is using its static layout.", error));

    return () => {
      active = false;
      stop?.();
    };
  }, []);

  return null;
}

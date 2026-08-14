export type T05PhotoFrame = {
  id: "front" | "right" | "back" | "left";
  label: string;
  src: string;
  alt: string;
};

export const t05PhotoFrames: readonly T05PhotoFrame[] = [
  {
    id: "front",
    label: "Front",
    src: "/t05-views/t05-front-camera-down.webp",
    alt: "Actual front view of the grey T05 device with its camera lens below the screen",
  },
  {
    id: "right",
    label: "Right angle",
    src: "/t05-views/t05-right-angle-camera-down.webp",
    alt: "Actual angled view of the right side and front of the grey T05 device",
  },
  {
    id: "back",
    label: "Back",
    src: "/t05-views/t05-back-camera-down.webp",
    alt: "Actual rear view of the grey T05 device showing its connection ports",
  },
  {
    id: "left",
    label: "Left angle",
    src: "/t05-views/t05-left-angle-camera-down.webp",
    alt: "Actual angled view of the left side and front of the grey T05 device",
  },
] as const;

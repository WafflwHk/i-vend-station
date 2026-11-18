"use client";

import { Button, Glass, type ButtonProps } from "glisse";
import { forwardRef, useImperativeHandle, useRef, type AnchorHTMLAttributes } from "react";
import { usePress } from "../lib/glisse/press";

type ControlSize = "compact" | "regular" | "large";
export type IVENDButtonProps = ButtonProps & { size?: ControlSize; loading?: boolean };

/** Glisse owns refraction and spring; IVEND owns tokens, sizing and semantics. */
export const IVENDButton = forwardRef<HTMLButtonElement, IVENDButtonProps>(function IVENDButton(
  { className = "", size = "regular", loading = false, disabled, children, ...props }, ref,
) {
  return <Button {...props} ref={ref} className={`ivend-control ${className}`.trim()} data-size={size}
    disabled={disabled || loading} aria-busy={loading || props["aria-busy"]}>
    {loading ? <span className="ivend-button-progress" aria-hidden="true" /> : null}
    {children}
  </Button>;
});

export const IVENDIconButton = forwardRef<HTMLButtonElement, IVENDButtonProps & { "aria-label": string }>(function IVENDIconButton(
  { className = "", ...props }, ref,
) {
  return <IVENDButton {...props} ref={ref} className={`ivend-icon-control ${className}`.trim()} />;
});

export type IVENDLinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "glass" | "filled";
  size?: ControlSize;
  iconOnly?: boolean;
};

/** A real anchor, never a navigating button or nested interactive element.
 * Glisse 0.6 has no polymorphic Button: Glass paints this link's surface,
 * and the upstream MIT press hook gives the anchor the identical spring feel.
 */
export const IVENDLinkButton = forwardRef<HTMLAnchorElement, IVENDLinkButtonProps>(function IVENDLinkButton(
  { className = "", variant = "glass", size = "regular", iconOnly = false, children, ...props }, forwardedRef,
) {
  const ref = useRef<HTMLAnchorElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current!);
  usePress(ref);
  return <a {...props} ref={ref} className={`ivend-control ivend-link-control ${iconOnly ? "ivend-icon-control " : ""}${className}`.trim()} data-size={size}>
    <Glass className="lg-button ivend-link-surface" data-variant={variant === "filled" ? "filled" : undefined}>
      {children}
    </Glass>
  </a>;
});

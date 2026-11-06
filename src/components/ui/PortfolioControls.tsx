"use client";
import Link from "next/link";
import { forwardRef, type ReactNode, type CSSProperties } from "react";
import { Button, LinkButton, type ButtonProps, type LinkButtonProps } from "@cloudflare/kumo/components/button";
import { LinkProvider, type LinkComponentProps } from "@cloudflare/kumo/utils";
const primaryStyle = {
  "--kumo-button-emphasis-bg": "var(--portfolio-button-brand)",
  "--kumo-button-emphasis-ring": "var(--portfolio-button-brand)",
  "--kumo-button-emphasis-gradient-start": "var(--portfolio-button-brand)",
  "--kumo-button-emphasis-gradient-end": "var(--portfolio-button-brand)",
} as CSSProperties;
const RouterLink = forwardRef<HTMLAnchorElement, LinkComponentProps>(function RouterLink({href, ...props}, ref) {
  return href?.startsWith("/") ? <Link ref={ref} href={href} {...props} /> : <a ref={ref} href={href} {...props} />;
});
export function PortfolioControlsProvider({children}: {children: ReactNode}) { return <LinkProvider component={RouterLink}>{children}</LinkProvider>; }
export const PortfolioButton = forwardRef<HTMLButtonElement, ButtonProps>(function PortfolioButton({className = "", variant = "secondary", style, ...props}, ref) {
  return <Button {...props} ref={ref} style={{...(variant === "primary" ? primaryStyle : {}), ...style}} variant={variant} className={`portfolio-button ${className}`} data-variant={variant} />;
});
export const PortfolioLinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(function PortfolioLinkButton({className = "", variant = "primary", style, ...props}, ref) {
  return <LinkButton {...props} ref={ref} style={{...(variant === "primary" ? primaryStyle : {}), ...style}} variant={variant} className={`portfolio-button ${className}`} data-variant={variant} />;
});

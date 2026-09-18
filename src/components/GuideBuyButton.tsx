import type { ReactNode } from "react";
import {
  GUIDE_CHECKOUT_URL,
  GUIDE_PRICE_USD,
  PAYHIP_PRODUCT_ID,
  isGuideCheckoutReady,
  type GuideCtaSource,
} from "../config/guide";
import { track } from "../analytics/track";

type GuideBuyButtonProps = {
  source: GuideCtaSource;
  variant?: "primary" | "text" | "on-dark";
  className?: string;
  children?: ReactNode;
};

function openPayhipOverlay(productId: string): boolean {
  const checkout = window.Payhip?.Checkout;
  if (!checkout) return false;

  if (typeof checkout.open === "function") {
    checkout.open({ product: productId });
    return true;
  }

  if (typeof checkout === "function") {
    checkout({ product: productId });
    return true;
  }

  return false;
}

export default function GuideBuyButton({
  source,
  variant = "primary",
  className = "",
  children,
}: GuideBuyButtonProps) {
  const label = children ?? `Get the guide — $${GUIDE_PRICE_USD}`;
  const classes = ["guide-buy", `guide-buy--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  if (!isGuideCheckoutReady || !GUIDE_CHECKOUT_URL) {
    if (variant === "text" || variant === "on-dark") {
      return (
        <a href="#guide" className={classes} onClick={() => track("rp_guide_cta_click", { source, ready: false })}>
          {label}
        </a>
      );
    }

    return (
      <button type="button" className={classes} disabled>
        Checkout coming soon
      </button>
    );
  }

  return (
    <a
      href={GUIDE_CHECKOUT_URL}
      className={`${classes} payhip-buy-button`}
      data-theme="none"
      data-product={PAYHIP_PRODUCT_ID}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        track("rp_guide_cta_click", { source, ready: true });
        if (PAYHIP_PRODUCT_ID && openPayhipOverlay(PAYHIP_PRODUCT_ID)) {
          event.preventDefault();
        }
      }}
    >
      {label}
    </a>
  );
}

import type { ReactNode } from "react";
import {
  FREE_GUIDE_PRODUCT_ID,
  FREE_GUIDE_URL,
  GUIDE_PRICE_USD,
  PAYHIP_PRODUCT_ID,
  guidePurchaseUrl,
  isGuideCheckoutReady,
  type GuideCtaSource,
} from "../config/guide";
import { track } from "../analytics/track";

type GuideBuyButtonProps = {
  source: GuideCtaSource;
  product?: "paid" | "free";
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
  product = "paid",
  variant = "primary",
  className = "",
  children,
}: GuideBuyButtonProps) {
  const classes = ["guide-buy", `guide-buy--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  if (product === "free") {
    return (
      <a
        href={FREE_GUIDE_URL}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          track("rp_free_guide_cta_click", { source });
          track("rp_payhip_click", {
            source,
            product: "free",
            product_id: FREE_GUIDE_PRODUCT_ID,
          });
        }}
      >
        {children ?? "Get the free guide \u2192"}
      </a>
    );
  }

  const label = children ?? `Get the guide — $${GUIDE_PRICE_USD}`;
  const href = guidePurchaseUrl(source);
  const opensProductPage = source === "hero";

  if (!isGuideCheckoutReady || !href) {
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
      href={href}
      className={opensProductPage ? classes : `${classes} payhip-buy-button`}
      data-theme={opensProductPage ? undefined : "none"}
      data-product={opensProductPage ? undefined : PAYHIP_PRODUCT_ID}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        track("rp_guide_cta_click", { source, ready: true });
        track("rp_payhip_click", {
          source,
          product: "paid",
          product_id: PAYHIP_PRODUCT_ID,
        });
        if (
          !opensProductPage &&
          PAYHIP_PRODUCT_ID &&
          openPayhipOverlay(PAYHIP_PRODUCT_ID)
        ) {
          event.preventDefault();
        }
      }}
    >
      {label}
    </a>
  );
}

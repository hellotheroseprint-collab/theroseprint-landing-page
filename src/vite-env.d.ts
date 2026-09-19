/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KIT_FORM_UID?: string;
  readonly VITE_PAYHIP_PRODUCT_ID?: string;
  readonly VITE_GUIDE_CHECKOUT_URL?: string;
  readonly VITE_PAYHIP_FREE_PRODUCT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

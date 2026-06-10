import { useEffect, useRef } from "react";
import { track } from "../analytics/track";

const FORM_UID = import.meta.env.VITE_KIT_FORM_UID as string | undefined;
const INLINE_FORM_ID = "9454569";

function getInlineFormHTML(uid: string) {
  return `<form action="https://app.kit.com/forms/${INLINE_FORM_ID}/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="${INLINE_FORM_ID}" data-uid="${uid}" data-format="inline" data-version="5" data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}' min-width="400 500 600 700 800"><div data-style="clean"><ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul><div data-element="fields" data-stacked="false" class="seva-fields formkit-fields"><div class="formkit-field"><input class="formkit-input" name="email_address" style="color: rgb(0, 0, 0); border-color: rgb(227, 227, 227); border-radius: 4px; font-weight: 400;" aria-label="Email Address" placeholder="Email Address" required type="email"></div><button data-element="submit" class="formkit-submit formkit-submit" style="color: rgb(255, 255, 255); background-color: rgb(44, 40, 37); border-radius: 999px; font-weight: 400;"><div class="formkit-spinner"><div></div><div></div><div></div></div><span>Get early access</span></button></div></div><style>.formkit-form[data-uid="${uid}"] *{box-sizing:border-box;}.formkit-form[data-uid="${uid}"]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}.formkit-form[data-uid="${uid}"] legend{border:none;font-size:inherit;margin-bottom:10px;padding:0;position:relative;display:table;}.formkit-form[data-uid="${uid}"] fieldset{border:0;padding:0.01em 0 0 0;margin:0;min-width:0;}.formkit-form[data-uid="${uid}"] body:not(:-moz-handler-blocked) fieldset{display:table-cell;}.formkit-form[data-uid="${uid}"] h1,.formkit-form[data-uid="${uid}"] h2,.formkit-form[data-uid="${uid}"] h3,.formkit-form[data-uid="${uid}"] h4,.formkit-form[data-uid="${uid}"] h5,.formkit-form[data-uid="${uid}"] h6{color:inherit;font-size:inherit;font-weight:inherit;}.formkit-form[data-uid="${uid}"] h2{font-size:1.5em;margin:1em 0;}.formkit-form[data-uid="${uid}"] h3{font-size:1.17em;margin:1em 0;}.formkit-form[data-uid="${uid}"] p{color:inherit;font-size:inherit;font-weight:inherit;}.formkit-form[data-uid="${uid}"] ol:not([template-default]),.formkit-form[data-uid="${uid}"] ul:not([template-default]),.formkit-form[data-uid="${uid}"] blockquote:not([template-default]){text-align:left;}.formkit-form[data-uid="${uid}"] p:not([template-default]),.formkit-form[data-uid="${uid}"] hr:not([template-default]),.formkit-form[data-uid="${uid}"] blockquote:not([template-default]),.formkit-form[data-uid="${uid}"] ol:not([template-default]),.formkit-form[data-uid="${uid}"] ul:not([template-default]){color:inherit;font-style:initial;}.formkit-form[data-uid="${uid}"] .ordered-list,.formkit-form[data-uid="${uid}"] .unordered-list{list-style-position:outside !important;padding-left:1em;}.formkit-form[data-uid="${uid}"] .list-item{padding-left:0;}.formkit-form[data-uid="${uid}"][data-format="modal"]{display:none;}.formkit-form[data-uid="${uid}"][data-format="slide in"]{display:none;}.formkit-form[data-uid="${uid}"][data-format="sticky bar"]{display:none;}.formkit-sticky-bar .formkit-form[data-uid="${uid}"][data-format="sticky bar"]{display:block;}.formkit-form[data-uid="${uid}"] .formkit-input,.formkit-form[data-uid="${uid}"] .formkit-select,.formkit-form[data-uid="${uid}"] .formkit-checkboxes{width:100%;}.formkit-form[data-uid="${uid}"] .formkit-button,.formkit-form[data-uid="${uid}"] .formkit-submit{border:0;border-radius:5px;color:#ffffff;cursor:pointer;display:inline-block;text-align:center;font-size:15px;font-weight:500;cursor:pointer;margin-bottom:15px;overflow:hidden;padding:0;position:relative;vertical-align:middle;}.formkit-form[data-uid="${uid}"] .formkit-button:hover,.formkit-form[data-uid="${uid}"] .formkit-submit:hover,.formkit-form[data-uid="${uid}"] .formkit-button:focus,.formkit-form[data-uid="${uid}"] .formkit-submit:focus{outline:none;}.formkit-form[data-uid="${uid}"] .formkit-button:hover>span,.formkit-form[data-uid="${uid}"] .formkit-submit:hover>span,.formkit-form[data-uid="${uid}"] .formkit-button:focus>span,.formkit-form[data-uid="${uid}"] .formkit-submit:focus>span{background-color:rgba(0,0,0,0.1);}.formkit-form[data-uid="${uid}"] .formkit-button>span,.formkit-form[data-uid="${uid}"] .formkit-submit>span{display:block;transition:all 300ms ease-in-out;padding:12px 24px;}.formkit-form[data-uid="${uid}"] .formkit-input{background:#ffffff;font-size:15px;padding:12px;border:1px solid #e3e3e3;flex:1 0 auto;line-height:1.4;margin:0;transition:border-color ease-out 300ms;}.formkit-form[data-uid="${uid}"] .formkit-input:focus{outline:none;border-color:#1677be;transition:border-color ease 300ms;}.formkit-form[data-uid="${uid}"] .formkit-input::placeholder{color:inherit;opacity:0.8;}.formkit-form[data-uid="${uid}"] .formkit-alert{background:#f9fafb;border:1px solid #e3e3e3;border-radius:5px;flex:1 0 auto;list-style:none;margin:25px auto;padding:12px;text-align:center;width:100%;}.formkit-form[data-uid="${uid}"] .formkit-alert:empty{display:none;}.formkit-form[data-uid="${uid}"] .formkit-alert-success{background:#d3fbeb;border-color:#10bf7a;color:#0c905c;}.formkit-form[data-uid="${uid}"] .formkit-alert-error{background:#fde8e2;border-color:#f2643b;color:#ea4110;}.formkit-form[data-uid="${uid}"] .formkit-spinner{display:flex;height:0px;width:0px;margin:0 auto;position:absolute;top:0;left:0;right:0;width:0px;overflow:hidden;text-align:center;transition:all 300ms ease-in-out;}.formkit-form[data-uid="${uid}"] .formkit-spinner>div{margin:auto;width:12px;height:12px;background-color:#fff;opacity:0.3;border-radius:100%;display:inline-block;animation:formkit-bouncedelay-formkit-form-data-uid-${uid}- 1.4s infinite ease-in-out both;}.formkit-form[data-uid="${uid}"] .formkit-spinner>div:nth-child(1){animation-delay:-0.32s;}.formkit-form[data-uid="${uid}"] .formkit-spinner>div:nth-child(2){animation-delay:-0.16s;}.formkit-form[data-uid="${uid}"] .formkit-submit[data-active] .formkit-spinner{opacity:1;height:100%;width:50px;}.formkit-form[data-uid="${uid}"] .formkit-submit[data-active] .formkit-spinner~span{opacity:0;}@keyframes formkit-bouncedelay-formkit-form-data-uid-${uid}-{0%,80%,100%{transform:scale(0);}40%{transform:scale(1);}}.formkit-form[data-uid="${uid}"]{max-width:700px;}.formkit-form[data-uid="${uid}"] [data-style="clean"]{width:100%;}.formkit-form[data-uid="${uid}"] .formkit-fields{display:flex;flex-wrap:wrap;margin:0 auto;}.formkit-form[data-uid="${uid}"] .formkit-field,.formkit-form[data-uid="${uid}"] .formkit-submit{margin:0 0 15px 0;flex:1 0 100%;}.formkit-form[data-uid="${uid}"] .formkit-powered-by-convertkit-container{margin:0;}.formkit-form[data-uid="${uid}"] .formkit-submit{position:static;}.formkit-form[data-uid="${uid}"][min-width~="700"] [data-style="clean"],.formkit-form[data-uid="${uid}"][min-width~="800"] [data-style="clean"]{padding:10px;}.formkit-form[data-uid="${uid}"][min-width~="700"] .formkit-fields[data-stacked="false"],.formkit-form[data-uid="${uid}"][min-width~="800"] .formkit-fields[data-stacked="false"]{margin-left:-5px;margin-right:-5px;}.formkit-form[data-uid="${uid}"][min-width~="700"] .formkit-fields[data-stacked="false"] .formkit-field,.formkit-form[data-uid="${uid}"][min-width~="800"] .formkit-fields[data-stacked="false"] .formkit-field,.formkit-form[data-uid="${uid}"][min-width~="700"] .formkit-fields[data-stacked="false"] .formkit-submit,.formkit-form[data-uid="${uid}"][min-width~="800"] .formkit-fields[data-stacked="false"] .formkit-submit{margin:0 5px 15px 5px;}.formkit-form[data-uid="${uid}"][min-width~="700"] .formkit-fields[data-stacked="false"] .formkit-field,.formkit-form[data-uid="${uid}"][min-width~="800"] .formkit-fields[data-stacked="false"] .formkit-field{flex:100 1 auto;}.formkit-form[data-uid="${uid}"][min-width~="700"] .formkit-fields[data-stacked="false"] .formkit-submit,.formkit-form[data-uid="${uid}"][min-width~="800"] .formkit-fields[data-stacked="false"] .formkit-submit{flex:1 1 auto;}</style></form>`;
}

export default function KitEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!FORM_UID || !containerRef.current) return;

    const container = containerRef.current;

    const existingForm = container.querySelector(
      `form[data-uid="${FORM_UID}"]`
    );
    if (!existingForm) {
      container.innerHTML = getInlineFormHTML(FORM_UID);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onSubmit = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target && container.contains(target)) {
        track("rp_waitlist_form_submit");
      }
    };

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !container.contains(target)) return;
      if (
        target instanceof HTMLInputElement &&
        target.type === "email"
      ) {
        track("rp_waitlist_form_focus");
      }
    };

    document.addEventListener("submit", onSubmit, true);
    container.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("submit", onSubmit, true);
      container.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  if (!FORM_UID) {
    return (
      <div className="waitlist-kit-placeholder">
        <p className="waitlist-kit-placeholder__title">Configure your Kit embed</p>
        <p className="waitlist-kit-placeholder__body">
          Add{" "}
          <code className="waitlist-kit-placeholder__code">
            VITE_KIT_FORM_UID
          </code>{" "}
          from your Kit form embed code (see{" "}
          <code className="waitlist-kit-placeholder__code">.env.example</code>
          ).
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="waitlist-kit-embed"
      data-kit-form-container
    />
  );
}

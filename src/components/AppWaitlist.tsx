import { useState, type FormEvent } from "react";
import Accent from "./Accent";
import { track } from "../analytics/track";
import {
  APP_EYEBROW,
  APP_LEDE,
  APP_NOTE,
  APP_SCREEN_ALT,
  WAITLIST_ERROR,
  WAITLIST_SUCCESS_TEXT,
  WAITLIST_SUCCESS_TITLE,
} from "../config/landing";

const INLINE_FORM_ID = "9454569";

export default function AppWaitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email || status === "sending") return;

    setStatus("sending");
    track("rp_waitlist_form_submit");

    try {
      const body = new FormData();
      body.append("email_address", email);
      await fetch(`https://app.kit.com/forms/${INLINE_FORM_ID}/subscriptions`, {
        method: "POST",
        body,
        mode: "no-cors",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="app" className="app">
      <div className="wrap app__card">
        <div className="phone">
          <img src="/app-home.png" alt={APP_SCREEN_ALT} />
        </div>
        <div className="app__copy">
          <span className="eyebrow eyebrow--muted">{APP_EYEBROW}</span>
          <h3>
            Track flares, spot patterns, keep the r<Accent>o</Accent>utine.
          </h3>
          <p>{APP_LEDE}</p>
        </div>
        <div id="waitlist" className="waitlist">
          {status === "success" ? (
            <div className="waitlist__success">
              <p className="waitlist__success-title">{WAITLIST_SUCCESS_TITLE}</p>
              <p className="waitlist__success-text">{WAITLIST_SUCCESS_TEXT}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="waitlist__row">
                <input
                  className="waitlist__input"
                  type="email"
                  name="email_address"
                  placeholder="Email address"
                  aria-label="Email address"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onFocus={() => track("rp_waitlist_form_focus")}
                />
                <button
                  className="guide-buy guide-buy--secondary guide-buy--md"
                  type="submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Joining…" : "Join"}
                </button>
              </div>
              {status === "error" && (
                <p className="waitlist__error" role="alert">
                  {WAITLIST_ERROR}
                </p>
              )}
              <p className="waitlist__note">{APP_NOTE}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

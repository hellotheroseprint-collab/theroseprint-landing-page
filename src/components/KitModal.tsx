import { useState, useEffect, useRef, useCallback } from "react";
import { track } from "../analytics/track";

const MODAL_FORM_ID = "9454542";
const SHOW_ONCE_KEY = "rp_modal_last_shown";
const SHOW_ONCE_DAYS = 15;
const TIMER_SECONDS = 20;

function shouldShowModal(): boolean {
  try {
    const lastShown = localStorage.getItem(SHOW_ONCE_KEY);
    if (!lastShown) return true;
    const daysSince =
      (Date.now() - Number(lastShown)) / (1000 * 60 * 60 * 24);
    return daysSince >= SHOW_ONCE_DAYS;
  } catch {
    return true;
  }
}

function markShown() {
  try {
    localStorage.setItem(SHOW_ONCE_KEY, String(Date.now()));
  } catch {
    /* localStorage unavailable */
  }
}

interface KitModalProps {
  open: boolean;
  onClose: () => void;
}

export default function KitModal({ open, onClose }: KitModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setEmail("");
      setStatus("idle");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "sending") return;

    setStatus("sending");
    track("rp_modal_form_submit");

    try {
      const body = new FormData();
      body.append("email_address", email);

      await fetch(
        `https://app.kit.com/forms/${MODAL_FORM_ID}/subscriptions`,
        { method: "POST", body, mode: "no-cors" }
      );

      setStatus("success");
      track("rp_modal_form_success");
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div className="kit-modal-overlay" onClick={handleBackdropClick}>
      <div className="kit-modal-container" role="dialog" aria-modal="true">
        <button
          className="kit-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </button>

        <div className="kit-modal-body">
          {status === "success" ? (
            <div className="kit-modal-success">
              <div className="kit-modal-success__icon">&#10003;</div>
              <h2 className="kit-modal-success__title">You&apos;re in!</h2>
              <p className="kit-modal-success__text">
                Check your inbox to confirm your spot on the waitlist.
              </p>
              <button
                type="button"
                className="kit-modal-success__close"
                onClick={onClose}
              >
                Got it
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="kit-modal-form">
              <h2 className="kit-modal-form__title">
                Be the first to try Roseprint
              </h2>
              <p className="kit-modal-form__sub">
                Join the waitlist for early access &mdash; no spam, ever.
              </p>

              <div className="kit-modal-form__field">
                <input
                  ref={inputRef}
                  type="email"
                  name="email_address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  aria-label="Email Address"
                  required
                  className="kit-modal-form__input"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="kit-modal-form__submit"
              >
                {status === "sending" ? "Joining\u2026" : "Get early access"}
              </button>

              {status === "error" && (
                <p className="kit-modal-form__error">
                  Something went wrong. Please try again.
                </p>
              )}

              <p className="kit-modal-form__disclaimer">
                We respect your privacy. Unsubscribe at anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function useKitModalTimer() {
  const timerFired = useRef(false);

  const start = useCallback((openModal: () => void) => {
    if (timerFired.current) return;
    if (!shouldShowModal()) return;

    const id = setTimeout(() => {
      timerFired.current = true;
      markShown();
      track("rp_modal_timer_open");
      openModal();
    }, TIMER_SECONDS * 1000);

    return () => clearTimeout(id);
  }, []);

  const triggerFromClick = useCallback((openModal: () => void) => {
    markShown();
    track("rp_modal_cta_open");
    openModal();
  }, []);

  return { start, triggerFromClick };
}

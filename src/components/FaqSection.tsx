const FAQ_ITEMS = [
  {
    q: "Is Roseprint a medical diagnosis?",
    a: "No. Roseprint helps you track and understand patterns; it doesn't replace a dermatologist. Always seek professional advice for diagnosis and treatment.",
  },
  {
    q: "Who is this for?",
    a: "Adults managing rosacea who want clearer patterns, fewer guesses, and a routine that fits their real life.",
  },
  {
    q: "What do I get if I join the waitlist?",
    a: "Early access invitations, launch updates, and the chance to shape the product with feedback.",
  },
  {
    q: "How will you use my email?",
    a: "Only for waitlist and launch-related messages. You can unsubscribe any time.",
  },
  {
    q: "Will there be a cost?",
    a: "We'll share pricing clearly before you commit to anything. Joining the waitlist is free.",
  },
] as const;

export default function FaqSection() {
  return (
    <section id="faq" className="section section--faq">
      <div className="section__inner content-block">
        <h2 className="section__heading">Questions</h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="faq-item">
              <summary className="faq-item__summary">{item.q}</summary>
              <p className="faq-item__body">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

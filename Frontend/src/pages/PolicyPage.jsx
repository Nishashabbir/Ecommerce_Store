import { Footer, Link } from "../components";
import { Header } from "../navigation";

export const policyPages = {
  "/policies/returns": {
    eyebrow: "Policies / Returns",
    title: (
      <>
        Return & refund
        <br />
        <em>policy.</em>
      </>
    ),
    intro:
      "We hope every Loop piece feels just right. If something is not as expected, we are here to help.",
    sections: [
      [
        "Returns",
        "You may request a return within 14 days of delivery. To be eligible, the piece must be unused, in its original condition and returned with any original packaging.",
      ],
      [
        "How to start a return",
        "Email hello@loopstudio.pk with your order number and a short note about your return. We will reply with the next steps and return instructions.",
      ],
      [
        "Refunds",
        "Once your return is received and inspected, we will let you know whether it has been approved. Approved refunds are returned to the original payment method.",
      ],
      [
        "Non-returnable items",
        "Custom, made-to-order and final-sale pieces cannot be returned unless they arrive damaged or incorrect.",
      ],
    ],
  },
  "/policies/privacy": {
    eyebrow: "Policies / Privacy",
    title: (
      <>
        Privacy, kept
        <br />
        <em>simple.</em>
      </>
    ),
    intro:
      "Your trust matters to us. This page explains the small amount of information we collect and how we use it.",
    sections: [
      [
        "Information we collect",
        "When you place an order or subscribe, we may collect details such as your name, email address, delivery address and order information.",
      ],
      [
        "How we use it",
        "We use this information to fulfil orders, answer your questions and, where you choose to receive them, send studio updates.",
      ],
      [
        "Keeping it safe",
        "We use reasonable safeguards to protect your information and do not sell your personal information to third parties.",
      ],
      [
        "Your choices",
        "You may unsubscribe from studio emails at any time. To ask about or update your information, email hello@loopstudio.pk.",
      ],
    ],
  },
};

export default function PolicyPage({ policy }) {
  return (
    <>
      <Header />
      <main className="policy-page">
        <article className="policy-document">
          <header className="policy-intro">
            <p className="eyebrow">{policy.eyebrow}</p>
            <h1>{policy.title}</h1>
            <p>{policy.intro}</p>
          </header>
          <div className="policy-content">
            {policy.sections.map(([heading, copy]) => (
              <section key={heading}>
                <h2>{heading}</h2>
                <p>{copy}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}



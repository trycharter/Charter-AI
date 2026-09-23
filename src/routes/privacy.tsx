import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/charter/LegalPage";

const title = "Privacy Policy — Charter AI";
const description =
  "How Charter collects, uses and protects the limited information gathered through the early-access waitlist.";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
});

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="September 23, 2026">
      <p>
        Charter collects a limited amount of information when you join our early-access waitlist.
      </p>

      <h2>Information we collect</h2>
      <p>When you join the Charter waitlist, we may collect:</p>
      <ul>
        <li>Your name</li>
        <li>Your email address</li>
        <li>Basic technical information needed to protect the form from abuse</li>
      </ul>

      <h2>How we use your information</h2>
      <p>We use this information to:</p>
      <ul>
        <li>Manage the Charter early-access waitlist</li>
        <li>Send your signup confirmation</li>
        <li>Contact you about early access</li>
        <li>Send occasional product updates and invitations</li>
        <li>Improve our understanding of interest in Charter</li>
      </ul>

      <h2>Service providers</h2>
      <p>We use third-party providers to operate parts of the waitlist:</p>
      <ul>
        <li>Resend for contact management and email delivery</li>
        <li>Cloudflare Turnstile for spam and abuse protection</li>
        <li>Vercel for hosting and application infrastructure</li>
      </ul>
      <p>
        These providers may process limited information as necessary to provide their services.
      </p>

      <h2>Data sharing</h2>
      <p>We do not sell your personal information.</p>
      <p>
        We may share information with service providers only when necessary to operate Charter and
        the waitlist.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain waitlist information while it is useful for managing early access and product
        communication, unless you ask us to delete it.
      </p>

      <h2>Your choices</h2>
      <p>
        You may request access to, correction of, or deletion of your waitlist information by
        contacting us.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions or deletion requests, contact:{" "}
        <a href="mailto:hello@trycharter.io">hello@trycharter.io</a>
      </p>
      <p>Charter may update this policy as the product evolves.</p>
    </LegalPage>
  );
}

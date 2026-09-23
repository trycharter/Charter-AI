import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/charter/LegalPage";

const title = "Terms of Use — Charter AI";
const description =
  "The terms that apply to the Charter website and the Charter early-access waitlist.";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
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

function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="September 23, 2026">
      <p>These terms apply to the Charter website and early-access waitlist.</p>

      <h2>Early access</h2>
      <p>Joining the waitlist does not guarantee immediate or future access to Charter.</p>
      <p>
        Charter may invite users to early-access programs in stages and may change availability at
        any time.
      </p>

      <h2>Product status</h2>
      <p>
        Charter is currently under development. Features, functionality, pricing and availability
        may change before or during early access.
      </p>

      <h2>Communications</h2>
      <p>
        By joining the waitlist, you agree to receive emails related to Charter early access,
        product updates and invitations.
      </p>
      <p>You may opt out of non-essential communications where applicable.</p>

      <h2>Acceptable use</h2>
      <p>
        You may not misuse the Charter website, attempt to interfere with its operation, abuse the
        waitlist system, or use automated systems to submit fraudulent registrations.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Charter branding, website content, product concepts and related materials are owned by
        Charter or their respective rights holders.
      </p>

      <h2>No warranties</h2>
      <p>
        The website and early-access materials are provided on an “as is” basis while Charter is
        under development.
      </p>

      <h2>Limitation</h2>
      <p>
        Charter is not responsible for losses resulting from reliance on pre-release product
        descriptions or early-access availability.
      </p>

      <h2>Changes</h2>
      <p>These terms may be updated as Charter evolves.</p>

      <h2>Contact</h2>
      <p>
        Questions can be sent to: <a href="mailto:hello@trycharter.io">hello@trycharter.io</a>
      </p>
    </LegalPage>
  );
}

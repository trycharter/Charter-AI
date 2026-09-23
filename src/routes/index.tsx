import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/charter/Nav";
import { Hero } from "@/components/charter/Hero";
import { Problem } from "@/components/charter/Problem";
import { Flow } from "@/components/charter/Flow";
import { Progression } from "@/components/charter/Progression";
import { Workspace } from "@/components/charter/Workspace";
import { Why } from "@/components/charter/Why";
import { Faq } from "@/components/charter/Faq";
import { FinalCta } from "@/components/charter/FinalCta";
import { Footer } from "@/components/charter/Footer";
import { WaitlistDialog } from "@/components/charter/WaitlistDialog";

const title = "Charter AI — AI-Native Project Management for Freelancers";
const description =
  "Turn messy client conversations, briefs, files and decisions into a clear project workspace. Charter AI is AI-native project management built for freelancers.";
const canonical = "https://www.trycharter.io/";
const socialDescription =
  "Turn messy client conversations into a project you can actually run.";
const socialImage = "https://www.trycharter.io/charter-og.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: socialDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: socialImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: socialDescription },
      { name: "twitter:image", content: socialImage },
    ],
    links: [{ rel: "canonical", href: canonical }],
  }),
});

function Index() {
  return (
    <div className="relative bg-cream">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Flow />
        <Progression />
        <Workspace />
        <Why />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WaitlistDialog />
    </div>
  );
}

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

const title = "Charter AI — AI-Native Project Management for Freelancers";
const description =
  "Turn messy client conversations into clear scope, client-ready contracts, actionable tasks and one organized workspace with Charter AI.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: "Charter AI" },
      { property: "og:description", content: "AI-native project management for freelancers." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Charter AI" },
      { name: "twitter:description", content: "AI-native project management for freelancers." },
    ],
    links: [{ rel: "canonical", href: "/" }],
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
    </div>
  );
}

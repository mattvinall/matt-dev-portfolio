import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/sections/about";
import { Stack } from "@/components/sections/stack";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Stack />
        <Work />
        <Experience />
        <Contact />
      </main>
    </>
  );
}

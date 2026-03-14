import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import FramerBuilds from "@/components/FramerBuilds";
import AboutMe from "@/components/AboutMe";
import Photography from "@/components/Photography";
import Footer from "@/components/Footer";
import { getPortfolioContent } from "@/lib/content/queries";

export default async function Home() {
  const content = await getPortfolioContent();

  return (
    <>
      <Navbar navItems={content.navItems} socialLinks={content.socialLinks} />
      <main>
        <Hero hero={content.hero} />
        <Work projects={content.workProjects} />
        <FramerBuilds builds={content.framerBuilds} />
        <AboutMe about={content.about} />
        <Photography destinations={content.photography} />
      </main>
      <Footer socialLinks={content.socialLinks} footer={content.footer} />
    </>
  );
}

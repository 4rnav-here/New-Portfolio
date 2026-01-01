import { Navbar } from "@/components/Navbar";
import { SocialSidebar } from "@/components/SocialSidebar";
import { Hero } from "@/components/Hero";
import { WhoIsArnav } from "@/components/WhoIsArnav";
import { Projects } from "@/components/Projects";
import { AIProjects } from "@/components/AIProjects";
import { BackendWork } from "@/components/BackendWork";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { VerticalTimeline } from "@/components/VerticalTimeline";
import { BackgroundEffects } from "@/components/BackgroundEffects";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground dark relative scroll-smooth">
      {/* Background effects */}
      <BackgroundEffects />
      
      {/* Custom cursor (desktop only) */}
      <CustomCursor />
      
      {/* Vertical timeline spine */}
      <VerticalTimeline />
      
      <Navbar />
      <SocialSidebar />
      
      <main className="lg:pl-16 relative z-10">
        <Hero />
        <WhoIsArnav />
        <Projects />
        <AIProjects />
        <BackendWork />
        <TechStack />
        <Experience />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

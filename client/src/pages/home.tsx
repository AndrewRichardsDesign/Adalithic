import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import Features from "@/components/features";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Features />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

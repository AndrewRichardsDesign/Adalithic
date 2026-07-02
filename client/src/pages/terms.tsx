import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { TermsOfUseContent } from "@/components/terms-of-use-content";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-secondary mb-8">Terms of Use</h1>
          <TermsOfUseContent />
        </div>
      </section>
      <Footer />
    </div>
  );
}

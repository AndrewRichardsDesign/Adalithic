export default function About() {
  const features = [
    "AI-Powered Translation",
    "Multi-Language Support",
    "Real-time Practice",
    "Cross-Platform Compatibility",
    "Seamless Integration",
  ];

  const useCases = [
    "Language Learning",
    "International Business",
    "Travel Communication",
    "Social Media Interaction",
    "Educational Tools",
  ];

  return (
    <section id="about" className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-secondary mb-6">About Adalithic</h2>
            <div className="space-y-6 text-gray-600">
              <p className="text-lg leading-relaxed">Adalithic is a tech startup focused on giving people new tools and techniques for learning languages and facilitating cross-language communication.</p>
              <p className="text-lg leading-relaxed">
                We believe that language barriers should never limit human connection and
                collaboration. Our mission is to create tools that make cross-cultural
                communication effortless and engaging, empowering people to connect globally
                while learning naturally.
              </p>
              
            </div>
            
          </div>
          <div className="relative">
            
            
          </div>
        </div>
      </div>
    </section>
  );
}

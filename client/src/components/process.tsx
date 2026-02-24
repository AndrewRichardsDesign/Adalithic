import { Card, CardContent } from "@/components/ui/card";

export default function Process() {
  const processSteps = [
    {
      title: "Research & Discovery",
      description: "Understanding user needs, business goals, and market opportunities through comprehensive research.",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    },
    {
      title: "Ideation & Wireframing",
      description: "Brainstorming solutions and creating low-fidelity wireframes to explore different concepts.",
      image: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    },
    {
      title: "Prototyping & Testing",
      description: "Building interactive prototypes and conducting user testing to validate design decisions.",
      image: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    },
    {
      title: "Design & Handoff",
      description: "Delivering polished designs with detailed specifications and supporting development teams.",
      image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    },
  ];

  return (
    <section className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">My Design Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A human-centered approach to solving complex problems through research, iteration, and collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <Card key={index} className="bg-white rounded-xl shadow-lg text-center">
              <CardContent className="p-8">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-40 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold text-secondary mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

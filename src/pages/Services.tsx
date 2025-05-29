
import React from "react";
import ServiceCard from "@/components/ServiceCard";

const Services = () => {
  const services = [
    {
      title: "Executive Coaching",
      description: "One-on-one coaching for leaders navigating complexity, change, and performance pressure. Custom frameworks for decision-making, strategic clarity, and sustainable high performance.",
      slug: "executive-coaching"
    },
    {
      title: "Productivity Systems Design",
      description: "Custom productivity architectures for individuals and teams. Streamlined workflows, focused environments, and mental models that eliminate overwhelm and create sustainable results.",
      slug: "productivity-systems"
    },
    {
      title: "Project Recovery & Turnaround",
      description: "Specialized intervention for troubled initiatives. Strategic assessment, realignment, and execution planning to transform challenged projects into successful outcomes.",
      slug: "project-recovery"
    },
    {
      title: "Team Performance Optimization",
      description: "Performance engineering for teams facing complex deliverables. Communication frameworks, decision protocols, and execution rhythms that build alignment and velocity.",
      slug: "team-performance"
    },
    {
      title: "Strategic Planning Facilitation",
      description: "Guided planning sessions that translate vision into actionable strategy. Clarity on priorities, resource allocation, and measurable outcomes for organizations at inflection points.",
      slug: "strategic-planning"
    },
    {
      title: "Speaking & Workshops",
      description: "Engaging presentations and interactive workshops on productivity, performance psychology, and strategic execution for conferences, leadership teams, and organizations.",
      slug: "speaking"
    }
  ];

  return (
    <div>
      <section className="section pb-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-playfair">Services</h1>
            <p className="text-xl text-gray-700 mb-8">
              Specialized offerings designed to transform ambition into achievement through strategic clarity, optimized execution, and sustained high performance.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.title}
                description={service.description}
                slug={service.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair mb-6">Custom Engagements</h2>
            <p className="text-lg text-gray-700 mb-8">
              Looking for something specific? I develop custom solutions for unique challenges, including hybrid approaches that leverage multiple areas of expertise.
            </p>
            <a 
              href="/contact" 
              className="border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors duration-300"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </section>

      <section className="section border-t border-gray-200">
        <div className="container">
          <h2 className="text-center font-playfair mb-16">Client Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <blockquote>
              <p className="text-lg italic mb-4">
                "The strategic frameworks provided brought immediate clarity to our most complex challenges. Six months later, we're seeing measurable improvements in team performance and project outcomes."
              </p>
              <cite className="text-sm not-italic text-gray-700">
                — VP of Operations, Technology Company
              </cite>
            </blockquote>
            <blockquote>
              <p className="text-lg italic mb-4">
                "The productivity system we developed together transformed my workday. I've gained back 10+ hours weekly while increasing output quality and experiencing significantly less stress."
              </p>
              <cite className="text-sm not-italic text-gray-700">
                — Chief Marketing Officer, Retail Brand
              </cite>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

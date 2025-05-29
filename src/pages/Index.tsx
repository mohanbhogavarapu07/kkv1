import React from "react";
import Hero from "@/components/Hero";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <Hero />
      
      {/* Areas of Expertise */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <h2 className="heading-lg text-center mb-16">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
            <div className="border-t-2 border-black pt-8 px-4">
              <h3 className="text-xl font-playfair mb-4">Project Manager</h3>
              <p className="text-gray-700">Strategic leadership for complex initiatives, with a focus on adaptability, team alignment, and measurable outcomes.</p>
            </div>
            <div className="border-t-2 border-black pt-8 px-4">
              <h3 className="text-xl font-playfair mb-4">Performance Coach</h3>
              <p className="text-gray-700">Evidence-based coaching to break through limitations, establish powerful habits, and achieve sustainable high performance.</p>
            </div>
            <div className="border-t-2 border-black pt-8 px-4">
              <h3 className="text-xl font-playfair mb-4">Competitive Athlete</h3>
              <p className="text-gray-700">Elite competitor applying lessons from sport to business, leveraging discipline, goal-setting and strategic thinking.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-center font-playfair">The intersection of discipline & possibility</h2>
            <p className="text-center text-lg mt-6 mb-8 text-gray-700">
              I help high-achievers translate ambition into meaningful results, through strategic planning, intentional productivity systems, and mental performance coaching.
            </p>
            <div className="flex justify-center gap-6 mt-12">
              {/* <Link
                to="/services"
                className="border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors duration-300"
              >
                View Services
              </Link> */}
              <Link
                to="/about"
                className="flex items-center group"
              >
                <span className="border-b border-black pb-1 mr-2 group-hover:mr-4 transition-all duration-300">
                  About Me
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="text-center mb-12">Latest Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <article>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Productivity</span>
              <h3 className="text-xl md:text-2xl font-playfair mt-2 mb-3">
                <Link to="/blog/strategic-rest" className="hover:text-gray-700 transition-colors">
                  Strategic Rest: Why High-Achievers Need to Master Recovery
                </Link>
              </h3>
              <p className="text-gray-700">
                The counterintuitive approach to productivity that leverages rest as a strategic advantage rather than a necessary evil.
              </p>
            </article>
            <article>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Leadership</span>
              <h3 className="text-xl md:text-2xl font-playfair mt-2 mb-3">
                <Link to="/blog/decision-frameworks" className="hover:text-gray-700 transition-colors">
                  Decision Frameworks for Overwhelming Complexity
                </Link>
              </h3>
              <p className="text-gray-700">
                How to make clear, confident decisions when facing ambiguity, competing priorities, and information overload.
              </p>
            </article>
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/insights"
              className="inline-flex items-center group"
            >
              <span className="border-b border-black pb-1 mr-2 group-hover:mr-4 transition-all duration-300">
                View all insights
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

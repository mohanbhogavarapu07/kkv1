
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <section className="section pb-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-playfair">About</h1>
            <p className="text-xl text-gray-700 mb-8">
              I'm a multidisciplinary professional helping ambitious individuals achieve exceptional performance by integrating strategies from project management, athletic competition, and behavioral psychology.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
            <div>
              <h2 className="text-2xl font-playfair mb-4">My Approach</h2>
            </div>
            <div className="md:col-span-2">
              <p>
                With over 9 years of experience in high-performance environments—managing complex strategic initiatives, competing at elite athletic levels, and building businesses from the ground up—I've developed a distinctive methodology that bridges the gap between theory and execution. My work consistently operates at the intersection of strategic vision and practical implementation, helping individuals and organizations unlock sustainable growth and peak performance.
              </p>
              <p>
                I specialize in translating abstract ideas into tangible results through customized systems, actionable frameworks, and hands-on implementation support. From advising CEOs on strategic clarity and organizational alignment, to helping startup founders optimize operations and scale efficiently, to coaching high-potential professionals through career transitions—I bring a tailored, results-oriented approach to every engagement.
              </p>
              {/* <p>
                Whether working with CEOs on strategic clarity, helping entrepreneurs streamline operations, or coaching professionals through transitions, my philosophy remains consistent: exceptional performance requires both technical excellence and psychological mastery.
              </p> */}
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-gray-200">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-16 gap-x-8">
            <div className="md:border-r md:border-gray-200 md:pr-8">
              <h3 className="text-xl font-playfair mb-4">Project Manager</h3>
              <p className="text-gray-700">
                Over 9+ years leading complex initiatives across technology, healthcare and finance. Certified PMP with expertise in agile methodologies and strategic portfolio management.
              </p>
            </div>
            <div className="md:border-r md:border-gray-200 md:px-8">
              <h3 className="text-xl font-playfair mb-4">Performance Coach</h3>
              <p className="text-gray-700">
                ICF-certified coach specializing in productivity systems, habit formation, and behavioral change for professionals navigating complexity and seeking sustainable high performance.
              </p>
            </div>
            <div className="md:border-r md:border-gray-200 md:px-8">
              <h3 className="text-xl font-playfair mb-4">Competitive Athlete</h3>
              <p className="text-gray-700">
                Former Division I collegiate athlete and current competitive marathoner, bringing mental toughness frameworks and periodized training methodologies to professional performance.
              </p>
            </div>
            <div className="md:pl-8">
              <h3 className="text-xl font-playfair mb-4">Entrepreneur</h3>
              <p className="text-gray-700">
                Built and scaled two service-based businesses, developing expertise in lean operations, client acquisition systems, and sustainable growth strategies for small enterprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-gray-200">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
            <div>
              <h2 className="text-2xl font-playfair mb-4">Philosophy</h2>
            </div>
            <div className="md:col-span-2">
              <p>
                I believe that exceptional achievement isn't about superhuman effort or secret formulas. It's about intentional design: creating systems that align daily actions with meaningful goals, establishing environments that make success inevitable, and developing mental frameworks that support clarity under pressure.
              </p>
              <p>
                My work is built on the premise that true productivity isn't about doing more—it's about focusing on what matters. That leadership begins with self-mastery. And that sustainable performance comes from integration, not sacrifice.
              </p>
              <p className="mb-8">
                Through consulting engagements, coaching programs, and strategic advisory work, I help clients design and implement approaches that bring simplicity to complexity and clarity to confusion.
              </p>
              {/* <Link
                to="/services"
                className="border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors duration-300"
              >
                Explore Services
              </Link> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

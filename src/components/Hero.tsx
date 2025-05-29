
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center py-16 md:py-24">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair animate-fade-in">
            Purposeful living.<br />
            Exceptional performance.
          </h1>
          <p className="text-lg md:text-xl mt-6 mb-8 text-gray-700 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Helping ambitious professionals design a life of intention, productivity, and fulfillment—in business and beyond.
          </p>
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link
              to="/about"
              className="inline-flex items-center group"
            >
              <span className="border-b border-black pb-1 mr-2 group-hover:mr-4 transition-all duration-300">
                Learn more about my approach
              </span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

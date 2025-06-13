import React from 'react';
import { useNavigate } from 'react-router-dom';

const Affirmations = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="section pb-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-playfair">Affirmations</h1>
            <p className="text-xl text-gray-700 mb-6">
              Powerful, positive statements engineered to reshape your mindset, build self-belief, and empower you to achieve your personal and professional goals.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
              <li>Cultivate a positive inner dialogue and overcome limiting beliefs</li>
              <li>Build unwavering self-confidence and enhance your motivation</li>
              <li>Strengthen your resilience to navigate challenges with a positive outlook</li>
              <li>Transform your mindset through daily positive affirmations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section pt-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:border-black transform hover:scale-105">
              <div className="text-center mb-8">
                <h2 className="font-playfair text-3xl mb-4">Start Your Transformation Today</h2>
                <p className="text-gray-700 text-lg">
                  Choose your affirmation category and begin your journey to a more positive and empowered mindset.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => navigate("/tools/reflect")}
                  className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition font-semibold transform hover:scale-105 duration-200"
                >
                  Continue to Reflect
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Affirmations; 
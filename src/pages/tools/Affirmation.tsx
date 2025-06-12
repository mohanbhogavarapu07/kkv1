
import React from "react";
import { useNavigate } from "react-router-dom";

const Affirmation = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Affirmation</h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to your daily affirmation! Take a moment to reflect and empower yourself with positive thoughts.
      </p>
      <blockquote className="border-l-4 border-black-500 pl-4 italic text-xl text-black-700">
        "You are capable, resilient, and worthy of all the good things in life."
      </blockquote>
      {/* Card-style flexbox with info and button, styled like assessment cards */}
      <div className="bg-white p-8 flex flex-col justify-between min-h-[180px] border border-gray-200 rounded-xl transition-all duration-200 shadow hover:shadow-2xl hover:border-black hover:scale-[1.03] mt-8 max-w-xl mx-auto">
        <div className="flex-1">
          <h2 className="font-playfair text-xl mb-3 text-black">Why Practice Affirmations?</h2>
          <p className="text-gray-700 text-base mb-4">
            Affirmations help rewire your mindset, boost self-esteem, and foster a positive outlook. Take a moment to internalize today's affirmation and let it guide your actions.
          </p>
        </div>
        <button
          className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition font-semibold text-sm tracking-wide"
          type="button"
          onClick={() => navigate("/tools/reflect")}
        >
          Reflect Now
        </button>
      </div>
    </div>
  );
};

export default Affirmation; 
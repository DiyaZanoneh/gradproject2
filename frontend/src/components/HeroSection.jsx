import React from "react";

const HeroSection = ({ handleGetStarted }) => {
  return (
    <div className="hero bg-blue-500 text-white py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
      <p className="mb-6">Browse through thousands of job listings tailored to your skills</p>

      {/* Get Started button */}
      <button
        onClick={handleGetStarted} // Triggering the handleGetStarted function
        className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md"
      >
        Get Started
      </button>
    </div>
  );
};

export default HeroSection;

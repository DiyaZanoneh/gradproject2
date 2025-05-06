import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// New components for Homepage Sections
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import StatsSection from './sections/StatsSection';


export const Home = () => {
  const navigate = useNavigate(); // Step 1
  const { user } = useSelector((state) => state.auth); // Assuming 'user' state holds the login status

  const handleGetStarted = () => {
    if (user) {
      // If user is logged in, navigate to the Jobs page
      navigate('/jobs');
    } else {
      // If user is not logged in, navigate to the Signup page
      navigate('/signup');
    }
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <HeroSection handleGetStarted={handleGetStarted} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Stats Section */}
      <StatsSection />

      <Footer />
    </div>
  );
};

export default Home;

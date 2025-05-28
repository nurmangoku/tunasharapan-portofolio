
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Profile from '../components/Profile';
import Teachers from '../components/Teachers';
import SPMB from '../components/SPMB';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      <main>
        <Hero />
        <Profile />
        <Teachers />
        <SPMB />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

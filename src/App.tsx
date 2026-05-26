import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TakbeerAudio from './components/TakbeerAudio';
import EidWishes from './components/EidWishes';
import FamilyGallery from './components/FamilyGallery';
import CountdownTimer from './components/CountdownTimer';
import EidiCalculator from './components/EidiCalculator';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {isLoading && <Loading key="loading" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <main className="main-content">
            <Hero />
            <TakbeerAudio />
            <EidWishes />
            <FamilyGallery />
            <CountdownTimer />
            <EidiCalculator />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

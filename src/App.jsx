import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollLine from './components/ScrollLine';
import LoadingScreen from './components/LoadingScreen';

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="app-container">
          <Navbar />
          <main>
            <Hero />
            <Skills />
            <ScrollLine />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
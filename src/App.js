import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkExperience from './components/WorkExperience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import ViewCounter from './components/ViewCounter';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero/>
      <WorkExperience />
      <Projects />
      <Skills />
      <Footer />
      <ViewCounter />
      <p className=' text-ink/60 text-center pb-4'>Developed by Tomas Ferrari</p>
    </div>
  );
}

export default App;

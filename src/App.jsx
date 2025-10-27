import { useState, useRef } from 'react';
import Home from './components/home';
import Servicios from './components/servicios';
import Portfolio from './components/portfolio';
import Contacto from './components/contacto';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [nextSection, setNextSection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);

  const handleNavigate = (section) => {
    if (isAnimating || section === currentSection) return;
    
    console.log('Navigating to:', section); // Debug
    
    setIsAnimating(true);
    setNextSection(section);

    setTimeout(() => {
      setCurrentSection(section);
      console.log('Current section set to:', section); // Debug
    }, 400);

    setTimeout(() => {
      setIsAnimating(false);
      setNextSection(null);
    }, 800);
  };

  const getSectionOpacity = (section) => {
    if (section === currentSection) return 'opacity-100';
    if (section === nextSection) return 'opacity-100';
    return 'opacity-0';
  };

  const getSectionZ = (section) => {
    if (section === currentSection) return 'z-20';
    if (section === nextSection) return 'z-10';
    return 'z-0';
  };

  const getSectionPointerEvents = (section) => {
    if (section === currentSection) return 'pointer-events-auto';
    return 'pointer-events-none';
  };

  const getSectionVisibility = (section) => {
    // Asegurar que la sección actual siempre sea visible
    if (section === currentSection) return 'visible';
    if (section === nextSection) return 'visible';
    return 'invisible';
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-white">

      {/* HOME - Siempre montado */}
      <div 
        data-section="home"
        className={`absolute inset-0 w-full h-full transition-opacity duration-800 ease-in-out ${getSectionOpacity('home')} ${getSectionZ('home')} ${getSectionPointerEvents('home')} ${getSectionVisibility('home')}`}
      >
        <Home 
          key="home"
          onNavigate={handleNavigate}
          isVisible={currentSection === 'home'}
        />
      </div>

      {/* SERVICIOS - Siempre montado */}
      <div 
        data-section="servicios"
        className={`absolute inset-0 w-full h-full transition-opacity duration-800 ease-in-out ${getSectionOpacity('servicios')} ${getSectionZ('servicios')} ${getSectionPointerEvents('servicios')} ${getSectionVisibility('servicios')}`}
      >
        <Servicios 
          key="servicios"
          onNavigate={handleNavigate}
          isVisible={currentSection === 'servicios'}
        />
      </div>

      {/* PORTFOLIO - Siempre montado */}
      <div 
        data-section="portfolio"
        className={`absolute inset-0 w-full h-full transition-opacity duration-800 ease-in-out ${getSectionOpacity('portfolio')} ${getSectionZ('portfolio')} ${getSectionPointerEvents('portfolio')} ${getSectionVisibility('portfolio')}`}
      >
        <Portfolio 
          key="portfolio"
          onNavigate={handleNavigate}
          isVisible={currentSection === 'portfolio'}
        />
      </div>

      {/* CONTACTO - Siempre montado */}
      <div 
        data-section="contacto"
        className={`absolute inset-0 w-full h-full transition-opacity duration-800 ease-in-out ${getSectionOpacity('contacto')} ${getSectionZ('contacto')} ${getSectionPointerEvents('contacto')} ${getSectionVisibility('contacto')}`}
      >
        <Contacto
          key="contacto"
          onNavigate={handleNavigate}
          isVisible={currentSection === 'contacto'}
        />
      </div>
    </div>
  );
}

export default App;
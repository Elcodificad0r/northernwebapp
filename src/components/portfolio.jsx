import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft } from 'lucide-react';

const Portfolio = ({ onNavigate }) => {  // ✅ Agregado onNavigate
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const containerRef = useRef(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  const projects = [
    {
      id: 1,
      title: 'Topochico',
      date: 'Ene 2025',
      service: 'Content media',
      color: '#94a3b8',
      media: 'video',
      still: '/northernwebapp/assets/topochicoStill.png',  // ✅ Corregido path
      vimeoId: '1130042805'
    },
    {
      id: 2,
      title: 'New balance',
      date: 'Ago 2025',
      service: 'Spot Publicitario',
      color: '#64748b',
      media: 'video',
      still: '/northernwebapp/assets/sneakersStill.PNG',  // ✅ Corregido path
      vimeoId: '1130728487'
    },
    {
      id: 3,
      title: 'Campaña Ropa',
      date: 'May 2025',
      service: 'Spot Publicitario',
      color: '#475569',
      media: 'video',
      still: '/northernwebapp/assets/diamondStill.png',  // ✅ Corregido path
      vimeoId: '1111475204'
    },
    {
      id: 4,
      title: 'Documental Maqindar',
      date: 'Jun 2025',
      service: 'Video Corporativo',
      color: '#334155',
      media: 'video',
      still: '/northernwebapp/assets/maqindarStill.png',  // ✅ Corregido path
      vimeoId: '1127269112'
    },
    {
      id: 5,
      title: 'Spot somos',
      date: 'May 2025',
      service: 'Spot Publicitario',
      color: '#1e293b',
      media: 'video',
      still: '/northernwebapp/assets/somosStill.png',  // ✅ Corregido path
      vimeoId: '1116918522'
    },
    {
      id: 6,
      title: 'Slim pop',
      date: 'Dic 2024',
      service: 'Spot publicitario',
      color: '#0f172a',
      media: 'video',
      still: '/northernwebapp/assets/slimpopStill.png',  // ✅ Corregido path
      vimeoId: '1109487768'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (hoveredIndex === null && !selectedProject) {
      let lastTime = performance.now();
      let lastFrameTime = 0;
      const baseSpeed = 0.5;
      const cycleDuration = 4000;
      const targetFPS = 12;
      const frameInterval = 1000 / targetFPS;
      
      const easeInOutQuad = (t) => {
        return t < 0.5 
          ? 2 * t * t 
          : 1 - Math.pow(-2 * t + 2, 2) / 2;
      };
      
      const animate = (currentTime) => {
        if (currentTime - lastFrameTime < frameInterval) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
        
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        lastFrameTime = currentTime;
        
        const cycleProgress = (currentTime % cycleDuration) / cycleDuration;
        const easedMultiplier = easeInOutQuad(cycleProgress);
        const speed = baseSpeed * (0.3 + easedMultiplier * 2.2);
        
        setRotation(prev => prev + (speed * deltaTime / 16));
        
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hoveredIndex, selectedProject]);

  const getTransform = (index, total) => {
    const angle = (360 / total) * index + rotation;
    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? 180 : 280;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    
    return {
      x,
      y
    };
  };

  return (
    <div className="w-full h-screen bg-stone-100 flex items-center justify-center overflow-hidden relative font-mono">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/northernwebapp/assets/bg-home.png)',  // ✅ Corregido path
          opacity: 0.9
        }}
      />

      {/* Film Grain Effect */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Light Leaks / Bokeh Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #f97316 0%, transparent 70%)',
            top: '10%',
            left: '15%',
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, #fb923c 0%, transparent 70%)',
            bottom: '15%',
            right: '10%',
            transform: 'translate(50%, 50%)'
          }}
        />
        <div 
          className="absolute w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, #fdba74 0%, transparent 70%)',
            top: '60%',
            left: '5%'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-12"
          style={{
            background: 'radial-gradient(circle, #ea580c 0%, transparent 70%)',
            top: '30%',
            right: '20%'
          }}
        />
      </div>

      {/* Main Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Circular Carousel */}
        <div className="relative w-full h-full flex items-center justify-center">
          {projects.map((project, index) => {
            const isHovered = hoveredIndex === index;
            const position = getTransform(index, projects.length);
            
            return (
              <div
                key={project.id}
                className="absolute cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) ${isHovered ? 'scale(1.15)' : 'scale(1)'}`,
                  transition: hoveredIndex === null ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  zIndex: isHovered ? 20 : 10
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedProject(project)}
              >
                <div 
                  className="w-32 h-44 md:w-48 md:h-64 rounded-sm shadow-lg transition-shadow duration-300"
                  style={{ 
                    backgroundImage: `url(${project.still})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: project.color,
                    boxShadow: isHovered 
                      ? '0 20px 40px rgba(0,0,0,0.3)' 
                      : '0 10px 20px rgba(0,0,0,0.2)'
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Project Info - Bottom Left */}
        {hoveredIndex !== null && !selectedProject && (
          <div className="absolute bottom-8 left-8 text-stone-800 z-30 font-mono">
            <p className="text-xs md:text-sm mb-1">{projects[hoveredIndex].title}</p>
            <p className="text-xs mb-1">{projects[hoveredIndex].date}</p>
            <p className="text-xs text-stone-600">{projects[hoveredIndex].service}</p>
          </div>
        )}

        {/* Go Back Home Button - ✅ CORREGIDO */}
        <button 
          className="absolute top-8 left-8 flex items-center gap-3 text-2xl md:text-3xl text-stone-800 hover:text-orange transition-colors font-[NUKLEAR] blur-[.5px] z-30"
          onClick={() => onNavigate('home')}
        >
          <ArrowLeft size={32} className="md:w-10 md:h-10 blur-[.5px]" />
          <span>GO BACK HOME</span>
        </button>

        {/* DESKTOP HEAVY EDITORIAL ORNAMENTS */}
        
        {/* Top Section Ornaments */}
        <div className="hidden md:block absolute top-8 right-8 text-[10px] text-stone-700 font-mono z-30 space-y-3">
          <div className="border-l-2 border-stone-400 pl-3">
            <p className="font-bold tracking-widest">COORDINATES</p>
            <p className="mt-1">25.6866° N</p>
            <p>100.3161° W</p>
            <p className="mt-2 text-stone-500">MONTERREY, MX</p>
          </div>
          <div className="border-l-2 border-stone-400 pl-3 mt-4">
            <p className="font-bold tracking-widest">ESTABLISHED</p>
            <p className="mt-1">EST. 2024</p>
          </div>
        </div>

        <div className="hidden md:block absolute top-6 left-[45%] text-[7px] text-stone-600 font-mono z-30 opacity-30 tracking-[0.5em]">
          <p>PRODUCT</p>
        </div>

        <div className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 text-[8px] text-stone-600 font-mono z-30 opacity-30">
          <p className="tracking-[0.4em]">— SELECTED WORKS —</p>
        </div>

        <div className="hidden md:block absolute top-32 left-12 text-[9px] text-stone-600 font-mono z-30 space-y-1 opacity-40">
          <p>14:30 — 15:30</p>
          <p className="text-[8px]">PRODUCTION</p>
          <p className="text-[8px]">STYLE</p>
        </div>

        <div className="hidden md:block absolute top-40 right-12 text-[9px] text-stone-600 font-mono z-30 text-right space-y-1 opacity-40">
          <p className="tracking-wider">02</p>
          <p className="text-[8px]">CHAPTER</p>
          <p className="tracking-wider">23</p>
        </div>

        {/* Left Side Ornaments */}
        <div className="hidden md:block absolute top-1/4 left-8 text-[9px] text-stone-600 font-mono z-30 max-w-[200px] space-y-4">
          <div className="opacity-70">
            <p className="font-bold tracking-wider mb-1">I.</p>
            <p className="leading-relaxed">"MEMORIES OF<br/>NOSTALGIA MUSIC"</p>
          </div>
          <div className="opacity-60">
            <p className="font-bold tracking-wider mb-1">II.</p>
            <p className="leading-relaxed">"CLASSIC CANTINAS<br/>& COWBOYS"</p>
          </div>
          <div className="opacity-50">
            <p className="font-bold tracking-wider mb-1">III.</p>
            <p className="leading-relaxed">"RIDING OFF INTO<br/>THE SUNSET"</p>
          </div>
        </div>

        <div className="hidden md:block absolute top-[60%] left-16 text-[7px] text-stone-500 font-mono z-30 opacity-25 space-y-1">
          <p className="tracking-widest">SIDE A</p>
          <p>MOBILITY &</p>
          <p>DEFENCE</p>
        </div>

        <div className="hidden md:block absolute top-[35%] left-20 text-[8px] text-stone-500 font-mono z-30 opacity-20">
          <p className="tracking-wide">WHERE COMFORT</p>
          <p className="text-[7px] mt-1">MEETS CULTURE</p>
        </div>

        {/* Right Side Ornaments */}
        <div className="hidden md:block absolute bottom-1/4 right-8 text-[9px] text-stone-600 font-mono z-30 max-w-[200px] text-right space-y-4">
          <div className="opacity-70 border-t border-stone-400 pt-2">
            <p className="leading-relaxed">"ESSENCE OF<br/>MEMORIES"</p>
          </div>
          <div className="opacity-60 border-t border-stone-400 pt-2">
            <p className="leading-relaxed">"FRESH &<br/>EXCITING"</p>
          </div>
          <div className="opacity-50 border-t border-stone-400 pt-2">
            <p className="leading-relaxed">"MIXTURE OF<br/>CULTURE"</p>
          </div>
        </div>

        <div className="hidden md:block absolute top-[40%] right-24 text-[7px] text-stone-500 font-mono z-30 text-right opacity-25 space-y-1">
          <p className="tracking-widest">SIDE B</p>
          <p>12 CA SPEED</p>
          <p>RELOAD DRILLS</p>
        </div>

        <div className="hidden md:block absolute top-[25%] right-32 text-[8px] text-stone-500 font-mono z-30 text-right opacity-20">
          <p className="tracking-wide">YOUR GLOBAL HOME</p>
          <p className="text-[7px] mt-1">RIGHT IN MONTERREY</p>
        </div>

        {/* Bottom Section Ornaments */}
        <div className="hidden md:block absolute bottom-8 right-8 text-[10px] text-stone-700 font-mono z-30">
          <div className="border-r-2 border-stone-400 pr-3 text-right space-y-2">
            <p className="font-bold tracking-widest">CREATIVE AGENCY</p>
            <p className="text-2xl font-bold">№ 52</p>
            <p className="text-stone-500">DIGITAL CONTENT</p>
            <p className="text-stone-500 mt-2">PRODUCTION HOUSE</p>
          </div>
        </div>

        <div className="hidden md:block absolute bottom-32 left-12 text-[8px] text-stone-600 font-mono z-30 space-y-2 opacity-35">
          <p>12:00</p>
          <p>TYPOGRAPHY</p>
          <p className="tracking-wider">+ +</p>
          <p>MOTION</p>
        </div>

        <div className="hidden md:block absolute bottom-40 right-16 text-[9px] text-stone-600 font-mono z-30 text-right opacity-30">
          <p>1 — 2</p>
          <p className="text-[8px] mt-1">HOURS</p>
        </div>

        <div className="hidden md:block absolute bottom-24 left-[30%] text-[7px] text-stone-500 font-mono z-30 opacity-25">
          <p>IMPOSTOR</p>
          <p className="text-[6px] mt-1">SYNDROME</p>
        </div>

        {/* Center Scattered Ornaments */}
        <div className="hidden md:block absolute bottom-1/3 left-1/3 text-[8px] text-stone-500 font-mono z-30 opacity-20">
          <p>11:30</p>
        </div>

        <div className="hidden md:block absolute top-[70%] right-1/3 text-[8px] text-stone-500 font-mono z-30 text-right opacity-20">
          <p>18:45</p>
          <p className="text-[6px] mt-1">FEB</p>
        </div>

        <div className="hidden md:block absolute top-[20%] left-[35%] text-[7px] text-stone-500 font-mono z-30 opacity-25 tracking-widest">
          <p>STEPS</p>
          <p className="mt-1">1 2 2 3</p>
        </div>

        <div className="hidden md:block absolute bottom-[25%] right-[30%] text-[7px] text-stone-500 font-mono z-30 text-right opacity-20">
          <p>MARCH</p>
          <p className="text-[6px] mt-1">IDENTITY</p>
        </div>

        {/* Rotated Text Elements */}
        <div className="hidden md:block absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 text-[8px] text-stone-500 font-mono z-30 rotate-90">
          <p className="tracking-[0.3em] opacity-40">PORTFOLIO 2024/2025</p>
        </div>

        <div className="hidden md:block absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 text-[8px] text-stone-500 font-mono z-30 -rotate-90">
          <p className="tracking-[0.3em] opacity-40">CREATIVE WORKS</p>
        </div>

        <div className="hidden md:block absolute top-[15%] right-[40%] text-[6px] text-stone-500 font-mono z-30 opacity-15 rotate-12">
          <p className="tracking-[0.3em]">++ PODCAST #SUNLE-2025</p>
        </div>

        <div className="hidden md:block absolute bottom-[35%] left-[40%] text-[6px] text-stone-500 font-mono z-30 opacity-15 -rotate-6">
          <p className="tracking-[0.3em]">THIS WEEK ON QUEST LIST</p>
        </div>

        <div className="hidden md:block absolute bottom-[45%] right-[25%] text-[7px] text-stone-500 font-mono z-30 opacity-18 rotate-3">
          <p className="tracking-wide">DESIGNED FOR</p>
          <p className="text-[6px]">URBAN YOUTH</p>
        </div>

        {/* MOBILE ORNAMENTS - Minimal */}
        <div className="md:hidden absolute top-6 right-6 text-[8px] text-stone-600 font-mono z-30 text-right space-y-1 opacity-50">
          <p className="tracking-wider">02</p>
          <p className="text-[7px]">23</p>
        </div>

        <div className="md:hidden absolute bottom-16 left-6 text-[8px] text-stone-600 font-mono z-30 space-y-2 opacity-40">
          <p className="text-[7px] tracking-widest">№ 52</p>
          <p className="text-[7px]">MTY, MX</p>
          <p className="text-[7px] mt-2">2024</p>
        </div>

        <div className="md:hidden absolute bottom-16 right-6 text-[7px] text-stone-600 font-mono z-30 text-right space-y-1 opacity-35">
          <p>14:30</p>
          <p className="text-[6px]">STYLE</p>
        </div>
      </div>

      {/* Project Modal with Vimeo */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          />
          
          {/* Modal Content */}
          <div className="relative z-10 w-11/12 max-w-5xl bg-white rounded-sm shadow-2xl overflow-hidden">
            {/* Close Button - Left Side with Pulsing Animation */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 left-6 text-orange hover:text-green transition-colors z-20 animate-pulse"
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            >
              <X size={32} strokeWidth={2.5} className="drop-shadow-lg color-orange" />
            </button>

            {/* ESC hint */}
            <div className="absolute top-8 left-16 text-[10px] text-orange font-mono z-20 tracking-wider opacity-60">
              ESC
            </div>

            {/* Vimeo Player */}
            <div className="w-full aspect-video bg-black">
              <iframe
                src={`https://player.vimeo.com/video/${selectedProject.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={selectedProject.title}
              />
            </div>

            {/* Project Info in Modal */}
            <div className="p-8 font-mono">
              <h2 className="text-xl mb-2">{selectedProject.title}</h2>
              <p className="text-sm text-stone-600 mb-1">{selectedProject.date}</p>
              <p className="text-sm text-stone-700">{selectedProject.service}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
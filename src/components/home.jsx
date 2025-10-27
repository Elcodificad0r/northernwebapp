import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import bgHome from '../assets/bg-home.png';

export default function Home({ onNavigate, isVisible }) {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [circleColor, setCircleColor] = useState('#FFB3C1');
  
  const circleRef = useRef(null);
  const drip1Ref = useRef(null);
  const drip2Ref = useRef(null);
  const drip3Ref = useRef(null);
  const drip4Ref = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const decorationsRef = useRef(null);
  
  const rotationTimelines = useRef([]);

  // Gestión de isVisible - limpiar animaciones GSAP
  useEffect(() => {
    if (!isVisible) {
      console.log('🟢 Home: isVisible = false');
      // Matar animaciones continuas
      rotationTimelines.current.forEach(tl => tl.kill());
      rotationTimelines.current = [];
      return;
    }

    console.log('🟢 Home: isVisible = true, resetting GSAP properties');

    // CRÍTICO: Limpiar todas las propiedades inline de GSAP
    // Limpiar elementos individuales
    gsap.set([
      titleRef.current,
      subtitleRef.current,
      logoRef.current,
      circleRef.current,
      drip1Ref.current,
      drip2Ref.current,
      drip3Ref.current,
      drip4Ref.current
    ], { clearProps: 'all' });

    // Limpiar los hijos de navRef (los botones)
    if (navRef.current?.children) {
      gsap.set(Array.from(navRef.current.children), { clearProps: 'all' });
    }

    // Limpiar decoraciones
    if (decorationsRef.current?.children) {
      gsap.set(Array.from(decorationsRef.current.children), { clearProps: 'all' });
    }

    // Reiniciar animaciones continuas
    if (circleRef.current) {
      const tl = gsap.to(circleRef.current, { 
        rotation: 360, 
        duration: 60, 
        ease: 'none', 
        repeat: -1 
      });
      rotationTimelines.current.push(tl);
    }

    if (drip1Ref.current) {
      const tl1 = gsap.to(drip1Ref.current, { 
        rotation: 360, 
        duration: 25, 
        ease: 'none', 
        repeat: -1, 
        transformOrigin: '200px 200px' 
      });
      const tl2 = gsap.to(drip1Ref.current, { 
        scale: gsap.utils.random(0.8, 1.5), 
        duration: 8, 
        ease: 'sine.inOut', 
        repeat: -1, 
        yoyo: true 
      });
      rotationTimelines.current.push(tl1, tl2);
    }

    if (drip2Ref.current) {
      const tl1 = gsap.to(drip2Ref.current, { 
        rotation: -360, 
        duration: 30, 
        ease: 'none', 
        repeat: -1, 
        transformOrigin: '200px 200px' 
      });
      const tl2 = gsap.to(drip2Ref.current, { 
        scale: gsap.utils.random(0.7, 1.4), 
        duration: 10, 
        ease: 'sine.inOut', 
        repeat: -1, 
        yoyo: true 
      });
      rotationTimelines.current.push(tl1, tl2);
    }

    if (drip3Ref.current) {
      const tl1 = gsap.to(drip3Ref.current, { 
        rotation: 360, 
        duration: 35, 
        ease: 'none', 
        repeat: -1, 
        transformOrigin: '200px 200px' 
      });
      const tl2 = gsap.to(drip3Ref.current, { 
        scale: gsap.utils.random(0.9, 1.6), 
        duration: 12, 
        ease: 'sine.inOut', 
        repeat: -1, 
        yoyo: true 
      });
      rotationTimelines.current.push(tl1, tl2);
    }

    if (drip4Ref.current) {
      const tl1 = gsap.to(drip4Ref.current, { 
        rotation: -360, 
        duration: 28, 
        ease: 'none', 
        repeat: -1, 
        transformOrigin: '200px 200px' 
      });
      const tl2 = gsap.to(drip4Ref.current, { 
        scale: gsap.utils.random(0.8, 1.3), 
        duration: 9, 
        ease: 'sine.inOut', 
        repeat: -1, 
        yoyo: true 
      });
      rotationTimelines.current.push(tl1, tl2);
    }

    return () => {
      rotationTimelines.current.forEach(tl => tl.kill());
      rotationTimelines.current = [];
    };
  }, [isVisible]);

  // Reloj y color inicial
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentDateTime(formatted);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    const colors = ['#d58936', '#546e1d'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCircleColor(randomColor);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleNavigate = (section) => {
    if (!onNavigate) return;

    console.log('🟢 Home: Navigating to', section);

    // Animación de salida con parallax
    const tl = gsap.timeline({
      onComplete: () => onNavigate(section)
    });

    // Fade out de drips con timing diferente
    tl.to([drip1Ref.current, drip2Ref.current, drip3Ref.current, drip4Ref.current], 
      { 
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.in'
      }, 0
    );

    // Fade out del círculo
    tl.to(circleRef.current,
      { opacity: 0, duration: 0.6, ease: 'power2.in' }, 0.2
    );

    // Parallax salida - título hacia arriba (rápido)
    tl.to(titleRef.current,
      { y: -120, opacity: 0, duration: 0.7, ease: 'power3.in' }, 0
    );

    // Parallax salida - subtítulo hacia abajo (medio)
    tl.to(subtitleRef.current,
      { y: 100, opacity: 0, duration: 0.9, ease: 'power3.in' }, 0.1
    );

    // Parallax salida - navegación hacia la izquierda (más lento)
    tl.to(navRef.current.children,
      { 
        x: -200, 
        opacity: 0, 
        duration: 1,
        stagger: 0.08,
        ease: 'power3.in'
      }, 0.05
    );

    // Logo hacia abajo (rápido)
    tl.to(logoRef.current,
      { y: 80, opacity: 0, duration: 0.7, ease: 'power2.in' }, 0.15
    );

    // Decoraciones fade out
    tl.to(decorationsRef.current.children,
      { 
        opacity: 0, 
        duration: 0.5,
        stagger: 0.03,
        ease: 'power2.in'
      }, 0.2
    );
  };

  return (
    <div 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center p-4 md:p-8 font-montserrat bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgHome})` }}
    >
      {/* Círculos y drips */}
      <div className="absolute top-0 left-0 w-full h-full blur-2xl pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
          <circle ref={circleRef} cx="200" cy="200" r="180" fill="none" stroke={circleColor} strokeWidth="8" strokeDasharray="15 10" opacity="0.7" />
          <ellipse ref={drip1Ref} cx="100" cy="100" rx="100" ry="100" fill={circleColor} opacity="0.6" />
          <ellipse ref={drip2Ref} cx="320" cy="150" rx="60" ry="60" fill={circleColor} opacity="0.5" />
          <ellipse ref={drip3Ref} cx="200" cy="370" rx="50" ry="50" fill={circleColor} opacity="0.6" />
          <ellipse ref={drip4Ref} cx="60" cy="280" rx="60" ry="60" fill={circleColor} opacity="0.5" />
        </svg>
      </div>

      {/* Contenido central */}
      <div className="relative w-full max-w-5xl aspect-square max-h-[90vh] flex items-center justify-center">
        <div className="relative z-10 text-center space-y-6 md:space-y-8 px-4">
          <div ref={titleRef} className="space-y-2">
            <div className="text-xs md:text-sm tracking-wider text-black font-courier">(EXPERIMENTAL)</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight text-black">
              <span className="font-unna italic">SUEÑO</span>{' '}
              <span className="font-montserrat italic font-semibold">NORTEÑO</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base text-black">
              <span>→</span>
              <span className="font-montserrat font-medium">2025©</span>
            </div>
          </div>

          <div ref={subtitleRef} className="text-xs md:text-sm tracking-widest font-bold font-montserrat">
            CREATIVE STUDIO
          </div>

          {/* Navegación */}
          <div ref={navRef} className="space-y-2 md:space-y-3 font-[Nuklear] w-full max-w-4xl mx-auto">
            <div className="text-4xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none w-full flex justify-start">
              <button
                className="hover:text-[#d58936] hover:blur-none blur-[2px] hover:scale-105 hover:tracking-wide hover:-skew-x-6 transition-all duration-500 ease-out text-black"
                onClick={() => handleNavigate('servicios')}
              >
                SERVICIOS
              </button>
            </div>
            <div className="text-4xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none w-full flex justify-end">
              <button
                className="hover:text-[#d58936] hover:blur-none blur-[2px] hover:scale-105 hover:tracking-wide hover:skew-x-6 transition-all duration-500 ease-out text-black"
                onClick={() => handleNavigate('portfolio')}
              >
                PORTFOLIO
              </button>
            </div>
            <div className="text-4xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none w-full flex justify-center">
              <button
                className="hover:text-[#d58936] hover:blur-none blur-[2px] hover:scale-110 hover:tracking-widest transition-all duration-500 ease-out text-black"
                onClick={() => handleNavigate('contacto')}
              >
                CONTACTO
              </button>
            </div>
          </div>

          {/* Bottom logo */}
          <div ref={logoRef} className="pt-6 md:pt-8 space-y-2">
            <div className="inline-block border-2 border-black rounded-full px-6 py-2">
              <span className="text-lg md:text-xl font-unna font-bold text-black">SN</span>
            </div>
            <div className="text-xs text-black/80 font-montserrat">MMXXV</div>
          </div>
        </div>

        {/* Decoraciones */}
        <div ref={decorationsRef}>
          <div className="absolute top-4 left-4 text-black/80 text-xl md:text-2xl">┌</div>
          <div className="absolute top-4 right-4 text-black/80 text-xl md:text-2xl">┐</div>
          <div className="absolute bottom-4 left-4 text-black/80 text-xl md:text-2xl">└</div>
          <div className="absolute bottom-4 right-4 text-black/80 text-xl md:text-2xl">┘</div>
          <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 text-[10px] md:text-xs text-black font-courier tracking-widest">
            MONTERREY, NL · MÉXICO
          </div>
          <div className="absolute bottom-8 md:bottom-12 right-8 md:right-12 text-[10px] md:text-xs text-black/90 font-courier tracking-wider">
            {currentDateTime}
          </div>
          <div className="absolute top-8 md:top-12 right-8 md:right-12 text-xs text-black font-courier">®</div>
          <div className="absolute top-1/4 left-4 md:left-8 text-black/30 text-sm md:text-base rotate-45">↗</div>
          <div className="absolute bottom-1/4 right-4 md:right-8 text-black/30 text-sm md:text-base -rotate-45">↙</div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-[2px] opacity-40">
            {[3,1,2,3,1,4,2,1,3,2,4,1,3,2,1,4,3,2].map((h,i) => (
              <div key={i} className="w-[2px] md:w-[3px] bg-black" style={{height:`${h*3}px`}}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
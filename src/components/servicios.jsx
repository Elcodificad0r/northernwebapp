import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';

export default function Servicios({ onNavigate, isVisible = true }) {
  const [activeService, setActiveService] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorColor, setCursorColor] = useState('#000000');
  const [visitDuration, setVisitDuration] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [randomMessage, setRandomMessage] = useState('');
  const messageTimerRef = useRef(null);

  const detailsRefs = useRef({});
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const circleRef = useRef(null);
  const servicesListRef = useRef(null);
  const bottomLeftRef = useRef(null);
  const bottomRightRef = useRef(null);
  const decorationsRef = useRef(null);
  const hasAnimatedIn = useRef(false);
  const starRef = useRef(null);

  const services = [
    {
      id: 1,
      title: 'PRODUCCIÓN AUDIOVISUAL',
      subtitle: '[SPOT PUBLICITARIO, VIDEO MUSICAL, INSTITUCIONALES, CORTOMETRAJE]',
    },
    {
      id: 2,
      title: 'FOTOGRAFÍA',
      subtitle: '[RETRATOS, PRODUCTO, EDITORIAL, EVENTOS, ARQUITECTURA]',
    },
    {
      id: 3,
      title: 'POST PRODUCCIÓN',
      subtitle: '[COLOR GRADING, EDICIÓN, MOTION GRAPHICS, DISEÑO AUDIO]',
    },
    {
      id: 4,
      title: 'CONTENT CREATION',
      subtitle: '[SOCIAL MEDIA, BRANDING, ESTRATEGIA DIGITAL, CAMPAÑAS]',
    }
  ];

  const timerMessages = [
    "Cada segundo pasa…\nY podrías estar encontrando la solución.\n¿Qué esperas para contactarnos?",
    "Tu oportunidad expira en 5 segundos…\nOk, no expira, pero… ¿por qué esperar?",
    "El tiempo corre.\nLa solución te espera.",
    "Cada minuto cuenta.\n¿Ya nos contactaste?",
    "Mientras lees esto,\nel tiempo sigue corriendo.",
    "Tu proyecto podría estar\nlisto en este momento.",
    "¿Cuánto tiempo más vas a esperar?",
    "El reloj no se detiene.\nNosotros tampoco.",
    "Tiempo perdido =\nOportunidades perdidas",
    "Ya llevas demasiado tiempo aquí.\n¿Hablamos?",
    "Este contador no miente.\n¿Tú proyecto sí avanza?",
    "Segundos que pasan,\nideas que esperan.",
    "El tiempo es oro.\nNosotros somos la mina.",
    "¿Sigues esperando?\nTu competencia no.",
    "Cada tick es una oportunidad.\n¿La vas a dejar pasar?",
    "El futuro se construye hoy.\nContacta ahora.",
    "Procrastinar es fácil.\nCrear es nuestro trabajo.",
    "Tu idea merece vida.\nDale play.",
    "El momento perfecto\nes este momento.",
    "¿Seguimos contando?\n¿O empezamos a crear?",
    "Tiempo en pantalla:\nMalo para tus ojos.\nBueno para tu proyecto.",
    "La inspiración espera.\nNosotros también.",
    "Esto no es presión.\nEs una invitación.",
    "¿Ves ese contador?\nPodría ser tu deadline.",
    "Spoiler alert:\nTu proyecto va a quedar increíble.",
    "Plot twist:\nContactarnos es gratis.",
    "El contador sigue.\nTu proyecto, también debería.",
    "Mientras tanto,\nen una oficina cerca…\nCreamos magia.",
    "Tu scroll nos alimenta.\nTu proyecto nos inspira."
  ];

  const getRandomMessage = () => {
    return timerMessages[Math.floor(Math.random() * timerMessages.length)];
  };

  // Animación de entrada (SIN incluir titleRef ni subtitleRef ni circleRef)
  useEffect(() => {
    if (!isVisible) {
      hasAnimatedIn.current = false;
      gsap.killTweensOf('*');
      return;
    }
    
    if (hasAnimatedIn.current) return;
    hasAnimatedIn.current = true;

    gsap.set([
      ...(servicesListRef.current?.children || []),
      bottomLeftRef.current,
      bottomRightRef.current,
      ...(decorationsRef.current?.children || [])
    ], { clearProps: 'all' });

    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(decorationsRef.current?.children || [], {
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    });

    tl.from(servicesListRef.current?.children || [], {
      x: 200,
      y: 50,
      opacity: 0,
      scale: 0.9,
      rotation: 3,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1
    }, 0.3);

    tl.from(bottomLeftRef.current, {
      x: -150,
      y: 50,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out'
    }, '-=0.5');

    tl.from(bottomRightRef.current, {
      x: 150,
      y: 50,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out'
    }, '-=0.7');

    if (starRef.current) {
      gsap.to(starRef.current, {
        opacity: 0.2,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: 'power1.inOut'
      });
    }
  }, [isVisible]);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePosition({ x, y });

      const hue = Math.floor((x / window.innerWidth) * 360);
      const saturation = Math.floor((y / window.innerHeight) * 100);
      const lightness = 50 + Math.floor((x / window.innerWidth) * 20);
      setCursorColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`);

      if (titleRef.current && subtitleRef.current && circleRef.current && isVisible) {
        const moveX = (x - window.innerWidth / 2) * 0.015;
        const moveY = (y - window.innerHeight / 2) * 0.015;

        gsap.to(titleRef.current, {
          x: moveX * 3,
          y: moveY * 3,
          duration: 0.6,
          ease: 'power2.out'
        });

        gsap.to(subtitleRef.current, {
          x: -moveX * 2,
          y: -moveY * 2,
          duration: 0.6,
          ease: 'power2.out'
        });

        gsap.to(circleRef.current, {
          x: moveX,
          y: moveY,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    const timer = setInterval(() => {
      if (isVisible) setVisitDuration(prev => prev + 1);
    }, 1000);

    messageTimerRef.current = setInterval(() => {
      if (isVisible) {
        setRandomMessage(getRandomMessage());
        setTimeout(() => setRandomMessage(''), 8000);
      }
    }, 30000);

    const initialMessageTimeout = setTimeout(() => {
      if (isVisible) setRandomMessage(getRandomMessage());
      setTimeout(() => setRandomMessage(''), 8000);
    }, 5000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
      if (messageTimerRef.current) clearInterval(messageTimerRef.current);
      clearTimeout(initialMessageTimeout);
    };
  }, [isVisible]);

  // Animación de detalles
  useEffect(() => {
    if (activeService !== null && detailsRefs.current[activeService]) {
      gsap.fromTo(
        detailsRefs.current[activeService],
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [activeService]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
  };

  const handleNavigateHome = () => {
    if (!onNavigate || isExiting) return;
    
    setIsExiting(true);
    gsap.killTweensOf('*');
    onNavigate('home');
    
    setTimeout(() => {
      setIsExiting(false);
    }, 1000);
  };

  const handleServiceClick = (e) => {
    // Solo navegar a contacto en desktop (768px+)
    if (window.innerWidth >= 768 && onNavigate) {
      onNavigate('contacto');
    }
  };

  return (
    <div 
      className="h-screen w-full overflow-hidden flex items-start justify-start p-8 md:p-16 font-montserrat bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: 'url(/northernwebapp/assets/bg-home.png)' }}
    >
      {/* Main Title */}
      <div ref={titleRef} className="absolute -top-4 -left-8 md:-top-6 md:-left-12">
        <h1 className="text-[100px] md:text-[200px] lg:text-[280px] font-bold tracking-tighter leading-none text-black font-montserrat relative">
          <span className="absolute inset-0 text-cyan-500 opacity-30 blur-[1px]" style={{ transform: 'translate(-1px, -1px)' }}>SERVI</span>
          <span className="absolute inset-0 text-red-500 opacity-30 blur-[1px]" style={{ transform: 'translate(1px, 1px)' }}>SERVI</span>
          <span className="relative z-10">SERVI</span>
        </h1>
      </div>

      {/* CIOS text + circle */}
      <div ref={subtitleRef} className="absolute top-[50px] md:top-[120px] lg:top-[180px] left-5 md:left-16">
        <div className="relative inline-block">
          <h2 className="text-[80px] md:text-[120px] lg:text-[160px] font-bold tracking-tighter text-black font-unna italic relative">
            <span className="absolute inset-0 text-cyan-500 opacity-30 blur-[1px]" style={{ transform: 'translate(-1px, -1px)' }}>CIOS.</span>
            <span className="absolute inset-0 text-red-500 opacity-30 blur-[1px]" style={{ transform: 'translate(1px, 1px)' }}>CIOS.</span>
            <span className="relative z-10">CIOS.</span>
          </h2>
          <svg ref={circleRef} className="absolute -top-4 -left-4 w-[140%] h-[120%]" viewBox="0 0 300 150">
            <g className="relative">
              <ellipse 
                cx="150" 
                cy="75" 
                rx="140" 
                ry="65" 
                fill="none" 
                stroke="cyan" 
                strokeWidth="2"
                strokeDasharray="5 3"
                opacity="0.2"
                transform="rotate(-5 150 75) translate(-1, -1)"
              />
              <ellipse 
                cx="150" 
                cy="75" 
                rx="140" 
                ry="65" 
                fill="none" 
                stroke="red" 
                strokeWidth="2"
                strokeDasharray="5 3"
                opacity="0.2"
                transform="rotate(-5 150 75) translate(1, 1)"
              />
              <ellipse 
                cx="150" 
                cy="75" 
                rx="140" 
                ry="65" 
                fill="none" 
                stroke="black" 
                strokeWidth="2"
                strokeDasharray="5 3"
                opacity="0.6"
                transform="rotate(-5 150 75)"
              />
              <line x1="270" y1="60" x2="290" y2="40" stroke="black" strokeWidth="2" opacity="0.6" />
              <line x1="290" y1="40" x2="295" y2="50" stroke="black" strokeWidth="2" opacity="0.6" />
            </g>
          </svg>
        </div>
      </div>

      {/* Botón superior derecho */}
      <div className="fixed top-8 md:top-12 right-8 text-right z-[100]">
        <p className="hidden md:block text-xl md:text-2xl font-unna italic transition-all leading-[0.95] pointer-events-none">
          SUEÑO
          <br/>
          <span className="font-montserrat font-bold italic inline-block">NORTEÑO</span>
        </p>

        <button
          onClick={handleNavigateHome}
          disabled={isExiting}
          className="mt-2 flex md:flex-row flex-col items-end md:items-center gap-0 md:gap-3 text-xl md:text-3xl text-stone-800 hover:text-orange transition-colors font-[NUKLEAR] blur-[.5px] cursor-pointer disabled:opacity-50"
        >
          <div className="flex items-center gap-2">
            <ArrowLeft size={32} className="md:w-10 md:h-10 blur-[.5px]" />
            <span>GO</span>
          </div>
          <span className="md:inline block text-center">BACK HOME</span>
        </button>
      </div>

      {/* Services List */}
      <div 
        ref={servicesListRef} 
        className="absolute top-[280px] md:top-[300px] lg:top-[420px] left-8 md:left-16 right-8 
                   space-y-4 md:space-y-4 max-w-7xl z-20"
      >
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className="group md:cursor-pointer" 
            onClick={handleServiceClick}
            onMouseEnter={() => setActiveService(service.id)}
          >
            <div className="flex flex-col md:flex-row md:items-center md:gap-4 md:w-full">
              <div className="flex items-start gap-3 flex-shrink-0">
                <span className="text-lg md:text-xl font-[Courier] text-black/60 min-w-[40px] md:group-hover:text-color-orange transition-colors duration-300">
                  0{index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight font-montserrat text-black md:group-hover:italic md:group-hover:text-orange border-b-2 border-black md:group-hover:border-color-orange break-words max-w-[90vw] md:max-w-none whitespace-nowrap">
                    {service.title}
                  </h3>
                  <span className="text-xs font-[Courier] text-black/60 md:group-hover:text-color-green transition-colors duration-300">*</span>
                </div>
              </div>

              {activeService === service.id && (
                <div 
                  ref={el => detailsRefs.current[service.id] = el}
                  className="mt-1 md:mt-0 bg-orange/5 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 rounded-lg border-2 border-orange max-w-full md:max-w-2xl z-30"
                >
                  <p className="text-xs md:text-sm font-[Courier] text-color-orange tracking-wide leading-relaxed font-bold text-center">
                    {service.subtitle}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-8 md:bottom-16 left-8 md:left-16 right-8 md:right-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div ref={bottomLeftRef} className="space-y-2">
          <p className="text-xs md:text-sm tracking-widest font-[Courier]">NOW</p>
          <p className="text-xs md:text-sm tracking-widest font-[Courier] text-black/60">FULL TIME</p>
          <p className="text-xs md:text-sm tracking-widest font-[Courier] text-black/60">M/F/D</p>
        </div>

        <div ref={bottomRightRef} className="space-y-3 text-right">
          <div className="flex flex-col items-end gap-2">
            <div className="text-5xl md:text-7xl font-bold font-[Courier] text-black tabular-nums">
              -{formatTime(visitDuration)}
            </div>
            {randomMessage && (
              <div className="bg-black/90 backdrop-blur-sm px-4 py-3 rounded-lg border-2 border-color-orange max-w-xs animate-pulse">
                <p className="text-xs md:text-sm font-[Courier] text-white leading-relaxed whitespace-pre-line">
                  {randomMessage}
                </p>
              </div>
            )}
          </div>
          <p className="text-[10px] md:text-xs tracking-widest font-montserrat text-black/60">
            TIEMPO EN PÁGINA
          </p>

          <div className="hidden md:flex flex-col gap-2 items-end">
            <div className="flex gap-3 items-center bg-black/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-black/20">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: cursorColor }} />
              <p className="text-[10px] font-[Courier] text-black/80 font-bold tabular-nums">
                CURSOR: {mousePosition.x}×{mousePosition.y}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-black/20">
              <div className="w-8 h-8 rounded border-2 border-black/30 shadow-lg" style={{ backgroundColor: cursorColor }} />
              <div className="text-left">
                <p className="text-[10px] font-[Courier] text-black/60">PANTONE</p>
                <p className="text-xs font-[Courier] text-black font-bold tabular-nums">
                  {cursorColor.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div ref={decorationsRef}>
        <div className="absolute top-4 right-4 text-black/40 text-xs font-[Courier]">®</div>
        <div className="absolute top-4 left-4 text-black/40 text-xl">┌</div>
        <div className="absolute bottom-4 right-4 text-black/40 text-xl">┘</div>
        
        <div className="absolute top-32 right-24 text-color-orange/30 text-xs font-[Courier] rotate-12 z-0">
          #FF6B35
        </div>
        <div className="absolute top-[45%] left-[5%] text-color-green/30 text-sm font-[Courier] -rotate-6 z-0">
          {'{ }'}
        </div>
        <div className="absolute bottom-32 left-32 text-black/40 text-xs font-[Courier] z-0">
          25.6762° N
        </div>
        <div className="absolute top-[55%] right-[12%] text-color-orange/30 text-xs font-[Courier] rotate-3 z-0">
          100.3095° W
        </div>
        
        <svg className="absolute top-[25%] right-[8%] w-16 h-16 opacity-20 z-0" viewBox="0 0 100 100">
          <path d="M10,50 Q30,20 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" className="text-color-green"/>
          <circle cx="50" cy="50" r="3" fill="currentColor" className="text-color-orange"/>
        </svg>
        
        <svg className="absolute bottom-[25%] left-[12%] w-12 h-12 opacity-20 z-0" viewBox="0 0 100 100">
          <path d="M20,80 L50,20 L80,80" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-color-orange"/>
          <line x1="35" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="2.5" className="text-color-orange"/>
        </svg>
        
        <div className="absolute top-[70%] left-[25%] text-black/15 text-[10px] font-[Courier] rotate-[-8deg] z-0">
          ※ 2024/25
        </div>
        
        <svg className="absolute top-[15%] left-[45%] w-8 h-8 opacity-15 z-0" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 4" className="text-color-green"/>
        </svg>
      </div>
    </div>
  );
}
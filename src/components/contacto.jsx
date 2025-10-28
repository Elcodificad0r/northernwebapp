import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mail, Phone, Instagram, X } from 'lucide-react';
import { gsap } from 'gsap';

const Contacto = ({ onNavigate }) => {
  const [showCard, setShowCard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const rectanglesRef = useRef([]);
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const bottomDotsRef = useRef([]);
  const homeButtonRef = useRef(null);
  const ctaTitleRef = useRef(null);
  const bottomInfoRef = useRef(null);
  const modalRef = useRef(null);
  const modalOverlayRef = useRef(null);

  // Editorial style images with numbers - 16 images (4x4) - RUTAS CORREGIDAS
  const images = [
    { id: '01', image: '/northernwebapp/assets/contacto1.webp', exit: { y: -1200, x: 0 } },
    { id: '02', image: '/northernwebapp/assets/contacto2.webp', exit: { y: 0, x: -1200 } },
    { id: '03', image: '/northernwebapp/assets/contacto3.webp', exit: { y: 1200, x: 0 } },
    { id: '04', image: '/northernwebapp/assets/contacto4.webp', exit: { y: 0, x: 1200 } },
    { id: '05', image: '/northernwebapp/assets/contacto5.webp', exit: { y: -1200, x: 0 } },
    { id: '06', image: '/northernwebapp/assets/contacto6.webp', exit: { y: 0, x: 1200 } },
    { id: '07', image: '/northernwebapp/assets/contacto7.webp', exit: { y: 1200, x: 0 } },
    { id: '08', image: '/northernwebapp/assets/contacto8.webp', exit: { y: 0, x: -1200 } },
    { id: '09', image: '/northernwebapp/assets/contacto9.webp', exit: { y: 1200, x: 0 } },
    { id: '10', image: '/northernwebapp/assets/contacto10.webp', exit: { y: 0, x: 1200 } },
    { id: '11', image: '/northernwebapp/assets/contacto11.webp', exit: { y: -1200, x: 0 } },
    { id: '12', image: '/northernwebapp/assets/contacto12.webp', exit: { y: 0, x: -1200 } },
    { id: '13', image: '/northernwebapp/assets/contacto13.webp', exit: { y: -1200, x: 0 } },
    { id: '14', image: '/northernwebapp/assets/contacto14.webp', exit: { y: 0, x: 1200 } },
    { id: '15', image: '/northernwebapp/assets/contacto15.webp', exit: { y: 1200, x: 0 } },
    { id: '16', image: '/northernwebapp/assets/contacto16.webp', exit: { y: 0, x: -1200 } }
  ];

  // Preload images for smooth performance
  useEffect(() => {
    const preloadImages = () => {
      images.forEach(img => {
        const image = new Image();
        image.src = img.image;
      });
    };
    
    preloadImages();
  }, []);

  useEffect(() => {
    // Initial fade in for images with GPU acceleration
    const timer = setTimeout(() => {
      if (rectanglesRef.current && rectanglesRef.current.length > 0) {
        gsap.from(rectanglesRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 1,
          stagger: 0.08,
          ease: 'power2.out',
          force3D: true
        });
      }
    }, 100);

    // Auto-trigger transition after showing images
    const transitionTimer = setTimeout(() => {
      handleTransition();
    }, 2600);

    return () => {
      clearTimeout(timer);
      clearTimeout(transitionTimer);
    };
  }, []);

  useEffect(() => {
    // Animate dots in wave pattern (business card) - only when card is shown
    if (showCard && dotsRef.current && dotsRef.current.length > 0) {
      gsap.to(dotsRef.current[0], {
        y: -10,
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        force3D: true
      });

      gsap.to(dotsRef.current[1], {
        y: -10,
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.3,
        force3D: true
      });
    }

    // Animate bottom dots in wave pattern
    if (showCard && bottomDotsRef.current && bottomDotsRef.current.length > 0) {
      gsap.to(bottomDotsRef.current[0], {
        y: -8,
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        force3D: true
      });

      gsap.to(bottomDotsRef.current[1], {
        y: -8,
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.3,
        force3D: true
      });
    }
  }, [showCard]);

  // Animate modal when it opens/closes
  useEffect(() => {
    if (showModal) {
      gsap.fromTo(modalOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(modalRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out', force3D: true }
      );
    }
  }, [showModal]);

  const handleTransition = () => {
    // Animate images out with GPU acceleration
    setTimeout(() => {
      rectanglesRef.current.forEach((rect, index) => {
        if (!rect) return;
        const config = images[index];
        
        gsap.to(rect, {
          x: config.exit.x,
          y: config.exit.y,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.inOut',
          force3D: true
        });
      });
    }, 300);

    // Show card after images animation
    setTimeout(() => {
      setShowCard(true);
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power2.out',
          force3D: true
        });
      }
    }, 1100);
  };

  const handleGoHome = (e) => {
    e.preventDefault();
    
    if (!onNavigate) return;

    const tl = gsap.timeline({
      onComplete: () => onNavigate('home')
    });

    if (cardRef.current && showCard) {
      tl.to(cardRef.current, {
        opacity: 0,
        y: 100,
        duration: 0.8,
        ease: 'power2.in',
        force3D: true
      }, 0);
    }

    tl.to([homeButtonRef.current, ctaTitleRef.current, bottomInfoRef.current].filter(Boolean), {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: 'power2.in',
      stagger: 0.05,
      force3D: true
    }, 0.1);

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in'
    }, 0.3);
  };

  const handleCloseModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
      force3D: true
    });
    gsap.to(modalOverlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setShowModal(false)
    });
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full relative overflow-hidden font-['Courier_New',monospace] bg-cover bg-center"
      style={{ 
        backgroundImage: 'url(/northernwebapp/assets/bg-home.png)',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}
    >
      {/* Top Left - Go Back (solo cuando está la card) */}
      {showCard && (
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-50" ref={homeButtonRef}>
          <button 
            onClick={handleGoHome}
            className="flex items-center gap-2 text-black hover:text-orange transition-colors group"
          >
            <ArrowLeft className="w-6 h-6 md:w-10 md:h-10 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm md:text-xl font-[NUKLEAR] blur-[.5px] tracking-widest hover:text-orange">GO BACK</span>
          </button>
        </div>
      )}

      {/* Top Right - CTA (solo cuando está la card) */}
      {showCard && (
        <div 
          ref={ctaTitleRef}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-50"
        >
          <h1 className="text-3xl md:text-6xl lg:text-8xl font-[NUKLEAR] text-black tracking-tighter blur-[.9px]">
            CONNECT
          </h1>
        </div>
      )}

      {/* Images Grid */}
      {!showCard && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-12 md:p-16 lg:p-20">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-4 gap-x-12 md:gap-x-16 lg:gap-x-20 gap-y-16 md:gap-y-20 lg:gap-y-24">
              {images.map((img, index) => (
                <div
                  key={img.id}
                  ref={el => rectanglesRef.current[index] = el}
                  className="relative flex flex-col items-center"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div 
                    className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 shadow-lg bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${img.image})`,
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-[9px] md:text-[10px] tracking-[0.4em] text-black/30 font-bold">
                    {img.id}.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Business Card */}
      {showCard && (
        <div className="absolute inset-0 flex items-center justify-center z-40 p-4 md:p-8">
          <div 
            ref={cardRef}
            className="bg-stone-100 w-full max-w-2xl aspect-[1.586/1] rounded-none shadow-2xl relative"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Top section with dots - ALEJADOS DEL BORDE SUPERIOR EN MOBILE */}
            <div className="absolute top-16 md:top-8 left-1/2 transform -translate-x-1/2 flex gap-3">
              <div ref={el => dotsRef.current[0] = el} className="w-6 h-6 bg-black rounded-full" style={{ willChange: 'transform' }}></div>
              <div ref={el => dotsRef.current[1] = el} className="w-6 h-6 bg-black rounded-full" style={{ willChange: 'transform' }}></div>
            </div>

            {/* Main content */}
            <div className="absolute bottom-8 left-4 md:left-8 space-y-4 md:space-y-6 text-sm md:text-base">
              <div>
                <h2 className="text-xl md:text-2xl font-unna italic tracking-tight mb-1">SUEÑO NORTEÑO</h2>
                <p className="text-xs md:text-sm tracking-wide">AGENCIA CREATIVA</p>
              </div>

              <div className="space-y-1 text-xs md:text-sm">
                <p className="tracking-wide">MONTERREY, MÉXICO</p>
              </div>

              <div className="space-y-1 text-xs md:text-sm">
                <p className="tracking-wide">+52 81 8077 2959</p>
                <p className="tracking-wide">@NORTHERNDREAMMX</p>
                <p className="tracking-wide break-all">NORTHERNDREAMMX@GMAIL.COM</p>
              </div>
            </div>

            {/* Small dots - top right - ALEJADOS EN MOBILE */}
            <div className="absolute top-16 md:top-8 right-4 md:right-8 flex gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>

            {/* Interactive buttons overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/95">
              <div className="grid grid-cols-2 gap-4 md:gap-6 p-6 md:p-12">
                <button 
                  onClick={() => window.open('mailto:northerndreammx@gmail.com')}
                  className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 border-2 border-black hover:bg-black hover:text-white transition-all group"
                >
                  <Mail className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="font-bold tracking-wider text-xs md:text-sm">EMAIL</span>
                </button>

                <button 
                  onClick={() => window.open('tel:+528180772959')}
                  className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 border-2 border-black hover:bg-black hover:text-white transition-all group"
                >
                  <Phone className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="font-bold tracking-wider text-xs md:text-sm">CALL</span>
                </button>

                <button 
                  onClick={() => window.open('https://instagram.com/northerndreammx')}
                  className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 border-2 border-black hover:bg-black hover:text-white transition-all group"
                >
                  <Instagram className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="font-bold tracking-wider text-xs md:text-sm">INSTAGRAM</span>
                </button>

                <button 
                  onClick={() => {
                    navigator.clipboard.writeText('northerndreammx@gmail.com');
                    alert('Email copiado!');
                  }}
                  className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 border-2 border-black hover:bg-black hover:text-white transition-all group"
                >
                  <Mail className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="font-bold tracking-wider text-xs md:text-sm">COPY EMAIL</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer elegante y moderno */}
      {showCard && (
        <div 
          ref={bottomInfoRef}
          className="absolute bottom-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm"
        >
          <div className="w-full px-4 md:px-8 py-4 md:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Animated dots + Brand */}
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div ref={el => bottomDotsRef.current[0] = el} className="w-2 h-2 bg-black rounded-full" style={{ willChange: 'transform' }}></div>
                  <div ref={el => bottomDotsRef.current[1] = el} className="w-2 h-2 bg-black rounded-full" style={{ willChange: 'transform' }}></div>
                </div>
                <span className="text-xs tracking-widest font-bold text-black">SUEÑO NORTEÑO</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://instagram.com/northerndreammx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-xs tracking-wide hidden md:inline">INSTAGRAM</span>
                </a>
                <a 
                  href="https://vimeo.com/user245104514"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
                  </svg>
                  <span className="text-xs tracking-wide hidden md:inline">VIMEO</span>
                </a>
              </div>

              {/* Terms Button */}
              <button 
                onClick={() => setShowModal(true)}
                className="text-xs tracking-wide text-black hover:text-gray-600 transition-colors border border-black/20 px-3 py-1.5 hover:border-black/40"
              >
                TÉRMINOS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Términos y Condiciones */}
      {showModal && (
        <div 
          ref={modalOverlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div 
            ref={modalRef}
            className="bg-stone-100 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 text-black hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal content */}
            <div className="p-8 md:p-12 font-['Courier_New',monospace]">
              {/* Header with dots */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-black rounded-full"></div>
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                TÉRMINOS Y CONDICIONES
              </h2>
              <p className="text-sm tracking-widest text-black/60 mb-8">SUEÑO NORTEÑO — AGENCIA CREATIVA</p>

              <div className="space-y-6 text-sm leading-relaxed">
                <section>
                  <h3 className="font-bold tracking-wide mb-2">1. PROPIEDAD INTELECTUAL</h3>
                  <p className="text-black/80">
                    Todos los trabajos, diseños, conceptos creativos y materiales presentados en este portafolio son propiedad intelectual de SUEÑO NORTEÑO y sus respectivos clientes. Queda estrictamente prohibida la reproducción, distribución o uso no autorizado de cualquier contenido sin permiso expreso por escrito.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold tracking-wide mb-2">2. USO DEL SITIO WEB</h3>
                  <p className="text-black/80">
                    El acceso y uso de este sitio web está sujeto a los términos aquí establecidos. Al navegar en este sitio, aceptas cumplir con estas condiciones. Nos reservamos el derecho de modificar estos términos en cualquier momento sin previo aviso.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold tracking-wide mb-2">3. SERVICIOS CREATIVOS</h3>
                  <p className="text-black/80">
                    SUEÑO NORTEÑO ofrece servicios de diseño gráfico, branding, producción audiovisual y estrategia creativa. Los detalles específicos de cada proyecto, incluyendo alcance, entregables y términos de pago, se establecen mediante contratos individuales con cada cliente.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold tracking-wide mb-2">4. CONFIDENCIALIDAD</h3>
                  <p className="text-black/80">
                    Mantenemos estricta confidencialidad sobre todos los proyectos y relaciones comerciales con nuestros clientes. Cualquier información compartida durante el proceso de colaboración será tratada con la máxima discreción.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold tracking-wide mb-2">5. LIMITACIÓN DE RESPONSABILIDAD</h3>
                  <p className="text-black/80">
                    SUEÑO NORTEÑO no será responsable por daños indirectos, incidentales o consecuentes derivados del uso de este sitio web o de nuestros servicios, excepto donde la ley aplicable lo requiera.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold tracking-wide mb-2">6. CONTACTO Y CONSULTAS</h3>
                  <p className="text-black/80">
                    Para consultas sobre colaboraciones, uso de contenido o cualquier pregunta relacionada con estos términos, contáctanos:
                  </p>
                  <div className="mt-3 space-y-1 text-black/80">
                    <p>Email: northerndreammx@gmail.com</p>
                    <p>Teléfono: +52 81 8077 2959</p>
                    <p>Ubicación: Monterrey, Nuevo León, México</p>
                  </div>
                </section>

                <section className="pt-4 border-t border-black/10">
                  <p className="text-xs tracking-widest text-black/50">
                    © 2025 SUEÑO NORTEÑO. TODOS LOS DERECHOS RESERVADOS.
                  </p>
                  <p className="text-xs tracking-wide text-black/50 mt-2">
                    Última actualización: Octubre 2025
                  </p>
                </section>
              </div>

              {/* Bottom dots */}
              <div className="flex items-center gap-2 mt-8 justify-center">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacto;
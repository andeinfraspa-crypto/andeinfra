'use client';

import React, { useState } from 'react';
import {
  Building2,
  Wrench,
  Truck,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Layers,
  Compass,
  ChevronRight,
  Menu,
  X,
  Pickaxe,
  Loader2
} from 'lucide-react';

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estados del Formulario de Contacto
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [contactoCliente, setContactoCliente] = useState('');
  const [frente, setFrente] = useState('Obras Civiles e Infraestructura');
  const [mensaje, setMensaje] = useState('');

  // Estados de envío Web3Forms
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Scroll a la sección del estimador y preseleccionar frente
  const handleCotizarFrente = (frenteTitle: string) => {
    setFrente(frenteTitle);
    const element = document.getElementById('estimador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEstimador = () => {
    const element = document.getElementById('estimador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler de envío por Web3Forms
  const handleWeb3FormsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('access_key', '4ef05de7-60b6-45c1-8d74-3a8a10005d33'); 
    formData.append('subject', `Nueva Consulta Web: ${nombre} - ${frente}`);
    formData.append('from_name', 'Web AndeInfra');

    // Nombres de campos limpios para el correo
    formData.append('Nombre', nombre);
    formData.append('Empresa', empresa || 'No especificada');
    formData.append('Contacto (Email o Teléfono)', contactoCliente);
    formData.append('Frente de Proyecto', frente);
    formData.append('Detalles del Proyecto', mensaje || 'Sin detalles adicionales');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setNombre('');
        setEmpresa('');
        setContactoCliente('');
        setMensaje('');
      } else {
        setErrorMessage('Ocurrió un error al enviar el formulario. Por favor intenta por WhatsApp.');
      }
    } catch (error) {
      setErrorMessage('Error de conexión. Revisa tu internet o contáctanos directamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generador de URL de WhatsApp
  const getWhatsAppUrl = () => {
    const text = `Hola AndeInfra, quiero solicitar información:\n- *Nombre:* ${nombre || 'No especificado'}\n- *Empresa:* ${empresa || 'N/A'}\n- *Contacto:* ${contactoCliente || 'N/A'}\n- *Frente:* ${frente}\n- *Mensaje:* ${mensaje.trim() || 'Sin observaciones'}`;
    return `https://wa.me/56976563636?text=${encodeURIComponent(text)}`;
  };

  // 4 Frentes de Negocio
  const frentes = [
    {
      id: 1,
      icon: Building2,
      code: 'FN-01',
      title: 'Obras Civiles e Infraestructura',
      subtitle: 'Construcción y Preparación de Terreno',
      desc: 'Ejecución de proyectos de edificación, movimiento de tierras, hormigón armado, estructuras metálicas, obras viales y obras de urbanización técnica en norma.',
      bullets: [
        'Movimiento de tierras masivo y perfilado de terreno',
        'Hormigonado estructural, albañilería y cimentaciones',
        'Estructuras metálicas y naves industriales',
        'Obras viales, accesos y pavimentación urbana'
      ],
      spec: 'CUMPLIMIENTO NCH / SERVIU / VIALIDAD'
    },
    {
      id: 2,
      icon: Pickaxe,
      code: 'FN-02',
      title: 'Minería e Industria',
      subtitle: 'Montaje y Conservación de Activos',
      desc: 'Servicios especializados para faenas mineras y plantas industriales. Montaje mecánico, soldadura calificada, conservación de infraestructura y mantenimiento preventivo.',
      bullets: [
        'Montaje de estructuras y calderería industrial',
        'Soldadura calificada (SMAW, GMAW, GTAW)',
        'Conservación y reparación de activos mineros',
        'Habilitación de plataformas y campamentos'
      ],
      spec: 'ESTÁNDAR DE SEGURIDAD MINERA'
    },
    {
      id: 3,
      icon: Wrench,
      code: 'FN-03',
      title: 'Servicios Generales y Operación',
      subtitle: 'Mantenimiento Continuo de Instalaciones',
      desc: 'Gestión integral del entorno operativo y continuidad de servicio. Aseo técnico industrial, conservación de instalaciones, áreas verdes y manejo de residuos.',
      bullets: [
        'Aseo y sanitización industrial de instalaciones',
        'Mantenimiento integral de recintos y bodegas',
        'Paisajismo, mantención de áreas verdes y riego',
        'Manejo y acopio de residuos no peligrosos'
      ],
      spec: 'CONTINUIDAD OPERATIVA 24/7'
    },
    {
      id: 4,
      icon: Truck,
      code: 'FN-04',
      title: 'Maquinaria y Logística',
      subtitle: 'Flota y Transporte Especializado',
      desc: 'Soluciones de soporte operativo mediante arriendo/venta de maquinaria pesada, transporte de carga, traslado de personal técnico y almacenamiento seguro.',
      bullets: [
        'Arriendo de excavadoras, retroexcavadoras y camiones',
        'Transporte de carga pesada y materiales de obra',
        'Transporte privado de cuadrillas y personal técnico',
        'Servicios de bodegaje y custodia de insumos'
      ],
      spec: 'FLOTA REVISADA Y CERTIFICADA'
    }
  ];

  // 6 Capacidades Técnicas
  const capacidades = [
    {
      id: 'cap-1',
      cat: 'obras',
      title: 'Movimiento de tierras',
      desc: 'Excavaciones, nivelación, escarpe, rellenos compactados, zanjas y pavimentación.',
      metrics: 'Volúmenes pequeños a gran escala | Control topográfico GPS',
      code: 'CT-01'
    },
    {
      id: 'cap-2',
      cat: 'obras',
      title: 'Obras de hormigón',
      desc: 'Albañilería, fundaciones, losas, muros de contención y obra gruesa especializada.',
      metrics: 'Hormigones dosificados en norma NCh170 | Encofrados metálicos',
      code: 'CT-02'
    },
    {
      id: 'cap-3',
      cat: 'instalaciones',
      title: 'Instalaciones de especialidades',
      desc: 'Proyectos sanitarios, redes eléctricas de fuerza y alumbrado, redes mecánicas y HVAC.',
      metrics: 'Instalaciones certificadas SEC y normativa sanitaria vigente',
      code: 'CT-03'
    },
    {
      id: 'cap-4',
      cat: 'obras',
      title: 'Obras viales y caminos',
      desc: 'Construcción y perfilado de caminos interiores, conservación de carpetas y drenajes.',
      metrics: 'Maquinaria pesada propia | Señalética y seguridad vial',
      code: 'CT-04'
    },
    {
      id: 'cap-5',
      cat: 'mineria',
      title: 'Estructuras metálicas',
      desc: 'Fabricación, armado, soldadura calificada y montaje industrial de naves y soporte.',
      metrics: 'Planes de izaje y cálculo estructural | Tratamiento anticorrosivo',
      code: 'CT-05'
    },
    {
      id: 'cap-6',
      cat: 'servicios',
      title: 'Mantención y conservación',
      desc: 'Habilitación de oficinas, remodelación de infraestructura, pintura y mantenimiento edilicio.',
      metrics: 'Turnos adaptados a operación de cliente | Respuesta inmediata',
      code: 'CT-06'
    }
  ];

  return (
    <div className="min-h-screen bg-[#142026] text-white font-['Inter',sans-serif] selection:bg-[#B96A37] selection:text-white flex flex-col">
      
      {/* HEADER TOP BAR */}
      <div className="bg-[#2C4A57] border-b border-[#2C4A57]/60 text-xs text-[#ECE5D9] py-1.5 px-4 font-mono-tech">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              OPERACIONES ACTIVAS
            </span>
            <span className="text-[#ECE5D9]/40">|</span>
            <span className="text-[#ECE5D9]/90">LA SERENA, REGIÓN DE COQUIMBO</span>
          </div>
          <div className="flex items-center gap-4 text-[#ECE5D9]/90">
            <a href="mailto:contacto@andeinfra.cl" className="hover:text-[#B96A37] transition-colors flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#B96A37]" />
              <span>contacto@andeinfra.cl</span>
            </a>
            <span className="text-[#ECE5D9]/40">|</span>
            <a href="https://wa.me/56976563636" target="_blank" rel="noopener noreferrer" className="hover:text-[#B96A37] transition-colors flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#B96A37]" />
              <span>+56 9 7656 3636</span>
            </a>
          </div>
        </div>
      </div>

      {/* NAVBAR STICKY */}
      <header className="sticky top-0 z-50 bg-[#142026]/95 backdrop-blur-md border-b border-[#2C4A57]/40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Oficial */}
          <a href="#" className="flex items-center group py-2">
            <img 
              src="/logo.png" 
              alt="AndeInfra - Ingeniería y Servicios" 
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
            />
          </a>

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#quienes-somos" className="text-[#ECE5D9]/80 hover:text-[#B96A37] transition-colors py-1">
              Quiénes Somos
            </a>
            <a href="#frentes" className="text-[#ECE5D9]/80 hover:text-[#B96A37] transition-colors py-1">
              Frentes de Negocio
            </a>
            <a href="#capacidades" className="text-[#ECE5D9]/80 hover:text-[#B96A37] transition-colors py-1">
              Capacidades Técnicas
            </a>
            <a href="#proceso" className="text-[#ECE5D9]/80 hover:text-[#B96A37] transition-colors py-1">
              Cómo Trabajamos
            </a>
            <a href="#contacto" className="text-[#ECE5D9]/80 hover:text-[#B96A37] transition-colors py-1">
              Contacto
            </a>
          </nav>

          {/* CTA WhatsApp */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/56976563636"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B96A37] hover:bg-[#a35b2e] text-white px-5 py-2.5 font-heading font-semibold text-sm tracking-wide transition-all shadow-md flex items-center gap-2 border border-[#B96A37]/30 hover:shadow-lg active:scale-95"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>WhatsApp Directo</span>
            </a>
          </div>

          {/* Botón Menú Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#ECE5D9] hover:text-[#B96A37] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Dropdown Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#142026] border-b border-[#2C4A57] px-4 pt-2 pb-6 space-y-3 font-mono-tech text-sm">
            <a
              href="#quienes-somos"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#ECE5D9] hover:text-[#B96A37] border-b border-[#2C4A57]/30"
            >
              01. Quiénes Somos
            </a>
            <a
              href="#frentes"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#ECE5D9] hover:text-[#B96A37] border-b border-[#2C4A57]/30"
            >
              02. Frentes de Negocio
            </a>
            <a
              href="#capacidades"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#ECE5D9] hover:text-[#B96A37] border-b border-[#2C4A57]/30"
            >
              03. Capacidades Técnicas
            </a>
            <a
              href="#proceso"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#ECE5D9] hover:text-[#B96A37] border-b border-[#2C4A57]/30"
            >
              04. Cómo Trabajamos
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#ECE5D9] hover:text-[#B96A37]"
            >
              05. Contacto Corporativo
            </a>
            <div className="pt-2">
              <a
                href="https://wa.me/56976563636"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#B96A37] text-white py-3 px-4 font-heading font-semibold text-center block"
              >
                Conversar por WhatsApp (+56 9 7656 3636)
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative bg-[#142026] bg-cad-grid border-b border-[#2C4A57]/60 overflow-hidden py-16 sm:py-24 lg:py-28">
          
          <div className="absolute inset-0 pointer-events-none opacity-20 topo-lines"></div>

          <div className="absolute top-6 left-6 font-mono-tech text-[10px] text-[#2C4A57] tracking-widest hidden md:block">
            LAT: 29°54&apos;28&quot;S | LONG: 71°15&apos;15&quot;W | ELEV: 120m s.n.m.
          </div>
          <div className="absolute bottom-6 right-6 font-mono-tech text-[10px] text-[#2C4A57] tracking-widest hidden md:block">
            REF: INFRA-COQUIMBO-2026 // A-01
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                
                <div className="inline-flex items-center gap-2 bg-[#2C4A57]/60 border border-[#B96A37]/50 px-3.5 py-1.5 text-xs font-mono-tech text-[#ECE5D9]">
                  <span className="w-2 h-2 bg-[#B96A37] rounded-full animate-ping"></span>
                  <span className="text-[#B96A37] font-bold">AndeInfra</span>
                  <span className="text-[#2C4A57]">|</span>
                  <span className="text-[#ECE5D9]/90">La Serena, Región de Coquimbo</span>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Solidez Cordillerana,<br />
                  <span className="text-[#B96A37] underline decoration-[#2C4A57] underline-offset-8">
                    Precisión de Ingeniería.
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-[#ECE5D9]/90 max-w-2xl leading-relaxed font-light">
                  Ejecutamos obras y prestamos servicios a mandantes públicos, mineros e industriales. Cada proyecto entregado en plazo, en norma y en terreno.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/56976563636"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#B96A37] hover:bg-[#a35b2e] text-white px-7 py-4 font-heading font-bold text-base tracking-wide flex items-center justify-center gap-3 transition-all shadow-xl border border-[#B96A37]/50 hover:translate-y-[-2px] active:translate-y-[0px]"
                  >
                    <Phone className="w-5 h-5 fill-current text-white" />
                    <span>Conversemos Ahora</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>

                  <a
                    href="#frentes"
                    className="bg-[#2C4A57] hover:bg-[#385e6f] text-white px-6 py-4 font-heading font-semibold text-base tracking-wide flex items-center justify-center gap-2 border border-[#2C4A57] hover:border-[#B96A37]/40 transition-all"
                  >
                    <Layers className="w-5 h-5 text-[#B96A37]" />
                    <span>Ver Frentes de Negocio</span>
                  </a>
                </div>

                {/* Quick Trust Attributes Pill Grid (Ajustado a 2 columnas sin 'TERRENO') */}
                <div className="pt-6 border-t border-[#2C4A57]/60 grid grid-cols-2 gap-4 text-center sm:text-left">
                  <div className="p-3 bg-[#2C4A57]/20 border border-[#2C4A57]/40">
                    <div className="text-xs font-mono-tech text-[#B96A37] font-bold">100% NORMA</div>
                    <div className="text-[11px] text-[#ECE5D9]/70 mt-0.5">Licitaciones Públicas y Privadas</div>
                  </div>
                  <div className="p-3 bg-[#2C4A57]/20 border border-[#2C4A57]/40">
                    <div className="text-xs font-mono-tech text-[#B96A37] font-bold">RESPALDO</div>
                    <div className="text-[11px] text-[#ECE5D9]/70 mt-0.5">Capacidad Operativa y Técnica</div>
                  </div>
                </div>

              </div>

              <div className="lg:col-span-5 relative">
                <div className="bg-[#2C4A57]/30 border-2 border-[#2C4A57] p-6 text-white tech-corner-box shadow-2xl relative overflow-hidden">
                  
                  <div className="flex justify-between items-center border-b border-[#2C4A57] pb-3 mb-4 font-mono-tech text-xs text-[#ECE5D9]/80">
                    <span className="flex items-center gap-1.5 text-[#B96A37]">
                      <Compass className="w-4 h-4" />
                      CAD SPECIFICATION // ELEVATION PROFILE
                    </span>
                    <span className="text-emerald-400 font-bold">VERIFICADO</span>
                  </div>

                  <div className="w-full h-64 relative bg-[#142026] border border-[#2C4A57] p-4 flex flex-col justify-between overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full text-[#2C4A57]/40" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                      
                      <path d="M -10 180 Q 80 120 180 150 T 380 110 T 500 160" fill="none" stroke="#B96A37" strokeWidth="1.5" strokeDasharray="4 2" />
                      <path d="M -10 140 Q 100 80 200 110 T 400 70 T 500 120" fill="none" stroke="#2C4A57" strokeWidth="2" />
                      <path d="M -10 100 Q 120 50 220 80 T 420 40 T 500 80" fill="none" stroke="#ECE5D9" strokeWidth="1" opacity="0.6" />

                      <line x1="50" y1="20" x2="50" y2="220" stroke="#B96A37" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="250" y1="20" x2="250" y2="220" stroke="#2C4A57" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="400" y1="20" x2="400" y2="220" stroke="#B96A37" strokeWidth="1" strokeDasharray="2 2" />

                      <circle cx="180" cy="150" r="4" fill="#B96A37" />
                      <circle cx="200" cy="110" r="4" fill="#2C4A57" />
                      <circle cx="400" cy="70" r="4" fill="#ECE5D9" />
                    </svg>

                    <div className="relative z-10 flex justify-between font-mono-tech text-[10px] text-[#ECE5D9]/70">
                      <div>ELEV: +1,240m</div>
                      <div className="text-[#B96A37]">COORDINATES: COQUIMBO MACROZONE</div>
                    </div>

                    <div className="relative z-10 bg-[#142026]/90 border border-[#2C4A57] p-3 text-xs space-y-1 my-auto max-w-xs">
                      <div className="text-[#B96A37] font-bold font-mono-tech">ANDES INFRASTRUCTURE SPEC</div>
                      <div className="text-white font-medium">Obras Civiles, Mineras e Industriales</div>
                      <div className="text-[#ECE5D9]/70 text-[11px]">Compromiso en Terreno &amp; Gestión Operativa</div>
                    </div>

                    <div className="relative z-10 flex justify-between items-end font-mono-tech text-[10px] text-[#ECE5D9]/70">
                      <span>STATION: 0+450km</span>
                      <span className="text-emerald-400 font-bold">100% EN NORMA</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#2C4A57] flex items-center justify-between font-mono-tech text-xs">
                    <div className="text-[#ECE5D9]/80">
                      ESTÁNDAR: <span className="text-white font-bold">ISO / SEC / NCh</span>
                    </div>
                    <div className="text-[#B96A37] font-bold">
                      COQUIMBO, CL
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>


        {/* QUIÉNES SOMOS */}
        <section id="quienes-somos" className="bg-[#ECE5D9] text-[#142026] py-16 sm:py-24 border-b border-[#2C4A57]/30 bg-cad-grid-arena relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#142026]/20 pb-6 mb-12">
              <div>
                <span className="font-mono-tech text-xs text-[#B96A37] font-bold tracking-widest uppercase">
                  01. PERFIL INSTITUCIONAL
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#142026] mt-1">
                  Quiénes Somos &amp; Atributos Clave
                </h2>
              </div>
              <p className="text-sm font-mono-tech text-[#2C4A57] mt-2 md:mt-0">
                AndeInfra | La Serena, IV Región
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-8 border-2 border-[#142026] shadow-md relative">
                  <div className="w-12 h-1 bg-[#B96A37] mb-4"></div>
                  <h3 className="font-heading text-2xl font-bold text-[#142026] mb-3">
                    Contratista Formal, Local y Escalable
                  </h3>
                  <p className="text-[#142026]/80 text-base leading-relaxed mb-4">
                    AndeInfra es una empresa regional con base operativa en La Serena, consolidada como socio estratégico para mandantes del sector público, empresas mineras e industrias.
                  </p>
                  <p className="text-[#142026]/80 text-base leading-relaxed">
                    Combinamos la solidez técnica de nuestra ingeniería con la agilidad operativa que exige el trabajo en terreno, garantizando altos estándares en prevención de riesgos, calidad y cumplimiento estricto de plazos.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                <div className="bg-white p-6 border border-[#2C4A57]/30 hover:border-[#B96A37] transition-all shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-[#142026] text-[#B96A37] flex items-center justify-center font-bold font-mono-tech text-sm mb-4">
                      01
                    </div>
                    <h4 className="font-heading font-bold text-lg text-[#142026] mb-2">
                      Licitación Pública y Privada
                    </h4>
                    <p className="text-xs text-[#142026]/75 leading-relaxed">
                      100% de capacidad legal, financiera y administrativa para postular a licitaciones públicas (Mercado Público / MOP / SERVIU) y contrataciones minero-industriales.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-[11px] font-mono-tech text-[#2C4A57] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B96A37]" />
                    <span>En Norma Vigente</span>
                  </div>
                </div>

                <div className="bg-white p-6 border border-[#2C4A57]/30 hover:border-[#B96A37] transition-all shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-[#2C4A57] text-[#ECE5D9] flex items-center justify-center font-bold font-mono-tech text-sm mb-4">
                      02
                    </div>
                    <h4 className="font-heading font-bold text-lg text-[#142026] mb-2">
                      Cobertura en Terreno
                    </h4>
                    <p className="text-xs text-[#142026]/75 leading-relaxed">
                      Despliegue ágil de cuadrillas, supervisores y equipamiento en toda la Región de Coquimbo y macrozona norte. Presencia efectiva en valles, costa y cordillera.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-[11px] font-mono-tech text-[#2C4A57] font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#B96A37]" />
                    <span>Respuesta Local</span>
                  </div>
                </div>

                <div className="bg-white p-6 border border-[#2C4A57]/30 hover:border-[#B96A37] transition-all shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-[#B96A37] text-white flex items-center justify-center font-bold font-mono-tech text-sm mb-4">
                      03
                    </div>
                    <h4 className="font-heading font-bold text-lg text-[#142026] mb-2">
                      Respaldo Operativo
                    </h4>
                    <p className="text-xs text-[#142026]/75 leading-relaxed">
                      Equipos propios y red logística sólida. Mantenimiento de trazabilidad técnica, planes de prevención de riesgos y trazabilidad financiera transparente.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-[11px] font-mono-tech text-[#2C4A57] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B96A37]" />
                    <span>Seguridad &amp; Calidad</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* FRENTES DE NEGOCIO */}
        <section id="frentes" className="bg-[#142026] py-16 sm:py-24 border-b border-[#2C4A57]/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#2C4A57] pb-6 mb-12">
              <div>
                <span className="font-mono-tech text-xs text-[#B96A37] font-bold tracking-widest uppercase">
                  02. NÚCLEO OPERATIVO
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  Frentes de Negocio
                </h2>
              </div>
              <p className="text-xs font-mono-tech text-[#ECE5D9]/70 mt-2 md:mt-0">
                Líneas operativas estructuradas para atender mandantes exigentes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {frentes.map((frenteItem) => {
                const IconComponent = frenteItem.icon;
                return (
                  <div
                    key={frenteItem.id}
                    className="bg-[#2C4A57] border border-[#2C4A57] hover:border-[#B96A37] transition-all flex flex-col justify-between group p-6 shadow-lg relative overflow-hidden"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-mono-tech text-xs text-[#B96A37] font-bold tracking-wider">
                          {frenteItem.code}
                        </span>
                        <div className="w-10 h-10 bg-[#142026] text-[#ECE5D9] group-hover:text-[#B96A37] group-hover:bg-[#142026] flex items-center justify-center transition-colors border border-[#2C4A57]">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="font-heading font-extrabold text-xl text-white mb-1 group-hover:text-[#ECE5D9]">
                        {frenteItem.title}
                      </h3>
                      <p className="text-xs font-mono-tech text-[#B96A37] mb-3">
                        {frenteItem.subtitle}
                      </p>
                      <p className="text-xs text-[#ECE5D9]/80 leading-relaxed mb-4">
                        {frenteItem.desc}
                      </p>

                      <ul className="space-y-2 mb-6 text-xs text-[#ECE5D9]/90">
                        {frenteItem.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#B96A37] font-bold mt-0.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#142026]/60 flex items-center justify-between">
                      <span className="text-[10px] font-mono-tech text-[#ECE5D9]/60">
                        {frenteItem.spec}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCotizarFrente(frenteItem.title)}
                        className="text-xs font-heading font-bold text-[#B96A37] hover:text-white flex items-center gap-1 transition-colors group-hover:translate-x-0.5 cursor-pointer"
                      >
                        <span>Cotizar</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            <div className="mt-12 bg-[#2C4A57]/40 border border-[#2C4A57] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#B96A37] text-white flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-white">
                    ¿Requieres uno o múltiples servicios para tu próximo proyecto?
                  </h4>
                  <p className="text-xs text-[#ECE5D9]/80">
                    Estructuramos propuestas integrales de ingeniería + montaje + logística para un solo interlocutor.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={scrollToEstimador}
                className="bg-[#B96A37] hover:bg-[#a35b2e] text-white px-5 py-3 font-heading font-semibold text-xs tracking-wide whitespace-nowrap transition-colors border border-[#B96A37]/40 cursor-pointer"
              >
                Solicitar Propuesta
              </button>
            </div>

          </div>
        </section>


        {/* CAPACIDADES TÉCNICAS */}
        <section id="capacidades" className="bg-[#142026] bg-cad-grid-dark py-16 sm:py-24 border-b border-[#2C4A57]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#2C4A57] pb-6 mb-12">
              <div>
                <span className="font-mono-tech text-xs text-[#B96A37] font-bold tracking-widest uppercase">
                  03. ESPECIFICACIONES DE SERVICIO
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  Capacidades Técnicas
                </h2>
              </div>
              <p className="text-xs font-mono-tech text-[#ECE5D9]/70 mt-2 md:mt-0">
                Gama técnica verificada para ejecución en terreno
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capacidades.map((cap) => (
                <div
                  key={cap.id}
                  className="bg-white text-[#142026] p-6 border-2 border-[#2C4A57] hover:border-[#B96A37] transition-all shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200 font-mono-tech text-xs text-[#2C4A57]">
                      <span className="font-bold text-[#B96A37]">{cap.code}</span>
                      <span className="uppercase text-[10px] tracking-wider bg-gray-100 px-2 py-0.5 border border-gray-300">
                        {cap.cat}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-[#142026] mb-2">
                      {cap.title}
                    </h3>

                    <p className="text-xs text-[#142026]/80 leading-relaxed mb-4">
                      {cap.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-[11px] font-mono-tech text-[#2C4A57] font-semibold bg-[#ECE5D9]/50 p-2.5 border border-[#ECE5D9]">
                      <span className="text-[#B96A37] font-bold">ESTÁNDAR:</span> {cap.metrics}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* CÓMO TRABAJAMOS */}
        <section id="proceso" className="bg-[#2C4A57] text-white py-16 sm:py-24 border-b border-[#2C4A57]/60 relative overflow-hidden">
          
          <div className="absolute inset-0 pointer-events-none opacity-10 topo-lines"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ECE5D9]/20 pb-6 mb-12">
              <div>
                <span className="font-mono-tech text-xs text-[#B96A37] font-bold tracking-widest uppercase">
                  04. METODOLOGÍA Y CONTROL
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  Cómo Trabajamos
                </h2>
              </div>
              <p className="text-xs font-mono-tech text-[#ECE5D9]/80 mt-2 md:mt-0">
                Línea de Cota Topográfica &amp; Control de Hitos de Proyecto
              </p>
            </div>

            <div className="relative">
              
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-[#142026] -translate-y-1/2 z-0">
                <div className="h-full bg-[#B96A37] w-3/4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                
                <div className="bg-[#142026] p-6 border-2 border-[#142026] hover:border-[#B96A37] transition-all shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 bg-[#B96A37] text-white flex items-center justify-center font-mono-tech font-extrabold text-base">
                        01
                      </span>
                      <span className="font-mono-tech text-[10px] text-[#ECE5D9]/60">
                        ELEV: +100m s.n.m.
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white mb-2">
                      Evaluación
                    </h3>
                    <p className="text-xs font-mono-tech text-[#B96A37] mb-3">
                      Visita a Terreno &amp; Alcance
                    </p>
                    <p className="text-xs text-[#ECE5D9]/80 leading-relaxed">
                      Relevamiento técnico en terreno, análisis de interferencias, cubicaciones iniciales y definición estricta del alcance operativo.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-[#2C4A57] font-mono-tech text-[11px] text-[#ECE5D9]/60">
                    HITO: Informe Técnico Inicial
                  </div>
                </div>

                <div className="bg-[#142026] p-6 border-2 border-[#142026] hover:border-[#B96A37] transition-all shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 bg-[#B96A37] text-white flex items-center justify-center font-mono-tech font-extrabold text-base">
                        02
                      </span>
                      <span className="font-mono-tech text-[10px] text-[#ECE5D9]/60">
                        ELEV: +450m s.n.m.
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white mb-2">
                      Propuesta
                    </h3>
                    <p className="text-xs font-mono-tech text-[#B96A37] mb-3">
                      Oferta Técnica &amp; Económica
                    </p>
                    <p className="text-xs text-[#ECE5D9]/80 leading-relaxed">
                      Estructuración de presupuestos en norma, carta Gantt detallada, análisis de precios unitarios (APU) y matriz de riesgos.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-[#2C4A57] font-mono-tech text-[11px] text-[#ECE5D9]/60">
                    HITO: Licitación / Contrato
                  </div>
                </div>

                <div className="bg-[#142026] p-6 border-2 border-[#142026] hover:border-[#B96A37] transition-all shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 bg-[#B96A37] text-white flex items-center justify-center font-mono-tech font-extrabold text-base">
                        03
                      </span>
                      <span className="font-mono-tech text-[10px] text-[#ECE5D9]/60">
                        ELEV: +850m s.n.m.
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white mb-2">
                      Ejecución
                    </h3>
                    <p className="text-xs font-mono-tech text-[#B96A37] mb-3">
                      Movilización &amp; Control
                    </p>
                    <p className="text-xs text-[#ECE5D9]/80 leading-relaxed">
                      Despliegue de cuadrillas, supervisión directa en terreno, control de avance físico-financiero y protocolo estricto de seguridad HSE.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-[#2C4A57] font-mono-tech text-[11px] text-[#ECE5D9]/60">
                    HITO: Reporte Semanal Avance
                  </div>
                </div>

                <div className="bg-[#142026] p-6 border-2 border-[#142026] hover:border-[#B96A37] transition-all shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 bg-emerald-600 text-white flex items-center justify-center font-mono-tech font-extrabold text-base">
                        04
                      </span>
                      <span className="font-mono-tech text-[10px] text-emerald-400 font-bold">
                        ELEV: +1,200m (ENTREGA)
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white mb-2">
                      Entrega
                    </h3>
                    <p className="text-xs font-mono-tech text-emerald-400 mb-3">
                      Recepción &amp; Mantención
                    </p>
                    <p className="text-xs text-[#ECE5D9]/80 leading-relaxed">
                      Pruebas de servicio, protocolo de recepción conforme, dossier técnico de obra y plan de mantención para garantizar continuidad operativa.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-[#2C4A57] font-mono-tech text-[11px] text-emerald-400 font-bold">
                    HITO: Recepción Conforme
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>


        {/* FORMULARIO DE CONTACTO CON PLACEHOLDERS GENÉRICOS (`id="estimador"`) */}
        <section id="estimador" className="bg-[#142026] bg-cad-grid py-16 sm:py-20 border-b border-[#2C4A57]/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#2C4A57]/50 border-2 border-[#2C4A57] p-8 tech-corner-box shadow-2xl">
              
              <div className="text-center mb-8">
                <span className="font-mono-tech text-xs text-[#B96A37] font-bold tracking-widest uppercase">
                  FORMULARIO DE ATENCIÓN DIRECTA
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                  Cuéntanos Sobre tu Proyecto
                </h3>
                <p className="text-xs text-[#ECE5D9]/80 max-w-xl mx-auto mt-2">
                  Completa tus datos para coordinar una reunión técnica o cotización directa con nuestro equipo de ingeniería.
                </p>
              </div>

              {isSubmitted ? (
                /* Mensaje de éxito al enviar */
                <div className="bg-[#142026] border-2 border-emerald-500 p-8 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center rounded-full border border-emerald-500">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-xl text-white">
                    ¡Solicitud Recibida Con Éxito!
                  </h4>
                  <p className="text-xs text-[#ECE5D9]/80 max-w-md mx-auto leading-relaxed">
                    Hemos enviado tus datos directamente a nuestra bandeja de ingeniería (<span className="text-[#B96A37]">contacto@andeinfra.cl</span>). Te responderemos a la brevedad.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="inline-block mt-4 bg-[#2C4A57] hover:bg-[#385e6f] text-white text-xs font-mono-tech px-6 py-2.5 transition-colors border border-[#2C4A57]"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                /* Formulario Web3Forms con Placeholders Neutros */
                <form onSubmit={handleWeb3FormsSubmit} className="space-y-6">
                  
                  {/* Fila 1: Nombre, Empresa, Email o Teléfono */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    <div>
                      <label className="block font-mono-tech text-xs text-[#ECE5D9] mb-2 font-semibold">
                        1. Nombre:
                      </label>
                      <input
                        type="text"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej: Juan Pérez"
                        className="w-full bg-[#142026] border border-[#2C4A57] text-xs text-white p-3 focus:outline-none focus:border-[#B96A37]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-tech text-xs text-[#ECE5D9] mb-2 font-semibold">
                        2. Empresa:
                      </label>
                      <input
                        type="text"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        placeholder="Ej: Empresa / Mandante SpA"
                        className="w-full bg-[#142026] border border-[#2C4A57] text-xs text-white p-3 focus:outline-none focus:border-[#B96A37]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-tech text-xs text-[#ECE5D9] mb-2 font-semibold">
                        3. Email o Teléfono:
                      </label>
                      <input
                        type="text"
                        required
                        value={contactoCliente}
                        onChange={(e) => setContactoCliente(e.target.value)}
                        placeholder="Ej: contacto@empresa.cl o +56 9 ..."
                        className="w-full bg-[#142026] border border-[#2C4A57] text-xs text-white p-3 focus:outline-none focus:border-[#B96A37]"
                      />
                    </div>

                  </div>

                  {/* Fila 2: Frente del Proyecto + Mensaje */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block font-mono-tech text-xs text-[#ECE5D9] mb-2 font-semibold">
                        4. Frente del Proyecto:
                      </label>
                      <select
                        value={frente}
                        onChange={(e) => setFrente(e.target.value)}
                        className="w-full bg-[#142026] border border-[#2C4A57] text-xs text-white p-3 focus:outline-none focus:border-[#B96A37] font-mono-tech"
                      >
                        <option value="Obras Civiles e Infraestructura">Obras Civiles e Infraestructura</option>
                        <option value="Minería e Industria">Minería e Industria</option>
                        <option value="Servicios Generales y Operación">Servicios Generales y Operación</option>
                        <option value="Maquinaria y Logística">Maquinaria y Logística</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono-tech text-xs text-[#ECE5D9] mb-2 font-semibold">
                        5. Háblanos sobre tu proyecto:
                      </label>
                      <textarea
                        rows={4}
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        placeholder="Describe brevemente los requerimientos, ubicación o características de la obra..."
                        className="w-full bg-[#142026] border border-[#2C4A57] text-xs text-white p-3 focus:outline-none focus:border-[#B96A37]"
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 text-xs p-3 text-center font-mono-tech">
                      {errorMessage}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                    {/* Botón Principal Email */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#B96A37] hover:bg-[#a35b2e] disabled:opacity-50 text-white px-8 py-4 font-heading font-bold text-sm tracking-wide flex items-center justify-center gap-3 transition-all border border-[#B96A37]/50 shadow-lg w-full sm:w-auto cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 text-white animate-spin" />
                          <span>Enviando Requerimiento...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5 text-white" />
                          <span>Solicitar Asesoría / Cotización</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {/* Botón Secundario WhatsApp */}
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#142026] hover:bg-[#1f303a] text-[#ECE5D9] px-8 py-4 font-heading font-semibold text-sm tracking-wide flex items-center justify-center gap-3 transition-all border border-[#2C4A57] w-full sm:w-auto"
                    >
                      <Phone className="w-5 h-5 text-[#B96A37] fill-current" />
                      <span>Hablemos Ahora</span>
                    </a>
                  </div>

                </form>
              )}

            </div>
          </div>
        </section>


        {/* FOOTER */}
        <footer id="contacto" className="bg-[#142026] text-white py-16 sm:py-20 border-t border-[#2C4A57]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2C4A57] items-center">
              
              <div className="md:col-span-6 space-y-5">
                <a href="#" className="inline-block">
                  <img 
                    src="/logo.png" 
                    alt="AndeInfra - Ingeniería y Servicios" 
                    className="h-20 sm:h-24 lg:h-28 w-auto object-contain"
                  />
                </a>

                <p className="text-sm text-[#ECE5D9]/80 max-w-md leading-relaxed">
                  Contratista formal y socio operativo para proyectos de infraestructura, minería, industria y servicios generales en la Región de Coquimbo y macrozona norte.
                </p>
              </div>

              <div className="md:col-span-6 flex flex-col sm:flex-row gap-4 justify-start md:justify-end">
                
                <a
                  href="mailto:contacto@andeinfra.cl"
                  className="bg-[#2C4A57] hover:bg-[#385e6f] px-6 py-5 border border-[#2C4A57] hover:border-[#B96A37] transition-all flex items-center justify-between gap-4 group min-w-[220px]"
                >
                  <div>
                    <span className="font-mono-tech text-[10px] text-[#B96A37] block font-bold uppercase">
                      Contacto vía Email
                    </span>
                    <span className="text-xs font-mono-tech text-white block font-semibold mt-0.5">
                      contacto@andeinfra.cl
                    </span>
                  </div>
                  <Mail className="w-5 h-5 text-[#B96A37] group-hover:text-white transition-colors flex-shrink-0" />
                </a>

                <a
                  href="https://wa.me/56976563636"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#B96A37] hover:bg-[#a35b2e] px-6 py-5 border border-[#B96A37]/50 transition-all flex items-center justify-between gap-4 group shadow-lg min-w-[220px]"
                >
                  <div>
                    <span className="font-mono-tech text-[10px] text-white/80 block font-bold uppercase">
                      WhatsApp Directo
                    </span>
                    <span className="text-xs font-mono-tech text-white block font-semibold mt-0.5">
                      +56 9 7656 3636
                    </span>
                  </div>
                  <Phone className="w-5 h-5 text-white fill-current flex-shrink-0" />
                </a>

              </div>

            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[#ECE5D9]/60">
              <div>
                © 2026 AndeInfra. Todos los derechos reservados.
              </div>
              <div className="flex items-center gap-1.5">
                <span>Desarrollado por</span>
                <a
                  href="https://paginaspro.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B96A37] hover:underline font-bold"
                >
                  PáginasPro.cl
                </a>
              </div>
            </div>

          </div>
        </footer>

      </main>

    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type MouseEvent as ReactMouseEvent } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  BriefcaseBusiness,
  Building2,
  Check,
  Code2,
  Cpu,
  Database,
  Github,
  Handshake,
  FileText,
  FlaskConical,
  Send,
  Sparkles,
  Layers3,
  Mail,
  MousePointer2,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  ScanText,
  Workflow,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { trackEvent } from "../lib/analytics";
import DigitalLabErrorBoundary from "../components/DigitalLabErrorBoundary";

const DigitalCoreCanvas = lazy(() => import("../components/DigitalCoreCanvas"));
const DigitalLabCanvas = lazy(() => import("../components/DigitalLabCanvas"));
const AnalyticsConsent = lazy(() => import("../components/AnalyticsConsent"));

gsap.registerPlugin(ScrollTrigger);

const SITE_URL = "https://portafolio-blue-nine-60.vercel.app";
const CONTACT_EMAIL = "jorgesootsalfaro@gmail.com";
const WHATSAPP_URL = "https://wa.me/525616564877";
const GITHUB_URL = "https://github.com/JorgeSoots";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jorge Soots — Full Stack Engineer & Creative Developer" },
      {
        name: "description",
        content:
          "Desarrollo sistemas empresariales, dashboards con IA y experiencias web 3D. Soy Jorge Soots, Full Stack Engineer y Creative Developer en Ciudad de México.",
      },
      { name: "author", content: "Jorge Soots" },
      { property: "og:title", content: "Jorge Soots — Full Stack & Creative Developer" },
      {
        property: "og:description",
        content:
          "Sistemas empresariales, automatización con IA y experiencias web 3D diseñadas para resolver problemas reales.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioHome,
});

const navItems = [
  { label: "Trabajo", href: "#work" },
  { label: "Servicios", href: "#services" },
  { label: "Lab", href: "#lab" },
  { label: "Agencias", href: "#collaborate" },
  { label: "Perfil", href: "#about" },
];

const serviceItems = [
  {
    number: "01",
    label: "IMMERSIVE DIGITAL WORLDS",
    icon: Boxes,
    title: "Experiencias web 3D",
    summary:
      "Sitios inmersivos, visualizadores de producto y experiencias interactivas que convierten una marca en algo memorable.",
    details: ["WebGL & Three.js", "Modelos 3D optimizados", "Animación e interacción"],
    accent: "mint",
  },
  {
    number: "02",
    label: "INTELLIGENT BUSINESS SYSTEMS",
    icon: Workflow,
    title: "Sistemas empresariales & IA",
    summary:
      "Dashboards, plataformas operativas y automatización de procesos para reducir tareas manuales y conectar información.",
    details: ["Dashboards y roles", "Procesamiento documental", "Integraciones y reportes"],
    accent: "silver",
  },
  {
    number: "03",
    label: "DIGITAL PRODUCTS & PLATFORMS",
    icon: MonitorSmartphone,
    title: "Desarrollo web y aplicaciones",
    summary:
      "Sitios corporativos, landing pages y aplicaciones web o móviles con foco en rendimiento, claridad y facilidad de uso.",
    details: ["React & Next.js", "Aplicaciones responsive", "APIs y bases de datos"],
    accent: "soft",
  },
];

const stackGroups = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"] },
  { label: "Backend & datos", items: ["Node.js", "Python", "Supabase", "PostgreSQL", "REST APIs"] },
  { label: "Creative technology", items: ["Three.js", "React Three Fiber", "GSAP", "Blender", "WebGL"] },
];

const workflow = [
  { number: "01", title: "Entender", description: "Aterrizamos el objetivo, los usuarios y el problema que la solución debe resolver." },
  { number: "02", title: "Diseñar", description: "Definimos estructura, experiencia y dirección visual antes de construir." },
  { number: "03", title: "Desarrollar", description: "Implemento la solución con componentes claros, integraciones y pruebas." },
  { number: "04", title: "Optimizar", description: "Revisamos rendimiento, responsive y detalles antes de publicar." },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="dc-header">
      <div className="dc-header-inner">
        <a className="dc-brand" href="#home" aria-label="Jorge Soots, inicio">
          JS<span>.</span>
        </a>
        <nav className="dc-desktop-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <a className="dc-header-cta" href="#contact" data-track="contact_intent" data-track-placement="header" data-track-target="contact">
          Hablemos <ArrowUpRight size={15} />
        </a>
        <button
          type="button"
          className="dc-menu-toggle"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="dc-mobile-nav" aria-label="Navegación móvil">
          {[...navItems, { label: "Contacto", href: "#contact" }].map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label} <ArrowUpRight size={15} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function SceneBackdrop({ enabled }: { enabled: boolean }) {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    if (typeof IntersectionObserver === "undefined") {
      setHeroVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // The hero and Digital Lab never keep two WebGL contexts active together.
  // This releases the hero renderer before the Lab mounts its own Canvas.
  const shouldRenderScene = enabled && heroVisible;

  return (
    <div className="dc-scene-backdrop" aria-hidden="true">
      <div className="dc-scene-fallback">
        <span className="dc-orbit dc-orbit-one" />
        <span className="dc-orbit dc-orbit-two" />
        <span className="dc-core-glow" />
      </div>
      {shouldRenderScene && (
        <Suspense fallback={null}>
          <div className="dc-scene-canvas"><DigitalCoreCanvas /></div>
        </Suspense>
      )}
      <div className="dc-scene-shade" />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="dc-hero dc-container">
      <div className="dc-hero-content">
        <div className="dc-eyebrow"><span className="dc-status-dot" /> Disponible para proyectos y oportunidades</div>
        <p className="dc-overline">FULL STACK ENGINEER <span>·</span> CREATIVE DEVELOPER</p>
        <h1>
          Experiencias digitales que <em>dejan huella.</em> Sistemas que <em>resuelven.</em>
        </h1>
        <p className="dc-hero-intro">
          Soy Jorge Soots. Uno ingeniería, creatividad y tecnología para construir experiencias web 3D y plataformas empresariales inteligentes, desde la primera idea hasta el producto funcional.
        </p>
        <div className="dc-hero-specialties" aria-label="Especialidades">
          <span>3D WEB EXPERIENCES</span><i /><span>BUSINESS SYSTEMS</span><i /><span>FULL STACK DEVELOPMENT</span>
        </div>
        <div className="dc-hero-actions">
          <a className="dc-button dc-button-primary" href="#contact" data-track="contact_intent" data-track-placement="hero" data-track-target="project">Hablemos de tu proyecto <ArrowUpRight size={17} /></a>
          <a className="dc-button dc-button-ghost" href="#work" data-track="case_study_navigation" data-track-placement="hero" data-track-target="dreieck-ai">Ver casos de estudio <ArrowDownRight size={17} /></a>
        </div>
        <div className="dc-hero-proof">
          <div><strong>4+</strong><span>Años de experiencia profesional</span></div>
          <div><strong>End-to-end</strong><span>Desarrollo integral de soluciones</span></div>
          <div><strong>CDMX</strong><span>Remoto · Híbrido · Colaboraciones</span></div>
        </div>
      </div>
      <div className="dc-hero-side" aria-hidden="true">
        <span className="dc-side-index">DIGITAL CORE / 001</span>
        <span className="dc-side-caption">Engineering<br />× Creativity<br />× Technology</span>
        <span className="dc-interaction-cue"><MousePointer2 size={13} /> MOVE TO EXPLORE</span>
      </div>
      <a className="dc-scroll-cue" href="#work"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
    </section>
  );
}

function SignalMarquee() {
  const words = ["DESIGN", "ENGINEERING", "INTERACTION", "3D WEB", "SYSTEMS", "PERFORMANCE"];
  return (
    <div className="dc-marquee" aria-label="Design, engineering, interaction, 3D web, systems and performance">
      <div className="dc-marquee-track">
        {[0, 1].map((copy) => (
          <div className="dc-marquee-group" key={copy} aria-hidden={copy === 1}>
            {words.map((word) => <span key={`${copy}-${word}`}>{word}<i>✳</i></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ index, eyebrow, title, body }: { index: string; eyebrow: string; title: string; body?: string }) {
  return (
    <div className="dc-section-heading dc-reveal">
      <p className="dc-section-kicker"><span>{index}</span> {eyebrow}</p>
      <div className="dc-heading-row">
        <h2>{title}</h2>
        {body && <p>{body}</p>}
      </div>
    </div>
  );
}

const dreieckViews = [
  {
    id: "capture",
    number: "01",
    label: "CAPTURA EN CAMPO",
    title: "La información comienza en sitio.",
    description: "El técnico fotografía el formato físico y adjunta imágenes de evidencia desde su dispositivo. La captura queda vinculada al registro que continuará el flujo operativo.",
    src: "/images/dreieck-capture.webp",
    alt: "Interfaz móvil de Dreieck AI para fotografiar formatos y adjuntar evidencias",
    href: "https://dreieck-ai.vercel.app/",
    linkLabel: "Abrir captura móvil",
  },
  {
    id: "dashboard",
    number: "02",
    label: "CENTRO DE OPERACIONES",
    title: "Los registros, en un solo lugar.",
    description: "El dashboard reúne folios, clientes, servicios y técnicos asignados. Permite buscar registros, consultar documentos y exportar la información transcrita a Excel.",
    src: "/images/dreieck-dashboard.webp",
    alt: "Dashboard administrativo Dreieck AI con registros, clientes, folios y técnicos asignados",
    href: "https://dreieck-ai.vercel.app/dashboard",
    linkLabel: "Abrir dashboard",
  },
  {
    id: "schedule",
    number: "03",
    label: "PROGRAMACIÓN",
    title: "De los registros a la acción.",
    description: "La vista de programación permite registrar sitios, tickets, contactos, fechas y actividades para organizar las visitas que después se asignan a los perfiles técnicos.",
    src: "/images/dreieck-scheduling.webp",
    alt: "Formulario de programación de visitas y sitios en Dreieck AI",
    href: "https://dreieck-ai.vercel.app/dashboard/Programacion",
    linkLabel: "Abrir programación",
  },
] as const;

function DreieckCaseStudy() {
  const [activeView, setActiveView] = useState(0);
  const view = dreieckViews[activeView];
  const handleDemoKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextIndex = activeView;
    if (event.key === "ArrowRight") nextIndex = (activeView + 1) % dreieckViews.length;
    if (event.key === "ArrowLeft") nextIndex = (activeView - 1 + dreieckViews.length) % dreieckViews.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = dreieckViews.length - 1;
    if (nextIndex !== activeView) {
      event.preventDefault();
      setActiveView(nextIndex);
      window.requestAnimationFrame(() => {
        document.getElementById(`dreieck-tab-${dreieckViews[nextIndex].id}`)?.focus();
      });
    }
  };

  return (
    <section id="work" className="dc-section dc-work-section">
      <div className="dc-container">
        <SectionHeading
          index="01"
          eyebrow="SELECTED WORK / CASO REAL"
          title="De formatos físicos a operaciones digitales."
          body="No solo diseño interfaces: desarrollo herramientas que conectan personas, información y procesos de negocio."
        />

        <article className="dc-case-study dc-reveal">
          <div className="dc-case-copy">
            <div className="dc-case-meta"><span className="dc-live-dot" /> FEATURED PROJECT <span>·</span> BUSINESS SYSTEMS & AI</div>
            <div className="dc-case-brand">DREIECK <span>AI</span></div>
            <div className="dc-case-facts">
              <div><span>SECTOR</span><strong>Operaciones de campo</strong></div>
              <div><span>ROLE</span><strong>Desarrollo integral individual</strong></div>
            </div>
            <h3>De formatos físicos a información lista para operar.</h3>
            <p className="dc-case-description">
              Diseñé y desarrollé individualmente una plataforma para una empresa del sector de alertas sísmicas. La IA lee y estructura la información de formatos fotografiados; el sistema vincula evidencias, genera reportes PDF personalizados, exporta registros a Excel y organiza la programación y asignación de técnicos.
            </p>
            <div className="dc-case-features">
              <div><ScanText size={17} /><span>Lectura y transcripción de formatos mediante IA</span></div>
              <div><Layers3 size={17} /><span>Evidencias fotográficas vinculadas al documento</span></div>
              <div><Workflow size={17} /><span>Perfiles, programación y asignación de técnicos</span></div>
              <div><Database size={17} /><span>Exportación de registros a Excel</span></div>
              <div><BriefcaseBusiness size={17} /><span>Reportes PDF individuales con identidad de marca</span></div>
            </div>
            <div className="dc-case-role">
              <span>MI PARTICIPACIÓN</span>
              <strong>Diseño, arquitectura e implementación de la solución</strong>
              <small>Proyecto desarrollado individualmente, de principio a fin.</small>
            </div>
            <div className="dc-tech-list" aria-label="Tecnologías utilizadas">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Python", "Supabase", "PostgreSQL", "AI APIs"].map((tech) => <span key={tech}>{tech}</span>)}
            </div>
            <div className="dc-case-links">
              <a className="dc-button dc-button-primary" href="https://dreieck-ai.vercel.app/" target="_blank" rel="noreferrer" data-track="dreieck_demo_open" data-track-placement="case-study" data-track-target="platform">Abrir plataforma <ArrowUpRight size={16} /></a>
              <a className="dc-text-link" href="https://dreieck-ai.vercel.app/dashboard/asignacion" target="_blank" rel="noreferrer" data-track="dreieck_demo_open" data-track-placement="case-study" data-track-target="assignment">Vista de asignación <ArrowUpRight size={14} /></a>
            </div>
          </div>

          <div className="dc-case-visual dc-product-demo">
            <div className="dc-demo-heading">
              <span>EXPLORE THE PRODUCT</span>
              <span>03 VIEWS / 01 PLATFORM</span>
            </div>
            <div className="dc-demo-tabs" role="tablist" aria-label="Explorar vistas de Dreieck AI" onKeyDown={handleDemoKeyDown}>
              {dreieckViews.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`dreieck-tab-${item.id}`}
                  aria-selected={activeView === index}
                  aria-controls="dreieck-demo-panel"
                  data-track="dreieck_view_select"
                  data-track-placement="product-demo"
                  data-track-target={item.id}
                  tabIndex={activeView === index ? 0 : -1}
                  className={activeView === index ? "is-active" : ""}
                  onClick={() => setActiveView(index)}
                >
                  <span>{item.number}</span>{item.label}
                </button>
              ))}
            </div>
            <div className="dc-demo-stage" id="dreieck-demo-panel" role="tabpanel" aria-labelledby={`dreieck-tab-${view.id}`}>
              <div className="dc-demo-copy">
                <span className="dc-demo-index">{view.number} <i /> {view.label}</span>
                <h4>{view.title}</h4>
                <p>{view.description}</p>
                <div className="dc-demo-progress" aria-label={`Vista ${activeView + 1} de ${dreieckViews.length}`}>
                  <span>{view.number}</span>
                  <div><i style={{ width: `${((activeView + 1) / dreieckViews.length) * 100}%` }} /></div>
                  <span>{String(dreieckViews.length).padStart(2, "0")}</span>
                </div>
                <a className="dc-demo-link" href={view.href} target="_blank" rel="noreferrer" data-track="dreieck_demo_open" data-track-placement="product-demo" data-track-target={view.id}>{view.linkLabel} <ArrowUpRight size={15} /></a>
              </div>
              <a className="dc-demo-screen" href={view.href} target="_blank" rel="noreferrer" aria-label={view.linkLabel} key={view.id} data-track="dreieck_demo_open" data-track-placement="product-demo-screen" data-track-target={view.id}>
                <div className="dc-screen-top"><span /><span /><span /><small>dreieck-ai.vercel.app / {view.id}</small></div>
                <img src={view.src} alt={view.alt} loading="lazy" />
                <span className="dc-image-open">Abrir vista <ArrowUpRight size={14} /></span>
              </a>
            </div>
          </div>
        </article>

        <div className="dc-case-deliverables dc-reveal">
          <div><span>01</span><strong>Captura</strong><small>Formatos y evidencias desde campo</small></div>
          <div><span>02</span><strong>Procesamiento</strong><small>Transcripción asistida por IA</small></div>
          <div><span>03</span><strong>Documentación</strong><small>PDF individual y exportación Excel</small></div>
          <div><span>04</span><strong>Coordinación</strong><small>Perfiles y asignación de técnicos</small></div>
        </div>
      </div>
    </section>
  );
}

function DreieckStory() {
  return (
    <section className="dc-story-section" aria-labelledby="dc-story-title">
      <div className="dc-container">
        <div className="dc-story-intro dc-reveal">
          <p className="dc-section-kicker"><span>CASE STUDY / 01</span> FROM FIELD TO REPORT</p>
          <div className="dc-story-heading-row">
            <h2 id="dc-story-title">Un flujo operativo.<br /><em>De principio a fin.</em></h2>
            <p>La plataforma conecta la captura en campo con el procesamiento inteligente y la gestión administrativa. Cada etapa alimenta la siguiente.</p>
          </div>
        </div>

        <div className="dc-story-grid">
          <article className="dc-story-card dc-reveal">
            <div className="dc-story-media dc-story-media-image">
              <img src="/images/dreieck-capture.webp" alt="Captura móvil de formato físico y evidencias fotográficas en Dreieck AI" loading="lazy" />
              <span className="dc-story-media-index">01 / FIELD CAPTURE</span>
            </div>
            <div className="dc-story-card-copy">
              <span className="dc-story-step">CAPTURA EN CAMPO</span>
              <h3>La información nace en sitio.</h3>
              <p>El técnico fotografía el formato físico y adjunta evidencia del lugar desde su dispositivo.</p>
            </div>
          </article>

          <article className="dc-story-card dc-reveal">
            <div className="dc-story-media dc-story-ai-media">
              <div className="dc-story-ai-orbit dc-story-ai-orbit-a" />
              <div className="dc-story-ai-orbit dc-story-ai-orbit-b" />
              <div className="dc-story-document">
                <div className="dc-story-document-head"><FileText size={16} /><span>FIELD REPORT / INPUT</span></div>
                <div className="dc-story-document-lines"><i /><i /><i /><i /><i /></div>
                <div className="dc-story-document-scan"><Sparkles size={14} /><span>AI EXTRACTION</span><b>STRUCTURED DATA</b></div>
              </div>
              <div className="dc-story-output dc-story-output-pdf"><FileText size={15} /><span>PDF</span><small>Client report</small></div>
              <div className="dc-story-output dc-story-output-xlsx"><div className="dc-xlsx-mark">X</div><span>XLSX</span><small>Structured data</small></div>
              <span className="dc-story-media-index">02 / AI PROCESSING</span>
              <span className="dc-story-diagram-note">DIAGRAMA ILUSTRATIVO DEL FLUJO</span>
            </div>
            <div className="dc-story-card-copy">
              <span className="dc-story-step">PROCESAMIENTO Y REPORTES</span>
              <h3>La IA convierte la captura en información útil.</h3>
              <p>El formato se lee y transcribe; las evidencias quedan vinculadas al registro. El sistema permite generar reportes PDF individuales y exportar registros a Excel.</p>
            </div>
          </article>

          <article className="dc-story-card dc-reveal">
            <div className="dc-story-media dc-story-media-image">
              <img src="/images/dreieck-dashboard.webp" alt="Dashboard administrativo de Dreieck AI con folios, clientes y técnicos asignados" loading="lazy" />
              <span className="dc-story-media-index">03 / OPERATIONS</span>
            </div>
            <div className="dc-story-card-copy">
              <span className="dc-story-step">GESTIÓN ADMINISTRATIVA</span>
              <h3>La operación queda centralizada.</h3>
              <p>El dashboard permite consultar folios, clientes, servicios y técnicos asignados, además de exportar los registros a Excel.</p>
            </div>
          </article>

          <article className="dc-story-card dc-reveal">
            <div className="dc-story-media dc-story-media-image">
              <img src="/images/dreieck-scheduling.webp" alt="Programación de sitios y lista de pendientes vinculada al módulo de asignación de técnicos" loading="lazy" />
              <span className="dc-story-media-index">04 / FIELD ASSIGNMENT</span>
            </div>
            <div className="dc-story-card-copy">
              <span className="dc-story-step">ASIGNACIÓN TÉCNICA</span>
              <h3>Los sitios se conectan con sus responsables.</h3>
              <p>Los sitios pendientes pueden organizarse y asignarse a los perfiles de técnicos para coordinar las visitas.</p>
            </div>
          </article>
        </div>

        <div className="dc-story-outcomes dc-reveal">
          <span>UN MISMO FLUJO</span>
          <div><b>Captura</b><i /> <b>IA</b><i /> <b>Reportes</b><i /> <b>Asignación</b></div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [activeService, setActiveService] = useState(0);
  const service = serviceItems[activeService];
  const Icon = service.icon;
  const serviceMessage = encodeURIComponent(`Hola Jorge, me interesa conversar sobre ${service.title.toLowerCase()}.`);

  return (
    <section id="services" className="dc-section dc-services-section">
      <div className="dc-container">
        <SectionHeading
          index="02"
          eyebrow="CAPABILITIES / SERVICIOS"
          title="Diseño, ingeniería y tecnología en un mismo proceso."
          body="Puedo integrarme a un equipo o desarrollar una solución completa, desde la idea y la experiencia hasta la implementación."
        />
        <div className="dc-capability-explorer dc-reveal">
          <div className="dc-capability-selector" role="group" aria-label="Selecciona una especialidad">
            {serviceItems.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <button
                  type="button"
                  key={item.number}
                  className={activeService === index ? "is-active" : ""}
                  aria-pressed={activeService === index}
                  onClick={() => setActiveService(index)}
                >
                  <span className="dc-capability-number">{item.number}</span>
                  <span className="dc-capability-choice-icon"><ItemIcon size={19} strokeWidth={1.5} /></span>
                  <span className="dc-capability-choice-copy"><small>{item.label}</small><strong>{item.title}</strong></span>
                  <ArrowUpRight className="dc-capability-choice-arrow" size={17} />
                </button>
              );
            })}
          </div>
          <article className={`dc-capability-feature dc-capability-${activeService}`} aria-live="polite">
            <div className={`dc-capability-art dc-capability-art-${activeService}`} aria-hidden="true">
              <div className="dc-art-grid" />
              <div className="dc-mini3d-scene" key={activeService}>
                {activeService === 0 && (
                  <div className="dc-mini3d-web">
                    <span className="dc-mini3d-ring dc-mini3d-ring-a" />
                    <span className="dc-mini3d-ring dc-mini3d-ring-b" />
                    <div className="dc-mini3d-liquid"><i /><b /><em /></div>
                    <span className="dc-mini3d-crystal" />
                    <span className="dc-mini3d-orb" />
                  </div>
                )}
                {activeService === 1 && (
                  <div className="dc-mini3d-system">
                    <div className="dc-mini3d-system-screen">
                      <div className="dc-mini3d-system-top"><i /><i /><i /><span>OPERATIONS / OVERVIEW</span></div>
                      <div className="dc-mini3d-system-metrics"><i /><i /><i /></div>
                      <div className="dc-mini3d-system-chart"><i /><i /><i /><i /><i /><i /></div>
                      <div className="dc-mini3d-system-lines"><i /><i /><i /></div>
                    </div>
                    <span className="dc-mini3d-system-node dc-mini3d-node-a" />
                    <span className="dc-mini3d-system-node dc-mini3d-node-b" />
                  </div>
                )}
                {activeService === 2 && (
                  <div className="dc-mini3d-product">
                    <div className="dc-mini3d-laptop"><span /><i /><b /><em /></div>
                    <div className="dc-mini3d-phone"><span /><i /><b /><em /></div>
                    <span className="dc-mini3d-product-orbit" />
                  </div>
                )}
              </div>
              <div className="dc-art-coordinate">{activeService === 0 ? "WEBGL / REALTIME" : activeService === 1 ? "DATA / AUTOMATION" : "PRODUCT / INTERFACE"}</div>
              <div className="dc-art-corner dc-art-corner-tl" />
              <div className="dc-art-corner dc-art-corner-br" />
            </div>
            <div className="dc-capability-copy">
              <p className="dc-service-eyebrow">{service.label}</p>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <ul>{service.details.map((detail) => <li key={detail}><Check size={14} />{detail}</li>)}</ul>
              <div className="dc-capability-footer">
                <div className="dc-capability-tech"><span>FOCUS</span><strong>{activeService === 0 ? "Immersion & interaction" : activeService === 1 ? "Operational efficiency" : "Useful digital products"}</strong></div>
                <a className="dc-button dc-button-primary" href={`${WHATSAPP_URL}?text=${serviceMessage}`} target="_blank" rel="noreferrer" data-track="service_inquiry" data-track-placement="services" data-track-target={service.title}>Solicitar una propuesta <ArrowUpRight size={15} /></a>
              </div>
            </div>
          </article>
        </div>
        <p className="dc-capability-note"><span className="dc-status-dot" /> Soluciones adaptadas al objetivo, alcance y contexto de cada negocio.</p>
      </div>
    </section>
  );
}

const labSpecimens = [
  { id: "core", number: "001", label: "ORGANIC CORE", title: "Materia en movimiento.", description: "Un nudo orgánico de metal y volumen cristalino. Rota con suavidad y responde al movimiento del cursor." },
  { id: "portal", number: "002", label: "GEOMETRIC PORTAL", title: "Estructura y profundidad.", description: "Marcos tridimensionales, anillos y planos metálicos construyen una arquitectura que puedes explorar con el cursor." },
  { id: "crystal", number: "003", label: "CRYSTAL STUDY", title: "Luz a través de la forma.", description: "Geometría facetada y fragmentos suspendidos para explorar cómo la luz transforma un material." },
] as const;

function ExperimentalLab() {
  const [activeSpecimen, setActiveSpecimen] = useState(0);
  const [material, setMaterial] = useState<"chrome" | "glass" | "mineral">("chrome");
  const [isMoving, setIsMoving] = useState(true);
  const [labVisible, setLabVisible] = useState(false);
  const [realtimeLabEnabled, setRealtimeLabEnabled] = useState(false);
  const [labRenderFailed, setLabRenderFailed] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const specimen = labSpecimens[activeSpecimen];

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 801px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const updateMode = () => setRealtimeLabEnabled(desktopQuery.matches && motionQuery.matches);
    updateMode();
    desktopQuery.addEventListener("change", updateMode);
    motionQuery.addEventListener("change", updateMode);
    return () => {
      desktopQuery.removeEventListener("change", updateMode);
      motionQuery.removeEventListener("change", updateMode);
    };
  }, []);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setLabVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setLabVisible(entry.isIntersecting),
      { rootMargin: "180px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="lab" className="dc-lab-section">
      <div className="dc-container">
        <div className="dc-lab-heading dc-reveal">
          <div>
            <p className="dc-section-kicker"><span>03</span> DIGITAL LAB / REALTIME 3D STUDIES</p>
            <h2>Explorar la forma.<br /><em>Expandir lo posible.</em></h2>
          </div>
          <p>Un laboratorio interactivo de geometría, materiales y movimiento. Las piezas se renderizan en tiempo real con Three.js y React Three Fiber, como anticipo del universo visual que estoy creando en Blender.</p>
        </div>

        <div className="dc-lab-console dc-reveal">
          <div ref={stageRef} className="dc-lab-stage dc-lab-stage-r3f" role="img" aria-label={`Estudio 3D interactivo: ${specimen.label}, acabado ${material}`}>
            <div className="dc-lab-render" aria-hidden="true">
              {realtimeLabEnabled && labVisible && !labRenderFailed ? (
                <DigitalLabErrorBoundary
                  fallback={(
                    <div className={`dc-lab-mobile-fallback dc-mobile-shape-${specimen.id} dc-mobile-finish-${material} is-paused`}>
                      <span className="dc-lab-mobile-orbit dc-lab-mobile-orbit-a" />
                      <span className="dc-lab-mobile-orbit dc-lab-mobile-orbit-b" />
                      <span className="dc-lab-mobile-solid" />
                      <span className="dc-lab-mobile-shard dc-lab-mobile-shard-a" />
                      <span className="dc-lab-mobile-shard dc-lab-mobile-shard-b" />
                      <span className="dc-lab-fallback-label">3D preview unavailable · fallback active</span>
                    </div>
                  )}
                  onError={() => setLabRenderFailed(true)}
                >
                  <Suspense fallback={<div className="dc-lab-render-loading" />}>
                    <DigitalLabCanvas
                      specimen={specimen.id}
                      material={material}
                      isMoving={isMoving}
                      onContextLost={() => setLabRenderFailed(true)}
                    />
                  </Suspense>
                </DigitalLabErrorBoundary>
              ) : realtimeLabEnabled && labVisible && labRenderFailed ? (
                <div className={`dc-lab-mobile-fallback dc-mobile-shape-${specimen.id} dc-mobile-finish-${material} is-paused`}>
                  <span className="dc-lab-mobile-orbit dc-lab-mobile-orbit-a" />
                  <span className="dc-lab-mobile-orbit dc-lab-mobile-orbit-b" />
                  <span className="dc-lab-mobile-solid" />
                  <span className="dc-lab-mobile-shard dc-lab-mobile-shard-a" />
                  <span className="dc-lab-mobile-shard dc-lab-mobile-shard-b" />
                  <span className="dc-lab-fallback-label">3D preview unavailable · fallback active</span>
                </div>
              ) : realtimeLabEnabled ? (
                <div className="dc-lab-render-loading" />
              ) : (
                <div className={`dc-lab-mobile-fallback dc-mobile-shape-${specimen.id} dc-mobile-finish-${material} ${isMoving ? "is-moving" : "is-paused"}`}>
                  <span className="dc-lab-mobile-orbit dc-lab-mobile-orbit-a" />
                  <span className="dc-lab-mobile-orbit dc-lab-mobile-orbit-b" />
                  <span className="dc-lab-mobile-solid" />
                  <span className="dc-lab-mobile-shard dc-lab-mobile-shard-a" />
                  <span className="dc-lab-mobile-shard dc-lab-mobile-shard-b" />
                </div>
              )}
            </div>
            <div className="dc-lab-stage-vignette" />
            <div className="dc-lab-coordinate dc-lab-coordinate-tl">DIGITAL CORE / LAB <span>· REALTIME WEBGL</span></div>
            <div className="dc-lab-coordinate dc-lab-coordinate-br">{specimen.number} — {specimen.label}</div>
            <div className="dc-lab-interaction-hint"><MousePointer2 size={12} /> MOVE TO EXPLORE</div>
            <div className="dc-lab-crosshair" aria-hidden="true"><i /><b /></div>
          </div>

          <div className="dc-lab-controls">
            <div className="dc-lab-control-heading"><span>SPECIMEN SELECTOR</span><small>REALTIME 3D / {specimen.number}</small></div>
            <div className="dc-lab-specimen-list" role="group" aria-label="Seleccionar forma experimental">
              {labSpecimens.map((item, index) => (
                <button key={item.id} type="button" className={activeSpecimen === index ? "is-active" : ""} aria-pressed={activeSpecimen === index} onClick={() => setActiveSpecimen(index)} data-track="lab_specimen_change" data-track-placement="digital-lab" data-track-target={item.id}>
                  <span>{item.number}</span><strong>{item.label}</strong><ArrowUpRight size={14} />
                </button>
              ))}
            </div>
            <div className="dc-lab-description" aria-live="polite">
              <span>{specimen.label}</span>
              <h3>{specimen.title}</h3>
              <p>{specimen.description}</p>
            </div>
            <div className="dc-lab-material-control">
              <span>FINISH / MATERIAL STUDY</span>
              <div role="group" aria-label="Cambiar material">
                <button type="button" className={material === "chrome" ? "is-active" : ""} aria-pressed={material === "chrome"} onClick={() => setMaterial("chrome")} data-track="lab_material_change" data-track-placement="digital-lab" data-track-target="chrome">Chrome</button>
                <button type="button" className={material === "glass" ? "is-active" : ""} aria-pressed={material === "glass"} onClick={() => setMaterial("glass")} data-track="lab_material_change" data-track-placement="digital-lab" data-track-target="glass">Glass</button>
                <button type="button" className={material === "mineral" ? "is-active" : ""} aria-pressed={material === "mineral"} onClick={() => setMaterial("mineral")} data-track="lab_material_change" data-track-placement="digital-lab" data-track-target="mineral">Mineral</button>
              </div>
            </div>
            <button type="button" className="dc-lab-motion-toggle" aria-pressed={isMoving} onClick={() => setIsMoving((value) => !value)} data-track="lab_motion_toggle" data-track-placement="digital-lab" data-track-target={isMoving ? "pause" : "play"}>
              <span className={isMoving ? "dc-lab-motion-dot is-on" : "dc-lab-motion-dot"} />
              {isMoving ? "Motion active" : "Motion paused"}
              <span>{isMoving ? "PAUSE" : "PLAY"}</span>
            </button>
            {labRenderFailed && (
              <button type="button" className="dc-lab-retry" onClick={() => setLabRenderFailed(false)}>
                Reintentar render 3D
              </button>
            )}
          </div>
        </div>
        <p className="dc-lab-footnote"><FlaskConical size={14} /> Geometrías, materiales e interacciones WebGL en tiempo real. El modelo principal Digital Core se integrará desde Blender cuando esté terminado.</p>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="dc-process-section">
      <div className="dc-container">
        <div className="dc-process-heading dc-reveal">
          <p className="dc-section-kicker"><span>04</span> HOW I WORK</p>
          <h2>De la idea al producto.<br /><em>Sin perder de vista el objetivo.</em></h2>
        </div>
        <div className="dc-process-grid">
          {workflow.map((step) => (
            <article className="dc-process-step dc-reveal" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


function AgencyCollaboration() {
  const subject = encodeURIComponent("Colaboración de desarrollo — Jorge Soots");
  const message = encodeURIComponent("Hola Jorge, formo parte de una agencia/estudio y me gustaría conversar sobre una posible colaboración de desarrollo.");

  return (
    <section id="collaborate" className="dc-section dc-collab-section">
      <div className="dc-container">
        <SectionHeading
          index="05"
          eyebrow="FOR STUDIOS & AGENCIES / COLABORACIONES"
          title="Un aliado de desarrollo para llevar ideas más lejos."
          body="Me integro a equipos creativos y agencias que necesitan convertir una dirección visual en una experiencia funcional, bien construida y lista para producción."
        />
        <div className="dc-collab-layout dc-reveal">
          <div className="dc-collab-main">
            <span className="dc-collab-overline"><Handshake size={16} /> PARTNER IN DEVELOPMENT</span>
            <h3>Tu equipo imagina.<br /><em>Yo ayudo a construirlo.</em></h3>
            <p>Puedo colaborar por proyecto o por etapas, trabajar detrás de la marca de tu estudio y sumar capacidad técnica cuando el equipo necesita apoyo especializado.</p>
            <div className="dc-collab-actions">
              <a className="dc-button dc-button-primary" href={`${WHATSAPP_URL}?text=${message}`} target="_blank" rel="noreferrer" data-track="agency_inquiry" data-track-placement="agency-section" data-track-target="whatsapp">Proponer una colaboración <ArrowUpRight size={16} /></a>
              <a className="dc-text-link" href={`mailto:${CONTACT_EMAIL}?subject=${subject}`} data-track="email_click" data-track-placement="agency-section" data-track-target="agency">Escribir por correo <ArrowUpRight size={14} /></a>
            </div>
          </div>
          <div className="dc-collab-offers">
            <article><span>01</span><Code2 size={20} /><div><strong>Frontend & product development</strong><small>Interfaces, componentes, integraciones y productos digitales.</small></div></article>
            <article><span>02</span><Boxes size={20} /><div><strong>WebGL & 3D production</strong><small>Implementación Three.js, experiencias interactivas y optimización.</small></div></article>
            <article><span>03</span><Building2 size={20} /><div><strong>White-label development</strong><small>Producción técnica bajo la identidad y el proceso de tu agencia.</small></div></article>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="dc-section dc-about-section">
      <div className="dc-container dc-about-grid">
        <div className="dc-about-intro dc-reveal">
          <p className="dc-section-kicker"><span>06</span> ABOUT / PERFIL</p>
          <h2>Ingeniería con sensibilidad <em>visual.</em></h2>
          <p>
            Soy Jorge Soots, desarrollador Frontend y Full Stack con más de cuatro años de experiencia profesional creando soluciones web, aplicaciones y plataformas para organizaciones.
          </p>
          <p>
            Me interesa la intersección entre ingeniería y creatividad: construir productos útiles, interfaces cuidadas y experiencias 3D donde cada interacción tenga un propósito.
          </p>
          <div className="dc-about-actions">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={14} /></a>
            <a href={`mailto:${CONTACT_EMAIL}`} data-track="email_click" data-track-placement="about" data-track-target="profile"><Mail size={16} /> Correo <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <div className="dc-stack-panel dc-reveal">
          <div className="dc-stack-heading"><Cpu size={18} /><span>TECHNICAL TOOLKIT</span></div>
          {stackGroups.map((group) => (
            <div className="dc-stack-group" key={group.label}>
              <h3>{group.label}</h3>
              <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
            </div>
          ))}
          <div className="dc-stack-note"><span className="dc-status-dot" /> Explorando Blender + Three.js + React Three Fiber para Digital Core.</div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [notice, setNotice] = useState("");

  const handleInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const project = String(formData.get("project") ?? "").trim();
    const budget = String(formData.get("budget") ?? "Por definir").trim();
    const timeline = String(formData.get("timeline") ?? "Flexible").trim();
    const brief = String(formData.get("brief") ?? "").trim();

    const message = [
      "Hola Jorge, quiero conversar sobre un proyecto.",
      "",
      `Nombre: ${name}`,
      `Correo: ${email}`,
      company ? `Empresa: ${company}` : "",
      `Tipo de proyecto: ${project}`,
      `Presupuesto estimado: ${budget}`,
      `Plazo: ${timeline}`,
      "",
      "Resumen del proyecto:",
      brief,
    ].filter(Boolean).join("\n");

    trackEvent("project_inquiry_draft", { project_type: project, budget_range: budget, timeline });
    const url = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setNotice("WhatsApp se abrirá con tu mensaje preparado. Revísalo y pulsa enviar para compartirlo.");
  };

  return (
    <section id="contact" className="dc-contact-section">
      <div className="dc-container dc-contact-layout">
        <div className="dc-contact-intro dc-reveal">
          <p className="dc-section-kicker"><span>07</span> CONTACT / START A PROJECT</p>
          <p className="dc-contact-availability"><span className="dc-status-dot" /> DISPONIBLE PARA NUEVOS PROYECTOS</p>
          <h2>Hagamos que una buena idea se convierta en <em>algo real.</em></h2>
          <p className="dc-contact-lead">Cuéntame qué necesitas construir. Revisaré la información y podremos conversar sobre el alcance, las prioridades y el siguiente paso.</p>
          <div className="dc-contact-specialties">
            <span><i /> Experiencias web 3D</span>
            <span><i /> Sistemas empresariales & IA</span>
            <span><i /> Productos digitales</span>
            <span><i /> Colaboración con agencias</span>
          </div>
          <div className="dc-contact-direct">
            <a href={`mailto:${CONTACT_EMAIL}`} data-track="email_click" data-track-placement="contact" data-track-target="direct"><Mail size={17} /><span><small>EMAIL</small><strong>{CONTACT_EMAIL}</strong></span><ArrowUpRight size={15} /></a>
            <a href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hola Jorge, vi tu portafolio y me gustaría conversar sobre un proyecto.")}`} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-track-placement="contact" data-track-target="direct"><MessageCircle size={17} /><span><small>WHATSAPP</small><strong>+52 56 1656 4877</strong></span><ArrowUpRight size={15} /></a>
          </div>
        </div>

        <form className="dc-inquiry-form dc-reveal" onSubmit={handleInquiry}>
          <div className="dc-form-heading">
            <span>PROJECT INQUIRY / 01</span>
            <h3>Cuéntame sobre tu proyecto.</h3>
            <p>Completa los datos esenciales. El formulario preparará un mensaje en WhatsApp; no almacena ni envía tu información a un servidor.</p>
          </div>
          <div className="dc-form-grid">
            <label>
              <span>Nombre *</span>
              <input name="name" type="text" placeholder="Tu nombre" autoComplete="name" required />
            </label>
            <label>
              <span>Correo *</span>
              <input name="email" type="email" placeholder="tu@empresa.com" autoComplete="email" required />
            </label>
            <label className="dc-form-full">
              <span>Empresa <small>OPCIONAL</small></span>
              <input name="company" type="text" placeholder="Nombre de tu empresa o marca" autoComplete="organization" />
            </label>
            <label>
              <span>¿Qué necesitas? *</span>
              <select name="project" defaultValue="" required>
                <option value="" disabled>Selecciona un servicio</option>
                <option>Experiencia web 3D</option>
                <option>Sistema empresarial / dashboard</option>
                <option>Automatización e IA</option>
                <option>Sitio corporativo / landing page</option>
                <option>Aplicación móvil</option>
                <option>Colaboración con agencia</option>
                <option>Otro proyecto</option>
              </select>
            </label>
            <label>
              <span>Presupuesto estimado</span>
              <select name="budget" defaultValue="Por definir">
                <option>Por definir</option>
                <option>Menos de $10,000 MXN</option>
                <option>$10,000–$20,000 MXN</option>
                <option>$20,000–$40,000 MXN</option>
                <option>$40,000–$60,000 MXN</option>
                <option>Más de $60,000 MXN</option>
              </select>
            </label>
            <label className="dc-form-full">
              <span>¿Cuándo te gustaría comenzar?</span>
              <select name="timeline" defaultValue="Flexible">
                <option>Lo antes posible</option>
                <option>En las próximas 2–4 semanas</option>
                <option>En 1–3 meses</option>
                <option>Flexible</option>
              </select>
            </label>
            <label className="dc-form-full">
              <span>Cuéntame brevemente qué necesitas *</span>
              <textarea name="brief" rows={4} minLength={15} placeholder="¿Qué problema quieres resolver o qué te gustaría construir?" required />
            </label>
          </div>
          <button className="dc-button dc-button-primary dc-form-submit" type="submit"><Send size={16} /> Preparar mensaje en WhatsApp <ArrowUpRight size={16} /></button>
          <p className="dc-form-notice" aria-live="polite">{notice || "* Campos obligatorios. Al continuar, podrás revisar el mensaje antes de enviarlo."}</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="dc-footer">
      <div className="dc-container dc-footer-inner">
        <a className="dc-brand" href="#home">JS<span>.</span></a>
        <p>© {new Date().getFullYear()} Jorge Soots. Diseñado y desarrollado con intención.</p>
        <div><a href={GITHUB_URL} target="_blank" rel="noreferrer" data-track="github_click" data-track-placement="footer" data-track-target="github">GitHub <ArrowUpRight size={13} /></a><a href={`mailto:${CONTACT_EMAIL}`} data-track="email_click" data-track-placement="footer" data-track-target="footer">Email <ArrowUpRight size={13} /></a></div>
      </div>
    </footer>
  );
}

function PortfolioHome() {
  const [sceneEnabled, setSceneEnabled] = useState(false);

  const handleTrackedClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const element = (event.target as HTMLElement).closest<HTMLElement>("[data-track]");
    const eventName = element?.dataset.track;
    if (!eventName) return;

    const properties: Record<string, string> = {};
    const safeKeys = ["placement", "target"] as const;
    for (const key of safeKeys) {
      const value = element.dataset[key];
      if (value) properties[key] = value.slice(0, 80);
    }
    trackEvent(eventName, properties);
  };

  useEffect(() => {
    // Keep mobile and reduced-motion visits on the lightweight CSS fallback.
    const desktopQuery = window.matchMedia("(min-width: 801px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let timer: number | undefined;

    const updateSceneMode = () => {
      if (timer !== undefined) window.clearTimeout(timer);
      if (!desktopQuery.matches || !motionQuery.matches) {
        timer = undefined;
        setSceneEnabled(false);
        return;
      }
      timer = window.setTimeout(() => setSceneEnabled(true), 650);
    };

    updateSceneMode();
    desktopQuery.addEventListener("change", updateSceneMode);
    motionQuery.addEventListener("change", updateSceneMode);

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      desktopQuery.removeEventListener("change", updateSceneMode);
      motionQuery.removeEventListener("change", updateSceneMode);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(".dc-reveal", { autoAlpha: 1, y: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".dc-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.to(".dc-reading-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <>
      <Suspense fallback={null}><AnalyticsConsent /></Suspense>
      <div className="dc-site" onClick={handleTrackedClick}>
      <div className="dc-reading-progress" aria-hidden="true" />
      <SceneBackdrop enabled={sceneEnabled} />
      <Header />
      <main>
        <Hero />
        <SignalMarquee />
        <DreieckCaseStudy />
        <DreieckStory />
        <Services />
        <ExperimentalLab />
        <Process />
        <AgencyCollaboration />
        <About />
        <Contact />
      </main>
      <Footer />
      </div>
    </>
  );
}

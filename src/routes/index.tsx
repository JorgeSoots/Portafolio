import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  BriefcaseBusiness,
  Check,
  Cpu,
  Database,
  Github,
  Layers3,
  Mail,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  ScanText,
  Workflow,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DigitalCoreCanvas = lazy(() => import("../components/DigitalCoreCanvas"));

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
  { label: "Perfil", href: "#about" },
];

const serviceItems = [
  {
    number: "01",
    icon: Boxes,
    title: "Experiencias web 3D",
    summary:
      "Sitios inmersivos, visualizadores de producto y experiencias interactivas que convierten una marca en algo memorable.",
    details: ["WebGL & Three.js", "Modelos 3D optimizados", "Animación e interacción"],
    accent: "mint",
  },
  {
    number: "02",
    icon: Workflow,
    title: "Sistemas empresariales & IA",
    summary:
      "Dashboards, plataformas operativas y automatización de procesos para reducir tareas manuales y conectar información.",
    details: ["Dashboards y roles", "Procesamiento documental", "Integraciones y reportes"],
    accent: "silver",
  },
  {
    number: "03",
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
        <a className="dc-header-cta" href="#contact">
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
  return (
    <div className="dc-scene-backdrop" aria-hidden="true">
      <div className="dc-scene-fallback">
        <span className="dc-orbit dc-orbit-one" />
        <span className="dc-orbit dc-orbit-two" />
        <span className="dc-core-glow" />
      </div>
      {enabled && (
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
          Diseño y desarrollo <em>experiencias digitales</em> que van más allá de lo convencional.
        </h1>
        <p className="dc-hero-intro">
          Soy Jorge Soots. Construyo sistemas empresariales, productos web y experiencias 3D que convierten ideas complejas en soluciones claras y útiles.
        </p>
        <div className="dc-hero-actions">
          <a className="dc-button dc-button-primary" href="#work">Explorar proyectos <ArrowUpRight size={17} /></a>
          <a className="dc-button dc-button-ghost" href="#contact">Hablemos de tu proyecto <ArrowDownRight size={17} /></a>
        </div>
        <div className="dc-hero-proof">
          <div><strong>4+</strong><span>Años de experiencia profesional</span></div>
          <div><strong>3D + AI</strong><span>Diseño y tecnología aplicada</span></div>
          <div><strong>CDMX</strong><span>Remoto · Híbrido · Colaboraciones</span></div>
        </div>
      </div>
      <div className="dc-hero-side" aria-hidden="true">
        <span className="dc-side-index">DIGITAL CORE / 001</span>
        <span className="dc-side-caption">Engineering<br />× Creativity<br />× Technology</span>
      </div>
      <a className="dc-scroll-cue" href="#work"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
    </section>
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

function DreieckCaseStudy() {
  return (
    <section id="work" className="dc-section dc-work-section">
      <div className="dc-container">
        <SectionHeading
          index="01"
          eyebrow="SELECTED WORK / CASO REAL"
          title="Tecnología que resuelve operaciones reales."
          body="No solo diseño interfaces: desarrollo herramientas que conectan personas, información y procesos de negocio."
        />

        <article className="dc-case-study dc-reveal">
          <div className="dc-case-copy">
            <div className="dc-case-meta"><span className="dc-live-dot" /> CASE STUDY <span>·</span> BUSINESS SYSTEMS & AI</div>
            <div className="dc-case-brand">DREIECK <span>AI</span></div>
            <h3>De formatos físicos a información lista para operar.</h3>
            <p className="dc-case-description">
              Plataforma desarrollada para digitalizar procesos de una empresa del sector de alertas sísmicas. Los técnicos capturan formatos y evidencias desde el teléfono; la IA transcribe la información y el equipo puede consultar, documentar y coordinar las operaciones desde un mismo sistema.
            </p>
            <div className="dc-case-features">
              <div><ScanText size={17} /><span>Lectura y transcripción de formatos mediante IA</span></div>
              <div><Layers3 size={17} /><span>Evidencias fotográficas vinculadas al reporte</span></div>
              <div><Workflow size={17} /><span>Perfiles, programación y asignación de técnicos</span></div>
              <div><Database size={17} /><span>Exportación de información a Excel</span></div>
              <div><BriefcaseBusiness size={17} /><span>Reportes PDF individuales con identidad de marca</span></div>
            </div>
            <div className="dc-case-role">
              <span>MI PARTICIPACIÓN</span>
              <strong>Diseño y desarrollo integral de la plataforma</strong>
              <small>Proyecto desarrollado individualmente.</small>
            </div>
            <div className="dc-tech-list" aria-label="Tecnologías utilizadas">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Python", "Supabase", "PostgreSQL", "AI APIs"].map((tech) => <span key={tech}>{tech}</span>)}
            </div>
            <div className="dc-case-links">
              <a className="dc-button dc-button-primary" href="https://dreieck-ai.vercel.app/" target="_blank" rel="noreferrer">Abrir plataforma <ArrowUpRight size={16} /></a>
              <a className="dc-text-link" href="https://dreieck-ai.vercel.app/dashboard" target="_blank" rel="noreferrer">Dashboard <ArrowUpRight size={14} /></a>
              <a className="dc-text-link" href="https://dreieck-ai.vercel.app/dashboard/Programacion" target="_blank" rel="noreferrer">Programación <ArrowUpRight size={14} /></a>
              <a className="dc-text-link" href="https://dreieck-ai.vercel.app/dashboard/asignacion" target="_blank" rel="noreferrer">Asignación <ArrowUpRight size={14} /></a>
            </div>
          </div>

          <div className="dc-case-visual">
            <a className="dc-screen-main" href="https://dreieck-ai.vercel.app/dashboard" target="_blank" rel="noreferrer" aria-label="Abrir dashboard de Dreieck AI">
              <div className="dc-screen-top"><span /><span /><span /><small>dreieck-ai.vercel.app / dashboard</small></div>
              <img src="/images/dreieck-dashboard.webp" alt="Dashboard administrativo Dreieck AI con registros, clientes, folios y técnicos asignados" loading="lazy" />
              <span className="dc-image-open">Vista administrativa <ArrowUpRight size={14} /></span>
            </a>
            <div className="dc-screen-grid">
              <a className="dc-screen-card dc-screen-mobile" href="https://dreieck-ai.vercel.app/" target="_blank" rel="noreferrer">
                <img src="/images/dreieck-capture.webp" alt="Interfaz móvil de Dreieck AI para fotografiar formatos y adjuntar evidencias" loading="lazy" />
                <span>01 / Captura móvil</span>
              </a>
              <a className="dc-screen-card" href="https://dreieck-ai.vercel.app/dashboard/Programacion" target="_blank" rel="noreferrer">
                <img src="/images/dreieck-scheduling.webp" alt="Formulario de programación de visitas y sitios en Dreieck AI" loading="lazy" />
                <span>02 / Programación</span>
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

function Services() {
  return (
    <section id="services" className="dc-section dc-services-section">
      <div className="dc-container">
        <SectionHeading
          index="02"
          eyebrow="CAPABILITIES / SERVICIOS"
          title="Diseño, ingeniería y tecnología en un mismo proceso."
          body="Puedo integrarme a un equipo o desarrollar una solución completa, desde la idea y la experiencia hasta la implementación."
        />
        <div className="dc-services-grid">
          {serviceItems.map((service) => {
            const Icon = service.icon;
            return (
              <article className={`dc-service-card dc-service-${service.accent} dc-reveal`} key={service.number}>
                <div className="dc-service-top"><span>{service.number}</span><Icon size={25} strokeWidth={1.4} /></div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ul>{service.details.map((detail) => <li key={detail}><Check size={14} />{detail}</li>)}</ul>
                <a href="#contact">Hablemos de esta solución <ArrowUpRight size={15} /></a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="dc-process-section">
      <div className="dc-container">
        <div className="dc-process-heading dc-reveal">
          <p className="dc-section-kicker"><span>03</span> HOW I WORK</p>
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

function About() {
  return (
    <section id="about" className="dc-section dc-about-section">
      <div className="dc-container dc-about-grid">
        <div className="dc-about-intro dc-reveal">
          <p className="dc-section-kicker"><span>04</span> ABOUT / PERFIL</p>
          <h2>Ingeniería con sensibilidad <em>visual.</em></h2>
          <p>
            Soy Jorge Soots, desarrollador Frontend y Full Stack con más de cuatro años de experiencia profesional creando soluciones web, aplicaciones y plataformas para organizaciones.
          </p>
          <p>
            Me interesa la intersección entre ingeniería y creatividad: construir productos útiles, interfaces cuidadas y experiencias 3D donde cada interacción tenga un propósito.
          </p>
          <div className="dc-about-actions">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={14} /></a>
            <a href={`mailto:${CONTACT_EMAIL}`}><Mail size={16} /> Correo <ArrowUpRight size={14} /></a>
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
  const message = encodeURIComponent("Hola Jorge, vi tu portafolio y me gustaría conversar sobre un proyecto.");
  return (
    <section id="contact" className="dc-contact-section">
      <div className="dc-container">
        <div className="dc-contact-card dc-reveal">
          <div className="dc-contact-orbit" aria-hidden="true" />
          <p className="dc-section-kicker"><span>05</span> CONTACT / START A PROJECT</p>
          <h2>¿Qué podemos <em>construir juntos?</em></h2>
          <p>Si necesitas una experiencia web 3D, un sistema para tu negocio o un desarrollador para tu equipo, hablemos.</p>
          <div className="dc-contact-actions">
            <a className="dc-button dc-button-primary" href={`${WHATSAPP_URL}?text=${message}`} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Hablemos por WhatsApp <ArrowUpRight size={16} /></a>
            <a className="dc-button dc-button-light" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Hablemos de un proyecto")}`}><Mail size={17} /> Enviar correo <ArrowUpRight size={16} /></a>
          </div>
          <div className="dc-contact-details">
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <span>Ciudad de México · Disponible para remoto e híbrido</span>
          </div>
        </div>
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
        <div><a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href={`mailto:${CONTACT_EMAIL}`}>Email <ArrowUpRight size={13} /></a></div>
      </div>
    </footer>
  );
}

function PortfolioHome() {
  const [sceneEnabled, setSceneEnabled] = useState(false);

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
    <div className="dc-site">
      <div className="dc-reading-progress" aria-hidden="true" />
      <SceneBackdrop enabled={sceneEnabled} />
      <Header />
      <main>
        <Hero />
        <DreieckCaseStudy />
        <Services />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

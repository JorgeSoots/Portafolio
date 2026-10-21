import { createFileRoute } from "@tanstack/react-router";
import { useLayoutEffect, useEffect, useRef, useState, lazy, Suspense } from "react";
import type { Application } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EntryGate from "./EntryGate";
import { forwardRef, useImperativeHandle } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jorge Soots · Cyberpunk Portfolio" },
      {
        name: "description",
        content:
          "Portafolio personal de desarrollador web. Estética cyberpunk minimalista: React, TypeScript, Three.js, GSAP y Node.js.",
      },
      { property: "og:title", content: "Jorge Soots · Cyberpunk Portfolio" },
      {
        property: "og:description",
        content:
          "Portafolio personal de desarrollador web con estética cyberpunk minimalista.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://TU-DOMINIO.com/og-image.png" },
      { property: "og:url", content: "https://TU-DOMINIO.com" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://TU-DOMINIO.com/og-image.png" },
    ],
  }),
  component: Index,
});


const SKILLS = [
  { name: "React", tag: "UI", level: 90 },
  { name: "Next.js", tag: "SSR", level: 80 },
  { name: "TypeScript", tag: "TYPE", level: 85 },
  { name: "Three.js", tag: "3D", level: 75 },
  { name: "GSAP", tag: "MOTION", level: 70 },
  { name: "Node.js", tag: "API", level: 80 },
];

const PROJECTS = [
  {
    id: "01",
    title: "Neural Dashboard",
    desc: "Plataforma de analítica con visualización de datos en tiempo real y paneles modulares.",
    stack: ["Next.js", "TypeScript", "WebSockets"],
    status: "ONLINE",
  },
  {
    id: "02",
    title: "Synth Wave Store",
    desc: "E-commerce inmersivo con carrito 3D y checkout optimizado para conversión.",
    stack: ["React", "Three.js", "Stripe"],
    status: "LIVE",
  },
  {
    id: "03",
    title: "Quantum Viz",
    desc: "Visualizador de datasets complejos usando renderizado volumétrico en WebGL.",
    stack: ["Three.js", "GSAP", "Node.js"],
    status: "BETA",
  },
];

function Navbar() {
  return (
    <header className="pointer-events-none fixed top-6 left-6 z-50">
      <a
        href="#inicio"
        className="pointer-events-auto font-mono text-sm font-medium tracking-widest text-cyan"
      >
        <span className="text-muted-foreground">{"//"}</span> JS.DEV
      </a>
    </header>
  );
}
function Hero({ onNavigate }: { onNavigate?: (label: string) => void }) {
  return (
    <section
      id="inicio"
      className="scanlines pointer-events-none relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Scrim adicional SOLO para Hero — más fuerte que el global */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/60 via-background/20 to-transparent"
      />

      <div
        className="pointer-events-none absolute -right-1/4 top-1/4 h-[60vh] w-[60vh] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-cyan), transparent 70%)" }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-8">
        <div className="content-3d pointer-events-auto flex w-full flex-col justify-center pt-24 md:w-1/2 md:pt-0">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan/70">
            {"<"} developer portfolio {"/>"}
          </p>
          <h1 className="text-3d neon-text mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Construye el
            <br />
            futuro de la{" "}
            <span className="text-cyan">web.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Interfaces inmersivas, render 3D y animación fluida. Construyo
            experiencias que se sienten vivas.
          </p>

                    <div className="mt-10">
            <button
              type="button"
              onClick={() => onNavigate?.("proyectos")}
              className="text-3d terminal-btn inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium"
            >
              <span className="text-muted-foreground">$</span>
              ./deploy.sh
              <span className="blink-cursor" />
            </button>
          </div>
        </div>

        <div aria-hidden="true" className="hidden md:block" />
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative border-t border-border/60 py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-14 flex items-end justify-between">
          <div className="content-3d w-full md:w-1/2">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan/70">
              {"//"} stack
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Skills
            </h2>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
           
          </span>
        </div>

        <ul className="content-3d flex w-full flex-col gap-5 md:w-1/2">
          {SKILLS.map((skill) => (
            <li key={skill.name}>
              <div className="mb-2 flex items-baseline justify-between">
                <span className="font-display text-base font-semibold text-foreground">
                  {skill.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan/60">
                  {skill.tag} · {skill.level}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/40">
                <div
                  className="skill-bar-fill h-full rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]"
                  style={{ "--target-width": `${skill.level}%` } as React.CSSProperties}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SobreMi() {
  const STATS = [
    { label: "experiencia", value: "3+ años" },
    { label: "stack", value: "Full-stack" },
    { label: "foco", value: "UI / 3D web Experience" },
  ];

  return (
    <section id="sobre-mi" className="relative border-t border-border/60 py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="content-3d ml-auto w-full md:w-1/2">
          {/* resto del contenido igual, sin cambios */}
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan/70">
            {"//"} about
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            ¿Quien soy?
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Desarrollador full-stack con más de 3 años construyendo interfaces
            web. Me especializo en React, TypeScript y experiencias 3D en
            tiempo real con Three.js, Blender y Spline. Trabajo tanto el frontend como
            la capa de API en Node.js, con foco en rendimiento y animación
            fluida más que en efectos decorativos.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Me interesa particularmente el punto donde la ingeniería y el
            diseño visual se cruzan: scroll-driven animation, WebGL y
            arquitecturas de componentes que escalan sin sacrificar fluidez.
          </p>

          <ul className="mt-8 flex flex-wrap gap-6">
            {STATS.map((stat) => (
              <li key={stat.label} className="flex flex-col">
                <span className="font-display text-xl font-semibold text-cyan">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Projects({ onNavigate }: { onNavigate?: (label: string) => void }) {
  return (
    <section id="proyectos" className="relative border-t border-border/60 py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-6 ">
        <div className="mb-14 flex items-end justify-between md:w-1/2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan/70">
              {"//"} work
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Proyectos
            </h2>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            03 · nodes
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:w-1/2 ">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            >
              <header className="mb-6 flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-violet/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan/70 ">
                  {project.status}
                </span>
              </header>

              <span className="font-mono text-xs text-muted-foreground">
                proj_{project.id}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.desc}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded border border-border/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

                            <button
                type="button"
                onClick={() => onNavigate?.("contacto")}
                className="mt-6 inline-flex items-center gap-1 font-mono text-xs text-cyan/80 transition-colors hover:text-cyan"
              >
                {"->"} view_source
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contacto"
      className="relative border-t border-border/60 py-24 md:py-32"
    >
      
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-violet), transparent 70%)" }}
      />
        <div className="relative mx-auto max-w-3xl px-6 pointer-events-auto">
          <div className="w-full md:w-1/2">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan/70">
          {"//"} contacto
        </p>
        <h2 className="text-3d mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Construyamos algo{" "}
          <span className="text-violet">extraño</span>.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
          ¿Tienes un proyecto en mente? Disponible para colaboraciones y
          encargos.
        </p>
        <a
          href="mailto:hello@jorgesoots.dev"
          className="btn-3d terminal-btn mt-10 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium"
        >
          <span className="text-muted-foreground">$</span>
          echo "hello" | mail
        </a>
        </div>
      </div>
      
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl border-t border-border/60 px-6 pt-8 pb-12">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <span className="font-mono text-xs text-muted-foreground">
          {"//"} JS.DEV — {new Date().getFullYear()}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          built with React · Tailwind
        </span>
      </div>
    </footer>
  );
}

function SplineScene({
  onSplineLoad,
}: {
  onSplineLoad: (spline: Application) => void;
}) {
  return (
    <Suspense fallback={<SceneLoader />}>
      <Spline
        scene="https://prod.spline.design/NYTBLAe-WshJyvho/scene.splinecode"
        onLoad={onSplineLoad}
        style={{ width: "100%", height: "100%" }}
      />
    </Suspense>
  );
}

function SceneLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan/30 border-t-cyan" />
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          cargando escena_
        </span>
      </div>
    </div>
  );
}
const AmbientAudio = forwardRef<{ start: () => void }>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const tryPlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        gsap.to(audio, { volume: 0.25, duration: 2.5, ease: "sine.inOut" });
      })
      .catch((err) => {
        console.warn("[Audio] No se pudo reproducir:", err.name, err.message);
      });
  };

  useImperativeHandle(ref, () => ({
    start: tryPlay,
  }));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;

    tryPlay();

    const onFirstInteraction = () => {
      if (!audio.paused) return;
      tryPlay();
    };

    window.addEventListener("click", onFirstInteraction);
    window.addEventListener("scroll", onFirstInteraction, { passive: true, once: true });
    window.addEventListener("keydown", onFirstInteraction);

    return () => {
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("scroll", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      gsap.to(audio, {
        volume: 0,
        duration: 0.6,
        onComplete: () => audio.pause(),
      });
      setIsPlaying(false);
    } else {
      audio.play();
      gsap.to(audio, { volume: 0.1, duration: 0.6 });
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/song3.mp3"
        loop
        preload="none"
        onError={(e) => console.error("[Audio] Error cargando el archivo:", e.currentTarget.error)}
      />
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Silenciar ambiente" : "Activar ambiente"}
        className="pointer-events-auto fixed top-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-cyan/35 bg-background/65 backdrop-blur-md transition-colors hover:border-cyan/60"
        style={{
          animation: isPlaying ? "audioGlow 2.4s ease-in-out infinite" : "none",
        }}
      >
        <div className="flex h-6 items-end justify-center gap-[3px]">
          {[
            { anim: "audioBar1 0.9s ease-in-out infinite", h: "14px" },
            { anim: "audioBar2 1.1s ease-in-out infinite", h: "20px" },
            { anim: "audioBar3 0.75s ease-in-out infinite", h: "16px" },
            { anim: "audioBar4 1s ease-in-out infinite", h: "22px" },
          ].map((bar, i) => (
            <div
              key={i}
              className="w-[3px] rounded-sm bg-cyan"
              style={{
                height: isPlaying ? bar.h : "5px",
                animation: isPlaying ? bar.anim : "none",
              }}
            />
          ))}
        </div>
      </button>
    </>
  );
});

function Index() {
  const [sceneReady, setSceneReady] = useState(false);
const audioUnlockRef = useRef<{ start: () => void }>(null);
const timelineRef = useRef<gsap.core.Timeline | null>(null);

const scrollToSection = (label: string) => {
  const tl = timelineRef.current;
  const st = tl?.scrollTrigger;
  if (!tl || !st) return;
  const labelTime = tl.labels[label];
  if (labelTime === undefined) return;
  const progress = labelTime / tl.duration();
  const target = st.start + progress * (st.end - st.start);
  window.scrollTo({ top: target, behavior: "smooth" });
};

  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  const handleSplineLoad = (splineApp: any) => {
    
    const puntoInicio = findObjectByNames(splineApp, "Punto Inicio");
    const puntoSkills = findObjectByNames(splineApp, "Punto skills", "Punto Skills");
    const puntoSobreMi = findObjectByNames(splineApp, "Punto Sobre mi", "Punto Mi", "Sobre mi");
    const puntoProyectos = findObjectByNames(splineApp, "Punto Proyectos");
    const puntoContacto = findObjectByNames(splineApp, "Punto Contacto");
    const playerRig = findObjectByNames(splineApp, "PlayerRig");
    const prisma = findObjectByNames(splineApp, "prisma");
    const icosahedroExterior = findObjectByNames(splineApp, "Icosahedron 2");
    const icosahedroInterior = findObjectByNames(splineApp, "Icosahedron");

    const required = {
      "Punto Inicio": puntoInicio,
      "Punto Skills": puntoSkills,
      "Punto Sobre mi": puntoSobreMi,
      "Punto Proyectos": puntoProyectos,
      "Punto Contacto": puntoContacto,
      PlayerRig: playerRig,
      prisma: prisma,
    };

    const missing = Object.entries(required)
      .filter(([, obj]) => !obj)
      .map(([name]) => name);

    if (missing.length > 0) {
      console.warn(
        `[Spline] No se encontraron estos objetos en la escena: ${missing.join(", ")}. ` +
        `Revisa que existan en Spline con esos nombres (o agrega más variantes en findObjectByNames).`
      );
      setSceneReady(true); // evita que el loader se quede pegado
      return;
    }

    // --- A. ANIMACIÓN DE REPOSO (IDLE) ---
    // Esto hace que el núcleo y la carcasa floten y giren perpetuamente, dando la sensación de energía
    [icosahedroExterior, icosahedroInterior].forEach((obj) => {
      if (obj) {
        // Rotación continua e infinita
        gsap.to(obj.rotation, {
          y: "+=" + Math.PI * 2, // Gira 360 grados
          x: "+=0.3", // Ligera inclinación orgánica
          duration: 12,
          repeat: -1,
          ease: "none" // Velocidad constante
        });
        // Efecto de gravedad (flotación)
        gsap.to(obj.position, {
          y: obj.position.y + 20, // Cambia este "20" si quieres que flote más alto o más bajo
          duration: 2.5,
          yoyo: true, // Sube y luego baja
          repeat: -1,
          ease: "sine.inOut"
        });
      }
    });
        // --- Letrero 3D estilo Hollywood (parpadeo neón sutil) ---
    const letrero = findObjectByNames(splineApp, "Letrero JS.DEV", "Letrero");
    if (letrero) {
      gsap.to(letrero.scale, {
        x: letrero.scale.x * 1.02,
        y: letrero.scale.y * 1.02,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        repeatDelay: Math.random() * 5 + 3, // parpadeo esporádico, no rítmico
        ease: "power1.inOut",
      });
    }

    // --- B. CONFIGURACIÓN DE UI ---
    gsap.set(["#inicio", "#skills", "#sobre-mi", "#proyectos", "#contacto"], { 
      position: "absolute", top: 0, left: 0, width: "100%", minHeight: "100vh", zIndex: 10
    });
    gsap.set(["#skills", "#sobre-mi", "#proyectos", "#contacto"], { autoAlpha: 0, y: 50 });
    gsap.set("#inicio", { autoAlpha: 1, y: 0 });

    // Accesibilidad: las secciones ocultas no deben ser alcanzables con Tab
    // ni visibles para lectores de pantalla
    ["#skills", "#sobre-mi", "#proyectos", "#contacto"].forEach((id) => {
      document.querySelector(id)?.setAttribute("inert", "");
    });

    // --- C. SISTEMA DE DOBLE PROXY (EL PRISMA GUÍA, LA CÁMARA SIGUE) ---
    const rigOffsetX = playerRig.position.x - puntoInicio.position.x;
    const rigOffsetY = playerRig.position.y - puntoInicio.position.y;
    const rigOffsetZ = playerRig.position.z - puntoInicio.position.z;

    const prismaOffsetX = prisma.position.x - puntoInicio.position.x;
    const prismaOffsetY = prisma.position.y - puntoInicio.position.y;
    const prismaOffsetZ = prisma.position.z - puntoInicio.position.z;

    // Tenemos dos guías invisibles en lugar de una
    const proxyPrisma = { x: puntoInicio.position.x, y: puntoInicio.position.y, z: puntoInicio.position.z };
    const proxyCamara = { x: puntoInicio.position.x, y: puntoInicio.position.y, z: puntoInicio.position.z };

    const getTarget = (punto: any) => ({
      x: punto.position.x, y: punto.position.y, z: punto.position.z,
    });
    const getRotation = (punto: any) => ({
  x: punto.rotation.x,
  y: punto.rotation.y,
  z: punto.rotation.z,
});

        const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 3,
      },
      onUpdate: () => {
        prisma.position.x = proxyPrisma.x + prismaOffsetX;
        prisma.position.y = proxyPrisma.y + prismaOffsetY;
        prisma.position.z = proxyPrisma.z + prismaOffsetZ;

        playerRig.position.x = proxyCamara.x + rigOffsetX;
        playerRig.position.y = proxyCamara.y + rigOffsetY;
        playerRig.position.z = proxyCamara.z + rigOffsetZ;
      }
    });

    tl.addLabel("inicio", 0);

    const easeType = "power1.inOut";
    const dur = 4;
    const lag = "-=3.5"; 

    // --- Funciones auxiliares para animar el contenido ---
    const animOut = (sectionId: string) => {
      return gsap.timeline()
        .to(`${sectionId} .content-3d`, { 
            y: -50, z: -100, rotationX: -20, autoAlpha: 0, duration: 0.8, ease: "power2.inOut" 
        })
        .set(sectionId, { autoAlpha: 0 }) // Oculta la sección entera al terminar
        .call(() => {
          document.querySelector(sectionId)?.setAttribute("inert", "");
        });
    };

    const animIn = (sectionId: string) => {
      return gsap.timeline()
        .call(() => {
          document.querySelector(sectionId)?.removeAttribute("inert");
        })
        .set(sectionId, { autoAlpha: 1 }) // Muestra la sección entera primero
        .fromTo(`${sectionId} .content-3d`, 
            { y: 100, z: -300, rotationX: 45, transformPerspective: 1000, autoAlpha: 0 }, 
            { y: 0, z: 0, rotationX: 0, autoAlpha: 1, duration: 1.5, ease: "power3.out" }
        );
    };

    // --- TRAMO 1: Inicio -> Skills ---
    tl.add(animOut("#inicio"), 0) // Comienza a ocultar Inicio al iniciar el scroll
      .to(proxyPrisma, {
        x: puntoSkills.position.x ,
        y: puntoSkills.position.y + 150,
        z: puntoSkills.position.z + 600,
        duration: dur,
        ease: easeType,
      }, "<")
      .to(proxyCamara, { ...getTarget(puntoSkills), duration: dur, ease: easeType }, lag)
      .add(animIn("#skills"), "-=1") // Muestra Skills un poco antes de llegar
      .addLabel("skills");

    // --- TRAMO 2: Skills -> Sobre mí ---
    tl.add(animOut("#skills"))
      .to(proxyPrisma, {
        x: puntoSobreMi.position.x - 80,
        y: puntoSobreMi.position.y,
        z: puntoSobreMi.position.z + 980,
        duration: dur,
        ease: easeType,
      }, "<")
      .to(proxyCamara, { ...getTarget(puntoSobreMi), 
        x: puntoSobreMi.position.x - 150,
        y: puntoSobreMi.position.y,
        z: puntoSobreMi.position.z ,
        duration: dur, ease: easeType }, lag)
      .add(animIn("#sobre-mi"), "-=1")
      .addLabel("sobre-mi");

    // --- TRAMO 3: Sobre mí -> Proyectos ---
    tl.add(animOut("#sobre-mi"))
      .to(proxyPrisma, {
        x: puntoProyectos.position.x,
        y: puntoProyectos.position.y,
        z: puntoProyectos.position.z + 580,
        duration: dur,
        ease: easeType,
      }, "<")
      .to(proxyCamara, { ...getTarget(puntoProyectos), duration: dur, ease: easeType }, lag)
      .add(animIn("#proyectos"), "-=1")
      .addLabel("proyectos");

    // --- TRAMO 4: Proyectos -> Contacto ---
    tl.add(animOut("#proyectos"))
      .to(proxyPrisma, {
        x: puntoContacto.position.x,
        y: puntoContacto.position.y,
        z: puntoContacto.position.z + 580,
        duration: dur,
        ease: easeType,
      }, "<")
      .to(proxyCamara, { ...getTarget(puntoContacto), duration: dur, ease: easeType }, lag)
      .add(animIn("#contacto"), "-=1")
      .addLabel("contacto");

    timelineRef.current = tl;
    // NUEVO: la escena y el timeline ya están listos, ocultar el loader
    setSceneReady(true);
  };
  return (
    <>
    <EntryGate ready={sceneReady} onEnter={() => audioUnlockRef.current?.start()} />
      <div id="canvas-container" className="pointer-events-none fixed left-0 top-0 z-0 h-screen w-screen">
        <SplineScene onSplineLoad={handleSplineLoad} />
      </div>

           {/* Scrim base, parejo para todas las secciones */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[5] bg-gradient-to-r from-background/40 via-background/15 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[5] bg-gradient-to-b from-background/35 via-transparent to-background/35"
      />

      <div className="relative z-10 h-[900vh] text-foreground">
        <Navbar />
        <AmbientAudio ref={audioUnlockRef}/>
        <main className="fixed top-0 left-0 w-full h-screen pointer-events-none">
          <Hero onNavigate={scrollToSection} />
          <Skills />
          <SobreMi />
          <Projects onNavigate={scrollToSection} />
          <Contact />
        </main>
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}
// Busca un objeto por varios nombres candidatos, ignorando mayúsculas/espacios extra
function findObjectByNames(splineApp: any, ...names: string[]) {
  for (const name of names) {
    const obj = splineApp.findObjectByName(name);
    if (obj) return obj;
  }
  // Fallback: búsqueda case-insensitive sobre todos los objetos de la escena,
  // por si el nombre real difiere solo en mayúsculas/espacios
  const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");
  const targets = names.map(normalize);
  const allObjects = splineApp.getAllObjects?.() ?? [];
  return allObjects.find((o: any) => targets.includes(normalize(o.name))) ?? null;
}
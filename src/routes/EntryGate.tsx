import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Pantalla de entrada.
 *
 * Dos estados en una sola pantalla:
 *  1) ready=false  -> loader ("inicializando_"), fondo sólido, nada clicable.
 *  2) ready=true   -> fondo sólido salvo una "ventana" circular recortada
 *                      con CSS mask justo donde está tu prisma (el mismo
 *                      canvas de Spline que ya está montado detrás, en
 *                      #canvas-container) y el botón ENTRAR debajo.
 *
 * Como ya tienes tu propio loader en index.tsx mientras `sceneReady` es
 * false, este componente reemplaza a ese loader — no lo dupliques: borra
 * el bloque `{!sceneReady && (...)}` de index.tsx (ver nota al final).
 *
 * Ajusta WINDOW si el recorte no cae exactamente sobre tu prisma: son
 * porcentajes del viewport (x, y = centro; r = radio en px).
 */
const WINDOW = { x: "49%", y: "45%", r: 100, feather: 90 };

export default function EntryGate({
  ready,
  onEnter,
}: {
  ready: boolean;
  onEnter?: () => void;
}) {
  const [open, setOpen] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  // Bloquea el scroll de la página mientras el portal está abierto.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  const handleEnter = () => {
    if (!ready) return;
    onEnter?.();

    gsap.to(rootRef.current, {
      autoAlpha: 0,
      duration: 0.6,
      ease: "power1.inOut",
      onComplete: () => setOpen(false),
    });
  };

  if (!open) return null;

  const maskImage = ready
    ? `radial-gradient(circle at ${WINDOW.x} ${WINDOW.y}, transparent ${WINDOW.r}px, black ${WINDOW.r + WINDOW.feather}px)`
    : undefined;

  return (
    <div
      ref={rootRef}
      // Absorbe cualquier clic en el fondo (no deja pasar a lo de atrás)
      // pero NO dispara handleEnter — solo el botón lo hace.
      onClick={(e) => e.stopPropagation()}
      className="scanlines fixed inset-0 z-[100] flex flex-col items-center justify-end gap-10 bg-background pb-20"
      style={{
        WebkitMaskImage: maskImage,
        maskImage,
      }}
    >
      {!ready ? (
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan/30 border-t-cyan" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            inicializando_
          </span>
        </div>
      ) : (
        <div
          className="flex flex-col items-center gap-3"
          style={{ marginLeft: `calc(${WINDOW.x} - 50%)` }}
        >
          <div className="relative flex h-20 w-20 items-center justify-center">
            <span className="entry-ring absolute inset-[-10px] rounded-full" aria-hidden="true" />
            <button
              type="button"
              onClick={handleEnter}
              aria-label="Entrar al sitio"
              className="entry-pulse pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full border border-cyan/40 bg-background/70 shadow-[0_0_24px_rgba(93,255,235,0.25)] backdrop-blur-md"
            >
              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-5 w-5"
                fill="currentColor"
                style={{ color: "var(--color-cyan)" }}
              >
                <polygon points="6,4 20,12 6,20" />
              </svg>
            </button>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan/80">
            entrar
          </span>
        </div>
      )}

      <style>{`
        @keyframes entryPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }
        .entry-pulse { animation: entryPulse 2.2s ease-in-out infinite; }

        @keyframes entrySpin { to { transform: rotate(360deg); } }
        .entry-ring {
          border: 1.5px solid transparent;
          border-top-color: var(--color-cyan);
          border-right-color: var(--color-cyan);
          opacity: 0.55;
          animation: entrySpin 2.8s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .entry-pulse, .entry-ring { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

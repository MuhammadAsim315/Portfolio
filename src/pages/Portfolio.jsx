import { useEffect, useRef, useState } from "react";
import { CONTACT, JOURNEY, NAV_LINKS, PROJECTS, SKILLS } from "../data/portfolioData.js";
import { useInView } from "../hooks/useInView.js";
import { useMagnet } from "../hooks/useMagnet.js";

const RESUME_URL = new URL("../../My_Resume.pdf", import.meta.url).href;
const ACCENT = "#2563eb";
const ACCENT_ALT = "#16a34a";
const TEXT_MAIN = "#111827";
const TEXT_MUTED = "#4b5563";
const TEXT_ON_ACCENT = "#f8fafc";
const SURFACE = "#f8fafc";
const SURFACE_CARD = "#ffffff";
const BORDER = "rgba(17,24,39,0.12)";

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring_pos = useRef({ x: 0, y: 0 });
  const hovered = useRef(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(Boolean(mq?.matches));
    update();
    mq?.addEventListener?.("change", update);

    if (!mq?.matches) return () => mq?.removeEventListener?.("change", update);

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const over = (e) => {
      if (e.target.closest("a,button,[data-cursor]")) hovered.current = true;
    };
    const out = (e) => {
      if (e.target.closest("a,button,[data-cursor]")) hovered.current = false;
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    let raf;
    const animate = () => {
      ring_pos.current.x += (pos.current.x - ring_pos.current.x) * 0.12;
      ring_pos.current.y += (pos.current.y - ring_pos.current.y) * 0.12;
      if (dot.current) {
        dot.current.style.left = pos.current.x + "px";
        dot.current.style.top = pos.current.y + "px";
      }
      if (ring.current) {
        ring.current.style.left = ring_pos.current.x + "px";
        ring.current.style.top = ring_pos.current.y + "px";
        const s = hovered.current ? 2.2 : 1;
        ring.current.style.transform = `translate(-50%,-50%) scale(${s})`;
        ring.current.style.borderColor = hovered.current ? ACCENT : "rgba(37,99,235,0.45)";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      mq?.removeEventListener?.("change", update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        style={{
          position: "fixed",
          width: 6,
          height: 6,
          background: ACCENT,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%,-50%)",
          transition: "none",
        }}
      />
      <div
        ref={ring}
        style={{
          position: "fixed",
          width: 36,
          height: 36,
          border: "1.5px solid rgba(37,99,235,0.45)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%,-50%)",
          transition: "transform 0.2s, border-color 0.2s",
        }}
      />
    </>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <nav
        className="topNav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "1.2rem 2.5rem",
          background: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(17,24,39,0.08)" : "none",
          transition: "all 0.4s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "1.05rem",
            color: ACCENT,
            letterSpacing: "0.04em",
          }}
        >
          M<span style={{ color: TEXT_MAIN, opacity: 0.7 }}>.ASIM</span>
        </span>

        <div className="navLinks" style={{ display: "flex", gap: "2.5rem" }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              style={{
                background: "none",
                border: "none",
                cursor: "none",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.78rem",
                color: TEXT_MUTED,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = ACCENT)}
              onMouseLeave={(e) => (e.target.style.color = TEXT_MUTED)}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          className="navToggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "none",
            border: "1px solid rgba(17,24,39,0.12)",
            background: "rgba(255,255,255,0.8)",
            color: TEXT_MAIN,
            borderRadius: 10,
            padding: "0.55rem 0.7rem",
            lineHeight: 1,
            cursor: "pointer",
          }}
        >
          <span style={{ display: "block", width: 18, height: 2, background: open ? ACCENT : TEXT_MAIN, marginBottom: 4 }} />
          <span style={{ display: "block", width: 18, height: 2, background: open ? ACCENT : TEXT_MAIN, marginBottom: 4, opacity: open ? 0.7 : 1 }} />
          <span style={{ display: "block", width: 18, height: 2, background: open ? ACCENT : TEXT_MAIN }} />
        </button>
      </nav>

      {open && (
        <div
          className="navOverlay"
          role="presentation"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: 68,
              right: 16,
              left: 16,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.97)",
              boxShadow: "0 20px 60px rgba(17,24,39,0.12)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "0.65rem 0.85rem", borderBottom: "1px solid rgba(17,24,39,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.14em", color: TEXT_MUTED, textTransform: "uppercase" }}>
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{ border: "none", background: "transparent", color: TEXT_MAIN, fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", cursor: "pointer" }}
              >
                Close
              </button>
            </div>

            <div style={{ display: "grid" }}>
              {NAV_LINKS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    scrollTo(l);
                  }}
                  style={{
                    padding: "1rem 1rem",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid rgba(17,24,39,0.08)",
                    cursor: "pointer",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.9rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: TEXT_MAIN,
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function GlitchText({ text, style = {} }) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        color: TEXT_MAIN,
        WebkitTextFillColor: TEXT_MAIN,
        background: "none",
        textShadow: "0 1px 8px rgba(17,24,39,0.12)",
        ...style,
      }}
    >
      {text}
    </span>
  );
}

// Note: To keep this refactor safe, the remaining section components are kept inline
// in this file for now. We can split them further into src/components/ later.

function PhotoCard3D() {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const rot = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const idleT = useRef(0);

  useEffect(() => {
    const loop = () => {
      idleT.current += 0.012;
      if (!hovered) {
        target.current.x = Math.sin(idleT.current * 0.7) * 8;
        target.current.y = Math.cos(idleT.current * 0.5) * 5;
      }

      rot.current.x += (target.current.x - rot.current.x) * 0.06;
      rot.current.y += (target.current.y - rot.current.y) * 0.06;

      const card = cardRef.current;
      const glare = glareRef.current;
      if (card) {
        card.style.transform = `
          perspective(900px)
          rotateX(${rot.current.x}deg)
          rotateY(${rot.current.y}deg)
          translateZ(0px)
        `;
      }
      if (glare) {
        const gx = 50 + rot.current.y * 2;
        const gy = 50 - rot.current.x * 2;
        glare.style.background = `rgba(17,24,39,0.04)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [hovered]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    target.current.x = -dy * 18;
    target.current.y = dx * 18;
  };

  return (
    <div
      style={{
        perspective: "900px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeSlideUp 0.9s 0.3s ease both",
        position: "relative",
        width: "100%",
        maxWidth: 440,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 380,
          aspectRatio: "380 / 480",
          borderRadius: "24px",
          background: "transparent",
          border: `1px solid ${ACCENT}26`,
          animation: "cardRingPulse 3s ease infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 400,
          aspectRatio: "400 / 500",
          borderRadius: "28px",
          background: "transparent",
          border: "1px solid rgba(37,99,235,0.15)",
          animation: "cardRingPulse 3s ease infinite 1s",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        ref={cardRef}
        style={{
          width: "100%",
          maxWidth: 340,
          aspectRatio: "340 / 440",
          borderRadius: "20px",
          position: "relative",
          transformStyle: "preserve-3d",
          willChange: "transform",
          zIndex: 1,
          boxShadow: `
            0 24px 60px rgba(17,24,39,0.12),
            0 0 0 1px rgba(17,24,39,0.08)
          `,
          overflow: "hidden",
          background: SURFACE_CARD,
          cursor: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: SURFACE_CARD,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src="https://api.dicebear.com/9.x/notionists/svg?seed=MuhammadAsim&backgroundColor=0f0f1a"
            alt={CONTACT.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              filter: "brightness(0.95) contrast(1.05)",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(17,24,39,0.03)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "55%",
              background: "rgba(248,250,252,0.8)",
              pointerEvents: "none",
            }}
          />
        </div>

        <div
          ref={glareRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(17,24,39,0.04)",
            pointerEvents: "none",
            borderRadius: "20px",
            zIndex: 4,
            mixBlendMode: "normal",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "1.5rem",
            zIndex: 5,
            background: "rgba(248,250,252,0.96)",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.62rem",
              color: ACCENT,
              letterSpacing: "0.15em",
              marginBottom: "0.3rem",
              textTransform: "uppercase",
            }}
          >
            {CONTACT.name}
          </div>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: TEXT_MAIN,
              letterSpacing: "-0.01em",
            }}
          >
            Software Engineer
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [typed, setTyped] = useState("");
  const fullText = "Software Engineer · React · TypeScript · Next.js";
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 55);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const rm = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(Boolean(rm?.matches));
    update();
    rm?.addEventListener?.("change", update);

    const h = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    if (!rm?.matches) window.addEventListener("mousemove", h);
    return () => {
      window.removeEventListener("mousemove", h);
      rm?.removeEventListener?.("change", update);
    };
  }, []);

  const magnet = useMagnet(0.4);

  return (
    <section
      className="heroSection"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 2.5rem",
        paddingTop: "clamp(5.5rem, 7vw, 7rem)",
        position: "relative",
        overflow: "hidden",
        background: SURFACE,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "rgba(17,24,39,0.02)",
          transform: reduceMotion ? "none" : `translate(${(mousePos.x - 0.5) * -12}px, ${(mousePos.y - 0.5) * -12}px)`,
          transition: "transform 0.8s ease",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(37,99,235,0.08)",
          top: "12%",
          left: "4%",
          zIndex: 0,
          transform: reduceMotion ? "none" : `translate(${(mousePos.x - 0.5) * 18}px, ${(mousePos.y - 0.5) * 18}px)`,
          transition: "transform 1.2s ease",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(17,24,39,0.04)",
          bottom: "8%",
          right: "8%",
          zIndex: 0,
          transform: reduceMotion ? "none" : `translate(${(mousePos.x - 0.5) * -16}px, ${(mousePos.y - 0.5) * -16}px)`,
          transition: "transform 1.5s ease",
        }}
      />

      <div
        className="heroGrid"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div>
          <div
            className="availabilityBadge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              border: `1px solid ${ACCENT}33`,
              borderRadius: "100px",
              padding: "0.35rem 0.9rem",
              marginBottom: "2.5rem",
              background: `${ACCENT}0d`,
              animation: "fadeSlideUp 0.6s ease both",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: ACCENT,
                display: "block",
                boxShadow: `0 0 8px ${ACCENT}`,
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.72rem",
                color: ACCENT,
                letterSpacing: "0.1em",
              }}
            >
              AVAILABLE FOR WORK
            </span>
          </div>

          <h1
            className="heroH1 heroH1Primary"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.8rem, 6vw, 7rem)",
              fontWeight: 800,
              lineHeight: 0.92,
              color: TEXT_MAIN,
              margin: "0 0 0.3rem",
              animation: "fadeSlideUp 0.7s 0.1s ease both",
              letterSpacing: "-0.02em",
            }}
          >
            MUHAMMAD
          </h1>
          <h1
            className="heroH1 heroH1Secondary"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.8rem, 6vw, 7rem)",
              fontWeight: 800,
              lineHeight: 0.92,
              margin: "0 0 2rem",
              animation: "fadeSlideUp 0.7s 0.2s ease both",
              letterSpacing: "-0.02em",
              color: ACCENT,
              WebkitTextFillColor: ACCENT,
            }}
          >
            <GlitchText text="ASIM" />
          </h1>

          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(0.85rem, 1.8vw, 1.1rem)",
              color: TEXT_MUTED,
              letterSpacing: "0.08em",
              marginBottom: "3rem",
              animation: "fadeSlideUp 0.7s 0.3s ease both",
            }}
          >
            <span style={{ color: ACCENT }}>$ </span>
            {typed}
            <span style={{ animation: "blink 1s infinite" }}>_</span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1.2rem",
              flexWrap: "wrap",
              animation: "fadeSlideUp 0.7s 0.4s ease both",
            }}
          >
            <button
              {...magnet}
              onClick={() => document.getElementById("work").scrollIntoView({ behavior: "smooth" })}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: ACCENT,
                color: TEXT_ON_ACCENT,
                border: "none",
                padding: "0.9rem 2.2rem",
                borderRadius: "4px",
                cursor: "none",
                fontWeight: 700,
                transition: "box-shadow 0.15s",
                boxShadow: `0 0 20px ${ACCENT}33`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 28px ${ACCENT}55`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px ${ACCENT}33`;
              }}
            >
              View My Work →
            </button>
            <button
              onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: "transparent",
                color: TEXT_MAIN,
                border: `1px solid ${BORDER}`,
                padding: "0.9rem 2.2rem",
                borderRadius: "4px",
                cursor: "none",
                fontWeight: 700,
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ACCENT;
                e.currentTarget.style.color = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.color = TEXT_MAIN;
              }}
            >
              Get In Touch
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "3rem",
              marginTop: "4rem",
              animation: "fadeSlideUp 0.7s 0.5s ease both",
              flexWrap: "wrap",
            }}
          >
            {[["2+", "Years XP"], ["5+", "Projects"], ["2", "Happy Clients"]].map(([num, label]) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    color: ACCENT,
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.72rem",
                    color: TEXT_MUTED,
                    letterSpacing: "0.1em",
                    marginTop: "0.3rem",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="heroRight" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PhotoCard3D />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.7s ${index * 0.12}s ease, transform 0.7s ${index * 0.12}s ease`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor
        style={{
          position: "relative",
          overflow: "hidden",
          border: `1px solid ${hovered ? ACCENT : BORDER}`,
          borderRadius: "8px",
          padding: "2rem",
          background: hovered ? "rgba(37,99,235,0.05)" : SURFACE_CARD,
          transition: "border-color 0.3s, background 0.3s",
          cursor: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: ACCENT,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: TEXT_MUTED, letterSpacing: "0.1em" }}>
            {project.id}
          </span>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `1.5px solid ${ACCENT}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          >
            <span style={{ color: ACCENT, fontSize: "1rem", lineHeight: 1 }}>↗</span>
          </div>
        </div>

        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.55rem",
            color: TEXT_MAIN,
            margin: "0 0 0.7rem",
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            color: TEXT_MUTED,
            lineHeight: 1.65,
            margin: "0 0 1.5rem",
          }}
        >
          {project.desc}
        </p>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.06em",
                padding: "0.3rem 0.7rem",
                borderRadius: "3px",
                border: `1px solid ${ACCENT}33`,
                color: ACCENT,
                background: `${ACCENT}0d`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkSection() {
  const [headRef, headVisible] = useInView();
  return (
    <section id="work" style={{ padding: "8rem 2.5rem", maxWidth: 1100, margin: "0 auto" }}>
      <div
        ref={headRef}
        style={{
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? "none" : "translateY(40px)",
          transition: "all 0.7s ease",
          marginBottom: "4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: ACCENT, letterSpacing: "0.15em", marginBottom: "0.8rem" }}>
            02 / SELECTED WORK
          </div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: TEXT_MAIN,
              margin: 0,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Projects That
            <br />
            <span style={{ color: ACCENT }}>Deliver</span>
          </h2>
        </div>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: TEXT_MUTED }}>{PROJECTS.length} projects</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))",
          gap: "1.2rem",
        }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function SkillBar({ skill, index, visible }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateX(-20px)",
        transition: `all 0.5s ${index * 0.07}s ease`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.45rem" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: TEXT_MAIN }}>{skill.label}</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: ACCENT }}>{skill.pct}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(17,24,39,0.08)", borderRadius: 2, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            borderRadius: 2,
            background: ACCENT,
            width: visible ? skill.pct + "%" : "0%",
            transition: `width 1s ${0.3 + index * 0.07}s cubic-bezier(0.4,0,0.2,1)`,
            boxShadow: `0 0 10px ${ACCENT}33`,
          }}
        />
      </div>
    </div>
  );
}

function SkillsSection() {
  const [ref, visible] = useInView();
  const [headRef, headVisible] = useInView();

  return (
    <section
      id="skills"
      style={{
        padding: "8rem 2.5rem",
        background: "rgba(17,24,39,0.02)",
        borderTop: "1px solid rgba(17,24,39,0.06)",
        borderBottom: "1px solid rgba(17,24,39,0.06)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          ref={headRef}
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "none" : "translateY(40px)",
            transition: "all 0.7s ease",
            marginBottom: "4rem",
          }}
        >
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: ACCENT, letterSpacing: "0.15em", marginBottom: "0.8rem" }}>03 / EXPERTISE</div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: TEXT_MAIN,
              margin: 0,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Skills &amp;
            <br />
            <span style={{ color: ACCENT }}>
              Technologies
            </span>
          </h2>
        </div>

        <div className="skillsGrid" ref={ref}>
          {SKILLS.map((s, i) => (
            <SkillBar key={s.label} skill={s} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneyCard({ item, align }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(37,99,235,0.05)" : SURFACE_CARD,
        border: `1px solid ${hovered ? ACCENT : BORDER}`,
        borderRadius: "10px",
        padding: "1.6rem",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        textAlign: align,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: item.color,
          opacity: hovered ? 1 : 0.3,
          transition: "opacity 0.3s",
        }}
      />

      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.15em",
          color: ACCENT,
          textTransform: "uppercase",
          marginBottom: "0.6rem",
          opacity: 0.8,
        }}
      >
        {item.era}
      </div>

      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.25rem", color: TEXT_MAIN, lineHeight: 1.15, marginBottom: "0.25rem", letterSpacing: "-0.01em" }}>
        {item.role}
      </div>

      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.78rem", color: ACCENT, marginBottom: "0.9rem", letterSpacing: "0.04em" }}>
        @ {item.co}
      </div>

      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: TEXT_MUTED, lineHeight: 1.7, margin: "0 0 1rem" }}>{item.desc}</p>

      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
        {item.tags.map((t) => (
          <span key={t} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.05em", padding: "0.22rem 0.55rem", borderRadius: "3px", border: `1px solid ${ACCENT}30`, color: ACCENT, background: `${ACCENT}0a` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function JourneyItem({ item, index }) {
  const [ref, visible] = useInView(0.25);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="journeyRow">
      <div
        className="journeyCol journeyLeft"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateX(-50px)",
          transition: `all 0.7s ${index * 0.05}s cubic-bezier(0.22,1,0.36,1)`,
        }}
      >
        {isEven && <JourneyCard item={item} align="right" />}
      </div>

      <div className="journeySpine">
        <div
          style={{
            width: 1,
            flex: index === 0 ? "0 0 40px" : "1 1 0",
            minHeight: index === 0 ? 40 : 0,
            background: index === 0 ? "transparent" : "rgba(17,24,39,0.12)",
            transition: `opacity 0.5s ${index * 0.1}s ease`,
            opacity: visible ? 1 : 0,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.5)",
            transition: `all 0.5s ${index * 0.07 + 0.1}s cubic-bezier(0.34,1.56,0.64,1)`,
          }}
        >
          <div style={{ width: item.current ? 44 : 36, height: item.current ? 44 : 36, borderRadius: "50%", background: item.current ? ACCENT : SURFACE_CARD, border: `2px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 ${item.current ? 20 : 10}px ${ACCENT}44`, fontSize: item.current ? "1.1rem" : "0.85rem", color: item.current ? TEXT_ON_ACCENT : ACCENT, position: "relative", zIndex: 2 }}>
            {item.current ? <span style={{ animation: "pulse 2s infinite" }}>{item.icon}</span> : item.icon}
          </div>
        </div>

        {index < JOURNEY.length - 1 && (
          <div
            style={{
              width: 1,
              flex: "1 1 0",
              minHeight: 60,
              background: ACCENT,
              opacity: visible ? 1 : 0,
              transition: `opacity 0.5s ${index * 0.1 + 0.3}s ease`,
            }}
          />
        )}
      </div>

      <div
        className="journeyCol journeyRight"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateX(50px)",
          transition: `all 0.7s ${index * 0.05}s cubic-bezier(0.22,1,0.36,1)`,
        }}
      >
        {!isEven && <JourneyCard item={item} align="left" />}
      </div>
    </div>
  );
}

function AboutSection() {
  const [headRef, headVisible] = useInView();

  return (
    <section id="about" style={{ padding: "8rem 0", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: "rgba(17,24,39,0.02)",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2.5rem", position: "relative", zIndex: 1 }}>
        <div
          ref={headRef}
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "none" : "translateY(40px)",
            transition: "all 0.7s ease",
            textAlign: "center",
            marginBottom: "6rem",
          }}
        >
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: ACCENT, letterSpacing: "0.15em", marginBottom: "0.8rem" }}>04 / ABOUT ME</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: TEXT_MAIN, margin: "0 0 1rem", lineHeight: 0.92, letterSpacing: "-0.02em" }}>
            A Journey Through
            <br />
            <span style={{ color: ACCENT }}>Time & Code</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: TEXT_MUTED, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Personable, adaptable Software Engineer building responsive, high‑performance web applications and polished user experiences.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          {JOURNEY.map((item, i) => (
            <JourneyItem key={i} item={item} index={i} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <a
            href={RESUME_URL}
            download="Muhammad_Asim_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: ACCENT,
              textDecoration: "none",
              borderBottom: `1px solid ${ACCENT}40`,
              paddingBottom: "0.25rem",
              transition: "border-color 0.2s, letter-spacing 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = ACCENT;
              e.target.style.letterSpacing = "0.18em";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = `${ACCENT}40`;
              e.target.style.letterSpacing = "0.1em";
            }}
          >
            Download Full Resume →
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [ref, visible] = useInView();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const inputStyle = {
    width: "100%",
    background: SURFACE_CARD,
    border: `1px solid ${BORDER}`,
    borderRadius: "4px",
    padding: "0.85rem 1rem",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.92rem",
    color: TEXT_MAIN,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" style={{ padding: "8rem 2.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }} ref={ref}>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(50px)", transition: "all 0.7s ease" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: ACCENT, letterSpacing: "0.15em", marginBottom: "0.8rem" }}>05 / GET IN TOUCH</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: TEXT_MAIN, margin: "0 0 1rem", lineHeight: 0.92, letterSpacing: "-0.02em" }}>
            Let's Build
            <br />
            <span style={{ color: ACCENT }}>Something Great</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: TEXT_MUTED, marginBottom: "1.25rem", lineHeight: 1.7 }}>
            Have a project in mind or want to chat about opportunities? Drop me a message — I usually respond within 24 hours.
          </p>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: TEXT_MUTED, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Email: <span style={{ color: ACCENT }}>{CONTACT.email}</span>
          </p>
        </div>

        {!sent ? (
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)", transition: "all 0.7s 0.2s ease", textAlign: "left", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              <input placeholder="Your name" value={formState.name} onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))} style={inputStyle} onFocus={(e) => (e.target.style.borderColor = ACCENT)} onBlur={(e) => (e.target.style.borderColor = BORDER)} />
              <input placeholder="Email address" value={formState.email} onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))} style={inputStyle} onFocus={(e) => (e.target.style.borderColor = ACCENT)} onBlur={(e) => (e.target.style.borderColor = BORDER)} />
            </div>
            <textarea placeholder="Tell me about your project..." value={formState.message} onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))} rows={5} style={{ ...inputStyle, resize: "vertical" }} onFocus={(e) => (e.target.style.borderColor = ACCENT)} onBlur={(e) => (e.target.style.borderColor = BORDER)} />
            <button onClick={() => setSent(true)} style={{ alignSelf: "flex-start", fontFamily: "'Space Mono', monospace", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", background: ACCENT, color: TEXT_ON_ACCENT, border: "none", padding: "0.9rem 2.5rem", borderRadius: "4px", cursor: "none", fontWeight: 700, boxShadow: "0 0 20px rgba(37,99,235,0.18)", transition: "box-shadow 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 28px rgba(37,99,235,0.24)")} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 20px rgba(37,99,235,0.18)")}>
              Send Message →
            </button>
          </div>
        ) : (
          <div style={{ padding: "3rem", border: `1px solid ${ACCENT}30`, borderRadius: "8px", background: "rgba(37,99,235,0.05)", animation: "fadeSlideUp 0.5s ease both" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>✦</div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: ACCENT, margin: "0 0 0.5rem" }}>Message sent!</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: TEXT_MUTED, margin: 0 }}>Thanks for reaching out. I'll get back to you soon.</p>
          </div>
        )}

        <div style={{ marginTop: "3.5rem", paddingTop: "3rem", borderTop: "1px solid rgba(17,24,39,0.08)", display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", opacity: visible ? 1 : 0, transition: "opacity 0.7s 0.4s ease" }}>
          {[
            { label: "LinkedIn", href: CONTACT.linkedin, external: true },
            { label: "Instagram", href: "https://www.instagram.com/muhammadasim.__/", external: true },
            { label: "Call", href: "tel:" + CONTACT.phone.replace(/\s+/g, ""), external: false },
          ].map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", color: TEXT_MUTED, textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.target.style.color = ACCENT)}
              onMouseLeave={(e) => (e.target.style.color = TEXT_MUTED)}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "2rem 2.5rem", borderTop: "1px solid rgba(17,24,39,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", background: SURFACE }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: TEXT_MUTED, letterSpacing: "0.08em" }}>© MUHAMMAD ASIM — DESIGNED &amp; BUILT WITH ✦</span>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: TEXT_MUTED, letterSpacing: "0.08em" }}>REACT · NEXT.JS · TYPESCRIPT</span>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; cursor: none; }
        html, body { max-width: 100%; overflow-x: hidden; }
        body { background: #f8fafc; color: #111827; }
        ::selection { background: rgba(37,99,235,0.2); color: #111827; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: rgba(37,99,235,0.35); border-radius: 2px; }

        a, button { -webkit-tap-highlight-color: transparent; }
        button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible {
          outline: 2px solid rgba(37,99,235,0.55);
          outline-offset: 3px;
        }

        .heroGrid{
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 4rem;
          align-items: center;
          min-width: 0;
        }
        .heroGrid > * { min-width: 0; }
        .heroRight { padding: 0; }

        .skillsGrid{
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem 5rem;
        }

        .journeyRow{
          display: grid;
          grid-template-columns: 1fr 80px 1fr;
          align-items: start;
        }
        .journeyCol{ padding-bottom: 4rem; }
        .journeyLeft{ padding: 0 3rem 0 0; text-align: right; }
        .journeyRight{ padding: 0 0 0 3rem; }
        .journeySpine{ display: flex; flex-direction: column; align-items: center; }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }
        }

        @media (hover: none), (pointer: coarse) {
          html { cursor: auto; }
          button { cursor: pointer; }
        }

        @media (max-width: 980px) {
          .heroGrid{ grid-template-columns: 1fr; gap: 3rem; }
        }

        @media (max-width: 860px) {
          .journeyRow{ grid-template-columns: 1fr; gap: 1.25rem; }
          .journeySpine{ display: none; }
          .journeyLeft, .journeyRight{ padding: 0 0 2rem; text-align: left; }
        }

        @media (max-width: 768px) {
          nav { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          section { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          .skillsGrid{ grid-template-columns: 1fr; gap: 2rem; }
          .navLinks { display: none !important; }
          .navToggle { display: inline-flex !important; align-items: center; justify-content: center; }
          .availabilityBadge { display: none !important; }
          .heroSection { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
        }

        @media (max-width: 420px) {
          nav { padding-top: 1rem !important; padding-bottom: 1rem !important; }
          .heroH1 {
            font-size: 9.0vw !important;
            letter-spacing: -0.055em !important;
            word-break: keep-all;
            max-width: 100%;
          }
          .heroH1Primary { margin-bottom: 0.2rem !important; }
        }

        @media (max-width: 360px) {
          .heroH1 {
            font-size: 8.9vw !important;
          }
        }

        @media (max-width: 320px) {
          .heroH1 {
            font-size: 8.6vw !important;
          }
        }

        @keyframes cardRingPulse {
          0%,100%{opacity:0.6;transform:scale(1)}
          50%{opacity:1;transform:scale(1.015)}
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,0.25)}
          50%{box-shadow:0 0 0 6px rgba(37,99,235,0)}
        }
      `}</style>

      <CustomCursor />
      <Nav />

      <main>
        <Hero />
        <WorkSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

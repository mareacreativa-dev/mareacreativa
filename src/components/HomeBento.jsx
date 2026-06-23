import "./HomeBento.css";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

/* ── Animated counter ─────────────────────────────────────── */
function Counter({ value, prefix = "", suffix = "", isInView }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  useEffect(() => {
    if (isInView) {
      const c = animate(count, value, { duration: 1.6, delay: 0.4, ease: "easeOut" });
      return c.stop;
    }
  }, [isInView]);
  return (
    <span>{prefix}<motion.span>{rounded}</motion.span>{suffix}</span>
  );
}

/* ── Card entrance ────────────────────────────────────────── */
const card = (delay = 0) => ({
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
});

/* ── Icons ────────────────────────────────────────────────── */
const IconAI = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    <path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/>
  </svg>
);
const IconSoftware = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="8" x="5" y="2" rx="2"/>
    <rect width="20" height="8" x="2" y="14" rx="2"/>
    <path d="M6 18h.01M10 18h.01"/>
  </svg>
);
const IconAutom = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="8" x="3" y="3" rx="2"/>
    <path d="M7 11v4a2 2 0 0 0 2 2h4"/>
    <rect width="8" height="8" x="13" y="13" rx="2"/>
  </svg>
);
const IconArrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

/* ── Images from portfolio ───────────────────────────────── */
const IMG_SOFTWARE = "https://res.cloudinary.com/dgkdq8kzk/image/upload/v1771929812/rebranding_al9jxt.webp";
const IMG_AUTOM    = "https://res.cloudinary.com/dgkdq8kzk/image/upload/v1771948015/Gemini_Generated_Image_rpyoearpyoearpyo_pivghj.webp";

const statNum = {
  fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
  fontWeight: 800,
  lineHeight: 1,
  letterSpacing: "-0.04em",
  margin: 0,
};

/* ────────────────────────────────────────────────────────── */
export default function HomeBento() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ padding: "5rem 1.25rem", backgroundColor: "#fafafa" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "2rem" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", borderRadius: "9999px", padding: "5px 14px", marginBottom: "12px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", background: "rgba(14,68,249,0.06)", border: "1px solid rgba(14,68,249,0.15)", color: "#0e44f9" }}>
            Lo que hacemos
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#070a1a", letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
            Tecnología real para empresas reales.
          </h2>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="bento-grid">

          {/* 1 · IA Feature */}
          <motion.a
            href="/agentes-ia"
            className="bento-ia bento-card-link"
            variants={card(0)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.015 }}
            style={{ background: "#070a1a", padding: "2rem", justifyContent: "space-between" }}
          >
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,68,249,0.22), transparent 65%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-12px", right: "8px", color: "white", opacity: 0.04, transform: "scale(5)", transformOrigin: "bottom right", pointerEvents: "none" }}>
              <IconAI />
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "50px", height: "50px", borderRadius: "14px", background: "rgba(14,68,249,0.18)", color: "#6b9fff", marginBottom: "1.1rem" }}>
                <IconAI />
              </div>
              <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#6b9fff", margin: "0 0 6px" }}>Inteligencia Artificial</p>
              <h3 style={{ fontSize: "clamp(1.15rem, 2vw, 1.4rem)", fontWeight: 700, color: "white", lineHeight: 1.2, margin: "0 0 8px" }}>IA entrenada para tu negocio</h3>
              <p style={{ fontSize: "0.83rem", color: "#8A94B8", lineHeight: 1.65, margin: 0, maxWidth: "340px" }}>Agentes que atienden clientes, analizan datos y toman decisiones dentro de tu operación — sin intervención humana.</p>
            </div>

            <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "6px", color: "#6b9fff", fontSize: "0.82rem", fontWeight: 600 }}>
              Saber más <IconArrow />
            </div>
          </motion.a>

          {/* 2 · Stat +40% */}
          <motion.div
            className="bento-stat1 bento-card"
            variants={card(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.02 }}
            style={{ background: "#0e44f9", padding: "2rem", justifyContent: "space-between" }}
          >
            <div style={{ position: "absolute", top: 0, right: 0, width: "100%", height: "100%", background: "radial-gradient(circle at 85% 10%, rgba(255,255,255,0.14), transparent 55%)", pointerEvents: "none" }} />
            {/* Top label */}
            <p style={{ position: "relative", zIndex: 1, fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(255,255,255,0.6)", margin: 0 }}>
              Impacto directo
            </p>
            {/* Bottom: big number */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ ...statNum, color: "white" }}>
                <Counter value={40} prefix="+" suffix="%" isInView={isInView} />
              </p>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", marginTop: "8px", fontWeight: 500 }}>más ventas en promedio</p>
            </div>
          </motion.div>

          {/* 3 · CTA (spans 2 rows on desktop) */}
          <motion.div
            className="bento-cta bento-card"
            variants={card(0.15)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ background: "#070a1a", padding: "2rem", justifyContent: "space-between" }}
          >
            <div style={{ position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)", width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,68,249,0.25), transparent 65%)", pointerEvents: "none" }} />

            {/* Top */}
            <p style={{ position: "relative", zIndex: 1, fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#6b9fff", margin: 0 }}>Sin compromiso</p>

            {/* Middle */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)", fontWeight: 800, color: "white", lineHeight: 1.15, margin: "0 0 10px" }}>¿Empezamos?</h3>
              <p style={{ fontSize: "0.85rem", color: "#8A94B8", lineHeight: 1.65, margin: 0 }}>30 min de auditoría gratuita. Te mostramos exactamente dónde la tecnología puede impactar tu facturación.</p>
            </div>

            {/* Bottom: CTA */}
            <motion.a
              href="/contacto"
              whileHover={{ scale: 1.04, backgroundColor: "#2a5bfa" }}
              whileTap={{ scale: 0.97 }}
              style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: "6px", background: "#0e44f9", color: "white", fontWeight: 600, fontSize: "0.88rem", padding: "11px 20px", borderRadius: "9999px", textDecoration: "none", boxShadow: "0 4px 20px rgba(14,68,249,0.4)", alignSelf: "flex-start" }}
            >
              Agendar cita <IconArrow />
            </motion.a>
          </motion.div>

          {/* 4 · Software a medida — bg image */}
          <motion.a
            href="/software-a-medida"
            className="bento-sw bento-card-link"
            variants={card(0.2)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.02 }}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(7,10,26,0.45) 0%, rgba(7,10,26,0.85) 100%), url(${IMG_SOFTWARE})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "1.75rem",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "12px", background: "rgba(14,68,249,0.3)", color: "#6b9fff", backdropFilter: "blur(4px)" }}>
              <IconSoftware />
            </div>
            <div>
              <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#6b9fff", margin: "0 0 5px" }}>Desarrollo</p>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "white", lineHeight: 1.2, margin: "0 0 8px" }}>Software a medida</h3>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>Herramientas internas, plataformas y apps diseñadas para tus procesos.</p>
            </div>
          </motion.a>

          {/* 5 · Automatización — bg image */}
          <motion.a
            href="/automatizacion-de-procesos"
            className="bento-auto bento-card-link"
            variants={card(0.25)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.015 }}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(14,68,249,0.3) 0%, rgba(7,10,26,0.88) 100%), url(${IMG_AUTOM})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "1.75rem",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "12px", background: "rgba(14,68,249,0.3)", color: "#6b9fff", backdropFilter: "blur(4px)" }}>
              <IconAutom />
            </div>
            <div>
              <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#6b9fff", margin: "0 0 5px" }}>Automatización</p>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "white", lineHeight: 1.2, margin: "0 0 8px" }}>Procesos sin trabajo manual</h3>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>Conectamos tus herramientas y eliminamos tareas repetitivas para que tu equipo se enfoque en lo importante.</p>
            </div>
          </motion.a>

          {/* 6 · Stat x3 productividad */}
          <motion.div
            className="bento-stat2 bento-card"
            variants={card(0.3)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.02 }}
            style={{ background: "white", border: "1px solid #e5e7eb", padding: "2rem", justifyContent: "space-between" }}
          >
            <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "#6b7280", margin: 0 }}>Productividad</p>
            <div>
              <p style={{ ...statNum, color: "#0e44f9" }}>
                <Counter value={3} prefix="x" suffix="" isInView={isInView} />
              </p>
              <p style={{ fontSize: "0.82rem", color: "#6b7280", marginTop: "8px", fontWeight: 500 }}>más productividad en tu equipo</p>
            </div>
          </motion.div>

          {/* 7 · Value statement */}
          <motion.div
            className="bento-val bento-card"
            variants={card(0.35)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ background: "#070a1a", padding: "2rem 2.5rem", justifyContent: "center" }}
          >
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 50%, rgba(14,68,249,0.18), transparent 55%)", pointerEvents: "none" }} />
            <p style={{ position: "relative", zIndex: 1, fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: "white", lineHeight: 1.2, margin: 0, letterSpacing: "-0.03em" }}>
              Tecnología que{" "}
              <span style={{ color: "#6b9fff" }}>trabaja por ti.</span>
            </p>
            <p style={{ position: "relative", zIndex: 1, fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "#8A94B8", margin: "10px 0 0", lineHeight: 1.65 }}>
              Implementamos y desarrollamos tecnología que se adapta a tus necesidades.
            </p>
          </motion.div>

          {/* 8 · Escalable */}
          <motion.div
            className="bento-stat3 bento-card"
            variants={card(0.4)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.02 }}
            style={{ background: "linear-gradient(135deg, #0e44f9 0%, #052ba8 100%)", padding: "2rem", justifyContent: "space-between" }}
          >
            <div style={{ position: "absolute", top: 0, right: 0, width: "100%", height: "100%", background: "radial-gradient(circle at 80% 10%, rgba(255,255,255,0.12), transparent 55%)", pointerEvents: "none" }} />
            <p style={{ position: "relative", zIndex: 1, fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(255,255,255,0.6)", margin: 0 }}>Crecimiento</p>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.65rem)", fontWeight: 800, color: "white", lineHeight: 1.2, letterSpacing: "-0.02em", margin: 0 }}>
                Escala sin límites
              </p>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.72)", marginTop: "8px", fontWeight: 500, lineHeight: 1.5 }}>Crece sin contratar más para las tareas repetitivas.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

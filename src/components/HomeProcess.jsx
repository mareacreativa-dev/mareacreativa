import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Diagnóstico gratuito",
    desc: "Analizamos tu operación y detectamos exactamente dónde la tecnología puede generar más impacto en tu facturación.",
  },
  {
    num: "02",
    title: "Hoja de ruta",
    desc: "Diseñamos la solución y priorizamos por retorno: qué implementamos primero y por qué genera más valor.",
  },
  {
    num: "03",
    title: "Implementación",
    desc: "Construimos y desplegamos con tu equipo en sprints cortos. Resultados visibles desde el primer mes.",
  },
  {
    num: "04",
    title: "Optimización y soporte",
    desc: "Medimos, ajustamos y acompañamos para que la solución siga creciendo contigo.",
  },
];

export default function HomeProcess() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "#070a1a",
        overflow: "hidden",
        padding: "6rem 2rem",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "500px",
          height: "400px",
          pointerEvents: "none",
          background:
            "radial-gradient(circle at top right, rgba(14,68,249,0.15), transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)",
        }}
      />

      <div
        ref={ref}
        style={{ position: "relative", zIndex: 10, maxWidth: "72rem", margin: "0 auto" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "4rem", maxWidth: "28rem" }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              marginBottom: "1rem",
              color: "#0E44F9",
            }}
          >
            Cómo funciona
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            De la idea al resultado en cuatro pasos
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            position: "relative",
          }}
        >
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: "30px",
              left: "calc(7% + 30px)",
              right: "calc(7% + 30px)",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(14,68,249,0.4), rgba(14,68,249,0.4), transparent)",
              transformOrigin: "left",
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.25 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ position: "relative", zIndex: 10 }}
            >
              {/* Circle */}
              <motion.div
                whileHover={{
                  scale: 1.12,
                  boxShadow: "0 0 36px rgba(14,68,249,0.5)",
                }}
                transition={{ duration: 0.25 }}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  background: "#0a0e1f",
                  border: "1px solid rgba(14,68,249,0.5)",
                  boxShadow: "0 0 22px rgba(14,68,249,0.2)",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#0E44F9",
                  fontFamily: "'Space Grotesk', sans-serif",
                  cursor: "default",
                }}
              >
                {step.num}
              </motion.div>

              <h3
                style={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  marginBottom: "0.75rem",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "#8A94B8",
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

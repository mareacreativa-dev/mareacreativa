import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    tag: "Desarrollo",
    title: "Software a medida",
    description:
      "Construimos las herramientas internas, plataformas y aplicaciones que tu empresa necesita — diseñadas exactamente para tus procesos. Sin soluciones genéricas que no encajan.",
    href: "/software-a-medida",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="8" x="5" y="2" rx="2"/>
        <rect width="20" height="8" x="2" y="14" rx="2"/>
        <path d="M6 18h.01M10 18h.01"/>
      </svg>
    ),
  },
  {
    tag: "Inteligencia Artificial",
    title: "IA específica para tu negocio",
    description:
      "Implementamos inteligencia artificial entrenada con el conocimiento real de tu empresa: agentes que atienden clientes, analizan datos y toman decisiones dentro de tu operación.",
    href: "/agentes-ia",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
        <path d="M20 3v4"/><path d="M22 5h-4"/>
        <path d="M4 17v2"/><path d="M5 18H3"/>
      </svg>
    ),
  },
  {
    tag: "Automatización",
    title: "Automatización de procesos",
    description:
      "Conectamos tus herramientas y eliminamos el trabajo repetitivo: seguimientos, notificaciones, reportes, integraciones. Tu equipo deja de hacer lo que una máquina puede hacer mejor.",
    href: "/automatizacion-de-procesos",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="8" height="8" x="3" y="3" rx="2"/>
        <path d="M7 11v4a2 2 0 0 0 2 2h4"/>
        <rect width="8" height="8" x="13" y="13" rx="2"/>
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HomePillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section style={{ padding: "6rem 0", backgroundColor: "white" }}>
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "40rem", margin: "0 auto 4rem" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "9999px",
              padding: "6px 16px",
              marginBottom: "1.5rem",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              background: "rgba(14,68,249,0.06)",
              border: "1px solid rgba(14,68,249,0.15)",
              color: "#0e44f9",
            }}
          >
            Lo que implementamos
          </div>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#070a1a",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Tres soluciones.{" "}
            <span style={{ color: "#0e44f9" }}>
              Un objetivo: que tu empresa crezca.
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
        >
          {pillars.map((pillar, i) => (
            <motion.a
              key={i}
              href={pillar.href}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 48px rgba(14,68,249,0.12)",
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#f8f9fb",
                border: "1px solid #e5e7eb",
                borderRadius: "28px",
                padding: "2rem",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  color: "#0e44f9",
                  background: "rgba(14,68,249,0.08)",
                  flexShrink: 0,
                }}
              >
                {pillar.icon}
              </motion.div>

              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "#0e44f9",
                  marginBottom: "8px",
                }}
              >
                {pillar.tag}
              </p>

              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#070a1a",
                  marginBottom: "0.75rem",
                  lineHeight: 1.25,
                }}
              >
                {pillar.title}
              </h3>

              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {pillar.description}
              </p>

              <div
                style={{
                  marginTop: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#0e44f9",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                Saber más
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Value statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            borderRadius: "28px",
            overflow: "hidden",
            background: "#070a1a",
            padding: "2.5rem 4rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 120%, rgba(14,68,249,0.25), transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <p
            style={{
              position: "relative",
              zIndex: 1,
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.4,
            }}
          >
            El resultado: tu empresa solo se ocupa de{" "}
            <span style={{ color: "#6b9fff" }}>
              su producto o servicio.
            </span>
          </p>
          <p
            style={{
              position: "relative",
              zIndex: 1,
              marginTop: "0.75rem",
              fontSize: "0.875rem",
              color: "#8A94B8",
              maxWidth: "32rem",
              margin: "0.75rem auto 0",
            }}
          >
            La tecnología trabaja por vos. Nosotros la implementamos, la
            mantenemos y la mejoramos contigo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const IMG_BG =
  "https://res.cloudinary.com/dgkdq8kzk/image/upload/v1771944530/home_hero_1_t0rla7.webp";
const HIGHLIGHTED = "crezca sin límites";

export default function HomeHero({
  title = "Implementamos tecnología para que tu empresa crezca sin límites",
  subtitle = "Software a medida, inteligencia artificial específica para tu negocio y automatización de procesos — para que vos te enfoques en lo que mejor hacés.",
  ctaText = "Habla con nosotros",
  ctaLink = "/contacto",
  badge = "Tecnología e IA para Empresas",
}) {
  const mainTitle = title.replace(HIGHLIGHTED, "").trim();

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#070a1a",
      }}
    >
      {/* Background image — diffuse */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src={IMG_BG}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.14,
            filter: "blur(6px)",
            transform: "scale(1.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% -10%, rgba(14,68,249,0.22) 0%, transparent 55%), linear-gradient(to bottom, rgba(7,10,26,0.25) 0%, rgba(7,10,26,0.65) 55%, #070a1a 100%)",
          }}
        />
      </div>

      {/* Ambient blue glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "320px",
          background:
            "radial-gradient(ellipse at top, rgba(14,68,249,0.20), transparent 65%)",
          filter: "blur(48px)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "56rem",
          margin: "0 auto",
          padding: "7rem 1.5rem",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        {badge && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              borderRadius: "9999px",
              padding: "8px 20px",
              marginBottom: "2.5rem",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#0e44f9",
                flexShrink: 0,
              }}
            />
            {badge}
          </motion.div>
        )}

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          style={{
            fontWeight: 800,
            color: "white",
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            marginBottom: "1.75rem",
            fontSize: "clamp(2.6rem, 7vw, 4.5rem)",
          }}
        >
          {mainTitle}
          <br />
          <span style={{ color: "#0e44f9" }}>{HIGHLIGHTED}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          style={{
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)",
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            maxWidth: "520px",
          }}
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <motion.a
            href={ctaLink}
            whileHover={{ scale: 1.04, backgroundColor: "#2a5bfa" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "14px 28px",
              borderRadius: "9999px",
              backgroundColor: "#0e44f9",
              boxShadow: "0 4px 24px rgba(14,68,249,0.35)",
              textDecoration: "none",
            }}
          >
            {ctaText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </motion.a>

          <motion.a
            href="/servicios"
            whileHover={{
              scale: 1.04,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "14px 28px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              textDecoration: "none",
            }}
          >
            Ver servicios
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
  { raw: 40, prefix: "+", suffix: "%", label: "más ventas en promedio" },
  { raw: 65, prefix: "-", suffix: "%", label: "tareas manuales eliminadas" },
  { raw: 4, prefix: "", suffix: " sem.", label: "a la primera solución" },
];

function AnimatedNumber({ raw, prefix, suffix, isInView }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef(null);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, raw, {
        duration: 1.6,
        delay: 0.3,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView]);

  return (
    <span>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function HomeStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        backgroundColor: "#070a1a",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "160px",
          background:
            "radial-gradient(ellipse at center, rgba(14,68,249,0.18), transparent 65%)",
          filter: "blur(28px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "56rem",
          margin: "0 auto",
          padding: "2.5rem 1.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {stats.map((stat, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ textAlign: "center", padding: "0.5rem 2.5rem" }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: "white",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.75rem, 4vw, 2.375rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                <AnimatedNumber {...stat} isInView={isInView} />
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  color: "#8A94B8",
                }}
              >
                {stat.label}
              </div>
            </motion.div>

            {i < stats.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{
                  width: "1px",
                  height: "40px",
                  background: "rgba(255,255,255,0.10)",
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

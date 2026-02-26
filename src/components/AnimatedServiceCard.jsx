import { motion } from "framer-motion";
import {
  Laptop,
  Cpu,
  MessageSquare,
  Workflow,
  Phone,
  Headset,
} from "lucide-react";

// Map icon names to lucide components
const IconMap = {
  Laptop,
  Cpu,
  MessageSquare,
  Workflow,
  Phone,
  Headset,
};

export default function AnimatedServiceCard({
  title,
  description,
  image,
  index,
  variant = "image", // "image" | "icon"
  iconName = "Laptop",
  className = "",
  imageClassName = "object-cover object-top",
  href = "",
}) {
  const IconProps = { size: 84, strokeWidth: 1 };
  const TopIconProps = { size: 34, strokeWidth: 1.5 };
  const FinalIcon = IconMap[iconName] || Laptop;
  const MotionComponent = href ? motion.a : motion.div;

  if (variant === "image") {
    // Apple style image card (full width image behind text, or image taking up most space)
    return (
      <MotionComponent
        href={href}
        draggable={false}
        className={`group relative overflow-hidden rounded-[24px] bg-gray-50 flex flex-col shadow-sm border border-gray-100 hover:shadow-xl transition-shadow ${className} ${href ? "cursor-pointer block" : ""}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute inset-0 z-0">
          <motion.img
            src={image}
            alt={title}
            draggable={false}
            className={`w-full h-full ${imageClassName}`}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Subtle gradient to ensure text legibility */}
          <div className="absolute inset-x-0 top-0 h-[65%] bg-gradient-to-b from-black/90 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 p-5 pt-6 flex flex-col h-full text-white">
          <div className="mb-2 text-xs font-bold tracking-widest uppercase text-white/80">
            Marea Creativa
          </div>
          <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
          <p className="text-white/90 font-medium text-sm max-w-[95%] leading-relaxed">
            {description}
          </p>
        </div>
      </MotionComponent>
    );
  }

  // Apple style Icon/Clean card
  return (
    <MotionComponent
      href={href}
      draggable={false}
      className={`group relative overflow-hidden rounded-[24px] bg-white shadow-sm border border-gray-100 hover:shadow-xl transition-shadow flex flex-col ${className}  ${href ? "cursor-pointer block" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-5 relative z-10">
        <div className="mb-4 text-[#1c55ff]">
          <FinalIcon {...TopIconProps} />
        </div>
        <h3 className="text-lg font-bold mb-3 text-gray-900 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-500 font-medium text-xs leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex-grow relative flex items-end justify-center pb-6 opacity-20 text-[#1c55ff] overflow-hidden">
        {/* Large decorative icon at the bottom */}
        <motion.div
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group-hover:scale-110 group-hover:opacity-40 transition-all duration-500 ease-out"
        >
          <FinalIcon {...IconProps} />
        </motion.div>
      </div>
    </MotionComponent>
  );
}

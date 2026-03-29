"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
}

/**
 * A smooth entry wrapper for page sections.
 * Uses 'motion' to fade and slide sections into view as the user scrolls.
 */
export const SectionWrapper = ({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 0.8,
}: SectionWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getOffset = () => {
    switch (direction) {
      case "up": return { y: distance };
      case "down": return { y: -distance };
      case "left": return { x: distance };
      case "right": return { x: -distance };
      default: return {};
    }
  };

  return (
    <motion.section
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...getOffset() 
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : {}}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom premium cubic-bezier
      }}
      className={cn("w-full relative py-16 md:py-24", className)}
    >
      {children}
    </motion.section>
  );
};

"use client";

import { motion } from "framer-motion";
import { revealUp } from "@/lib/motion";

export default function RevealUp({
  children,
  className,
  delay = 0,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const MotionTag = motion[As as "div"] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={revealUp}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

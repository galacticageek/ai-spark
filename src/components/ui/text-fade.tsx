"use client";

import { motion } from "framer-motion";

export const TextFade = ({
  textContent,
  className,
}: {
  textContent: string;
  className?: string;
}) => {
  const words = textContent.split(" ");

  return (
    <motion.span
      className={`inline-block ${className || ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
        hidden: {},
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
            visible: { 
                opacity: 1, 
                y: 0, 
                filter: "blur(0px)",
                transition: { duration: 0.4, ease: "easeOut" }
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

import { motion } from "framer-motion";

export default function Circle() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = i * 0;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      initial="hidden"
      animate="visible"
      className="w-full h-full"
    >
      <motion.circle
        cx="100"
        cy="100"
        r="85"
        stroke="#fff"
        variants={draw}
        custom={1}
        style={{
          strokeWidth: 10,
          strokeLinecap: "round",
          fill: "transparent",
        }}
      />
    </motion.svg>
  );
}

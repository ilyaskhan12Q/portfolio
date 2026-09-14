import { motion } from 'framer-motion';

export default function BlurReveal({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 20,
  blur = 6,
  className = '',
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        filter: `blur(${blur}px)`,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

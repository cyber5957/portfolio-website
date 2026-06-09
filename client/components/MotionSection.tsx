'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

export function MotionSection({ children, className = '', delay = 0, id }: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
    >
      {children}
    </motion.section>
  );
}

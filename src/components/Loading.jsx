import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Loading.css';

const Loading = () => {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-content">
        <motion.div
          className="loading-moon"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg className="moon-svg" viewBox="0 0 100 100">
            <defs>
              <filter id="moon-glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <motion.path
              d="M50 10 A40 40 0 1 1 50 90 A30 30 0 1 0 50 10"
              fill="#FFD166"
              filter="url(#moon-glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </motion.div>

        <motion.h2
          className="loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Eid Mubarak
        </motion.h2>

        <div className="loading-dots">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="dot"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>

      <div className="loading-particles">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="particle-loading"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 1,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Loading;

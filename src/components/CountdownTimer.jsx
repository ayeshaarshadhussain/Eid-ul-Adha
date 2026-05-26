import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/CountdownTimer.css';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // 🌙 Eid date (you can change anytime)
     const eidDate = new Date('2026-05-27T06:00:00');
      const now = new Date();

      const difference = eidDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBoxes = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="countdown-section" id="countdown">
      <motion.div
        className="countdown-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* TITLE */}
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Countdown to Eid Prayer 🌙
        </motion.h2>

        {/* SUBTITLE */}
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          The blessed moment is getting closer ✨
        </motion.p>

        {/* TIMER BOXES */}
        <div className="countdown-wrapper">
          <div className="countdown-grid">
            {timeBoxes.map((box, index) => (
              <motion.div
                key={box.label}
                className="time-box glass-card"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="time-value">
                  {String(box.value).padStart(2, '0')}
                </span>
                <span className="time-label">{box.label}</span>
              </motion.div>
            ))}
          </div>

          {/* DECORATION */}
          <div className="countdown-decoration">
            <motion.div
              className="decoration-symbol"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              ✦
            </motion.div>
          </div>
        </div>

        {/* PRAYER INFO */}
        <motion.div
          className="prayer-info"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="prayer-text">
            ☪ Join the blessed Eid-ul-Adha prayer ☪
          </p>

          <p className="prayer-time">
            May 27, 2026 - After Fajr Prayer
          </p>
        </motion.div>
      </motion.div>

      {/* BACKGROUND EFFECTS */}
      <div className="ambient-light light-1"></div>
      <div className="ambient-light light-2"></div>
    </section>
  );
};

export default CountdownTimer;
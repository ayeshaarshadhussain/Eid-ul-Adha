import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import '../styles/EidWishes.css';

const wishes = [
  {
    id: 1,
    arabic: 'تقبل الله منا ومنكم',
    translation: 'May Allah accept from us and from you',
    caption: 'May your sacrifice be accepted and your prayers answered.',
  },
  {
    id: 2,
    arabic: 'كل عام وأنتم بخير',
    translation: 'May you be well every year',
    caption: 'Wishing you a blessed Eid filled with peace and joy.',
  },
  {
    id: 3,
    arabic: 'عيد سعيد وبركات',
    translation: 'Happy Eid and blessings',
    caption: 'May the spirit of Eid bring happiness to your heart and home.',
  },
  {
    id: 4,
    arabic: 'اللهم صل على محمد',
    translation: 'O Allah, send blessings upon Muhammad',
    caption: 'On this blessed day, may your faith be renewed and your heart filled with gratitude.',
  },
  {
    id: 5,
    arabic: 'بارك الله فيكم',
    translation: 'May Allah bless you',
    caption: 'May Allah shower His countless blessings upon you and your family.',
  },
  {
    id: 6,
    arabic: 'رمضان كريم وأدعية مستجابة',
    translation: 'Generous Ramadan and answered prayers',
    caption: 'May this Eid bring you closer to your loved ones and to Allah.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const EidWishes = () => {
  return (
    <section className="wishes-section" id="wishes">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="title-icon"><FaStar /></span>
        Eid Wishes & Blessings
        <span className="title-icon"><FaStar /></span>
      </motion.h2>

      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Share these beautiful blessings with your loved ones
      </motion.p>

      <motion.div
        className="wishes-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {wishes.map((wish) => (
          <motion.div
            key={wish.id}
            className="wish-card glass-card"
            variants={cardVariants}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
          >
            <div className="card-decoration">
              <FaQuoteLeft className="quote-icon" />
            </div>

            <div className="wish-content">
              <motion.h3
                className="wish-arabic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {wish.arabic}
              </motion.h3>

              <p className="wish-translation">{wish.translation}</p>

              <div className="wish-divider">
                <span className="divider-line"></span>
                <span className="divider-star">✦</span>
                <span className="divider-line"></span>
              </div>

              <p className="wish-caption">{wish.caption}</p>
            </div>

            <div className="card-glow"></div>
          </motion.div>
        ))}
      </motion.div>

      <div className="decorative-pattern"></div>
    </section>
  );
};

export default EidWishes;

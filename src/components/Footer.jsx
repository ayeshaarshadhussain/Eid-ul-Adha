import React from 'react';
import { motion } from 'framer-motion';
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaHeart,
  FaMoon,
} from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  const socialLinks = [
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-brand">
            <motion.div
              className="footer-logo"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              <FaMoon />
            </motion.div>
            <h3 className="footer-title">Eid-ul-Adha Mubarak</h3>
            <p className="footer-tagline">
              May Allah accept your sacrifices and bless you abundantly
            </p>
          </div>

          <div className="footer-divider">
            <span className="divider-icon">✦</span>
          </div>

          <div className="footer-social">
            <p className="social-text">Connect with us</p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="social-btn"
                  aria-label={social.label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="footer-message">
            <FaHeart className="heart-icon" />
            <p>Made with love for the Muslim community</p>
          </div>

          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Eid Mubarak. All rights reserved.</p>
          </div>
        </motion.div>

        <div className="footer-decoration">
          <div className="moon-pattern"></div>
          <div className="star-pattern"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

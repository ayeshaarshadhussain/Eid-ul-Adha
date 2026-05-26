import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExpand, FaHeart } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/FamilyGallery.css';

const images = [
  {
    id: 1,
    url: 'https://i.pinimg.com/736x/9d/25/c7/9d25c7d59d63767efc57dfe8e91e4b12.jpg',
    caption: 'Family gathering during Eid prayer',
  },
  {
    id: 2,
    url: 'https://i.pinimg.com/1200x/4f/71/2e/4f712ebfe254b33eba0c8ca8747dd1aa.jpg',
    caption: 'Beautiful Eid celebration moments',
  },
  {
    id: 3,
    url: 'https://i.pinimg.com/736x/87/36/3b/87363b7b6027cd6321793b3385bc48d5.jpg',
    caption: 'Traditional Eid feast preparation',
  },
  {
    id: 4,
    url: 'https://i.pinimg.com/736x/c8/0d/31/c80d3168a35c20e0c7642f5097a6e417.jpg',
    caption: 'Eid gifts and celebrations',
  },
  {
    id: 5,
    url: 'https://i.pinimg.com/736x/f2/2a/65/f22a654d6d4c669d47cf0ff57b098337.jpg',
    caption: 'Morning prayers at the mosque',
  },
  {
    id: 6,
    url: 'https://i.pinimg.com/1200x/68/34/a9/6834a9305b2b91d7e90cec767f0b0c7a.jpg',
    caption: 'Spreading joy and blessings',
  },
];

const FamilyGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [likedImages, setLikedImages] = useState([]);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    const newIndex = (selectedIndex + 1) % images.length;
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const toggleLike = (id, e) => {
    e.stopPropagation();
    if (likedImages.includes(id)) {
      setLikedImages(likedImages.filter((imgId) => imgId !== id));
    } else {
      setLikedImages([...likedImages, id]);
    }
  };

  return (
    <section className="gallery-section" id="gallery">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Family Moments
      </motion.h2>

      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Cherished memories from our Eid celebrations
      </motion.p>

      <motion.div
        className="gallery-grid"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className="gallery-item"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            onClick={() => openModal(image, index)}
          >
            <div className="image-wrapper">
              <motion.img
                src={image.url}
                alt={image.caption}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="image-overlay">
                <motion.button
                  className="expand-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaExpand />
                </motion.button>
                <motion.button
                  className={`heart-btn ${likedImages.includes(image.id) ? 'liked' : ''}`}
                  onClick={(e) => toggleLike(image.id, e)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaHeart />
                </motion.button>
              </div>
            </div>
            <p className="image-caption">{image.caption}</p>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>

              <button className="nav-btn prev-btn" onClick={prevImage}>
                <FaChevronLeft />
              </button>

              <motion.img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="modal-image"
                layoutId={`image-${selectedImage.id}`}
              />

              <button className="nav-btn next-btn" onClick={nextImage}>
                <FaChevronRight />
              </button>

              <div className="modal-caption">
                <p>{selectedImage.caption}</p>
                <span className="image-counter">
                  {selectedIndex + 1} / {images.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="gallery-decoration"></div>
    </section>
  );
};

export default FamilyGallery;

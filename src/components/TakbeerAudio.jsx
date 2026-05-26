import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import '../styles/TakbeerAudio.css';
import takbeerAudio from './takbeer.mp3'; 

const TakbeerAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 0);
      };

      audio.addEventListener('loadedmetadata', updateProgress);
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', () => setIsPlaying(false));

      return () => {
        audio.removeEventListener('loadedmetadata', updateProgress);
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (audio && duration) {
      audio.currentTime = percent * duration;
      setCurrentTime(audio.currentTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className="takbeer-section" id="takbeer">
      <motion.div
        className="takbeer-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="takbeer-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="takbeer-arabic">ٱللَّٰهُ أَكْبَرُ</span>
          <span className="takbeer-translation">Takbeer al-Tashreeq</span>
        </motion.h2>

        <div className="audio-player glass-card">
          <audio
            ref={audioRef}
            src={takbeerAudio}
            preload="metadata"
          />

          <div className="audio-visual">
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  className="audio-wave"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(20)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="wave-bar"
                      animate={{
                        height: [10, 40, 10],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            className={`play-btn ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
            <div className="btn-glow"></div>
          </motion.button>

          <div className="progress-container" onClick={handleSeek}>
            <motion.div
              className="progress-bar"
              style={{
                width: duration ? `${(currentTime / duration) * 100}%` : '0%',
              }}
            />
            <motion.div
              className="progress-thumb"
              style={{
                left: duration ? `${(currentTime / duration) * 100}%` : '0%',
              }}
              whileHover={{ scale: 1.3 }}
            />
          </div>

          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <button className="mute-btn" onClick={toggleMute}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>

        <motion.p
          className="takbeer-caption"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Listen to the blessed Takbeer of Eid-ul-Adha
        </motion.p>
      </motion.div>

      <div className="ambient-glow"></div>
      <div className="ambient-glow glow-2"></div>
    </section>
  );
};

export default TakbeerAudio;

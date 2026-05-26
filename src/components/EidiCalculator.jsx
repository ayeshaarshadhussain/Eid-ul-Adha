import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaCalculator, FaGift } from 'react-icons/fa';
import '../styles/EidiCalculator.css';

const EidiCalculator = () => {
  const [totalAmount, setTotalAmount] = useState('');
  const [siblings, setSiblings] = useState([{ id: 1, name: 'Person 1' }]);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const addPerson = () => {
    const newId = siblings.length + 1;
    setSiblings([...siblings, { id: Date.now(), name: `Person ${newId}` }]);
  };

  const removePerson = (id) => {
    if (siblings.length > 1) {
      setSiblings(siblings.filter((s) => s.id !== id));
    }
  };

  const updateName = (id, name) => {
    setSiblings(
      siblings.map((s) => (s.id === id ? { ...s, name } : s))
    );
  };

  const calculateEidi = () => {
    if (!totalAmount || totalAmount <= 0 || siblings.length === 0) return;

    const amount = parseFloat(totalAmount);
    const share = amount / siblings.length;
    const formattedShare = share.toFixed(2);

    const newResults = siblings.map((sibling) => ({
      name: sibling.name,
      amount: formattedShare,
    }));

    setResults(newResults);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setTotalAmount('');
    setSiblings([{ id: 1, name: 'Person 1' }]);
    setResults([]);
    setShowResults(false);
  };

  return (
    <section className="eidi-section" id="eidi">
      <motion.div
        className="eidi-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <FaGift className="title-icon" />
          Eidi Calculator
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Calculate and share Eidi fairly among family members
        </motion.p>

        <div className="calculator-card glass-card">
          <div className="input-group">
            <label className="input-label">Total Eidi Amount</label>
            <div className="currency-input">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="Enter amount"
                className="amount-input"
                min="0"
              />
            </div>
          </div>

          <div className="people-section">
            <div className="people-header">
              <label className="input-label">Family Members ({siblings.length})</label>
              <motion.button
                className="add-btn"
                onClick={addPerson}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlus />
                <span>Add</span>
              </motion.button>
            </div>

            <div className="people-list">
              {siblings.map((sibling, index) => (
                <motion.div
                  key={sibling.id}
                  className="person-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <input
                    type="text"
                    value={sibling.name}
                    onChange={(e) => updateName(sibling.id, e.target.value)}
                    className="person-name-input"
                    placeholder="Enter name"
                  />
                  <motion.button
                    className={`remove-btn ${siblings.length === 1 ? 'disabled' : ''}`}
                    onClick={() => removePerson(sibling.id)}
                    disabled={siblings.length === 1}
                    whileHover={siblings.length > 1 ? { scale: 1.1 } : {}}
                    whileTap={siblings.length > 1 ? { scale: 0.9 } : {}}
                  >
                    <FaMinus />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <motion.button
              className="calculate-btn"
              onClick={calculateEidi}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!totalAmount}
            >
              <FaCalculator />
              Calculate Shares
            </motion.button>

            {showResults && (
              <motion.button
                className="reset-btn"
                onClick={resetCalculator}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Reset
              </motion.button>
            )}
          </div>

          <AnimatePresence>
            {showResults && results.length > 0 && (
              <motion.div
                className="results-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="results-header">
                  <h3>Share Distribution</h3>
                  <span className="per-person">Each person receives:</span>
                </div>

                <div className="results-grid">
                  {results.map((result, index) => (
                    <motion.div
                      key={index}
                      className="result-card"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="result-name">{result.name}</div>
                      <div className="result-amount">${result.amount}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="total-summary glass-card">
                  <span className="summary-label">Total Amount</span>
                  <span className="summary-value">${totalAmount}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="eidi-decoration">
        <div className="gift-icon">🎁</div>
      </div>
    </section>
  );
};

export default EidiCalculator;

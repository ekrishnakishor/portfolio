import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Controls.module.css';

const TerminalModal = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to the Krishnakishor Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for a list of available commands.' }
  ]);
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', text: `krish@portfolio:~$ ${input}` }];
      
      let response = '';
      switch (cmd) {
        case 'help':
          response = 'Available commands: whoami, skills, experience, clear';
          break;
        case 'whoami':
          response = 'Krishnakishor Eruvat - Frontend Developer specializing in React, building resilient and scalable web apps.';
          break;
        case 'skills':
          response = 'React, HTML5, CSS3, Vite, Node.js, Django, PostgreSQL, Figma, Responsive UI';
          break;
        case 'experience':
          response = 'Velociity Foundation (2022-Present), CYC IndieTech (2023-2024), Techis India (2021-2022)';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case '':
          break;
        default:
          response = `Command not found: ${cmd}. Type "help" for available commands.`;
      }

      if (response) {
        newHistory.push({ type: 'output', text: response });
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className={styles.terminalContainer} initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}>
        
        {/* Terminal Header */}
        <div className={styles.terminalHeader}>
          <div className={styles.terminalTitle}>
            <Terminal size={14} /> root@portfolio:~
          </div>
          <button onClick={onClose} className={styles.closeBtn}><X size={16} /></button>
        </div>

        {/* Terminal Body */}
        <div className={styles.terminalBody}>
          {history.map((line, i) => (
            <div key={i} className={line.type === 'input' ? styles.cmdInput : styles.cmdOutput}>
              {line.text}
            </div>
          ))}
          <div className={styles.inputRow}>
            <span className={styles.prompt}>krish@portfolio:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className={styles.terminalInput}
              autoFocus
              spellCheck="false"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TerminalModal;
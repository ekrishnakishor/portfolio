import React, { useState, useEffect } from 'react';
import { X, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Controls.module.css';

const CssEditorModal = ({ onClose }) => {
  // Pre-populate with a fun, hackable snippet targeting CSS variables
  const initialCss = `:root {
  --bg-primary: #1a1b3b;
  --bg-secondary: #2a2b4b;
  --accent-blue: #3b82f6;
}

/* Try changing the colors above! */
/* Example: change --bg-primary to #000000 */
`;

  const [cssCode, setCssCode] = useState(initialCss);

  // Inject the custom CSS into the document <head> dynamically
  useEffect(() => {
    let styleTag = document.getElementById('live-custom-css');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'live-custom-css';
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = cssCode;

    // Cleanup when modal unmounts (optional: remove cleanup if you want styles to persist after closing)
    return () => {
      styleTag.innerHTML = ''; 
    };
  }, [cssCode]);

  return (
    <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className={styles.editorContainer} initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}>
        
        {/* Editor Header */}
        <div className={styles.editorHeader}>
          <div className={styles.editorTitle}>
            <Settings size={14} /> Live CSS Editor
          </div>
          <button onClick={onClose} className={styles.closeBtn}><X size={16} /></button>
        </div>

        {/* Editor Body */}
        <div className={styles.editorBody}>
          <textarea
            value={cssCode}
            onChange={(e) => setCssCode(e.target.value)}
            className={styles.cssTextarea}
            spellCheck="false"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CssEditorModal;
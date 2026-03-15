import React from 'react';
import { useXRay } from '../../context/XRayContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2 } from 'lucide-react';
import styles from './XRay.module.css';

const XRayModal = () => {
  const { activeInfo, setActiveInfo } = useXRay();

  return (
    <AnimatePresence>
      {activeInfo && (
        <motion.div 
          className={styles.modalOverlay} 
          onClick={() => setActiveInfo(null)}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()} // Prevent clicking inside from closing it
            initial={{ scale: 0.95, y: 20 }} 
            animate={{ scale: 1, y: 0 }}
          >
            <button className={styles.closeBtn} onClick={() => setActiveInfo(null)}>
              <X size={20} />
            </button>
            
            <h3 className={styles.modalTitle}>
              <Code2 size={20} className={styles.modalIcon} /> 
              {activeInfo.title}
            </h3>
            
            <div className={styles.modalBody}>
              <h4 className={styles.sectionHeader}>Architecture & Purpose</h4>
              <p className={styles.modalDesc}>{activeInfo.description}</p>
              
              {activeInfo.snippet && (
                <>
                  <h4 className={styles.sectionHeader}>Implementation Snippet</h4>
                  <div className={styles.codeBlock}>
                    <code>{activeInfo.snippet}</code>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default XRayModal;
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Download, X, BookOpen } from "lucide-react"; // Added BookOpen
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
import NotesModal from "../Controls/NotesModal"; // Added NotesModal import
import styles from "./Shared.module.css";

const Navbar = ({ children, ip }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false); // Added state for Notes Modal
  const [formData, setFormData] = useState({ name: "", company: "" });
  const [isSending, setIsSending] = useState(false);

  // Toggle navigation based on current path
  const handleAvatarClick = () => {
    if (location.pathname === "/") {
      navigate("/about");
    } else {
      navigate("/");
    }
  };

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Ensure resume.pdf is in the public/ folder
    link.download = "Krishnakishor_Resume.pdf";
    link.click();
    alert("Download started. Thank you!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const templateParams = {
      name: formData.name,
      company: formData.company,
      ip: ip,
      time: new Date().toLocaleString(),
    };

    // Your actual EmailJS IDs
    const SERVICE_ID = 'service_2xtan57';
    const TEMPLATE_ID = 'template_uea63u9';
    const PUBLIC_KEY = 'niMes68dhAM6tWyNm';

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        console.log("Email sent successfully!");
        triggerDownload();
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        // Fallback: Let them download it even if the email gets blocked
        triggerDownload();
      })
      .finally(() => {
        setIsSending(false);
        setShowModal(false);
      });
  };

  return (
    <>
      <nav className={styles.navbar}>
        {/* Left: Avatar acts as a toggle now */}
        <div className={styles.navIcon} onClick={handleAvatarClick}>
          <div className={styles.avatarWrapper}>
            <User size={24} color="#fff" />
          </div>
        </div>

        {/* Center: Dynamic Content (Your Name or Tabs) */}
        <div className={styles.navCenter}>{children}</div>

        {/* Right: Resume & Notes Buttons Container */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          
          {/* THE NEW NOTES BUTTON */}
          <button
            onClick={() => setShowNotes(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: '#c9d1d9', border: '1px solid #30363d', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.1em' }}
          >
            <BookOpen size={16} />
            <span>NOTES</span>
          </button>

          <button
            className={styles.downloadBtn}
            onClick={() => setShowModal(true)}
          >
            <Download size={16} />
            <span>RESUME</span>
          </button>
        </div>
      </nav>

      {/* Download Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              <button
                className={styles.closeBtn}
                onClick={() => setShowModal(false)}
              >
                <X size={24} />
              </button>
              <h3 className={styles.modalTitle}>Access Portfolio Materials</h3>
              <p className={styles.modalDesc}>
                Please provide your details to unlock the PDF download.
              </p>
              
              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  required
                  placeholder="Your Name"
                  className={styles.input}
                  disabled={isSending}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  required
                  placeholder="Company Name"
                  className={styles.input}
                  disabled={isSending}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => setShowModal(false)}
                    disabled={isSending}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitBtn} disabled={isSending}>
                    {isSending ? 'Verifying...' : 'Download'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The New Notes Modal */}
      <AnimatePresence>
        {showNotes && <NotesModal onClose={() => setShowNotes(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
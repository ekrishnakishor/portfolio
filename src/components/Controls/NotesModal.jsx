import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, ChevronRight } from 'lucide-react';
import styles from './Controls.module.css';

const NotesModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Your Dev Diary Content
  const notesData = {
    overview: {
      title: "Project Overview",
      content: "The goal of this portfolio was to move beyond a static resume and build an interactive web application that demonstrates my frontend capabilities. It acts as a live sandbox, featuring global state management, framer-motion animations, and direct third-party API integrations (EmailJS, GitHub).",
    },
    ideation: {
      title: "Ideation & Design",
      content: "I wanted a dark, neon-themed 'hacker/developer' aesthetic. Instead of heavy image assets, I opted for CSS-driven glows, monospace typography, and interactive blueprint modes to keep the initial load blazing fast.",
    },
    challenges: {
      title: "Challenges Faced",
      content: "One major challenge was network-level ISP blocking of standard .vercel.app domains in my region. The solution involved registering a custom domain to bypass ISP DNS blocks, ensuring recruiters always have reliable access.",
    },
    navbar: {
      title: "Navbar & EmailJS",
      content: "Instead of a simple mailto link, I built a lead-capture gate for my resume download. It uses @emailjs/browser to send me a real-time notification with the recruiter's details before triggering the local PDF download.",
      snippet: "emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)\n  .then(() => triggerDownload());"
    },
    home: {
      title: "Home Page (X-Ray Mode)",
      content: "The Home page features a custom 'X-Ray Inspector'. By using the React Context API, I created a global toggle that turns my cursor into a crosshair, allowing users to click UI elements and reveal the exact CSS/React architecture behind them via a dynamic modal.",
      snippet: "const { isXRayOn, setActiveInfo } = useXRay();\n// Wraps components to intercept clicks"
    },
    about: {
      title: "About Page (Pagination)",
      content: "Managing multiple project lists required a clean UX. I implemented a horizontal pagination system that slices arrays based on the active tab state, combined with Framer Motion's AnimatePresence for smooth exit/enter transitions.",
      snippet: "const visibleItems = currentData.slice(\n  pageIndex * itemsPerPage, \n  (pageIndex + 1) * itemsPerPage\n);"
    },
    footer: {
      title: "Footer (Live GitHub Sync)",
      content: "To prove active development, the footer fetches my latest commit directly from the GitHub REST API. I implemented sessionStorage caching to prevent hitting GitHub's unauthenticated rate limits (60/hr) on multiple page loads.",
      snippet: "fetch('https://api.github.com/repos/USER/REPO/commits?per_page=1')"
    },
    future: {
      title: "Future Scope",
      content: "I plan to add a backend database (like Supabase or Firebase) to track real-time analytics, user locations, and perhaps a live terminal multiplayer feature using WebSockets.",
    },
    recommendations: {
      title: "Recommendations",
      content: "If you are evaluating this code, I recommend turning on the 'X-Ray Mode' from the System Controls on the Home page, and playing with the Live CSS Editor to see the DOM update in real-time.",
    }
  };

  const tabs = Object.keys(notesData);

  return (
    <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Modal Container */}
      <motion.div className={styles.notesContainer} initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}>
        
        {/* Header */}
        <div className={styles.notesHeader}>
          <div className={styles.notesTitle}>
            <BookOpen size={18} /> Developer Notes
          </div>
          <button onClick={onClose} className={styles.closeBtn}><X size={20} /></button>
        </div>

        {/* Body (Sidebar + Content) */}
        <div className={styles.notesBody}>
          
          {/* Sidebar Navigation */}
          <div className={styles.notesSidebar}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
              >
                {notesData[tab].title}
                {activeTab === tab && <ChevronRight size={14} />}
              </button>
            ))}
          </div>

          {/* Scrollable Content Area */}
          <div className={styles.notesContentArea}>
            <h2 className={styles.contentTitle}>{notesData[activeTab].title}</h2>
            <p className={styles.contentText}>{notesData[activeTab].content}</p>
            
            {notesData[activeTab].snippet && (
              <div className={styles.codeBlock}>
                <code>{notesData[activeTab].snippet}</code>
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

export default NotesModal;
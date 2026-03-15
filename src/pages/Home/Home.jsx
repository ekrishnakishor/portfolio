import React, { useState, useEffect } from "react";
import { Terminal, Settings, Scan, Send } from "lucide-react"; // Added Send icon
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Shared/Navbar";
import Footer from "../../components/Shared/Footer";
import TerminalModal from "../../components/Controls/TerminalModal";
import CssEditorModal from "../../components/Controls/CssEditorModal";
import ContactModal from "../../components/Controls/ContactModal"; // Added Contact Modal
import TechMarquee from "../../components/Shared/TechMarquee"; // Added Tech Marquee
import { useXRay } from "../../context/XRayContext";
import XRayWrapper from "../../components/XRay/XRayWrapper";
import XRayModal from "../../components/XRay/XRayModal"; 
import styles from "./Home.module.css";

const Home = () => {
  const [ip, setIp] = useState("Fetching...");
  const [activeControl, setActiveControl] = useState(null);
  
  const { isXRayOn, toggleXRay } = useXRay();

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch(() => setIp("Unavailable"));
  }, []);

  return (
    <div className={styles.homeContainer}>
      <Navbar ip={ip}>
        <h1 className={styles.navName}>KRISHNAKISHOR ERUVAT</h1>
      </Navbar>

      <main className={styles.mainContent}>
        {/* Un-wrapped this so it stays perfectly centered! */}
        <div className={styles.bgText}>REINVENT</div>

        <div className={styles.leftSection}>
          <XRayWrapper
            title="Animated Entrance"
            description="Framer Motion handles the mounting animation, shifting the text smoothly into place while maintaining strict CSS Module scoping for styling."
            snippet="<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className={styles.greeting}>Hello 👋,</h2>
              <h2 className={styles.title}>I am Krishna</h2>
              <p className={styles.subtitle}>
                A BRAVE CLIMBER IN THE WORLD OF FRONTEND DEV
              </p>
              <p className={styles.description}>
                Frontend Developer experienced in building responsive apps with
                React. Delivered 20+ freelance projects and built LMS platforms
                for 30k+ students.
              </p>

              {/* THE NEW HIRE ME BUTTON */}
              <button 
                onClick={() => setActiveControl('contact')}
                style={{ 
                  marginTop: '2rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  background: 'white', 
                  color: 'black', 
                  padding: '0.75rem 2rem', 
                  borderRadius: '99px', 
                  fontWeight: 'bold', 
                  fontSize: '0.875rem', 
                  transition: 'transform 0.2s', 
                  cursor: 'pointer',
                  border: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Send size={16} /> Hire Me
              </button>

            </motion.div>
          </XRayWrapper>
        </div>

        <div className={styles.centerSection}>
          <div className={styles.imageWrapper}>
            <div className={styles.glow}></div>
            
            <XRayWrapper
              title="Glowing Hero Symbol"
              description="A purely CSS-driven neon effect using overlapping text-shadows. No heavy image assets loaded, keeping the initial paint blazing fast."
              snippet="text-shadow: 0 0 20px var(--accent-blue), 0 0 40px var(--accent-blue);"
            >
              <div className={styles.codeSymbolWrapper}>
                <span className={styles.codeSymbol}>&lt;/&gt;</span>
              </div>
            </XRayWrapper>
          </div>
        </div>

        <div className={styles.rightSection}>
          <XRayWrapper
            title="State & Context Panel"
            description="Local state dictates which interactive modal mounts, while the React Context API broadcasts the X-Ray mode status globally across the component tree."
            snippet="const { toggleXRay } = useXRay();"
          >
            <div className={styles.systemControls}>
              <p className={styles.controlHeader}>// System Controls</p>

              <button
                className={styles.controlBtn}
                onClick={toggleXRay}
                style={{ color: isXRayOn ? "#3fb950" : "" }}
              >
                <Scan size={16} /> X-Ray Mode: {isXRayOn ? "ON" : "OFF"}
              </button>

              <button
                className={styles.controlBtn}
                onClick={() => setActiveControl("terminal")}
              >
                <Terminal size={16} /> Inspect Codebase
              </button>
              <button
                className={styles.controlBtn}
                onClick={() => setActiveControl("css")}
              >
                <Settings size={16} /> Live CSS Edit
              </button>
            </div>
          </XRayWrapper>
        </div>
      </main>

      {/* TECH MARQUEE PLACED JUST ABOVE FOOTER */}
      <TechMarquee />
      
      <Footer ip={ip} />

      <AnimatePresence>
        {activeControl === "terminal" && (
          <TerminalModal onClose={() => setActiveControl(null)} />
        )}
        {activeControl === "css" && (
          <CssEditorModal onClose={() => setActiveControl(null)} />
        )}
        {/* ADDED CONTACT MODAL */}
        {activeControl === "contact" && (
          <ContactModal onClose={() => setActiveControl(null)} />
        )}
      </AnimatePresence>
      
      {/* X-Ray Modal remains at the top level */}
      <XRayModal />
      
    </div>
  );
};

export default Home;
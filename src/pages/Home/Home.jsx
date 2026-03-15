import React, { useState, useEffect } from "react";
import { Terminal, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Shared/Navbar";
import Footer from "../../components/Shared/Footer";
import TerminalModal from "../../components/Controls/TerminalModal";
import CssEditorModal from "../../components/Controls/CssEditorModal";
import styles from "./Home.module.css";

const Home = () => {
  const [ip, setIp] = useState("Fetching...");
  const [activeControl, setActiveControl] = useState(null);

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
        <div className={styles.bgText}>REINVENT</div>

        <div className={styles.leftSection}>
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
          </motion.div>
        </div>

        <div className={styles.centerSection}>
          <div className={styles.imageWrapper}>
            <div className={styles.glow}></div>
            {/* Swapped the image for a massive text symbol */}
            <div className={styles.codeSymbolWrapper}>
              <span className={styles.codeSymbol}>&lt;/&gt;</span>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.systemControls}>
            <p className={styles.controlHeader}>// System Controls</p>

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
        </div>
      </main>

      <Footer ip={ip} />

      <AnimatePresence>
        {activeControl === "terminal" && (
          <TerminalModal onClose={() => setActiveControl(null)} />
        )}
        {activeControl === "css" && (
          <CssEditorModal onClose={() => setActiveControl(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

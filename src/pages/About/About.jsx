import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Shared/Navbar";
import Footer from "../../components/Shared/Footer";
import XRayWrapper from "../../components/XRay/XRayWrapper"; // Added
import XRayModal from "../../components/XRay/XRayModal"; // Added
import sharedStyles from "../../components/Shared/Shared.module.css";
import styles from "./About.module.css";

const About = () => {
  const [activeTab, setActiveTab] = useState("freelance");
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [ip, setIp] = useState("Fetching...");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch(() => setIp("Unavailable"));
  }, []);

  const projects = {
    freelance: [
      {
        id: 1,
        title: "Greenway Cruise",
        year: "2023",
        tags: ["React", "Vite", "CSS Modules"],
        image:
          "https://images.unsplash.com/photo-1599839619722-39751411ea63?w=500&q=80",
        live: "#",
        details: {
          tasks:
            "Mobile-first frontend development optimized for varying screen sizes.",
          pipeline: "Figma -> React -> Vercel",
          challenges:
            "Optimizing high-res images for mobile traffic and ensuring cross-browser compatibility.",
        },
      },
      {
        id: 2,
        title: "District 15 Branding",
        year: "2023",
        tags: ["Figma", "UI/UX"],
        image:
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80",
        live: "#",
        details: {
          tasks: "Logo design, UI mocks, packaging for an online store.",
          pipeline: "Client Brief -> Figma",
          challenges:
            "Blending modern e-commerce styling with traditional Kerala aesthetics.",
        },
      },
      {
        id: 3,
        title: "StudyBuddy AI",
        year: "2022",
        tags: ["React", "Node.js", "ChatGPT"],
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
        live: "https://www.velociitystudybuddy.com/",
        details: {
          tasks:
            "Led frontend team and integrated AI learning workflows for IIT/JEE/NEET students.",
          pipeline: "React -> AWS -> Vercel",
          challenges:
            "Creating seamless AI-assisted prompting inside a student dashboard.",
        },
      },
      {
        id: 4,
        title: "Deccan Mallus Portal",
        year: "2022",
        tags: ["React", "CSS Grid"],
        image:
          "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&q=80",
        live: "#",
        details: {
          tasks: "Logo blending Kerala & Hyderabad cultures, responsive UI.",
          pipeline: "Design -> Code",
          challenges: "Cultural representation in a minimalist sports design.",
        },
      },
    ],
    contributions: [
      {
        id: 5,
        title: "LMS Platform Architecture",
        year: "2022",
        tags: ["Django", "React", "PostgreSQL"],
        image:
          "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&q=80",
        live: "#",
        details: {
          tasks:
            "Built robust platform currently supporting 2000+ active users.",
          pipeline: "Fullstack deployment",
          challenges:
            "Database scaling and state management for thousands of concurrent students.",
        },
      },
      {
        id: 6,
        title: "Internal Delivery Tracker",
        year: "2021",
        tags: ["Google Workspace"],
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8ed74514f6?w=500&q=80",
        live: "#",
        details: {
          tasks:
            "Built internal proof-of-delivery system for courier business.",
          pipeline: "Forms -> Sheets -> Internal Dashboard",
          challenges:
            "Making it extremely simple for delivery partners to upload photos on the go.",
        },
      },
    ],
  };

  const careerData = [
    {
      id: 1,
      role: "Web Developer",
      company: "Velociity Foundation",
      year: "2022 - Present",
      desc: "Developed enhanced LMS platform for 2000+ active users. Designed modular UI components.",
    },
    {
      id: 2,
      role: "Stakeholder",
      company: "CYC IndieTech",
      year: "2023 - 2024",
      desc: "Managed business operations and digital product development. Planned web-based solutions.",
    },
    {
      id: 3,
      role: "Operations Head",
      company: "Techis India",
      year: "2021 - 2022",
      desc: "Trained 250+ international professionals, improved placement by 34%. Designed technical curriculum.",
    },
  ];

  const itemsPerPage = 3;
  const currentData = activeTab === "career" ? careerData : projects[activeTab];
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const visibleItems = currentData.slice(
    pageIndex * itemsPerPage,
    (pageIndex + 1) * itemsPerPage,
  );

  const handleNext = () => setPageIndex((prev) => (prev + 1) % totalPages);
  const handlePrev = () =>
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setPageIndex(0);
  };

  return (
    <div className={styles.aboutContainer}>
      <Navbar ip={ip}>
        <h1 className={sharedStyles.navName}>KRISHNAKISHOR ERUVAT</h1>
      </Navbar>

      <main className={styles.mainContent}>
        {/* X-RAY: PILL SWITCHER */}
        <XRayWrapper
          title="Dynamic Tab Navigation"
          description="React state (activeTab) dictates which dataset to slice for the pagination grid. Conditionally applies active CSS modules for visual feedback."
          snippet={`const currentData = activeTab === "career" ? careerData : projects[activeTab];`}
        >
          <div className={styles.pillContainer}>
            <button
              onClick={() => switchTab("freelance")}
              className={
                activeTab === "freelance" ? styles.activePill : styles.pill
              }
            >
              FREELANCE
            </button>
            <button
              onClick={() => switchTab("contributions")}
              className={
                activeTab === "contributions" ? styles.activePill : styles.pill
              }
            >
              CONTRIBUTIONS
            </button>
            <button
              onClick={() => switchTab("career")}
              className={activeTab === "career" ? styles.activePill : styles.pill}
            >
              CAREER
            </button>
          </div>
        </XRayWrapper>

        {/* X-RAY: CONTENT GRID & PAGINATION */}
        <XRayWrapper
          title="Paginated Grid & AnimatePresence"
          description="Framer Motion's AnimatePresence handles smooth enter/exit transitions when tab state or page index changes. Slice method manages the 3-item horizontal pagination."
          snippet={`<AnimatePresence mode="wait">\n  <motion.div key={activeTab + pageIndex} ...>\n</AnimatePresence>`}
        >
          <div className={styles.contentWrapper}>
            <button
              onClick={handlePrev}
              className={`${styles.navArrow} ${totalPages <= 1 ? styles.hiddenArrow : ""}`}
            >
              <ChevronLeft size={32} />
            </button>

            <div className={styles.gridContainer}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + pageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={styles.gridInner}
                >
                  {activeTab === "career"
                    ? visibleItems.map((item) => (
                        <div key={item.id} className={styles.careerCard}>
                          <div className={styles.careerYear}>{item.year}</div>
                          <h3 className={styles.careerRole}>{item.role}</h3>
                          <h4 className={styles.careerCompany}>{item.company}</h4>
                          <p className={styles.careerDesc}>{item.desc}</p>
                        </div>
                      ))
                    : visibleItems.map((item) => (
                        <div key={item.id} className={styles.projectCardWrapper}>
                          <div className={styles.projectCard}>
                            <div className={styles.watermark}>{item.year}</div>
                            <div className={styles.cardImageWrapper}>
                              <img
                                src={item.image}
                                alt={item.title}
                                className={styles.cardImage}
                              />
                            </div>
                            <div className={styles.cardContent}>
                              <h3 className={styles.cardTitle}>{item.title}</h3>
                              <div className={styles.tagList}>
                                {item.tags.map((tag) => (
                                  <span key={tag} className={styles.tag}>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className={styles.cardActions}>
                                <a
                                  href={item.live}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={styles.actionBtnLive}
                                >
                                  <ExternalLink size={16} /> Live
                                </a>
                                <button
                                  onClick={() => setSelectedProject(item)}
                                  className={styles.actionBtnDetails}
                                >
                                  <Info size={16} /> Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={handleNext}
              className={`${styles.navArrow} ${totalPages <= 1 ? styles.hiddenArrow : ""}`}
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </XRayWrapper>
      </main>

      <Footer ip={ip} />

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className={styles.closeBtn}
              >
                <X size={24} />
              </button>
              <h2 className={styles.modalTitle}>
                {selectedProject.title} <span>({selectedProject.year})</span>
              </h2>
              <div className={styles.modalSections}>
                <div className={styles.modalSection}>
                  <h4>Primary Tasks</h4>
                  <p>{selectedProject.details.tasks}</p>
                </div>
                <div className={styles.modalSection}>
                  <h4>Development Pipeline</h4>
                  <p className={styles.codeText}>
                    {selectedProject.details.pipeline}
                  </p>
                </div>
                <div className={styles.modalSection}>
                  <h4>Difficulties & Solutions</h4>
                  <p>{selectedProject.details.challenges}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* X-Ray Inspector Modal */}
      <XRayModal />

    </div>
  );
};

export default About;
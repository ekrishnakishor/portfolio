import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Shared/Navbar";
import Footer from "../../components/Shared/Footer";
import XRayWrapper from "../../components/XRay/XRayWrapper";
import XRayModal from "../../components/XRay/XRayModal";
import sharedStyles from "../../components/Shared/Shared.module.css";
import styles from "./About.module.css";

// IMPORT YOUR LOCAL ASSET HERE
import defaultProjectImg from "../../assets/images/works-greenways.webp";
import district15 from "../../assets/images/works-district15.webp";
import StudyBuddy from "../../assets/images/works-studybuddy.webp";
import dhariya from "../../assets/images/works-dhariya.webp";
import tds from "../../assets/images/works-tds.webp";
import velociity from "../../assets/images/works-velociity.webp";
import lms from "../../assets/images/works-lms.webp";
import delivery from "../../assets/images/works-delivery.webp";
import creative from "../../assets/images/works-creative.webp";
import chat from "../../assets/images/works-chat.webp";
import game from "../../assets/images/works-game.webp";

const About = () => {
  const [activeTab, setActiveTab] = useState("freelance");
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [ip, setIp] = useState("Fetching...");

  // DYNAMIC ITEMS PER PAGE STATE
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth <= 768 ? 1 : 3,
  );

  // Fetch IP
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch(() => setIp("Unavailable"));
  }, []);

  // Listen for window resize to toggle between 1 and 3 items
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setItemsPerPage(isMobile ? 1 : 3);
      setPageIndex(0); // Reset page to 0 when screen size changes to prevent empty pages
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const projects = {
    freelance: [
      {
        id: 1,
        title: "Greenway Cruise",
        year: "2023",
        tags: ["React", "Vite", "CSS Modules"],
        image: defaultProjectImg, // Updated to local image
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
        image: district15, // Updated to local image
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
        title: "Business Website",
        year: "2024",
        tags: ["React", "Figma"],
        image: dhariya, // Updated to local image
        live: "https://www.dhariyamarines.com",
        details: {
          tasks:
            "Business landing page for a marine compnay - following international standards, focusing on EU market",
          pipeline: "Design -> Code",
          challenges:
            "Lack of design flexibility, and sticking towards simplicity",
        },
      },
      {
        id: 4,
        title: "Business App for Amazon Services",
        year: "2024",
        tags: ["React", "Python", "Scrapping"],
        image: tds, // Updated to local image
        live: "#",
        details: {
          tasks:
            "customised web app for amazon delivery services, US - automated app to fill the employee forms for government registration",
          pipeline: "Design -> Code",
          challenges:
            "precision to map the data to official government forms, and end output - as government systems take things automatic",
        },
      },
      {
        id: 5,
        title: "Web App for Velociity",
        year: "2022",
        tags: ["JavaScript", "Python", "LMS", "Automation", "Wix"],
        image: velociity, // Updated to local image
        live: "https://www.velociityeducationalsolutions.com",
        details: {
          tasks:
            "Dedicated multipurpose website for an educational publication company, focusing to showcase their products, learning platform for students, guidance for teachers, and an AI assistance for both teachers and students. Online Examinations, Certifications, Guidance etc",
          pipeline: "Design -> Develop -> Integration -> AI",
          challenges:
            "Heavy data, and traffic, forced to use wix platform to host as we found it more convinient and cost effective",
        },
      },
      {
        id: 6,
        title: "Cover Designs",
        year: "2021",
        tags: [
          "Design Services",
          "Adobe Photoshop",
          "Figma",
          "Canva",
          "Visual Studio",
          "Paint",
          "Nano Banana",
        ],
        image: creative, // Updated to local image
        live: "#",
        details: {
          tasks: "High Quality designs for enterprises, books, wallposters etc",
          pipeline: "Ideation -> Rough Draw -> Sketch -> Ps -> Figma -> Canva",
          challenges:
            "Creativity has no limits, understanding the color senses for each individual, reproducing the odd ones for cx satisfaction",
        },
      },
      {
        id: 7,
        title: "StudyBuddy AI",
        year: "2022",
        tags: ["React", "Node.js", "ChatGPT"],
        image: StudyBuddy, // Updated to local image
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
        id: 8,
        title: "LMS Platform Architecture",
        year: "2022",
        tags: ["Django", "React", "PostgreSQL", "Android", "Online exams"],
        image: lms, // Updated to local image
        live: "https://www.velociityeducationalsolutions.com",
        details: {
          tasks:
            "Learning platform for students, focusing on competitive learning methods, subject wise question and answers, video classes, mcq's and many more",
          pipeline: "Fullstack deployment",
          challenges:
            "Database scaling and state management for thousands of concurrent students.",
        },
      },
    ],
    personal: [
      {
        id: 9,
        title: "Logistics WebApp",
        year: "2025",
        tags: ["Logistics Service"],
        image: delivery, // Updated to local image
        live: "#",
        details: {
          tasks:
            "Built internal proof-of-delivery system for courier business.",
          pipeline: "Forms -> Sheets -> Internal Dashboard",
          challenges:
            "Making it extremely simple for delivery partners to upload photos on the go.",
        },
      },
      {
        id: 10,
        title: "Geo Chat",
        year: "2025",
        tags: ["Chatting App", "Nearby Services", "Global Groups"],
        image: chat, // Updated to local image
        live: "https://geochat-five.vercel.app/",
        details: {
          tasks:
            "Idea to create a random chat app to connect people nearby with location services and people globally, this is just a prototype, and the main goal was to learn sockets, their performance etc",
          pipeline: "Ideation -> Sockets -> Geo Tags -> Web Connections",
          challenges:
            "Geo Tag was a bit difficult to understand at first. Location based random chat app idea was to make people know each other limiting the starting trouble for the introverts",
        },
      },
      {
        id: 11,
        title: "Play n Learn",
        year: "2026",
        tags: ["Education", "Online Games", "Conceptualization"],
        image: game, // Updated to local image
        live: "https://learnnstudy.netlify.app/leaderboard",
        details: {
          tasks:
            "The idea was simple - create a platform where people can come, play some games, and improve their brain activities, maninly if they are bored of their studies, day to day tasks etc. Planning to add more and more games, challenges and many more",
          pipeline: "Ideation -> Sockets -> Geo Tags -> Web Connections",
          challenges:
            "Making the leaderboard was a bit heavy, having multiple games, and multiple logic for xp, made the backend looks heavy to perform, as i am creating this prototype to understand the impact, it wont be difficult to pull things off, but yeah, i believe the systems might crash anytime soon. The chess game was so mess, still trying to figure out the scrolling behaviours.",
        },
      },
    ],
  };

  const careerData = [
    {
      id: 1,
      role: "Head of IT & Media",
      company: "Velociity Foundation",
      year: "2022 - 2026",
      desc: "Provided technical support for an LMS platform serving 2000+ users, efficiently resolving usability and system-related issues. Guided users in navigating platform features and troubleshooting access problems to ensure a seamless experience. Collaborated closely with development teams to identify and fix bugs, contributing to continuous improvements in overall user experience.",
    },
    {
      id: 2,
      role: "Stakeholder",
      company: "CYC IndieTech",
      year: "2023 - 2024",
      desc: "Collaborated closely with clients to understand their requirements and address technical concerns effectively. Supported the delivery of web solutions by managing communication, tracking issues, and ensuring smooth coordination throughout the project lifecycle.",
    },
    {
      id: 3,
      role: "Web Developer & Placements Head US",
      company: "Techis India",
      year: "2021 - 2022",
      desc: "Delivered technical training to 250+ international users across the US and Japan, providing real-time support and resolving queries with clarity and efficiency. Simplified complex technical concepts to enhance user understanding and maintain high satisfaction levels. Served as the primary point of contact for learners, driving improved engagement and course completion rates, while also managing operations, scheduling, and cross-team coordination.",
    },
  ];

  const currentData = activeTab === "career" ? careerData : projects[activeTab];
  const totalPages = Math.ceil(currentData.length / itemsPerPage);

  // Safe slice based on dynamic itemsPerPage
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
              onClick={() => switchTab("personal")}
              className={
                activeTab === "personal" ? styles.activePill : styles.pill
              }
            >
              PERSONAL
            </button>
            <button
              onClick={() => switchTab("career")}
              className={
                activeTab === "career" ? styles.activePill : styles.pill
              }
            >
              CAREER
            </button>
          </div>
        </XRayWrapper>

        <XRayWrapper
          title="Paginated Grid & AnimatePresence"
          description="Framer Motion's AnimatePresence handles smooth enter/exit transitions when tab state or page index changes. Slice method manages the horizontal pagination."
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
                          <h4 className={styles.careerCompany}>
                            {item.company}
                          </h4>
                          <p className={styles.careerDesc}>{item.desc}</p>
                        </div>
                      ))
                    : visibleItems.map((item) => (
                        <div
                          key={item.id}
                          className={styles.projectCardWrapper}
                        >
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

      <XRayModal />
    </div>
  );
};

export default About;

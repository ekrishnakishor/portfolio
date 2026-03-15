import React from 'react';
import styles from './Shared.module.css';

const TechMarquee = () => {
  // Your core tech stack
  const skills = [
    'React', 'Vite', 'CSS Modules', 'Framer Motion', 
    'Node.js', 'Django', 'PostgreSQL', 'Figma', 'Responsive UI'
  ];

  // We duplicate the array so the scrolling animation loops seamlessly
  const doubledSkills = [...skills, ...skills, ...skills];

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeTrack}>
        {doubledSkills.map((skill, index) => (
          <div key={index} className={styles.techItem}>
            <span className={styles.techDot}>•</span> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
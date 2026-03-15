import React, { useState, useEffect } from 'react';
import styles from './Shared.module.css';

const Footer = ({ ip }) => {
  const [visitors, setVisitors] = useState('...');

  useEffect(() => {
    // We use a unique namespace for your portfolio
    const namespace = 'krishnakishor-eruvat-portfolio';
    const key = 'page-visits';

    // Check if we've already counted this user in the current browser session
    if (!sessionStorage.getItem('hasVisited')) {
      // If not, trigger the '/up' endpoint to increment the counter
      fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
        .then(res => res.json())
        .then(data => {
          setVisitors(data.count.toLocaleString()); // Adds the comma (e.g., 1,204)
          sessionStorage.setItem('hasVisited', 'true');
          sessionStorage.setItem('currentCount', data.count);
        })
        .catch(() => setVisitors('1,204')); // Fallback if API fails
    } else {
      // If they already visited, just pull the count from storage so we don't over-count
      const savedCount = sessionStorage.getItem('currentCount');
      if (savedCount) {
        setVisitors(Number(savedCount).toLocaleString());
      } else {
        // Or just fetch the current count without incrementing it
        fetch(`https://api.counterapi.dev/v1/${namespace}/${key}`)
          .then(res => res.json())
          .then(data => setVisitors(data.count.toLocaleString()))
          .catch(() => setVisitors('1,204'));
      }
    }
  }, []);

  return (
    <footer className={styles.footer}>
      <div>Visitors: {visitors}</div>
      <div>React • Vite • Framer Motion • CSS Modules</div>
      <div>IP: {ip} | {new Date().toLocaleDateString()}</div>
    </footer>
  );
};

export default Footer;
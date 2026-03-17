import React, { useState, useEffect } from 'react';
import { GitCommit } from 'lucide-react'; // Adding a cool commit icon
import styles from './Shared.module.css';

const Footer = ({ ip }) => {
  const [commitInfo, setCommitInfo] = useState({
    message: 'Fetching latest commit...',
    hash: '',
    url: '#'
  });

  useEffect(() => {
    // GITHUB DETAILS
    const GITHUB_USERNAME = 'ekrishnakishor';
    const REPO_NAME = 'portfolio';

    // Check session storage first to avoid hitting GitHub API rate limits (60/hr)
    const savedCommit = sessionStorage.getItem('latestCommit');
    if (savedCommit) {
      setCommitInfo(JSON.parse(savedCommit));
      return;
    }

    fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/commits?per_page=1`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const latest = data[0];
          const info = {
            message: latest.commit.message.split('\n')[0], // Grab just the first line of the commit message
            hash: latest.sha.substring(0, 7), // Standard 7-character short hash
            url: latest.html_url // The direct link to the commit on GitHub
          };
          setCommitInfo(info);
          sessionStorage.setItem('latestCommit', JSON.stringify(info));
        }
      })
      .catch(() => {
        setCommitInfo({ message: 'Git integration offline', hash: '', url: '#' });
      });
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.commitWrapper}>
        <GitCommit size={14} className={styles.commitIcon} />
        {commitInfo.hash ? (
          <a 
            href={commitInfo.url} 
            target="_blank" 
            rel="noreferrer" 
            className={styles.commitLink}
            title={commitInfo.message} // Shows full message on hover
          >
            {commitInfo.hash} — {commitInfo.message.length > 25 ? commitInfo.message.substring(0, 25) + '...' : commitInfo.message}
          </a>
        ) : (
          <span>{commitInfo.message}</span>
        )}
      </div>
      
      <div>ekrishnakishor@gmail.com</div>
      <div>IP: {ip} | {new Date().toLocaleDateString()}</div>
    </footer>
  );
};

export default Footer;
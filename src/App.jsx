import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';

function App() {
  return (
    <Router>
      <div className={styles.appContainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          <Route path="/" element={
            <div className={styles.readyMessage}>
              Environment Ready 🚀
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { XRayProvider } from './context/XRayContext'; // Import the provider
import styles from './App.module.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';

function App() {
  return (
    <XRayProvider>
      <Router>
        <div className={styles.appContainer}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </XRayProvider>
  );
}

export default App;
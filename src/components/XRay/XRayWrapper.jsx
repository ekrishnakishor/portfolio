import React from 'react';
import { useXRay } from '../../context/XRayContext';
import styles from './XRay.module.css';

const XRayWrapper = ({ children, title, description, snippet }) => {
  const { isXRayOn, setActiveInfo } = useXRay();

  // If X-Ray is off, just render the normal component with zero extra markup
  if (!isXRayOn) {
    return <>{children}</>;
  }

  // When clicked, stop the click from triggering links/buttons, and open the modal
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveInfo({ title, description, snippet });
  };

  return (
    <div className={styles.inspectableWrapper} onClick={handleClick}>
      {children}
      {/* Subtle overlay that only appears on hover when X-Ray is ON */}
      <div className={styles.inspectOverlay}></div>
    </div>
  );
};

export default XRayWrapper;
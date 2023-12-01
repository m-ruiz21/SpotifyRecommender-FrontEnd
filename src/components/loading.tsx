import React from 'react';
import styles from '../styles/LoadingScreen.module.css';

const LoadingScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.waveContainer}>
        <div className={`${styles.wave} ${styles.wave1}`}></div>
        <div className={`${styles.wave} ${styles.wave2}`}></div>
        <div className={`${styles.wave} ${styles.wave3}`}></div>
        <div className={`${styles.wave} ${styles.wave4}`}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
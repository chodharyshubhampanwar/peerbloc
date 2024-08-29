"use client";

import React from 'react';
import styles from '@/styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to My Landing Page</h1>
      <p className={styles.subtitle}>Discover the beauty of simplicity</p>
      <button className={styles.button}>Get Started</button>

      <div className={styles.infoContainer}>
        <div className={styles.infoItem}>
          <h2 className={styles.infoTitle}>Student Communities</h2>
          <p className={styles.infoText}>
            Connect with students from top universities like Harvard, Stanford, and more.
          </p>
        </div>
        <div className={styles.infoItem}>
          <h2 className={styles.infoTitle}>Diverse Topics</h2>
          <p className={styles.infoText}>
            Explore a wide range of topics, including science, math, and mental health.
          </p>
        </div>
        <div className={styles.infoItem}>
          <h2 className={styles.infoTitle}>Alumni Communities</h2>
          <p className={styles.infoText}>
            Learn from industry experts and gain valuable insights to boost your knowledge.
          </p>
        </div>
        <div className={styles.infoItem}>
          <h2 className={styles.infoTitle}>Pro Account</h2>
          <p className={styles.infoText}>
           Get access to student exclusive discount and features by upgrading to a Pro account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;




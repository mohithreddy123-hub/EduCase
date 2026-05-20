import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import styles from './Welcome.module.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className={`page-transition ${styles.welcomeWrapper}`}>
      <div className={styles.contentSection}>
        <h1 className={styles.title}>Welcome to PopX</h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
        </p>
      </div>
      
      <div className={styles.buttonSection}>
        <Button 
          variant="primary" 
          onClick={() => navigate('/register')}
          className={styles.welcomeBtn}
        >
          Create Account
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => navigate('/login')}
          className={styles.welcomeBtn}
        >
          Already Registered? Login
        </Button>
      </div>
    </div>
  );
};

export default Welcome;

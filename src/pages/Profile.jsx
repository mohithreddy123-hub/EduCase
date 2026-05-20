import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import styles from './Profile.module.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load current user from localStorage
    const storedUser = localStorage.getItem('popx_currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Fallback user details if accessed directly without registration
      const defaultUser = {
        fullName: 'John Doe',
        phoneNumber: '9876543210',
        email: 'johndoe@popx.com',
        companyName: 'PopX Agency',
        isAgency: 'Yes',
      };
      setUser(defaultUser);
      localStorage.setItem('popx_currentUser', JSON.stringify(defaultUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('popx_currentUser');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className={`page-transition ${styles.profileWrapper}`}>
      {/* Title Bar Header */}
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Account Settings</h2>
      </div>

      <div className={styles.profileContent}>
        {/* Profile Card Section */}
        <div className={styles.profileCard}>
          <div className={styles.avatarContainer}>
            {/* SVG Illustration Avatar */}
            <svg 
              className={styles.avatarImg} 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="50" fill="#edd8f6"/>
              {/* Head */}
              <circle cx="50" cy="38" r="18" fill="#6c25e9"/>
              {/* Body */}
              <path d="M16 85C16 68.4315 29.4315 55 46 55H54C70.5685 55 84 68.4315 84 85V100H16V85Z" fill="#6c25e9"/>
            </svg>
            <div className={styles.cameraIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
          </div>
          
          <div className={styles.userInfo}>
            <h3 className={styles.userName}>{user.fullName}</h3>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        </div>

        {/* User Description */}
        <div className={styles.descriptionSection}>
          <p className={styles.descriptionText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Metadata Details (Agency & Company) */}
        <div className={styles.metaSection}>
          {user.companyName && (
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Company Name:</span>
              <span className={styles.metaValue}>{user.companyName}</span>
            </div>
          )}
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Agency Account:</span>
            <span className={styles.metaValue}>{user.isAgency || 'No'}</span>
          </div>
          {user.phoneNumber && (
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Phone:</span>
              <span className={styles.metaValue}>{user.phoneNumber}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.footerSection}>
        <Button 
          variant="secondary" 
          onClick={handleLogout}
          fullWidth
          className={styles.logoutBtn}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(''); // Clear general error when user types
  };

  // Validation logic running on formData changes
  useEffect(() => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Email
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate Password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    // Form is valid if there are no error messages and fields are filled
    setIsValid(Object.keys(newErrors).length === 0 && formData.email && formData.password);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    // Retrieve registered users
    const users = JSON.parse(localStorage.getItem('popx_users') || '[]');
    
    // Find matching user
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (foundUser) {
      if (foundUser.password === formData.password) {
        // Save current logged in user
        localStorage.setItem('popx_currentUser', JSON.stringify(foundUser));
        navigate('/profile');
      } else {
        setSubmitError('Incorrect password. Please try again.');
      }
    } else {
      // Fallback: If no users registered yet, we can create a temporary one so they can test
      if (formData.email === 'test@popx.com' && formData.password === '123456') {
        const mockUser = {
          fullName: 'John Doe',
          phoneNumber: '9876543210',
          email: 'test@popx.com',
          companyName: 'PopX Agency',
          isAgency: 'Yes'
        };
        localStorage.setItem('popx_currentUser', JSON.stringify(mockUser));
        navigate('/profile');
      } else {
        setSubmitError('No account found with this email. Please register first.');
      }
    }
  };

  return (
    <div className={`page-transition ${styles.loginWrapper}`}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>Signin to your PopX account</h1>
        <p className={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formSection}>
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email && formData.email ? errors.email : ''}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password && formData.password ? errors.password : ''}
          required
        />

        {submitError && <div className={styles.submitError}>{submitError}</div>}

        <Button
          type="submit"
          variant="primary"
          disabled={!isValid}
          className={styles.loginBtn}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;

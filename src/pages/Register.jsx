import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: 'No', // Default selection
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({});

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Mark field as touched on blur to show errors conditionally
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Perform Form Validation
  useEffect(() => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+() -]{10,15}$/; // Standard Phone validation

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    // Validate Phone Number
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Validate Email
    if (!formData.email) {
      newErrors.email = 'Email Address is required';
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

    // Form is valid if no error keys exist and all required fields are filled
    const formIsFilled = 
      formData.fullName.trim() && 
      formData.phoneNumber && 
      formData.email && 
      formData.password;

    setIsValid(Object.keys(newErrors).length === 0 && formIsFilled);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    // Retrieve existing users
    const existingUsers = JSON.parse(localStorage.getItem('popx_users') || '[]');

    // Check if user already exists
    const userExists = existingUsers.some(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (userExists) {
      setErrors((prev) => ({
        ...prev,
        email: 'An account with this email already exists',
      }));
      return;
    }

    // Add new user
    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem('popx_users', JSON.stringify(updatedUsers));
    
    // Auto-login the registered user
    localStorage.setItem('popx_currentUser', JSON.stringify(formData));

    // Redirect to profile page
    navigate('/profile');
  };

  return (
    <div className={`page-transition ${styles.registerWrapper}`}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>Create your PopX account</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.formSection}>
        <div className={styles.inputsContainer}>
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fullName && errors.fullName ? errors.fullName : ''}
            required
          />

          <Input
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : ''}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email ? errors.email : ''}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password ? errors.password : ''}
            required
          />

          <Input
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />

          {/* Agency Radio Buttons */}
          <div className={styles.radioGroupContainer}>
            <label className={styles.radioGroupLabel}>
              Are you an agency? <span className={styles.required}>*</span>
            </label>
            <div className={styles.radioOptions}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="isAgency"
                  value="Yes"
                  checked={formData.isAgency === 'Yes'}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <span className={styles.customRadio}></span>
                Yes
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="isAgency"
                  value="No"
                  checked={formData.isAgency === 'No'}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <span className={styles.customRadio}></span>
                No
              </label>
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid}
            className={styles.registerBtn}
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;

import React, { useState } from 'react';
import styles from './Input.module.css';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  name,
  required,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = value && value.toString().length > 0;

  return (
    <div className={`${styles.inputContainer} ${isFocused ? styles.focused : ''} ${isFilled ? styles.filled : ''} ${error ? styles.hasError : ''}`}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={styles.inputField}
        required={required}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Input;

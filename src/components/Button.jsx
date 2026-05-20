import React from 'react';
import styles from './Button.module.css';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const btnClass = `${styles.btn} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={btnClass}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

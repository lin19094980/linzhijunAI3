import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyle = "font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-corgi-500 hover:bg-corgi-700 text-white",
    secondary: "bg-girly-300 hover:bg-girly-500 text-white"
  };
  
  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

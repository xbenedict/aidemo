
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  isLoading = false,
  ...props
}) => {
  const baseStyle = "font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-150 ease-in-out";
  
  const variantStyles = {
    primary: "bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500",
    secondary: "bg-slate-200 hover:bg-slate-300 text-slate-700 focus:ring-slate-400",
  };

  const disabledStyle = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${isLoading || props.disabled ? disabledStyle : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

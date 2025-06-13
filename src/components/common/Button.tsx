import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  secondary?: boolean;
  outline?: boolean;
  small?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  primary,
  secondary,
  outline,
  small,
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:ring-4 focus:outline-none inline-flex items-center justify-center';
  
  let variantClasses = '';
  
  if (primary) {
    variantClasses = outline 
      ? 'text-amber-600 border border-amber-600 hover:bg-amber-600 hover:text-white focus:ring-amber-300'
      : 'bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-300';
  } else if (secondary) {
    variantClasses = outline
      ? 'text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-300'
      : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300';
  } else {
    variantClasses = outline
      ? 'text-gray-700 border border-gray-300 hover:bg-gray-100 focus:ring-gray-200'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-200';
  }
  
  const sizeClasses = small ? 'px-3 py-2 text-sm' : 'px-5 py-2.5 text-base';
  
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  
  const allClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`;
  
  return (
    <button
      type={type}
      className={allClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
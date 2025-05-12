import React from "react";

interface ButtonSizeProps {
  name: string;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

const ButtonSize: React.FC<ButtonSizeProps> = ({ name, className, onClick, isActive, disabled = false }) => {
    return (
    <button
      className={`size-button w-10 h-10 flex items-center justify-center border-2 ${!disabled && 'hover:border-black'} transition-colors duration-200 uppercase text-sm font-medium ${isActive ? 'border-black' : 'border-gray-300'} ${disabled ? 'opacity-30' : ''} ${className ? className : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default ButtonSize;

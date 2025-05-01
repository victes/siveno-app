import React from "react";

interface ButtonSizeProps {
  name: string;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

const ButtonSize: React.FC<ButtonSizeProps> = ({ name, className, onClick, isActive }) => {
    return (
    <button
      className={`size-button w-10 h-10 flex items-center justify-center border-2 hover:border-black transition-colors duration-200 uppercase text-sm font-medium ${isActive ? 'border-black' : 'border-gray-300'} ${className ? className : ''}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default ButtonSize;

import React from "react";

interface ButtonSizeProps {
  name: string;
  className?: string;
  onClick?: () => void;
}

const ButtonSize: React.FC<ButtonSizeProps> = ({ name, className, onClick }) => {
  return (
    <button
      className={`size-button w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-black transition-colors duration-200 uppercase text-sm font-medium ${className}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default ButtonSize;

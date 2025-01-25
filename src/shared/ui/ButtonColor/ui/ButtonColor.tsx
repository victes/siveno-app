// Объект с цветами
const buttonColors = {
  primary: "bg-red-500",
  secondary: "bg-green-500",
  danger: "bg-red-500",
  warning: "bg-yellow-500",
  success: "bg-teal-500",
  info: "bg-indigo-500",
};

interface IBtnColor {
  color: keyof typeof buttonColors;
  name?: string;
  className?: string;
  onClick?: () => void;
}

const ButtonColor = ({ color, name, className, onClick }: IBtnColor) => {
  return (
    <button
      onClick={onClick}
      className={`${className} w-[10px] h-[10px] rounded-[25px] ${buttonColors[color]} btn-ghost shadow-none border-none uppercase text-[12px]`}
    >
      {name}
    </button>
  );
};

export default ButtonColor;

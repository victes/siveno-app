
interface IBtnColor {
  color: string;
  name?: string;
  className?: string;
  onClick?: () => void;
}


const ButtonColor = ({ color, name, className, onClick }: IBtnColor) => {

  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={` w-[30px] h-[30px] rounded-[25px] shadow-none uppercase text-[12px] border border-solid border-[#a6b5d3] hover:scale-[0.9] transition-all duration-200 ease-in-out ${className}`}
    >
      {name}
    </button>
  );
};

export default ButtonColor;

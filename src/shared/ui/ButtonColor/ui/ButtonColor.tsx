
interface IBtnColor {
  color: string;
  name?: string;
  className?: string;
  onClick?: () => void;
}


const ButtonColor = ({ color, name, className, onClick }: IBtnColor) => {
  console.log(color, name, className);
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={`${className} w-[10px] h-[10px] rounded-[25px]  btn-ghost shadow-none border-none uppercase text-[12px]`}
    >
      {name}
    </button>
  );
};

export default ButtonColor;

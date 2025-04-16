
interface IBtnColor {
  color: string | undefined;
  name?: string;
  onClick?: () => void;
  active?: boolean;
}


const ButtonColor = ({ color, name, onClick, active }: IBtnColor) => {

  return (
    <button
      disabled={active}
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={
        (active ? 'border-[3px] border-[#a6b5d3] ' : '') +
        'w-[30px] h-[30px] rounded-[25px] shadow-none uppercase text-[12px] border border-solid border-[#a6b5d3] hover:scale-[0.9] transition-all duration-200 ease-in-out'
      }
    >
      {name}
    </button>
  );
};

export default ButtonColor;

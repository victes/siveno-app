import React from "react";

import { ISelect } from "../types";

interface SelectProps extends ISelect {
  value: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ name, options, value, onChange }) => {
  return (
    <div className="border-b-[1px] border-x-none border-[#423c3d]">
      <select
        className="select bg-transparent w-full max-w-full tablet:max-w-xs uppercase"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="" disabled>
          {name}
        </option>
        {options.map((item, idx) => (
          <option key={idx} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

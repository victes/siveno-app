import React from "react";

import { ISelect } from "../types";

const Select = ({ name, options }: ISelect) => {
  return (
    <div className="border-b-[1px] border-x-none border-[#423c3d]">
      <select className="select bg-transparent  w-full max-w-full tablet:max-w-xs uppercase " defaultValue={name}>
        <option className="" value="" disabled>
          {name}
        </option>
        {options.map((item, idx) => {
          return (
            <option key={idx} value={item.value}>
              {item.option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;

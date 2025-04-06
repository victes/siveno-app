import React from "react";
import { IAccordion } from "../types";

const Accordion = ({ name, context }: IAccordion) => {
  return (
    <div className="collapse collapse-plus  w-full">
      <input type="checkbox" name="my-accordion-3" />
      <div className="collapse-title text-xs font-medium uppercase">{name}</div>
      <div className="collapse-content p-0 pl-4">{context}</div>
    </div>
  );
};

export default Accordion;

import React from "react";
import { IAccordion } from "../types";
import '../styles/accordion.scss'

const Accordion = ({ name, context }: IAccordion) => {
  return (
      <div className="collapse collapse-plus w-full text-primary custom-collapse ">
      <input type="checkbox" name="my-accordion-3"/>
      <div className="collapse-title text-sm font-medium uppercase">{name}</div>
      <div className="collapse-content pl-[20px]">{context}</div>
    </div>
  );
};

export default Accordion;

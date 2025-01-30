import React from "react";

interface IAccFaq {
  question: string;
  answer: string;
}

const AccordionFAQ = ({ question, answer }: IAccFaq) => {
  return (
    <div className="collapse collapse-arrow bona rounded-none bg-transparent border-b border-text border-solid">
      <input type="radio" name="my-accordion-2" defaultChecked />
      <div className="collapse-title text-xl font-medium">{question}</div>
      <div className="collapse-content">
        <p className="text-xs">{answer}</p>
      </div>
    </div>
  );
};

export default AccordionFAQ;

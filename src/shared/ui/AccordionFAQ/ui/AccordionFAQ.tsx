import React from "react";

interface IAccFaq {
  question: string;
  answer?: string;
  phone?: string;
  inSend?: string;
  onSend?: string;
  value2?:string;
  value3?:string[];
  help?:string[];
}

const AccordionFAQ = ({ question, answer, phone, inSend, onSend, value2, value3, help }: IAccFaq) => {
  return (
    <div className="collapse collapse-arrow bona rounded-none bg-transparent border-b border-text border-solid">
      <input type="radio" name="my-accordion-2" defaultChecked />
      <div className="collapse-title text-xl font-medium">{question}</div>
      <div className="collapse-content">
        {answer && <p className="text-xs">{answer}</p>}
        {help && help.map((value, index) => (
          <>
            <p key={index} className="text-xs">{value}</p>
          </>
        ))}
        {value3 && value3.map((value, index) => (
          <>
            <br key={index*100}/>
            <p key={index*10} className="text-xs">{value}</p>
          </>
        ))}
        {phone && (
          <>
          <br/>
          <p className="text-xs">{inSend}</p>
          <p className="text-xs">{onSend}</p>
          <p className="text-xs">{phone}</p>
          <br/>
          <p className='text-xs'>{value2}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AccordionFAQ;

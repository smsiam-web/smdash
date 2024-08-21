import React from 'react';
import { toast } from "react-toastify";

interface CopyTextProps {
  text: string;
  className: any;
}

const CopyText: React.FC<CopyTextProps> = ({ text, className }) => {
  const handleTextClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`#${text} copied to clipboard!`);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <span onClick={handleTextClick} className={className}>
      {text}
    </span>
  );
};

export default CopyText;

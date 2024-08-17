import React from "react";
import * as htmlToImage from "html-to-image";
import { Button } from "../components/ui/button";

const GenerateInvoice = ({ html, invoiceNo }) => {
  const generateImage = async () => {
    htmlToImage.toJpeg(html.current, { quality: 1 }).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = invoiceNo?.innerText;
      link.href = dataUrl;
      link.click();
    });
  };
  return (
    <div className="col-span-2 sm:col-span-1">
      <Button onClick={generateImage}>Download Invoide</Button>
    </div>
  );
};

export default GenerateInvoice;

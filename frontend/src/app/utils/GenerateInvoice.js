import React from "react";
// import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
import { Button } from "../components/ui/button";
import { HiOutlineDocumentDownload } from "react-icons/hi";

const GenerateInvoice = ({ html, invoiceNo }) => {
  const generateImage = async () => {
    htmlToImage.toJpeg(html.current, { quality: 1 }).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = invoiceNo;
      link.href = dataUrl;
      link.click();
    });
  };
  return (
    <div className="col-span-2 sm:col-span-1">
      <Button
        onClick={generateImage}
        className="gap-1 sm:gap-2 w-full sm:w-fit"
      >
        <HiOutlineDocumentDownload /> Download
      </Button>
    </div>
  );
};

export default GenerateInvoice;

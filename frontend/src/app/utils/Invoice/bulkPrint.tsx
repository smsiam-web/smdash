import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Invoice from './Invoice';

type InvoiceData = {
  id: number;
  customerName: string;
  amount: number;
  date: string;
};

type BulkPrintProps = {
  invoices: InvoiceData[];
};

const BulkPrint: React.FC<BulkPrintProps> = ({ invoices }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Print Invoices</button>
      <div ref={printRef}>
        {invoices.map((invoice) => (
          <Invoice key={invoice.id} {...invoice} />
        ))}
      </div>
    </div>
  );
};

export default BulkPrint;

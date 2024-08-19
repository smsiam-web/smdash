"use client";
import { Button } from "../../../components/ui/button";
import dynamic from "next/dynamic";
import ReactToPrint from "react-to-print";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useBarcode } from "next-barcode";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import SummaryApi from "common";
import { useSelector } from "react-redux";
import { selectUser } from "src/app/redux/slices/userSlice";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import Image from "next/image";
import { Box } from "@radix-ui/themes";
import { AiOutlinePrinter } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
const GenerateInvoice = dynamic(
  () => import("../../../utils/GenerateInvoice"),
  {
    ssr: false,
  }
);

const OrderDetails = () => {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({
    orderId: "",
    deliveryType: "home",
    contact: "",
    items: [],
    name: "",
    address: "",
    totalAmount: "",
    paidAmount: "",
    discount: "",
    conditionAmount: "",
    shippingCost: "",
    courier: "SteadFast",
    status: "pending",
    note: "Note",
    createdBy: "",
  });

  //get current user from redux
  const user = useSelector(selectUser);
  //get order _id from path...
  const searchParams = useSearchParams();
  const fullPath = searchParams.toString();
  const path = fullPath.replace(/=/g, "");
  //generate orderID barcode
  const { inputRef } = useBarcode({
    value: order?.orderId || null,
    options: {
      background: "#C1DEC6",
      displayValue: true,
      width: 4,
      height: 90,
      fontSize: 30,
    },
  });

  console.log(order);

  //fetch Single Order by id
  const fetchOrderByID = async (path) => {
    setLoading(true);
    const response = await fetch(SummaryApi.singleOrder.url, {
      method: SummaryApi.singleOrder.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        orderId: path,
      }),
    });
    setLoading(false);
    const dataReponse = await response.json();
    if (dataReponse.success) {
      setOrder(dataReponse?.data);
    }
  };

  useEffect(() => {
    fetchOrderByID(path);
  }, [path]);

  return (
    <>
      <div className="flex gap-2 justify-end pb-4 pr-5">
        <Box>
          <Link href={"/orders/place-order"}>
            <Button className="gap-1 sm:gap-2">
              <MdAddCircleOutline />
              Place order
            </Button>
          </Link>
        </Box>
        <Box>
          <GenerateInvoice
            html={ref}
            invoiceNo={order?.orderId}
            onClick={() => jsxToPng(null)}
          />
        </Box>
        <Box>
          <ReactToPrint
            bodyClass="print-agreement"
            content={() => ref.current}
            trigger={() => (
              <Button className="gap-1 sm:gap2">
                <AiOutlinePrinter />
                Print
              </Button>
            )}
          />
        </Box>
        {/* <GenerateStick html={ref} /> */}
      </div>
      <AspectRatio ratio={1 / 1.414} ref={ref} className="bg-white border">
        <div className="bg-white" ref={ref}>
          <div className="bg-white text-black">
            <div>
              {/* image  */}
              <div className="flex flex-col w-full gap-2">
                <img
                  src="/invoice/company_header.png"
                  alt=""
                  className="w-3/5 pl-2 pt-2 sm:pl-8 sm:pt-4 sm:pb-2"
                />
                <img
                  src="/invoice/bar.png"
                  alt=""
                  className=" w-2/3 self-end"
                />
              </div>
              <div className="px-4 sm:px-10 font-mono">
                <div>
                  <div className="flex justify-between items-center pb-1 sm:pb-2 sm:pt-1">
                    <div className="w-1/2">
                      <img id="bar_code" className="w-full" ref={inputRef} />
                      <span id="invoiceNo" className="hidden">
                        {order?.orderId}
                      </span>
                    </div>

                    <div className="w-full flex justify-end items-end text-end">
                      <div className="text-xs sm:text-xl lg:text-2xl font-semibold flex-column gap-1 mt-2">
                        <p>
                          Date:{" "}
                          <span className="font-medium">
                            {moment(order?.createdAt).format("llll")}
                          </span>
                        </p>
                        <p>
                          Received by:{" "}
                          <span className="font-medium" id="status">
                            {order?.createdBy}
                          </span>
                        </p>
                        <p>
                          Status:{" "}
                          <span className="font-bold">{order?.status}.</span>
                        </p>

                        <p>
                          Courier:{" "}
                          <span className="font-medium" id="status">
                            {order?.courier}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="sm:mb-4">
                    <h1 className="text-title text-md md:text-2xl font-semibold border-b sm:border-b-2 sm:pb-1">
                      Customer Details:
                    </h1>
                    <div className="text-sm sm:text-xl md:text-2xl font-semibold flex-column sm:gap-1 sm:mt-2">
                      <p className="text-title">
                        Name: <span className="font-medium">{order?.name}</span>
                      </p>
                      <p className="text-title">
                        Phone:{" "}
                        <span className="font-medium">{order?.contact}</span>
                      </p>
                      <p className="text-title">
                        Address:{" "}
                        <span className="font-medium">{order?.address}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-title text-md sm:text-2xl md:text-3xl font-semibold border-b sm:border-b-2">
                      Order Details:
                    </h1>
                    <table className="w-full whitespace-nowrap table-auto border border-gray-100">
                      <thead className="text-xs sm:text-base font-semibold tracking-wide text-left  uppercase bg-zinc-800 border-slate-800 border text-slate-50">
                        <tr>
                          <th className="px-2 sm:px-4 sm:py-1 ">SL</th>
                          <th className="px-2 sm:px-4 sm:py-1 ">Item</th>
                          <th className="px-2 sm:px-4 sm:py-1 ">QTY</th>
                          <th className="px-2 sm:px-4 sm:py-1 ">Price</th>
                          <th className="px-2 sm:px-4 sm:py-1 ">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100 ">
                        <>
                          {order &&
                            order.items.map((item, i) => (
                              <tr
                                className={`${
                                  (i + 1) % 2 == 0 && "bg-slate-200"
                                } px-2`}
                              >
                                <td className="px-2 sm:px-4 sm:py-1 font-medium">
                                  <span className="text-xs sm:text-base">
                                    {1 + i}
                                  </span>
                                </td>
                                <td className="px-2 sm:px-4 sm:py-1 font-medium">
                                  <span className="text-xs sm:text-base">
                                    p name
                                  </span>
                                </td>

                                <td className="px-2 sm:px-4 sm:py-1">
                                  <span className="text-xs sm:text-base font-semibold ">
                                    {/* {item.quantity}
                                {item.unit} */}
                                    1kg
                                  </span>
                                </td>
                                <td className="px-2 sm:px-4 sm:py-1">
                                  <span className="text-xs sm:text-base font-semibold ">
                                    100/-
                                  </span>
                                </td>
                                <td className="px-2 sm:px-4 sm:py-1">
                                  <span className="text-xs sm:text-base font-semibold ">
                                    120/-
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 flex flex-col gap-5">
              <div className="flex justify-between px-4 text-xs sm:text-base sm:px-10">
                <div className="text-slate-500">
                  [<span className="font-bold text-black">Note:</span>{" "}
                  <span className="text-slate-500 font-semibold">
                    {order?.note}]
                  </span>
                </div>
                <div className="flex flex-col w-1/2 border-t sm:border-t-2 text-xs sm:text-xl lg:text-2xl">
                  <div className="flex w-full px-4 justify-between">
                    <h1 className="font-mono font-medium">Sub-Total:</h1>
                    <h1 id="subTotal" className="text-title font-mono">
                      {order?.totalAmount}/-
                    </h1>
                  </div>
                  <div className="flex w-full px-4  justify-between">
                    <h1 className="font-mono ">Delivery: </h1>
                    <h1
                      id="shipping_type"
                      className="text-title capitalize font-mono"
                    >
                      ({order?.deliveryType})
                    </h1>
                    <h1 id="shipping_cost" className="text-title font-mono">
                      {order?.shippingCost}/-
                    </h1>
                  </div>
                  <div className="flex w-full px-4 justify-between">
                    <h1 className="font-mono ">Discount: </h1>
                    <h1 id="discount" className="text-title font-mono">
                      -{order?.discount || "0"}/-
                    </h1>
                  </div>
                  <div className="flex w-full px-4 justify-between">
                    <h1 className="font-mono ">Paid: </h1>
                    <h1 id="discount" className="text-title font-mono">
                      -{order?.paidAmount}/-
                    </h1>
                  </div>
                  <div className="flex w-full px-4 py-1 justify-between rounded-sm bg-emerald-100">
                    <h1 className="font-mono font-bold">Total Due: </h1>
                    <h1 id="total" className="font-bold font-mono">
                      {order?.conditionAmount}/-
                    </h1>
                  </div>
                </div>
              </div>

              <div>
                <img src="/invoice/company_footer.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </AspectRatio>
    </>
  );
};

export default OrderDetails;

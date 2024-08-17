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
      width: 2,
      height: 45,
      fontSize: 20,
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
      <div className="flex items-center justify-end gap-4 pb-4">
        <Link href={"/orders/place-order"}>
          <Button>Place order</Button>
        </Link>
        <GenerateInvoice html={ref} onClick={() => jsxToPng(null)} />
        <ReactToPrint
          bodyClass="print-agreement"
          content={() => ref.current}
          trigger={() => <Button>Print Invoice</Button>}
        />
        {/* <GenerateStick html={ref} /> */}
      </div>
      <AspectRatio ratio={1 / 1.414} ref={ref} className="relative bg-white">
        <div className="text-black">
          <div>
            <div>
              <div className="flex flex-col">
                <img
                  src="/invoice/saba_head.jpg"
                  alt=""
                  className="w-3/5 px-10 py-5"
                />
                <img
                  src="/invoice/saba_bar.png"
                  alt=""
                  className=" w-2/3 self-end"
                />
              </div>
              <div className="px-5 sm:px-10 h-auto font-mono">
                <div>
                  <div className="flex justify-between items-center pb-2 pt-1">
                    <div className=" sm:pt-1 flex justify-center items-center">
                      <div>
                        <img id="bar_code" ref={inputRef} />
                        <span id="invoiceNo" className="hidden">
                          {order?.orderId}
                        </span>
                      </div>
                    </div>
                    <div className="w-96 flex justify-end items-end text-end">
                      <div className="text-lg sm:text-xl lg:text-2xl font-semibold flex-column gap-1 mt-2">
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
                    <h1 className="text-title text-xl md:text-2xl font-semibold border-b-2 pb-1">
                      Customer Details:
                    </h1>
                    <div className="text-lg sm:text-xl md:text-2xl font-semibold flex-column gap-1 mt-2">
                      <p className="text-title">
                        Name :{" "}
                        <span className="font-medium">{order?.name}</span>
                      </p>
                      <p className="text-title">
                        Phone :{" "}
                        <span className="font-medium">{order?.contact}</span>
                      </p>
                      <p className="text-title">
                        Address :{" "}
                        <span className="font-medium">{order?.address}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-title text-lg sm:text-2xl md:text-3xl font-semibold border-b sm:border-b-2">
                      Order Details:
                    </h1>
                    <table className="w-full whitespace-nowrap table-auto border">
                      <thead className="text-base font-semibold tracking-wide text-left  uppercase bg-slate-800 border-slate-800 border text-slate-50">
                        <tr>
                          <th className="px-4 py-1 ">SL</th>
                          <th className="px-4 py-1 ">Item</th>
                          <th className="px-4 py-1 ">Quantity</th>
                          <th className="px-4 py-1 ">Price</th>
                          <th className="px-4 py-1 ">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100 ">
                        <>
                          {order &&
                            order.items.map((item, i) => (
                              <tr
                              className={`${(i + 1) % 2 == 0 && "bg-sub"} px-2`}
                              >
                                <td className="px-4 py-1 font-bold">
                                  <span className="text-base">{1+i}</span>
                                </td>
                                <td className="px-4 py-1 font-medium">
                                  <span className="text-base">p name</span>
                                </td>

                                <td className="px-10 py-1">
                                  <span className="text-base font-semibold ">
                                    {/* {item.quantity}
                                {item.unit} */}
                                    1kg
                                  </span>
                                </td>
                                <td className="px-4 py-1">
                                  <span className="text-base font-semibold ">
                                    100/-
                                  </span>
                                </td>
                                <td className="px-4 py-1">
                                  <span className="text-base font-semibold ">
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
              <div className="flex justify-between w-full px-5 sm:px-10">
                <div className="text-slate-500">
                  [<span className="text-base font-bold text-black">Note:</span>{" "}
                  <span className="text-slate-500 font-semibold">{order?.note}]</span>
                </div>
                <div className="flex flex-col w-2/3 sm:w-1/2 border-t-2 text-sm sm:text-xl lg:text-2xl">
                  <div className="flex w-full px-4 justify-between">
                    <h1 className="font-mono font-medium">
                      Sub-Total:
                    </h1>
                    <h1
                      id="subTotal"
                      className="text-title font-mono"
                    >
                      {order?.totalAmount}/-
                    </h1>
                  </div>
                  <div className="flex w-full px-4  justify-between">
                    <h1 className="font-mono ">
                      Delivery:{" "}
                    </h1>
                    <h1
                      id="shipping_type"
                      className="text-sm sm:text-lg md:text-xl text-title capitalize font-mono"
                    >
                      {order?.deliveryType}
                    </h1>
                    <h1
                      id="shipping_cost"
                      className="text-title font-mono"
                    >
                      150/-
                    </h1>
                  </div>
                  <div className="flex w-full px-4 justify-between">
                    <h1 className="font-mono ">
                      Discount:{" "}
                    </h1>
                    <h1
                      id="discount"
                      className="text-title font-mono"
                    >
                      -{order?.discount || "0"}/-
                    </h1>
                  </div>
                  <div className="flex w-full px-4 justify-between">
                    <h1 className="font-mono ">Paid: </h1>
                    <h1
                      id="discount"
                      className="text-title font-mono"
                    >
                      -{order?.paidAmount}/-
                    </h1>
                  </div>
                  <div className="flex w-full px-4 py-1 justify-between rounded-sm bg-emerald-100">
                    <h1 className="font-mono font-bold">
                      Total Due:{" "}
                    </h1>
                    <h1
                      id="total"
                      className="font-bold font-mono"
                    >
                     {order?.conditionAmount}/-
                    </h1>
                  </div>
                </div>
              </div>

              <div>
                <img src="/invoice/saba_bottom.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </AspectRatio>
    </>
  );
};

export default OrderDetails;

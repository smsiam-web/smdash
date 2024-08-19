'use client'
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import OrderDetails from "./orderDetails";


const SingleOrder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order details</CardTitle>
        <CardDescription>
          Your order details and necessary information is here.
        </CardDescription>
      </CardHeader>
      <div className="max-w-[1240px] max-h-[1754px]">
        <OrderDetails />
      </div>
    </Card>
  );
};

export default SingleOrder;

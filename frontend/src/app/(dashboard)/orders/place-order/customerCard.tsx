import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator"
import { Badge } from "src/app/components/ui/badge";

type Customer = {
  _id: string;
  address: string;
  name: string;
  orderReports: string[];
  orders: string[];
  phone: string;
  totalCanceledOrders: number;
  totalDeliveredOrders: number;
  totalFakeOrders: number;
};

const CustomerCard = (item: any) => {
  const customer = item?.customer[0];
  const deliverySccessRate = ((customer.totalDeliveredOrders / customer?.orders?.length) * 100).toFixed()

  return (
    <Card className="flex justify-around mb-2 border-green-600 border-2">
      <CardHeader>
        <CardTitle>Details:</CardTitle>
        <Separator className="my-4" />
        <CardDescription className="capitalize">
          Types: <Badge variant={(customer?.types === 'new' ? "default_violet" : customer?.types === "regular" ? "default" : "destructive") as "default_violet" | "default" | "destructive"} className="uppercase">{customer?.types}</Badge>
        </CardDescription>
        <CardDescription>
          Delivered: {customer?.totalDeliveredOrders}
        </CardDescription>
        <CardDescription>
          Canceled: {customer?.totalCanceledOrders}
        </CardDescription>
        <CardDescription>
        Delivery Success Rate: <span className="text-green-500">{deliverySccessRate}%</span>
        </CardDescription>
      </CardHeader>
      <CardHeader>
        <CardTitle className="text-center">Report:</CardTitle>
        <Separator className="my-4" />
        <CardDescription>
          Total Order: {customer?.orders.length}
        </CardDescription>
        <CardTitle className="text-6xl text-center py-3">0</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default CustomerCard;

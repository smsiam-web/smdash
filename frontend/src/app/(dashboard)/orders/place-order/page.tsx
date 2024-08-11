import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import OrderFrom from "./orderFrom";

const PlaceOrder = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Place Order</CardTitle>
          <CardDescription>
            Add your order and necessary information from here.
          </CardDescription>
        </CardHeader>
        <CardContent className="md:max-w-2xl max-w-[450px]">
          <OrderFrom />
        </CardContent>
      </Card>
    </>
  );
};

export default PlaceOrder;

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const SingleOrder = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Single Order</CardTitle>
          <CardDescription>
            Add your order and necessary information from here.
          </CardDescription>
        </CardHeader>
        <CardContent className="md:max-w-2xl max-w-[450px]">
          {/* <OrderFrom /> */}
        </CardContent>
      </Card>
    </>
  );
};

export default SingleOrder;
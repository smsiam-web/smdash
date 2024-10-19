import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import CustomerDetails from "./customerDetails";
import CustomerCard from "./card";

const SingleCustomers = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
          <CardDescription>
            Your customer and necessary information from here.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <CustomerCard />
          <CardTitle>Customer Details</CardTitle>
          <CustomerDetails />
        </CardContent>
      </Card>
    </>
  );
};

export default SingleCustomers;

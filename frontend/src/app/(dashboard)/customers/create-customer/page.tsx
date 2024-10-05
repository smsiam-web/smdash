import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import CustomerForm from "./customerFrom";

const CreateCustomer = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create Customer</CardTitle>
          <CardDescription>
            Add your customer and necessary information from here.
          </CardDescription>
        </CardHeader>
        <CardContent className="md:max-w-2xl max-w-[450px]">
          <CustomerForm />
        </CardContent>
      </Card>
    </>
  );
};

export default CreateCustomer;
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import ProductForm from "./productForm";

const UploadProduct = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
          <CardDescription>
            Add your product necessary information here.
          </CardDescription>
        </CardHeader>
        <CardContent className="md:max-w-2xl max-w-[450px]">
          <ProductForm />
        </CardContent>
      </Card>
    </>
  );
};

export default UploadProduct;
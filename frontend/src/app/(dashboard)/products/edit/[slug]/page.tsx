import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import ProductForm from "../../upload-product/productForm";

const EditProduct = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
          <CardDescription>
            Edit your product and necessary information from here.
          </CardDescription>
        </CardHeader>
        <CardContent className="md:max-w-2xl max-w-[450px]">
          <ProductForm />
        </CardContent>
      </Card>
    </>
  );
};

export default EditProduct;
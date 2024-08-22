import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import ProductDetails from './productDetails'

const SingleProduct = () => {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Product details</CardTitle>
      <CardDescription>
        Your product details and necessary information is here.
      </CardDescription>
    </CardHeader>
    <div className="max-w-[1240px] max-h-[1754px]">
      <ProductDetails />
    </div>
  </Card>
  )
}

export default SingleProduct
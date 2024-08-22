import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card";
  
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
  }

const CustomerCard = (item: any) => {
    const Customer = item?.customer[0]

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 pb-2 sm:pb-4 max-w-full'>
    <Card className='bg-green-500 text-xs'>
      <CardHeader>
        <CardTitle>Customer Details</CardTitle>
        <CardTitle className='text-base'>Name: {Customer?.name}</CardTitle>
        <CardTitle className='text-base'>Phone: {Customer?.phone}</CardTitle>
        <CardTitle className='text-base'>Address: {Customer?.address}</CardTitle>
      </CardHeader>
    </Card>
    <Card className='bg-purple-500 text-xs'>
    <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardTitle className='text-base'>Total Order: {Customer?.orders.length}</CardTitle>
        <CardTitle className='text-base'>Delivered Orders: {Customer?.totalDeliveredOrders}</CardTitle>
        <CardTitle className='text-base'>Canceled Orders: {Customer?.totalCanceledOrders}</CardTitle>
        <CardTitle className='text-base'>Fake Orders: {Customer?.totalFakeOrders}</CardTitle>
      </CardHeader>
    </Card>
    <Card className='bg-orange-500 col-span-2'>
      <CardHeader>
        <CardTitle>Report Count:</CardTitle>
        <CardTitle className='text-6xl text-center py-3'>0</CardTitle>
      </CardHeader>
    </Card>
  </div>
  )
}

export default CustomerCard
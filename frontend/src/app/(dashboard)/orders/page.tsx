"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { File, PlusCircle } from "lucide-react";
import OrderCard from "./order-card";
import { OrdersTable } from "./order-table";
import Link from "next/link";
import SummaryApi from "common";

const Orders = () => {
  const [allOrder,setAllOrder] = useState([])
  const [salesCounter,setSalesCounter] = useState({
    thisMonthSales: "00.00",
    todaySales: "00.00",
    totalSales: "00.00",
    yesterdaySales: "00.00"
  })
  //fetch Order
  // const fetchAllOrder = async() =>{
  //   const response = await fetch(SummaryApi.allOrder.url)
  //   const dataResponse = await response.json()
  //   setAllOrder(dataResponse?.data || [])
  // }

  //fetch Sales Counter
  const fetchSalesCounter = async() =>{
    const response = await fetch(SummaryApi.salesCounter.url)
    const dataResponse = await response.json()
    setSalesCounter(dataResponse?.data || [])
  }

  useEffect(()=>{
    // fetchAllOrder()
    fetchSalesCounter()
  },[])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl">
          Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OrderCard sales={!!salesCounter && salesCounter} />
      </CardContent>

      <CardHeader>
        <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl">
          All Orders
        </CardTitle>
        <CardDescription>All order summery and actions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Pending</TabsTrigger>
              <TabsTrigger value="draft">Processing</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Delivered
              </TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Cancel
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Link href={"/orders/place-order"}>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Order
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          <TabsContent value="all">
            <OrdersTable />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Orders;

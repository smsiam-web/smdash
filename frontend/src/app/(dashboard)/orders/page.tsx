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
  const [salesCounter,setSalesCounter] = useState({
    todaySales: "00",
    todayPaid: "00",
    todayCod: "00",
    thisMonthSales: "00",
    thisMonthPaid: "00",
    thisMonthCod: "00",
    yesterdaySales: "00",
    yesterdayPaid: "00",
    yesterdayCod: "00",
    totalSales: "00",
    totalPaid: "00",
    totalCod: "00",
  })

  //fetch Sales Counter
  const fetchSalesCounter = async() =>{
    const response = await fetch(SummaryApi.salesCounter.url)
    const dataResponse = await response.json()

    setSalesCounter(dataResponse?.data || {
      todaySales: "00",
      todayPaid: "00",
      todayCod: "00",
      thisMonthSales: "00",
      thisMonthPaid: "00",
      thisMonthCod: "00",
      yesterdaySales: "00",
      yesterdayPaid: "00",
      yesterdayCod: "00",
      totalSales: "00",
      totalPaid: "00",
      totalCod: "00",
    })
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
              <TabsTrigger value="in_review">in_review</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="delivered" className="hidden sm:flex">
                Delivered
              </TabsTrigger>
              <TabsTrigger value="cancel" className="hidden sm:flex">
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
            <OrdersTable value="all"  />
          </TabsContent>
          <TabsContent value="in_review">
            <OrdersTable value="in_review"  />
          </TabsContent>
          <TabsContent value="pending">
            <OrdersTable value="pending"  />
          </TabsContent>
          <TabsContent value="processing">
            <OrdersTable value="processing"  />
          </TabsContent>
          <TabsContent value="delivered">
            <OrdersTable value="delivered"  />
          </TabsContent>
          <TabsContent value="cancel">
            <OrdersTable value="cancel"  />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Orders;

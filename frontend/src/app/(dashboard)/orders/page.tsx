"use client";
import React from "react";
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
import { PRODUCTS } from "src/app/components/config";
import { OrdersTable } from "./order-table";

const Orders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl">
          Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OrderCard />
      </CardContent>

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
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Order
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <OrdersTable products={PRODUCTS} offset={0} totalProducts={10} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Orders;

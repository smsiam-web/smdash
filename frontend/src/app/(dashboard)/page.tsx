"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { DatePickerWithRange } from "./date-range-picker";
import { Box, Flex } from "@radix-ui/themes";
import { Button } from "../components/ui/button";
import { Barchart } from "./bar-chart";
import { Piechart } from "./pie-chart";
import { TrendingUp } from "lucide-react";
import "@radix-ui/themes/styles.css";
import "../../app/globals.css"

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

export default function MyApp() {



  return (
    
    <Card>
      <CardHeader>
        <Flex  justify="between" className="flex-col gap-3 sm:flex-row">
          <Box>
            <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-4xl">
              Dashboard
            </CardTitle>
          </Box>
          <Box>
            <Flex  className="flex flex-col gap-2 sm:gap-4 sm:flex-row">
              <Box>
                <DatePickerWithRange />
              </Box>
              <Box>
                <Button>Download</Button>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">Overview</TabsTrigger>
              <TabsTrigger value="active">Analytics</TabsTrigger>
              <TabsTrigger value="draft">Reports</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
          <Card className="max-w-full">
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle>$45,231.89</CardTitle>
              <p>+20.1% from last month</p>
            </CardHeader>
            {/* <CardFooter>
                <p>Card Footer</p>
              </CardFooter> */}
          </Card>
          <Card className="max-w-full">
            <CardHeader>
              <CardDescription>Subscriptions</CardDescription>
              <CardTitle>+2350</CardTitle>
              <p>+180.1% from last month</p>
            </CardHeader>
          </Card>
          <Card className="max-w-full">
            <CardHeader>
              <CardDescription>Active Now</CardDescription>
              <CardTitle>+12,234</CardTitle>
              <p>+19% from last month</p>
            </CardHeader>
          </Card>
          <Card className="max-w-full">
            <CardHeader>
              <CardDescription>Card Description</CardDescription>
              <CardTitle>+573</CardTitle>
              <p>+201 since last hour</p>
            </CardHeader>
          </Card>
        </div>
      </CardContent>
      <CardFooter className="grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-10 items-stretch">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Barchart />
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader className="items-center pb-0">
            <CardTitle>Best Selling Products</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <Piechart />
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardFooter>
    </Card>
  );
}


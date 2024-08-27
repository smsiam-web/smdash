"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../components/ui/card';
import { CustomerTable } from './customer-table';
import { Button } from "../../components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "../../components/ui/tabs";
import Link from 'next/link';
import { File, PlusCircle } from "lucide-react";
import { useSelector } from 'react-redux';
import { selectStatusCount } from 'src/app/redux/slices/statusSlice';
import { useEffect, useState } from 'react';

export default function CustomersPage() {
  const [allCount, setAllCount] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [regularCount, setRegularCount] = useState(0);
  const [fraudCount, setFraudCount] = useState(0);
  const statusCount = useSelector(selectStatusCount);

  useEffect(() => {
    statusCount.map((e: any) => {
      switch (e._id) {
        case "all":
          setAllCount(e?.count);
          break;
        case "new":
          setNewCount(e?.count);
          break;
        case "regular":
          setRegularCount(e?.count);
          break;
        case "fraud":
          setFraudCount(e?.count);
          break;
        default:
          break;
      }
    });
  }, [statusCount]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl'>Customers</CardTitle>
        <CardDescription>View all customers and their orders.</CardDescription>
      </CardHeader>
      <CardContent>
      <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All ({allCount})</TabsTrigger>
              <TabsTrigger value="new">New ({newCount})</TabsTrigger>
              <TabsTrigger value="regular">Regular ({regularCount})</TabsTrigger>
              <TabsTrigger value="fraud" className="hidden sm:flex">Fraud ({fraudCount})</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Link href={"/customers/place-order"}>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Customer
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          <TabsContent value="all">
            <CustomerTable value="all" />
          </TabsContent>
          <TabsContent value="new">
            <CustomerTable value="new" />
          </TabsContent>
          <TabsContent value="regular">
            <CustomerTable value="regular" />
          </TabsContent>
          <TabsContent value="fraud">
            <CustomerTable value="fraud" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

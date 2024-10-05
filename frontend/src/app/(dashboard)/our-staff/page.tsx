"use client"
import { useEffect, useState } from 'react';
import { Button } from 'src/app/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '../../components/ui/card';
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "../../components/ui/tabs";
import { File, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { StaffTable } from './staff-table';
import { useSelector } from 'react-redux';
import { selectStatusCount } from 'src/app/redux/slices/statusSlice';


const OurStuff = () => {
  const [all, setAll] = useState(0);
  const [general, setGeneral] = useState(0);
  const [sales, setSales] = useState(0);
  const [admin, setAdmin] = useState(0);

  const status = useSelector(selectStatusCount)
  useEffect(() => {
    status.map((e: any) => {
      switch (e._id) {
        case "all":
          setAll(e?.count);
          break;
        case "GENERAL":
          setGeneral(e?.count);
          break;
        case "SALES":
          setSales(e?.count);
          break;
        case "ADMIN":
          setAdmin(e?.count);
          break;
        default:
          break;
      }
    });
  }, [status]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl'>Our Stuff</CardTitle>
        <CardDescription>View all stuff and their role.</CardDescription>
      </CardHeader>
      <CardContent>
      <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All ({all})</TabsTrigger>
              <TabsTrigger value="GENERAL">General ({general})</TabsTrigger>
              <TabsTrigger value="sales_excutive">Sales Executive ({sales})</TabsTrigger>
              <TabsTrigger value="ADMIN" className="hidden sm:flex">Admin ({admin})</TabsTrigger>
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
                    Add Staff
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          <TabsContent value="all">
            <StaffTable value="all" />

          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default OurStuff
"use client";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "../../components/ui/table";
import formatCurrencyLocale from "../../utils/FormatCurrency";
import { RiFileDownloadLine } from "react-icons/ri";
import { AiOutlinePrinter } from "react-icons/ai";
import { CiBarcode } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import SummaryApi from "common";
import { toast } from "react-toastify";
import { TbListDetails } from "react-icons/tb";
import CopyText from "src/app/utils/CopyText";

export function Customer({ customer, refresh }: { customer: any; refresh: any }) {
  const [singleCustomer, setCustomer] = useState({
    phone: "",
    customers: [],
    name: "",
    address: "",
  });
  const [badgeVariants, setBadgeVarians] = useState("secondary");
  // useEffect(() => {
  //   switch (customer?.status) {
  //     case "pending":
  //       setBadgeVarians("secondary")
  //       break;
  //     case "in_review":
  //       setBadgeVarians("secondary_orange");
  //       break;
  //     case "processing":
  //        setBadgeVarians("secondary_cyan")
  //       break;
  //     case "shipped":
  //        setBadgeVarians("secondary_indigo")
  //       break;
  //     case "delivered":
  //       setBadgeVarians("secondary_green")
  //       break;
  //     case "hold":
  //       setBadgeVarians("secondary_lime")
  //       break;
  //     case "canceled":
  //       setBadgeVarians("secondary_red");
  //       break;
  //     default:
  //       setBadgeVarians("secondary")  
  //   }
  // }, [customer]);

  //change Statue
  // const handleSelectChange = async (value: string) => {
  //   const status = { status: value };
  //   const data = { ...singleCustomer, ...status };
  //   const dataResponse = await fetch(SummaryApi.updatecustomer.url, {
  //     method: SummaryApi.updatecustomer.method,
  //     credentials: "include",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   const dataApi = await dataResponse.json();

  //   if (dataApi.success) {
  //     toast.success(dataApi.message);
  //     refresh();
  //   }

  //   if (dataApi.error) {
  //     toast.error(dataApi.message);
  //   }
  // };

  return (
    <>
      <TableRow>
        <TableCell className="hidden md:table-cell">{moment(customer?.createdAt).format("MMM D, YYYY")}</TableCell>
        <TableCell className="font-medium">{customer?.name}
        </TableCell>
        <TableCell><CopyText className="cursor-pointer" text={`${customer?.phone}`} /></TableCell>
        <TableCell className="hidden md:table-cell truncate">{customer?.address}</TableCell>
        <TableCell className="text-center"><Badge variant={(customer?.types === 'new' ? "default_violet" : customer?.types === "regular" ? "default" : "destructive") as "default_violet" | "default" | "destructive"} className="uppercase">{customer?.types}</Badge></TableCell>
        <TableCell className="text-center"><Badge>{customer?.orders.length}</Badge></TableCell>
        <TableCell className="hidden md:table-cell text-center">{customer?.totalPendingOrders}
        </TableCell>
        <TableCell className="hidden md:table-cell text-center">
          {customer?.totalDeliveredOrders}
        </TableCell>
        <TableCell className="hidden md:table-cell text-center">
          {customer?.totalCanceledOrders}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Link href={`/customers/edit/id?${customer?._id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <FaRegEdit />
                  Edit
                </DropdownMenuItem>
              </Link>
              <Link href={`/customers/id?${customer?._id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <TbListDetails />
                  Details
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <AiOutlineDelete />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem>
                {/* <form action={deleteProduct}>
                <button type="submit">Delete</button>
              </form> */}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
}

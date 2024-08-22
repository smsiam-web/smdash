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
import { useState } from "react";
import SummaryApi from "common";
import { toast } from "react-toastify";
import { TbListDetails } from "react-icons/tb";
import CopyText from "src/app/utils/CopyText";
import { Skeleton } from "../../components/ui/skeleton"

export function Orders({
  order,
  refresh,
}: {
  order: any;
  refresh: any;
}) {
  const [singleOrder, setOrder] = useState({
    deliveryType: "",
    contact: "",
    items: [],
    name: "",
    address: "",
    totalAmount: "",
    paidAmount: "",
    discount: "",
    conditionAmount: "",
    courier: "",
    status: "",
    note: "",
    createdBy: "",
  });

  //change Statue
  const handleSelectChange = async (value: string) => {
    const status = { status: value };
    const data = { ...singleOrder, ...status };
    const dataResponse = await fetch(SummaryApi.updateOrder.url, {
      method: SummaryApi.updateOrder.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      refresh();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  

  return (
    <>
      <TableRow>
        <TableCell>{moment(order?.createdAt).format("MMM D, YYYY")}</TableCell>
        <TableCell className="font-medium "><CopyText className="cursor-pointer" text={`${order?.orderId}`} /></TableCell>
        <TableCell className="hidden sm:table-cell">{order?.courier}</TableCell>
        <TableCell>{order?.name}</TableCell>
        <TableCell>{order?.contact}</TableCell>
        <TableCell>
          <Badge className="uppercase">{order?.deliveryType}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {formatCurrencyLocale(order?.discount)}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {formatCurrencyLocale(order?.paidAmount)}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {formatCurrencyLocale(order?.conditionAmount)}
        </TableCell>
        <TableCell>
          <Badge color="gray" variant="secondary" className="capitalize">
            {order?.status}
          </Badge>
        </TableCell>
        <TableCell>
          <Select
            onValueChange={handleSelectChange}
            onOpenChange={() => setOrder(order)}
            value={order?.status}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="in_review">in_review</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="hold">Hold</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="fake">Fake</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </TableCell>

        <TableCell>{order?.createdBy}</TableCell>
        <TableCell>
          <Link href={`/orders/id?${order?._id}`}>
            <div className="flex items-center justify-center cursor-pointer">
              <RiFileDownloadLine />
            </div>
          </Link>
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
              <DropdownMenuItem>
                <AiOutlinePrinter />
                Print invoice
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CiBarcode />
                Print lable
              </DropdownMenuItem>
              <Link href={`/orders/edit/id?${order?._id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <FaRegEdit />
                  Edit
                </DropdownMenuItem>
              </Link>
              <Link href={`/orders/id?${order?._id}`}>
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

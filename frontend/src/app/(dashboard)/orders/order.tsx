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
import { AnyNsRecord } from "dns";

type Customer = {
  _id: string;
  address: string;
  name: string;
  orderReports: string[];
  orders: string[];
  phone: string;
  types: string;
  totalCanceledOrders: number;
  totalDeliveredOrders: number;
  totalFakeOrders: number;
};

export function Orders({ order, refresh }: { order: any; refresh: any }) {
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
  const [badgeVariants, setBadgeVarians] = useState("secondary");
  useEffect(() => {
    switch (order?.status) {
      case "pending":
        setBadgeVarians("secondary");
        break;
      case "in_review":
        setBadgeVarians("secondary_orange");
        break;
      case "processing":
        setBadgeVarians("secondary_cyan");
        break;
      case "shipped":
        setBadgeVarians("secondary_indigo");
        break;
      case "delivered":
        setBadgeVarians("secondary_green");
        break;
      case "hold":
        setBadgeVarians("secondary_lime");
        break;
      case "canceled":
        setBadgeVarians("secondary_red");
        break;
      default:
        setBadgeVarians("secondary");
    }
  }, [order]);
  const [customer, setCustomer] = useState<Customer[]>([]);

  //fetch Customer
  const searchCustomer = async (phone: string, _id: string, status: any) => {
    if (!phone) return; // Prevent fetching if search query is not available
    const response = await fetch(`${SummaryApi.searchCustomer.url}?q=${phone}`);
    const dataResponse = await response.json();

    console.log(status);

    if (dataResponse.success) {
      let orders: any[] = [];
      await dataResponse?.data[0]?.orders.map((i: any) => {
        if (i?.orderId === _id) {
          orders.push({ ...i, ...status });
        } else {
          orders.push({ ...i });
        }
      });
      const order = { orders: orders };
      const data = { ...dataResponse.data[0], ...order };

      const updateCustomerRes = await fetch(SummaryApi.updateCustomer.url, {
        method: SummaryApi.updateCustomer.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const customerUpdateApi = await updateCustomerRes.json();

      if (customerUpdateApi.success) {
        // toast.success(customerUpdateApi.message);
        console.log(customerUpdateApi?.data);
        refresh();
      }

      if (customerUpdateApi.error) {
        toast.error(customerUpdateApi.message);
      }
    }
  };

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
      searchCustomer(dataApi.data.contact, dataApi.data._id, status);
      toast.success(dataApi.message);
      // refresh();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <>
      <TableRow className="text-xs sm:text-base">
        <TableCell>{moment(order?.createdAt).format("MMM D, YYYY")}</TableCell>
        <TableCell className="font-medium">
          <CopyText className="cursor-pointer" text={`${order?.orderId}`} />
        </TableCell>
        <TableCell className="hidden sm:table-cell">{order?.courier}</TableCell>
        <TableCell>{order?.name}</TableCell>
        <TableCell>{order?.contact}</TableCell>
        <TableCell className="text-center hidden sm:table-cell">
          <Badge
            variant={
              (order?.deliveryType === "home"
                ? "default_violet"
                : order?.deliveryType === "point"
                ? "default"
                : "default_green") as
                | "default_violet"
                | "default_green"
                | "default"
            }
            className="uppercase"
          >
            {order?.deliveryType}
          </Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {formatCurrencyLocale(order?.discount)}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {formatCurrencyLocale(order?.paidAmount)}
        </TableCell>
        <TableCell>{formatCurrencyLocale(order?.conditionAmount)}</TableCell>
        <TableCell className="hidden sm:table-cell">
          <Badge variant={badgeVariants as "secondary"} className="capitalize">
            {order?.status}
          </Badge>
        </TableCell>
        <TableCell>
          <Select
            onValueChange={handleSelectChange}
            onOpenChange={() => setOrder(order)}
            value={order?.status}
          >
            <SelectTrigger className="w-[100px] sm:w-[140px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_review">in_review</SelectItem>
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

              <Link href={`/orders/id?${order?._id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <TbListDetails />
                  Details
                </DropdownMenuItem>
              </Link>
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

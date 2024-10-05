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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Textarea } from "../../components/ui/textarea";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "../../components/ui/table";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import SummaryApi from "common";
import { toast } from "react-toastify";
import { TbListDetails } from "react-icons/tb";
import CopyText from "src/app/utils/CopyText";
import { FaUsersSlash, FaUserTie } from "react-icons/fa";
import { Input } from "src/app/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "src/app/redux/slices/userSlice";

const formSchema = z.object({
  invoiceID: z.string().min(2, {
    message: "Order ID must be at least 5 characters.",
  }),
  reportDetails: z.string().min(2, {
    message: "Report details must be at least 5 characters.",
  }),
});

export function Customer({
  customer,
  refresh,
}: {
  customer: any;
  refresh: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [selectCustomer, setSelectCustomer] = useState<any>([]);
  const user = useSelector(selectUser);

  // change Statue
  const updateCustomer = async (data: any) => {
    const dataResponse = await fetch(SummaryApi.updateCustomer.url, {
      method: SummaryApi.updateCustomer.method,
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

  const toggleState = (customer: any) => {
    setSelectCustomer(customer);
    setIsOpen((prev) => !prev);
  };
  const markAsNew = (customer: any) => {
    setSelectCustomer(customer);
    setIsNew(true);
    setIsOpen((prev) => !prev);
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceID: "",
      reportDetails: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
      // Accessing selectCustomer directly from state
  if (!selectCustomer) {
    toast.error("Customer not selected");
    return;
  }
    setIsOpen(false);
    console.log(selectCustomer)
    const order = selectCustomer?.orders;
    const reportBy = user?.name;
    const report = { ...values, reportBy: reportBy };
    const data = { ...selectCustomer, report: [...(selectCustomer?.report || []), report], types: "fraud" };
    const foundOrder = order?.find((i: any) => i.invoiceID === values.invoiceID);


    if (foundOrder) {
      updateCustomer(data);
    } else {
      toast.error("Order not found");
    }
  }
  const removeFromFraud = () => {
    setIsOpen(false);
    const reportBy = user?.name || "Unknown";
    const existingReport = selectCustomer?.report[0] || {};
    const reportDetails = existingReport.reportDetails || "";
    const invoiceID = existingReport.invoiceID || "";

    // Construct the new report details
    const report = {
      reportDetails: `${invoiceID}, ${reportDetails}. Marked as new from fraud.`,
      reportBy: reportBy,
    };
    const updatedCustomer = {
      ...selectCustomer,
      report: [...(selectCustomer?.report || []), report], // Append the new report
      types: "new", // Update the type
    };
    updateCustomer(updatedCustomer);
  };

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Report Customer.</AlertDialogTitle>
            <AlertDialogDescription>
              Customer Type:{" "}
              <Badge
                variant={
                  (customer?.types === "new"
                    ? "default_violet"
                    : customer?.types === "regular"
                    ? "default"
                    : "destructive") as
                    | "default_violet"
                    | "default"
                    | "destructive"
                }
                className="uppercase mr-2"
              >
                {customer?.types}
              </Badge>
              {isNew && customer?.types === "fraud" &&
                `Marked by: ${selectCustomer?.report[0]?.reportBy}`}
              .
            </AlertDialogDescription>
            <AlertDialogDescription>
              Name: {selectCustomer.name}.
            </AlertDialogDescription>
            <AlertDialogDescription>
              Contact: {selectCustomer.phone}.
            </AlertDialogDescription>
            {isNew ? (
              <>
                <Input
                  placeholder="order id"
                  disabled
                  defaultValue={selectCustomer?.report[0]?.invoiceID}
                />
                <Textarea
                  defaultValue={selectCustomer?.report[0]?.reportDetails}
                  disabled
                  placeholder="Report details..."
                />
                <AlertDialogDescription>
                  Are you sure you want to mark as "REGULAR" this customer?
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={() => removeFromFraud()}>
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="invoiceID"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="order id" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reportDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Report details..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                          Are you sure you want to report against this customer?
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction type="submit">Submit</AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </Form>
            )}
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      <TableRow>
        <TableCell className="hidden md:table-cell">
          {moment(customer?.createdAt).format("MMM D, YYYY")}
        </TableCell>
        <TableCell className="font-medium">{customer?.name}</TableCell>
        <TableCell>
          <CopyText className="cursor-pointer" text={`${customer?.phone}`} />
        </TableCell>
        <TableCell className="hidden md:table-cell truncate">
          {customer?.address}
        </TableCell>
        <TableCell className="text-center">
          <Badge
            variant={
              (customer?.types === "new"
                ? "default_violet"
                : customer?.types === "regular"
                ? "default"
                : "destructive") as "default_violet" | "default" | "destructive"
            }
            className="uppercase"
          >
            {customer?.types}
          </Badge>
        </TableCell>
        <TableCell className="text-center">
          <Badge>{customer?.orders.length}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell text-center">
          {customer?.totalPendingOrders}
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
              {customer?.types === "fraud" ? (
                <DropdownMenuItem onClick={() => markAsNew(customer)}>
                  <FaUserTie />
                  Mark as New
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => toggleState(customer)}>
                  <FaUsersSlash />
                  Mark as Farud
                </DropdownMenuItem>
              )}
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

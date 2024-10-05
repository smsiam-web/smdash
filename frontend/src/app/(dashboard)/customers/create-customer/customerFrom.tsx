"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "src/app/components/ui/input";
import { Button } from "@radix-ui/themes";
import { Loader2 } from "lucide-react";
import { Label } from "../../../components/ui/label";
import { Textarea } from "src/app/components/ui/textarea";
import SummaryApi from "common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "src/app/redux/slices/userSlice";
import { useRouter, useSearchParams } from "next/navigation";
import CustomerCard from "../../orders/place-order/customerCard";

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

const phoneRegex = new RegExp(/^(?:\+?88)?01[3-9]\d{8}$/);

const formSchema = z.object({
  contact: z.string().regex(phoneRegex, "Invalid Number!"),
  name: z.string().min(3, {
    message: "Name is a required field",
  }),
  address: z.string().min(4, {
    message: "Address is a required field",
  }),
  createdBy: z
    .string()
    .min(3, {
      message: "User must be at least 3 characters",
    })
    .default("Admin"),
});

const CustomerForm = () => {
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [customer, setCustomer] = useState<Customer[]>([]);
  const user = useSelector(selectUser);

  const router = useRouter();
  const searchParams = useSearchParams();

  const fullPath = searchParams.toString();
  const path = fullPath.replace(/=/g, "");

  //fetch Customer
  const searchCustomer = async (phone: string) => {
    if (!phone) return; // Prevent fetching if search query is not available
    setLoading(true);
    const response = await fetch(`${SummaryApi.searchCustomer.url}?q=${phone}`);
    const dataResponse = await response.json();

    if (dataResponse?.data?.length) {
      setIsUpdate(true);
      toast.success("Customer alredy exists");
      setCustomer(dataResponse.data);
    }
    setLoading(false);
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact: "",
      name: "",
      address: "",
      createdBy: `${user?.name}`,
    },
  });

  const phone = form.watch("contact");
  useEffect(() => {
    if (phone.length < 11) {
      setCustomer([]);
    } else {
      searchCustomer(phone);
    }
  }, [phone]);
  useEffect(() => {
    setCustomer([]);
    setIsUpdate(false);
  }, [phone]);

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    if (isUpdate) {
      const updateData = { ...customer[0], ...values };

      const dataResponse = await fetch(SummaryApi.updateCustomer.url, {
        method: SummaryApi.updateCustomer.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const customerUpdateApi = await dataResponse.json();

      if (customerUpdateApi.success) {
        toast.success(customerUpdateApi.message);
      }

      if (customerUpdateApi.error) {
        toast.error(customerUpdateApi.message);
      }
    } else {
      const customerData = {
        name: values?.name,
        phone: values?.contact,
        address: values?.address,
        types: "new",
      };

      const customerResponse = await fetch(SummaryApi.createCustomer.url, {
        method: SummaryApi.createCustomer.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(customerData),
      });
      const customerApi = await customerResponse.json();

      if (customerApi.success) {
        form.reset();
        toast.success(customerApi?.message);
      }
      if (customerApi.error) {
        toast.error(customerApi.message);
      }
    }

    setLoading(false);
  };

  const handleReset = async () => {
    if (isUpdate) {
      searchCustomer(phone);
    } else {
      form.reset(); // Resets the form fields to their default values
      setCustomer([]);
      setIsUpdate(false);
    }
  };

  useEffect(() => {
    if (!customer.length) return;
    form.setValue("name", customer[0].name);
    form.setValue("address", customer[0].address);
  }, [customer]);

  return (
    <>
      {!!customer.length && <CustomerCard customer={customer} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem className="pb-3">
                <Label>Contact Number</Label>
                <FormControl>
                  <Input
                    placeholder="+880"
                    className="hide-stepper"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="pb-3">
                <Label>Customer Name</Label>
                <FormControl>
                  <Input placeholder="name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="pb-3">
                <Label>Customer Address</Label>
                <FormControl>
                  <Textarea
                    placeholder="address"
                    {...field}
                    className="resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            onClick={handleReset}
            className="w-full !mt-6 bg-orange-500 cursor-pointer"
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="w-full !mt-6 cursor-pointer bg-green-500"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isUpdate ? "Update" : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CustomerForm;

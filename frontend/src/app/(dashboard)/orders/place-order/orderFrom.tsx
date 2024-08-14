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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "src/app/components/ui/input";
import { Button } from "@radix-ui/themes";
import { Loader2 } from "lucide-react";
import { Label } from "../../../components/ui/label";
import DeepEqual from "../../../../../utils/helpers";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Textarea } from "src/app/components/ui/textarea";
import SummaryApi from "common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "src/app/redux/slices/userSlice";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const phoneRegex = new RegExp(/^(?:\+?88)?01[3-9]\d{8}$/);
// Define a schema for an array of objects
const productSchema = z.object({
  name: z.string(),
  age: z.number().min(0),
});

const formSchema = z.object({
  deliveryType: z
    .enum(["home", "point", "hub"], {
      required_error: "You need to select a delivery type.",
    })
    .default("home"),
  contact: z.string().regex(phoneRegex, "Invalid Number!"),
  name: z.string().min(3, {
    message: "Name is a required field",
  }),
  address: z.string().min(6, {
    message: "Address is a required field",
  }),
  items: z.array(productSchema).min(1, "Must have at least one product"),
  amount: z.string().min(0, {
    message: "Password must be at least 8 characters.",
  }),
  courier: z
    .string({
      required_error: "Please select a courier to display.",
    })
    .default("SteadFast"),
  status: z
    .string({
      required_error: "Please select a courier to display.",
    })
    .default("pending"),
  note: z.string().default("Note"),
  createdBy: z
    .string()
    .min(3, {
      message: "User must be at least 3 characters",
    })
    .default("Admin"),
});

const OrderFrom = () => {
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [order, setOrder] = useState({
    deliveryType: "home",
      contact: "",
      items: [],
      name: "",
      address: "",
      amount: "",
      courier: "SteadFast",
      status: "pending",
      note: "Note",
      createdBy: "",
  });
  const user = useSelector(selectUser);
  const searchParams = useSearchParams();

  const fullPath = searchParams.toString();
  const path = fullPath.replace(/=/g, "");

  //fetch Single Order
  const fetchOrderByID = async (path: any) => {
    setLoading(true);
    const response = await fetch(SummaryApi.singleOrder.url, {
      method: SummaryApi.singleOrder.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        orderId: path,
      }),
    });
    setLoading(false);
    const dataReponse = await response.json();
    form.reset(dataReponse?.data);
    setOrder(dataReponse?.data);
    setIsUpdate(true);
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryType: "home",
      contact: "",
      items: [
        { name: "Alice", age: 30 },
        { name: "Bob", age: 25 },
      ],
      name: "",
      address: "",
      amount: "",
      courier: "SteadFast",
      status: "pending",
      note: "Note",
      createdBy: `${user?.name}`,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    if (isUpdate) {
      const data = { ...order, ...values };
      const dataResponse = await fetch(SummaryApi.updateOrder.url,{
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
        form.reset();
        fetchOrderByID(path);
        //   await fetchUserDetails()
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      // const dataResponse = await fetch(SummaryApi.uploadOrder.url, {
      //   method: SummaryApi.uploadOrder.method,
      //   credentials: "include",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify(values),
      // });
      // const dataApi = await dataResponse.json();

      // if (dataApi.success) {
      //   toast.success(dataApi.message);
      //   form.reset();
      //   //   router.push('/')
      //   //   await fetchUserDetails()
      // }

      // if (dataApi.error) {
      //   toast.error(dataApi.message);
      // }
    }
    setLoading(false);
  };

  const handleReset = async () => {
    form.reset(); // Resets the form fields to their default values
  };

  useEffect(() => {
    fetchOrderByID(path);
  }, [path]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="deliveryType"
          render={({ field }) => (
            <FormItem className="space-y-2 pb-3">
              <FormLabel>Delivery type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-2 sm:flex gap-4"
                >
                  <FormItem className="flex items-center space-x-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="home" />
                    </FormControl>
                    <FormLabel className="font-normal">Home Delivery</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="point" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Point Delivery
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="hub" />
                    </FormControl>
                    <FormLabel className="font-normal">Hub Delivery</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="pb-3">
              <Label>Amount</Label>
              <FormControl>
                <Input
                  placeholder="amount"
                  className="hide-stepper"
                  min="0"
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
          name="courier"
          render={({ field }) => (
            <FormItem className="pb-3">
              <FormLabel>Delivery pratner</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select courier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Courier</SelectLabel>
                    <SelectItem value="SteadFast">SteadFast</SelectItem>
                    <SelectItem value="Pathao">Pathao</SelectItem>
                    <SelectItem value="RED-X">RED-X</SelectItem>
                    <SelectItem value="Sundorbon">Sundorbon</SelectItem>
                    <SelectItem value="HUB">HUB</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="pb-3">
              <Label>Note</Label>
              <FormControl>
                <Textarea
                  placeholder="note"
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
          className="w-full !mt-6"
          disabled={isUpdate}
        >
          Reset
        </Button>
        <Button
          type="submit"
          className="w-full !mt-6 cursor-pointer"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isUpdate ? "Update" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default OrderFrom;

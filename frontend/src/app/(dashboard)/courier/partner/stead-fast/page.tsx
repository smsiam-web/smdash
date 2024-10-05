"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { selectUser } from "src/app/redux/slices/userSlice";
import SummaryApi from "common";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Label } from "../../../../components/ui/label";
import { Input } from "src/app/components/ui/input";
import { Button } from "@radix-ui/themes";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

type data = {
  _id: string;
  api_key: string;
  secret_key: string;
  base_url: string;
  createdBy: string;
};

const formSchema = z.object({
  courier: z
    .string()
    .min(3, {
      message: "API-Key is a required field",
    })
    .default("sfcs"),
  api_key: z.string().min(10, {
    message: "API-Key is a required field",
  }),
  secret_key: z.string().min(10, {
    message: "Secret-Key is a required field",
  }),
  base_url: z.string().min(10, {
    message: "Base url is a required field",
  }),
  createdBy: z
    .string()
    .min(3, {
      message: "User must be at least 3 characters",
    })
    .default("Admin"),
});

const SteadFast = () => {
  const [loading, setLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [data, setData] = useState<data[]>([]);

  const user = useSelector(selectUser);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courier: "sfcs",
      api_key: "",
      secret_key: "",
      base_url: "",
      createdBy: `${user?.name}`,
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    if (!data.length) {
      const dataResponse = await fetch(SummaryApi.createSFCS.url, {
        method: SummaryApi.createSFCS.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const customerUpdateApi = await dataResponse.json();

      if (customerUpdateApi.success) {
        toast.success(customerUpdateApi.message);
        fetchSfcsDetails();
      }

      if (customerUpdateApi.error) {
        toast.error(customerUpdateApi.message);
      }
    } else {
      const sfc = { ...data[0], ...values };
      console.log(sfc);
      const dataResponse = await fetch(SummaryApi.updateSFCS.url, {
        method: SummaryApi.updateSFCS.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(sfc),
      });
      const customerUpdateApi = await dataResponse.json();

      if (customerUpdateApi.success) {
        toast.success(customerUpdateApi.message);
      }

      if (customerUpdateApi.error) {
        toast.error(customerUpdateApi.message);
      }
    }

    setLoading(false);
  };

  const handleReset = async () => {
    form.reset();
  };

  const fetchSfcsDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.getSFCS.url);

      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        setData(dataApi.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    /**sfcs Details */
    fetchSfcsDetails();
  }, []);

  useEffect(() => {
    if (!data.length) return;
    form.setValue("api_key", data[0].api_key);
    form.setValue("secret_key", data[0].secret_key);
    form.setValue("base_url", data[0].base_url);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl">
          SteadFast Courier Service
        </CardTitle>
        <CardDescription>Config courier and their API.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="api_key"
              render={({ field }) => (
                <FormItem className="pb-3">
                  <Label>API Key</Label>
                  <FormControl>
                    <>
                      <div className="relative">
                        <Input
                          placeholder="sfc api key"
                          className="hide-stepper"
                          type={showApiKey ? "text" : "password"}
                          {...field}
                        />
                        <span
                          className="absolute top-3 right-4 cursor-pointer"
                          onClick={() => setShowApiKey((preve) => !preve)}
                        >
                          {showApiKey ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secret_key"
              render={({ field }) => (
                <FormItem className="pb-3">
                  <Label>Secret Key</Label>
                  <FormControl>
                    <>
                      <div className="relative">
                        <Input
                          placeholder="secret key"
                          className="hide-stepper"
                          type={showSecret ? "text" : "password"}
                          {...field}
                        />
                        <span
                          className="absolute top-3 right-4 cursor-pointer"
                          onClick={() => setShowSecret((preve) => !preve)}
                        >
                          {showSecret ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="base_url"
              render={({ field }) => (
                <FormItem className="pb-3">
                  <Label>Base URL</Label>
                  <FormControl>
                    <Input placeholder="Base url" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href={"/courier"}>
              <Button
                type="button"
                className="w-full !mt-6 bg-red-500 cursor-pointer"
              >
                Cancel
              </Button>
            </Link>
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
              {!data.length ? "Submit" : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SteadFast;

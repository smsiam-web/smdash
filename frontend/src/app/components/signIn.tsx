"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import SummaryApi from "common";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/slices/userSlice";

const formSchema = z.object({
  email: z.string().email({
    message: "Inter valid emails",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
}

useEffect(() => {
  fetchUserDetails()
}, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dataResponse = await fetch(SummaryApi.signIn.url,{
      method : SummaryApi.signIn.method,
      credentials : 'include',
      headers : {
          "content-type" : "application/json"
      },
      body : JSON.stringify(values)
  })

  const dataApi = await dataResponse.json()
  console.log(dataApi)

  if(dataApi.success){
      toast.success(dataApi.message)
      router.push('/')
      await fetchUserDetails()
  }

  if(dataApi.error){
      toast.error(dataApi.message)
  }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <div className="relative">
                    <Input
                      placeholder="password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <span
                      className="absolute top-3 right-4 cursor-pointer"
                      onClick={() => setShowPassword((preve) => !preve)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full !mt-6" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign in
        </Button>
      </form>
    </Form>
  );
}

"use client"
import { Blockquote, Link, Quote, Separator, Text } from "@radix-ui/themes";
import { SignIn } from "../components/signIn";
import { SignUp } from "../components/signUp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Package2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const Auth = () => {
  const [signUp, setSignUp] = useState(false);

  return (
    <Provider store={store}>
    <Card className="w-full grid grid-cols-2 min-h-screen  border-none ">
      <Card className="col-span-2 md:col-span-1 hidden md:flex flex-col justify-between  inset-0 bg-foreground border-none rounded-none">
        <CardHeader className="md:flex flex-row  inset-0 ">
          <Package2 className="h-10 w-10 text-background" />
          <CardTitle className="pl-4 text-background">SM Dash</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
        <Image
          alt="Product image"
          height="400"
          src={'/login-dark.png'}
          width="400"
        />
        </CardContent>
        <CardFooter className="text-background max-w-xl flex flex-col items-start">
          <Blockquote>
            Ecommerce or <Quote>electronic commerce</Quote> is the trading of goods and
            services online. The internet allows individuals and businesses to
            buy and sell an increasing amount of physical goods, digital goods,
            and services electronically.
          </Blockquote>
          ---
          <CardTitle>Syed Siam Chowdhury</CardTitle>
        </CardFooter>
      </Card>

      <Card className="text-center col-span-2 md:col-span-1 place-content-center border-none rounded-none">
        <CardHeader className="absolute -top-2 right-0">
          <Button >
            {signUp ? "Sign up" : "Login"}
          </Button>
        </CardHeader>
        <CardContent className="max-w-[500px] mx-auto">
          <CardTitle className=" text-2xl md:text-3xl">
          {!signUp ? "Login" : "Create"} an account
          </CardTitle>
          <CardDescription className="pb-4">
            Enter your {signUp ? "username, email bleow to create" : "email below to login"} your account.
          </CardDescription>
          {signUp ? <SignUp /> : <SignIn />}
          
          <div className="px-8 md:px-12 sm:px-16 pt-4">
            <Text>
            {signUp ? "Already have an account." : "Don't have an account?"}{' '}
              <p className="inline text-indigo-500 cursor-pointer hover:underline underline-offset-1" onClick={()=>setSignUp(pre=>!pre)}>
              {!signUp ? "Sign up" : "Sign in"}
              </p>
              .
            </Text>
          </div>
          <div className="py-8 relative">
            <Separator orientation="horizontal" size="4" />
            <span className="bg-background px-4 absolute -translate-y-[58%] -translate-x-[50%]">
              Or continue with
            </span>
          </div>
          <div className="grid gap-3 pb-5">
            <Button className="w-full">Google</Button>
          </div>
          <div className="px-8 md:px-12 sm:px-16">
            <Text>
              By clicking continue, you agree to our{' '}
              <Link href="/terms" >
                Terms of Service{' '}
              </Link>
              and
              <Link href="/privacy" >
                {' '}Privacy Policy
              </Link>
              .
            </Text>
          </div>
        </CardContent>
      </Card>
    </Card>
    </Provider>
  );
};

export default Auth;

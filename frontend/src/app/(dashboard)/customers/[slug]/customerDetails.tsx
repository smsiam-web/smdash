"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

const CustomerDetails = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
      <Card className="col-span-1">
        <CardHeader>
          <div className="flex gap-5 items-center">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <CardTitle className="text-xl">Syed Siam Chowdhury</CardTitle>
              <CardDescription>
                Type:{" "}
                <Badge
                  variant={
                    ("new" === "new"
                      ? "default_violet"
                      : "regular" === "regular"
                      ? "default"
                      : "destructive") as
                      | "default_violet"
                      | "default"
                      | "destructive"
                  }
                  className="uppercase"
                >
                  New
                </Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="md:max-w-2xl max-w-[450px]"></CardContent>
      </Card>
      <div className="col-span-2">
        content
      </div>
    </div>
  );
};

export default CustomerDetails;

"use client";
import * as React from "react";
import { Button } from "../components/ui/button";
import { BellIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { NotificationsCard } from "./notification-card";

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <BellIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Notifications</span>
          <span className="flex h-4 w-4 translate-y-1 rounded-full bg-blue-500 absolute -top-2 -right-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-0">
        <NotificationsCard />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

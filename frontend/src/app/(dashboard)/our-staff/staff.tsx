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
import { useSelector } from "react-redux";
import { selectUser } from "src/app/redux/slices/userSlice";

export function Staff({
  staff,
  refresh,
}: {
  staff: any;
  refresh: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectStaff, setSelectStaff] = useState<any>([]);

  const user = useSelector(selectUser);

   // Update Staff
   const updateStaff = async (data: any) => {
    try {
      const response = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dataApi = await response.json();

      if (dataApi.success) {
        console.log(dataApi);
        toast.success(dataApi.message);
        refresh(); // Make sure `refresh` is defined in your scope
      } else {
        toast.error(dataApi.message || 'Unknown error');
      }
    } catch (error) {
      toast.error('An error occurred: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };
  //change Statue
  const handleSelectChange = async (value: string) => {
    const role = { role: value };
    const data = { ...selectStaff, ...role };
    updateStaff(data)
  };

  return (
    <>
      <TableRow>
        <TableCell className="hidden md:table-cell">
          {moment(staff?.createdAt).format("MMM D, YYYY")}
        </TableCell>
        <TableCell className="font-medium">{staff?.name}</TableCell>
        <TableCell className="font-medium">{staff?.email}</TableCell>
        <TableCell className="font-medium">{staff?.contact || "null"}</TableCell>
        <TableCell className="font-medium">{staff?.nid || "null"}</TableCell>
        <TableCell className="font-medium">{staff?.address || "null"}</TableCell>
        <TableCell className="text-center">
          <Badge
            variant={
              (staff?.role === "GENERAL"
                ? "secondary"
                : staff?.role === "ADMIN"
                ? "default"
                : "default_violet") as "default_violet" | "default" | "destructive"
            }
            className="uppercase"
          >
            {staff?.role}
          </Badge>
        </TableCell>
        <TableCell>
          <Select
            onValueChange={handleSelectChange}
            onOpenChange={() => setSelectStaff(staff)}
            value={staff?.role}
          >
            <SelectTrigger className="w-[100px] sm:w-[140px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup >
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="GENERAL">General</SelectItem>
                <SelectItem value="sales_excutive">Sales Excutive</SelectItem>

              </SelectGroup>
            </SelectContent>
          </Select>
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
              <Link href={`/out-staff/edit/id?${staff?._id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <FaRegEdit />
                  Edit
                </DropdownMenuItem>
              </Link>
              <Link href={`/out-staff/id?${staff?._id}`}>
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

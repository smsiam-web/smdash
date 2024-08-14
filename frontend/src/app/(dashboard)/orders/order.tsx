import Image from "next/image";
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
import formatCurrencyLocale from "utils/FormatCurrency";
import { RiFileDownloadLine } from "react-icons/ri";
import { AiOutlinePrinter } from "react-icons/ai";
import { CiBarcode } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import moment from "moment";
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
import Link from "next/link";

export function Orders({ order }: { order: any }) {

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">#{order?.orderId}</TableCell>
        <TableCell className="hidden sm:table-cell">{order?.courier}</TableCell>
        <TableCell>{order?.name}</TableCell>
        <TableCell>{order?.contact}</TableCell>
        <TableCell>
          <Badge className="uppercase">{order?.deliveryType}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          -{formatCurrencyLocale(400)}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {formatCurrencyLocale(order?.amount)}
        </TableCell>
        <TableCell>
          <Badge color="gray" variant="secondary">
            {order?.status}
          </Badge>
        </TableCell>
        <TableCell>
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="hold">Hold</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>{moment(order?.createdAt).format("MMM D, YYYY")}</TableCell>
        <TableCell>{order?.createdBy}</TableCell>
        <TableCell>
          <div className="flex items-center justify-center cursor-pointer">
            <RiFileDownloadLine />
          </div>
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

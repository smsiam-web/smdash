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

export function Orders({ product }: { product: any }) {
  return (
    <TableRow>
      <TableCell className="font-medium">#23205022</TableCell>
      <TableCell className="hidden sm:table-cell">SFC(905416516)</TableCell>
      <TableCell>Siam Chowdhury</TableCell>
      <TableCell>01722166051</TableCell>
      <TableCell>
        <Badge className="capitalize">Home</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        -{formatCurrencyLocale(400)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {formatCurrencyLocale(1230)}
      </TableCell>
      <TableCell>
        <Badge>Pending</Badge>
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
      <TableCell>{product.availableAt.toLocaleDateString()}</TableCell>
      <TableCell>Admin</TableCell>
      <TableCell>
        <RiFileDownloadLine />
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
            <DropdownMenuItem>
              <FaRegEdit />
              Edit
            </DropdownMenuItem>
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
  );
}

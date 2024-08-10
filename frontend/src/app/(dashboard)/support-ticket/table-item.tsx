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
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "../../components/ui/table";
import { Text } from "@radix-ui/themes";
// import { SelectProduct } from '@/lib/db';
// import { deleteProduct } from './actions';

export function TicketTableItem({ product }: { product: any }) {
  return (
    <TableRow>
      <TableCell>
        <Text>#26</Text>
      </TableCell>
      <TableCell>
        <Text>#90520450</Text>
      </TableCell>

      <TableCell className="font-medium flex items-center gap-2">
        <Image
          alt="Customer image"
          className="aspect-auto rounded-full object-cover"
          height="50"
          src={product.imageUrl}
          width="50"
        />
        {product.name}
      </TableCell>
      <TableCell className="font-medium truncate">
        I need help with adding a New Contact
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.status}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          High
        </Badge>
      </TableCell>
      <TableCell>Siam Chowdhury</TableCell>
      <TableCell>{product.availableAt.toLocaleDateString()}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
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

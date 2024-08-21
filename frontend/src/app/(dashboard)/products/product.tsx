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
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "../../components/ui/table";
import formatCurrencyLocale from "../../utils/FormatCurrency";
import { TbListDetails } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import SummaryApi from "common";
import { toast } from "react-toastify";
import Image from "next/image";

export function Products({
  product,
  fetchProduct,
}: {
  product: any;
  fetchProduct: any;
}) {
  const [singleProduct, setProduct] = useState({
    slug: "",
    stock: "",
    sku: "",
    unit: "",
    productName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  //change Statue
  const handleSelectChange = async (value: string) => {
    const status = { status: value };
    const data = { ...singleProduct, ...status };
    const dataResponse = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      fetchProduct();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <>
      <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
        //   className="aspect-square rounded-md object-cover"
          height="64"
          src={product?.productImage[0]}
          width="64"
        />
      </TableCell>
        
        <TableCell className="font-medium">{product?.sku}</TableCell>
        <TableCell className="hidden sm:table-cell">{product?.productName}</TableCell>
        <TableCell>{formatCurrencyLocale(product?.sellingPrice)}</TableCell>
        <TableCell className="hidden sm:table-cell">56</TableCell>
        <TableCell>
          <Badge className="uppercase">{product?.stock}</Badge>
        </TableCell>
        <TableCell className="hidden sm:table-cell">{moment(product?.createdAt).format("MMM D, YYYY")}</TableCell>
        <TableCell className="hidden sm:table-cell">Admin</TableCell>
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
              <Link href={`/products/edit/id?${product?._id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <FaRegEdit />
                  Edit
                </DropdownMenuItem>
              </Link>
              <Link href={`/products/id?${product?._id}`}>
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

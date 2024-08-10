"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "../../components/ui/table";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Orders } from "./order";

export function OrdersTable({
  products,
  offset,
  totalProducts,
}: {
  products: any[];
  offset: number;
  totalProducts: number;
}) {
  let router = useRouter();
  let productsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Courier ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Shipping Type</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Created by</TableHead>
            <TableHead>Invoice</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products &&
            products.map((product) => (
              <Orders key={product.id} product={product} />
            ))}
        </TableBody>
      </Table>

      <form className="flex items-center w-full justify-between">
        <div className="text-xs text-muted-foreground">
          Showing{" "}
          <strong>
            {Math.min(offset - productsPerPage, totalProducts) + 1}-{offset}
          </strong>{" "}
          of <strong>{totalProducts}</strong> products
        </div>
        <div className="flex">
          <Button
            formAction={prevPage}
            variant="ghost"
            size="sm"
            type="submit"
            disabled={offset === productsPerPage}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Prev
          </Button>
          <Button
            formAction={nextPage}
            variant="ghost"
            size="sm"
            type="submit"
            disabled={offset + productsPerPage > totalProducts}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </>
  );
}
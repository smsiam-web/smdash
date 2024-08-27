"use client";

import React, { useEffect, useState } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "../../components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
// import { Orders } from "./order";
import SummaryApi from "common";
import { Products } from "./product";

export function ProductTable() {
  const [allproduct, setAllProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  let router = useRouter();
  let pathname = useSearchParams();
  let path = usePathname();

  const fetchProduct = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${SummaryApi.products.url}?page=${page}&limit=10`
      );
      const data = await response.json();
      pathname.size !== 1 && setCurrentPage(data.currentPage);
      setAllProduct(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(allproduct);

  useEffect(() => {
    if (pathname.size === 1) {
      const p = (path + pathname).split("=")[1];
      const offset = Number(p);
      fetchProduct(offset);
      setCurrentPage(offset);
    } else {
      fetchProduct(1);
    }
  }, [pathname]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const cpage = Number(currentPage);
      setCurrentPage(cpage + 1);
      router.push(`/products?page=${cpage + 1}`, { scroll: false });
    }
  };

  const elements: JSX.Element[] = [];
  for (let i = 1; i <= totalPages; i++) {
    elements.push(
      <PaginationItem className="cursor-pointer">
        {currentPage == i ? (
          <PaginationLink size="icon" isActive>
            {i}
          </PaginationLink>
        ) : (
          <PaginationLink size="icon" onClick={() => handelDirectPage(i)}>
            {i}
          </PaginationLink>
        )}
      </PaginationItem>
    );
  }
  const handelDirectPage = (i: number) => {
    setCurrentPage(i);
    if (i === 1) {
      router.push(`/products`, { scroll: false });
    } else {
      router.push(`/products?page=${i}`, { scroll: false });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`/products?page=${currentPage - 1}`, { scroll: false });
      // router.back();
    }
    if (currentPage == 2) {
      router.push(`/products`, { scroll: false });
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden sm:table-cell"></TableHead>
            <TableHead>SKU</TableHead>
            <TableHead className="hidden sm:table-cell">Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="hidden sm:table-cell">Total Sell</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="hidden sm:table-cell">Created At</TableHead>
            <TableHead className="hidden sm:table-cell">Created By</TableHead>
            <TableHead>Actions</TableHead>

            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allproduct &&
            allproduct.map((product: any) => (
              <Products key={product?._id} product={product} fetchProduct={fetchProduct} />
            ))}
        </TableBody>
      </Table>

      <Pagination className="mt-3">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePreviousPage} />
          </PaginationItem>
          {elements}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

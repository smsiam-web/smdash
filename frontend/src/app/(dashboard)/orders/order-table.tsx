"use client";

import React, { useEffect, useState } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "../../components/ui/table";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Orders } from "./order";
import SummaryApi from "common";

export function OrdersTable() {
  const [orderss, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let router = useRouter();
  let pathname = useSearchParams();
  let path = usePathname();

  const fetchOrders = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${SummaryApi.orders.url}?page=${page}&limit=10`
      );
      const data = await response.json();
      pathname.size !== 1 && setCurrentPage(data.currentPage);
      setOrders(data.orders);
      setTotalPages(data.totalPages);
    } catch (error) {
      // setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pathname.size === 1) {
      const p = (path + pathname).split("=")[1];
      const offset = Number(p);
      fetchOrders(offset);
      setCurrentPage(offset)
    }else{
      fetchOrders(1)
    }
  },[pathname])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const cpage = Number(currentPage);
      setCurrentPage(cpage + 1);
      router.push(`/orders?page=${cpage + 1}`, { scroll: false });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`/orders?page=${currentPage - 1}`, { scroll: false });
      // router.back();
    }
    if (currentPage == 2) {
      router.push(`/orders`, { scroll: false });
    }
  };

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
          {orderss && orderss.map((order) => <Orders order={order} />)}
        </TableBody>
      </Table>

      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}

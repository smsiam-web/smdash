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
import { Orders } from "./order";
import SummaryApi from "common";
import { useDispatch } from "react-redux";
import { setStatusCount } from "src/app/redux/slices/statusSlice";
import OrderSkeliton from "./orderSkeliton";

export function OrdersTable(status: any) {
  const [allOrder, setAllOrders] = useState([]);
  const [statusCount, setStatusCounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [prevStatus, setPrevStatus] = useState("all");
  const [curStatus, setCurStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let router = useRouter();
  let pathname = useSearchParams();
  let path = usePathname();

  const setAllCount = async (data: any) => {
    const array1 = [
      {
        _id: "all",
        count: 0,
      },
      {
        _id: "in_review",
        count: 0,
      },
      {
        _id: "pending",
        count: 0,
      },
      {
        _id: "processing",
        count: 0,
      },
      {
        _id: "shipped",
        count: 0,
      },
      {
        _id: "delivered",
        count: 0,
      },
      {
        _id: "hold",
        count: 0,
      },
      {
        _id: "returned",
        count: 0,
      },
      {
        _id: "fake",
        count: 0,
      },
      {
        _id: "canceled",
        count: 0,
      },
    ];
    const statusCount = data.allStatusWiseCount;
    const allCount = {
      _id: "all",
      count: data.totalOrders,
    };
    const count = statusCount?.concat(allCount);

    const mergedCount = array1.map((obj1) => {
      const obj2 = count.find((obj: any) => obj._id === obj1._id);
      return obj2 ? { ...obj1, count: obj2.count } : obj1;
    });
    dispatch(setStatusCount(mergedCount));
  };

  //fetch All Order
  const fetchOrders = async (page: number) => {
    if (status.value !== "all") return;
    setLoading(true);
    try {
      const response = await fetch(
        `${SummaryApi.orders.url}?page=${page}&limit=10`
      );
      const data = await response.json();
      pathname.size !== 1 && setCurrentPage(data.currentPage);
      setStatusCounts(data.allStatusWiseCount)
      setAllOrders(data.orders);
      setTotalPages(data.totalPages);
      setAllCount(data);
    } catch (error) {
      // setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (status.value !== "all") return;
    console.log(prevStatus, curStatus);
    if (prevStatus !== curStatus) {
      router.push(`/orders`, { scroll: false });
      fetchOrders(1);
      setCurrentPage(1);
      setPrevStatus(curStatus);
    } else {
      if (pathname.size === 1) {
        const p = (path + pathname).split("=")[1];
        const offset = Number(p);
        fetchOrders(offset);
        setCurrentPage(offset);
      } else {
        fetchOrders(1);
      }
    }
  }, [pathname]);

  //fetch order by status wise
  const searchOrder = async (page: number) => {
    if (status.value === "all") return; // Prevent fetching if search query is not available
    // setAllOrders([]);
    setLoading(true);
    try {
      const statusRes = await fetch(
        `${SummaryApi.orders.url}?page=${page}&limit=10&q=${status.value}`
      );
      const statusResponse = await statusRes.json();
      pathname.size !== 1 && setCurrentPage(statusResponse.currentPage);
      setTotalPages(statusResponse.totalStatusPages);
      setAllOrders(statusResponse.orders);
      setAllCount(statusResponse);
    } catch (error) {
      //setError(error)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (status.value === "all") return;
    if (prevStatus !== curStatus) {
      router.push(`/orders`, { scroll: false });
      searchOrder(1);
      setCurrentPage(1);
      setPrevStatus(curStatus);
    } else {
      if (pathname.size === 1) {
        const p = (path + pathname).split("=")[1];
        const offset = Number(p);
        searchOrder(offset);
        setCurrentPage(offset);
      } else {
        searchOrder(1);
      }
    }
  }, [curStatus, pathname]);

  const refresh = async () => {
    await fetchOrders(currentPage);
    await searchOrder(currentPage);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const cpage = Number(currentPage);
      setCurrentPage(cpage + 1);
      router.push(`/orders?page=${cpage + 1}`, { scroll: false });
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
      router.push(`/orders`, { scroll: false });
    } else {
      router.push(`/orders?page=${i}`, { scroll: false });
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

  useEffect(() => {
    setCurStatus(status);
  }, []);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Created At</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Courier ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-center">Shipping Type</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Paid</TableHead>
            <TableHead>COD</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Created by</TableHead>
            <TableHead className="text-center">Invoice</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allOrder.length > 0
            ? allOrder.map((order: any) => (
                <Orders key={order._id} order={order} refresh={refresh} />
              ))
            : Array.from({ length: 10 }).map((_, index) => (
                <OrderSkeliton key={index} />
              ))}
        </TableBody>
      </Table>
      <Pagination className="mt-3">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious size="default" onClick={handlePreviousPage} />
          </PaginationItem>
          {elements}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext size="default" onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

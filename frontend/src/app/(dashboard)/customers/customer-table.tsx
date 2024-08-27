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
import SummaryApi from "common";
import { useDispatch } from "react-redux";
import { setStatusCount } from "src/app/redux/slices/statusSlice";
import { Customer } from "./customer";
import CustomerSkeliton from "./customerSkeliton";
// import OrderSkeliton from "./orderSkeliton";

export function CustomerTable(status: any) {
  const [allCustomer, setAllCustomer] = useState([]);
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
        _id: "new",
        count: 0,
      },
      {
        _id: "regular",
        count: 0,
      },
      {
        _id: "fraud",
        count: 0,
      },
    ];
    const statusCount = data.allTypeWiseCount;
    const allCount = {
      _id: "all",
      count: data.totalCustomer,
    };
    const count = statusCount?.concat(allCount);

    const mergedCount = array1.map((obj1) => {
      const obj2 = count.find((obj: any) => obj._id === obj1._id);
      return obj2 ? { ...obj1, count: obj2.count } : obj1;
    });
    dispatch(setStatusCount(mergedCount));
  };

  console.log(allCustomer)

  //fetch All Customers
  const fetchCustomers = async (page: number) => {
    if (status.value !== "all") return;
    setLoading(true);
    try {
      const response = await fetch(
        `${SummaryApi.customers.url}?page=${page}&limit=10`
      );
      const data = await response.json();
      pathname.size !== 1 && setCurrentPage(data.currentPage);
      setStatusCounts(data.allTypeWiseCount)
      setAllCustomer(data.customers);
      setTotalPages(data.totalPages);
      setAllCount(data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (status.value !== "all") return;
    if (prevStatus !== curStatus) {
      router.push(`/customers`, { scroll: false });
      fetchCustomers(1);
      setCurrentPage(1);
      setPrevStatus(curStatus);
    } else {
      if (pathname.size === 1) {
        const p = (path + pathname).split("=")[1];
        const offset = Number(p);
        fetchCustomers(offset);
        setCurrentPage(offset);
      } else {
        fetchCustomers(1);
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
          `${SummaryApi.customers.url}?page=${page}&limit=10&q=${status.value}`
        );
        const statusResponse = await statusRes.json();
        pathname.size !== 1 && setCurrentPage(statusResponse.currentPage);
        setTotalPages(statusResponse.totalStatusPages);
        setAllCustomer(statusResponse.customers);
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
        router.push(`/customers`, { scroll: false });
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
    await fetchCustomers(currentPage);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const cpage = Number(currentPage);
      setCurrentPage(cpage + 1);
      router.push(`/customers?page=${cpage + 1}`, { scroll: false });
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
      router.push(`/customers`, { scroll: false });
    } else {
      router.push(`/customers?page=${i}`, { scroll: false });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`/customers?page=${currentPage - 1}`, { scroll: false });
      // router.back();
    }
    if (currentPage == 2) {
      router.push(`/customers`, { scroll: false });
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
            <TableHead className="hidden md:table-cell">Created At</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="hidden md:table-cell">Address</TableHead>
            <TableHead className="text-center">Types</TableHead>
            <TableHead className="text-center">Total Orders</TableHead>
            <TableHead className="hidden md:table-cell text-center">Pending</TableHead>
            <TableHead className="hidden md:table-cell text-center">Delivered</TableHead>
            <TableHead className="hidden md:table-cell text-center">Canceled</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCustomer?.length > 0
            ? allCustomer.map((customer: any) => (
                <Customer key={customer._id} customer={customer} refresh={refresh} />
              ))
            : Array.from({ length: 10 }).map((_, index) => (
                <CustomerSkeliton key={index} />
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
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
import { toast } from "react-toastify";
import StaffSkeliton from "./staff-skeliton";
import { Staff } from "./staff";

export function StaffTable(role: any) {
  const [allStaff, setAllStaff] = useState([]);
  const [statusCount, setStatusCounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [prevStatus, setPrevStatus] = useState("all");
  const [curStatus, setRole] = useState("");
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
          _id: "ADMIN",
          count: 0,
        },
        {
          _id: "GENERAL",
          count: 0,
        },
        {
          _id: "SALES",
          count: 0,
        },
      ];
      const roleCount = data.allRoleWise;
      const allCount = {
        _id: "all",
        count: data.totalUser,
      };
      const count = roleCount?.concat(allCount);
  
      const mergedCount = array1.map((obj1) => {
        const obj2 = count.find((obj: any) => obj._id === obj1._id);
        return obj2 ? { ...obj1, count: obj2.count } : obj1;
      });
      dispatch(setStatusCount(mergedCount));
    };

  //fetch All Staff
  const fetchAllStaff = async (page: number) => {
    if (role.value !== "all") return;
    setLoading(true);
    try {
      const response = await fetch(
        `${SummaryApi.users.url}?page=${page}&limit=10`
      );
      const data = await response.json();
      console.log(data)
      pathname.size !== 1 && setCurrentPage(data.currentPage);
      setStatusCounts(data.allRoleWise)
      setAllStaff(data.user);
      setTotalPages(data.totalPages);
      setAllCount(data);
    } catch (error) {
      toast.error('An error occurred: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (role.value !== "all") return;
    if (prevStatus !== curStatus) {
      router.push(`/our-staff`, { scroll: false });
      fetchAllStaff(1);
      setCurrentPage(1);
      setPrevStatus(curStatus);
    } else {
      if (pathname.size === 1) {
        const p = (path + pathname).split("=")[1];
        const offset = Number(p);
        fetchAllStaff(offset);
        setCurrentPage(offset);
      } else {
        fetchAllStaff(1);
      }
    }
  }, [pathname]);

    //fetch staff by status wise
    const searchStaff = async (page: number) => {
      if (role.value === "all") return; // Prevent fetching if search query is not available
      // setAllOrders([]);
      setLoading(true);
      try {
        const statusRes = await fetch(
          `${SummaryApi.users.url}?page=${page}&limit=10&q=${role.value}`
        );
        const statusResponse = await statusRes.json();
        pathname.size !== 1 && setCurrentPage(statusResponse.currentPage);
        setTotalPages(statusResponse.totalStatusPage);
        setAllStaff(statusResponse.user);
        // setAllCount(statusResponse);
      } catch (error) {
        toast.error('An error occurred: ' + (error instanceof Error ? error.message : 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      if (role.value === "all") return;
      if (prevStatus !== curStatus) {
        router.push(`/customers`, { scroll: false });
        searchStaff(1);
        setCurrentPage(1);
        setPrevStatus(curStatus);
      } else {
        if (pathname.size === 1) {
          const p = (path + pathname).split("=")[1];
          const offset = Number(p);
          searchStaff(offset);
          setCurrentPage(offset);
        } else {
          searchStaff(1);
        }
      }
    }, [curStatus, pathname]);

  const refresh = async () => {
    await fetchAllStaff(currentPage);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const cpage = Number(currentPage);
      setCurrentPage(cpage + 1);
      router.push(`/our-staff?page=${cpage + 1}`, { scroll: false });
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
      router.push(`/our-staff`, { scroll: false });
    } else {
      router.push(`/our-staff?page=${i}`, { scroll: false });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`/our-staff?page=${currentPage - 1}`, { scroll: false });
      // router.back();
    }
    if (currentPage == 2) {
      router.push(`/our-staff`, { scroll: false });
    }
  };

  useEffect(() => {
    setRole(role);
  }, []);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden md:table-cell">Created At</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Mail</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>NID</TableHead>
            <TableHead className="hidden md:table-cell">Address</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { allStaff?.length > 0
            ? allStaff.map((staff: any) => (
                <Staff key={staff._id} staff={staff} refresh={refresh} />
              ))
            : Array.from({ length: 10 }).map((_, index) => (
                <StaffSkeliton key={index} />
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
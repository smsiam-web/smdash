"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "../../components/ui/table";
import { PRODUCTS } from "../../components/config";

import React from 'react'
import { TicketTableItem } from "./table-item";

const TicketTable = ({
  products,
  offset,
  totalProducts,
}: {
  products: any[];
  offset: number;
  totalProducts: number;
}) => {
  return (
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Courier ID</TableHead>
        {/* <TableHead className="hidden w-[100px] sm:table-cell">
          <span className="sr-only">Image</span>
        </TableHead> */}
        <TableHead>Customer Name</TableHead>
        <TableHead>Subject</TableHead>
        <TableHead>Status</TableHead>
        <TableHead >Priority</TableHead>
        <TableHead >Assignee</TableHead>
        <TableHead >Created at</TableHead>
        <TableHead >Action</TableHead>
        {/* className="hidden md:table-cell */}

        <TableHead>
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {PRODUCTS &&
        PRODUCTS.map((product) => (
          <TicketTableItem key={product.id} product={product} />
        ))}
    </TableBody>
  </Table>
  )
}

export default TicketTable
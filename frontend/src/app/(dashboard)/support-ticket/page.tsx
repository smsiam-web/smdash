import { File, PlusCircle, TicketIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import TicketCard from "./ticket-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { ComboboxPopover } from "./combobox";
import TicketTable from "./ticket-table";
import { PRODUCTS } from "../../components/config";
import { Button } from "../../components/ui/button";
import { Box, Flex } from "@radix-ui/themes";

const SupportTicket = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-bold tracking-tight lg:text-4xl">
          All Ticket Summary
        </CardTitle>
        <CardDescription>The Updates about Support Tickets</CardDescription>
      </CardHeader>
      <CardContent>
        <TicketCard />
      </CardContent>
      <CardHeader>
        <CardTitle className="scroll-m-20 text-xl sm:text-2xl font-bold tracking-tight lg:text-3xl">
          All Support Tickets
        </CardTitle>
        <CardDescription>List of ticket opened by Customer</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <div className="flex flex-col gap-5 sm:flex-row sm:justify-between">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="archived">Closed</TabsTrigger>
            </TabsList>
            <Flex gap="4" className="self-end !items-stretch">
              
                <ComboboxPopover />
              
              <Button size="sm" className="h-[40px] gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sm:whitespace-nowrap">Create Ticket</span>
              </Button>
            </Flex>
          </div>

          <TabsContent value="all" className="overflow-x-scroll">
            <TicketTable products={PRODUCTS} offset={0} totalProducts={10} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SupportTicket;

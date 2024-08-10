"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TicketIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Grid } from "@radix-ui/themes";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
const chartData = [
  { month: "January", ticket: 60 },
  { month: "February", ticket: 140 },
  { month: "March", ticket: 100 },
  { month: "April", ticket: 180 },
  { month: "May", ticket: 90 },
  { month: "June", ticket: 140 },
  { month: "January", ticket: 80 },
  { month: "February", ticket: 200 },
  { month: "March", ticket: 120 },
  { month: "April", ticket: 220 },
];
const chartConfig = {
  ticket: {
    label: "Tickets",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const TicketCard = () => {
  return (
    <Grid columns={{ initial: "1", sm: "3", md: "6" }} gap="5" width="auto">
      <Card>
        <CardHeader className="flex items-center">
          <TicketIcon className="h-14 w-14 text-green-400" />
          <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-4xl">
            2458
          </CardTitle>
          <CardDescription>Total No.of Tickets</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex items-center">
          <TicketIcon className="h-14 w-14 text-orange-400" />
          <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-4xl">
            12
          </CardTitle>
          <CardDescription>New Tickets</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex items-center">
          <TicketIcon className="h-14 w-14 text-indigo-400" />
          <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-4xl">
            26
          </CardTitle>
          <CardDescription>Pending Tickets</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex items-center">
          <TicketIcon className="h-14 w-14 text-purple-400" />
          <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-4xl">
            254
          </CardTitle>
          <CardDescription>Closed Tickets</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="p-0 pt-1 pl-4">
          <CardDescription>grass sales</CardDescription>
          <CardTitle>$124.26</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="ticket"
                type="natural"
                fill="var(--color-ticket)"
                fillOpacity={0.4}
                stroke="var(--color-ticket)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
      <CardHeader className="p-0 pt-1 pl-4">
          <CardDescription>Total Tickets</CardDescription>
          <CardTitle>2458</CardTitle>
        </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="ticket" fill="var(--color-ticket)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      </Card>
    </Grid>
  );
};

export default TicketCard;

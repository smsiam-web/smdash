"use client";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Text, TicketIcon } from "lucide-react";
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
import { LuLayers } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { BsCashCoin } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";
import formatCurrencyLocale from "utils/FormatCurrency";

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

const OrderCard = ({sales} : {sales: any} ) => {

  return (
    <Grid columns={{ initial: "1", sm: "3", md: "6" }} gap="5" width="auto">
      <Card>
        <CardHeader className="flex items-center">
          <LuLayers className="h-12 w-12 text-green-400" />
          <h1>Today Orders</h1>
          <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-4xl flex items-center">
            {formatCurrencyLocale(sales?.todaySales)}
          </CardTitle>
          <CardDescription className="font-normal">
            <span>Paid : 0.00  </span>
            <span>COD : 0.00</span>            
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex items-center">
          <LuLayers className="h-12 w-12 text-orange-400" />
          <h1>Yesterday Orders</h1>
          <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-4xl flex items-center">
            {formatCurrencyLocale(sales?.yesterdaySales)}
          </CardTitle>
          <CardDescription className="font-normal">
            <span>Paid : 0.00  </span>
            <span>COD : 0.00</span>            
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="flex items-center">
          <FiShoppingCart className="h-12 w-12 text-indigo-400" />
          <h1>This Month</h1>
          <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-4xl">
          {formatCurrencyLocale(sales?.thisMonthSales)}
          </CardTitle>
          <CardDescription className="font-normal">
            <span>Paid : 0.00  </span>
            <span>COD : 0.00</span>            
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex items-center">
          <BsCashCoin className="h-12 w-12 text-purple-400" />
          <h1>All-Time Sales</h1>
          <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-4xl">
          {formatCurrencyLocale(sales?.totalSales)}
          </CardTitle>
          <CardDescription className="font-normal">
            <span>Paid : 0.00  </span>
            <span>COD : 0.00</span>            
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="p-0 pt-1 pl-4">
          <CardDescription>grass sales</CardDescription>
          <CardTitle>{formatCurrencyLocale(4664)}</CardTitle>
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
          <CardDescription>Total Orders</CardDescription>
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

export default OrderCard;
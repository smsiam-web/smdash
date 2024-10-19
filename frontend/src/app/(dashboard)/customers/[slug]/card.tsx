import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Grid } from "@radix-ui/themes";
import { LuLayers } from 'react-icons/lu';
import formatCurrencyLocale from 'src/app/utils/FormatCurrency';
import { ClipboardMinus, CopyCheck  } from 'lucide-react';

const CustomerCard = () => {
  return (
    <Grid columns={{ initial: "1", sm: "2", md: "4" }} gap="5" width="full">
    <Card>
      <CardHeader className="flex items-center">
        <LuLayers className="h-12 w-12 text-green-400" />
        <h1>Total Sales</h1>
        <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-4xl flex items-center">
          {formatCurrencyLocale(200)}
        </CardTitle>
      </CardHeader>
    </Card>
    <Card>
      <CardHeader className="flex items-center">
        <LuLayers className="h-12 w-12 text-green-400" />
        <h1>Total Order</h1>
        <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-4xl flex items-center">
          4
        </CardTitle>
      </CardHeader>
    </Card>
    <Card>
      <CardHeader className="flex items-center">
        <CopyCheck className="h-12 w-12 text-green-400" />
        <h1>Success Rate</h1>
        <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-4xl flex items-center">
          100%
        </CardTitle>
      </CardHeader>
    </Card>
    <Card>
      <CardHeader className="flex items-center">
        <ClipboardMinus className="h-12 w-12 text-green-400" />
        <h1>Report</h1>
        <CardTitle className="scroll-m-20 text-2xl sm:text-3xl font-extrabold tracking-tight lg:text-4xl flex items-center">
          0
        </CardTitle>
      </CardHeader>
    </Card>
  </Grid>
  )
}

export default CustomerCard
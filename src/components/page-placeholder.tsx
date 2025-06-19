
"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  //CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  // IconChevronDown,
  // IconChevronLeft,
  // IconChevronRight,
  // IconChevronsLeft,
  // IconChevronsRight,
  // IconCircleCheckFilled,
  // IconDotsVertical,
  // IconGripVertical,
  // IconLayoutColumns,
  // IconLoader,
  // IconPlus,
  IconTrendingUp,
  IconTrendingDown,
  IconMinus
} from "@tabler/icons-react";

/* eslint-disable */

export default function PagePlaceholder({
  pageName,
  usercount,
  percentage,
  kyccount,
  percentagekyc,
  CTcount,
  percentageCT,
  barchartdata
}: {
  pageName: string;
  usercount: number;
  percentage: number;
  kyccount: number;
  percentagekyc: number;
  CTcount: number;
  percentageCT: number;
  barchartdata: any[];
}) {
  const cardData = [
    {
      title: "Pending Kyc",
      description: percentagekyc,
      content: kyccount
    },
    {
      title: "Total Users",
      description: percentage,
      content: usercount,
    },
    {
      title: "Completed Trades",
      description: percentageCT,
      content: CTcount,
    },
  ];
  const chartConfig = {
  Buy: {
    label: "Buy",
    color: "#2563eb",
  },
  Sell: {
    label: "Sell",
    color: "#60a5fa",
  },
} satisfies ChartConfig;
  return (
    <div className="flex flex-col gap-4 mt-10">
      <h1 className="text-3xl font-bold">{pageName}</h1>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {cardData.map((card, index) => (
          <Card className="w-full" key={index}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>
                {card.description}%
                {card.description > 0 ? (
                  <IconTrendingUp className="size-4 text-green-500" />
                ) : card.description < 0 ? (
                  <IconTrendingDown className="size-4 text-red-500" />
                ) : <IconMinus className="size-4 text-gray-500" />}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{card.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={barchartdata}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="Buy" fill="#2563eb" radius={4} />
          <Bar dataKey="Sell" fill="#60a5fa" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

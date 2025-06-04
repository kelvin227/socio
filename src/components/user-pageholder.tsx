"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  //CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent  } from "@/components/ui/chart"
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
  //IconTrendingDown,
} from "@tabler/icons-react"
import { getfivep2ptransaction } from "@/functions/user";
import { set } from "react-hook-form";


const chartData = [
  { month: "January", Buy: 186, Sell: 80 },
  { month: "February", Buy: 305, Sell: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 214, mobile: 140 },
  { month: "august", desktop: 214, mobile: 140 },
  { month: "September", desktop: 214, mobile: 140 },
  { month: "October", desktop: 214, mobile: 140 },
  { month: "November", desktop: 214, mobile: 140 },
  { month: "December", desktop: 214, mobile: 140 },
]

const chartConfig = {
  Buy: {
    label: "Buy",
    color: "#2563eb",
  },
  Sell: {
    label: "Sell",
    color: "#60a5fa",
  },
} satisfies ChartConfig


  
export default function PagePlaceholder({ pageName, barchartdata }: { pageName: string, barchartdata: any[] }) {
  const [totalVolume, setTotalVolume] = useState<number>(0);
  const [oldVolume, setOldVolume] = useState<number>(0);
  const [percentchange, setPercentChange] = useState<number>(0);
  const [completedtrans, setcompletedtrans] = useState<number>(0)
  const [totaltrans, settotaltrans] = useState<number>(0);
  const [previouscomletedtrans, setpreviouscompletedreans] = useState<number>(0);
  const [previoustotaltrans, setprevioustotaltrans] = useState<number>(0);
  const [previousCompletionPercentage, setPreviousCompletionPercentage] = useState<number>(0);
  const [currentCompletionPercentage, setCurrentCompletionPercentage] = useState<number>(0);
  const [completedtranspercent, setcompletedtranspercent] = useState<number>(0);
  // const [totalearnings, settotalearnings] = useState(0);
  // const [oldearnings, setoldearnings] = useState(0);
  // const [earningspercent, setearningspercent] = useState(0);
  // const [totalTrades, setTotalTrades] = useState(0);
  // const [oldTrades, setOldTrades] = useState(0);
  // const [Tradespercent, setTradesPercent] =useState(0);
  const cardData = [
  {
    title: "Volume",
    description: `${percentchange}%`,
    content: totalVolume,
  },
  {
    title: "Earnings",
    description: "35%",
    content: "200+",
  },
  {
    title: "Completed trades",
    description: `${completedtranspercent}%`,
    content: completedtrans,
  },
];
  const Volume = async()=> {
  const response = await getfivep2ptransaction(pageName)
  if(response.success){
    setTotalVolume(Number(response.totalVolume));
    setOldVolume(Number(response.oldtotalVolume));
    setcompletedtrans(Number(response.completedtrans))
    settotaltrans(Number(response.totaltrans));
    setpreviouscompletedreans(Number(response.previouscompletedtrans));
    setprevioustotaltrans(Number(response.previousTotaltrans));
  }
}

const calculatePercentage = (completed: number, total: number) => {
      if (total === 0) return 0; // Avoid division by zero
      return (completed / total) * 100;
    };
const calculatevolumePercentage = (currentVolume: number, oldVolume: number) => {
      if (oldVolume === 0) return 0; // Avoid division by zero \
      return ((currentVolume - oldVolume) / oldVolume) * 100;
    }
    

useEffect(()=> {
  Volume();
    const CPC = calculatevolumePercentage(Number(totalVolume), oldVolume);
    const completedPercenatge = calculatePercentage(Number(completedtrans), Number(totaltrans));
    const previouscompletedpercentage = calculatePercentage(Number(previouscomletedtrans), Number(previoustotaltrans));
    setPreviousCompletionPercentage(previouscompletedpercentage);
    setCurrentCompletionPercentage(completedPercenatge);
     // --- Calculate the Change (Absolute Difference in Percentage Points) ---
    const percentageChange = currentCompletionPercentage - previousCompletionPercentage;

    setcompletedtranspercent(percentageChange);
    setPercentChange(CPC);
})
  return (
    <div className="flex flex-col gap-4 mt-10">
      <h1 className="text-3xl font-bold">{pageName}</h1>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {cardData.map((card, index) => (
          <Card className="w-full" key={index}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description} <IconTrendingUp className="size-4" /></CardDescription>
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
        <Bar dataKey="Buy" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="Sell" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>

    
   
   
    </div>
  );
}


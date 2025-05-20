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


const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig


  
export default function PagePlaceholder({ pageName }: { pageName: string }) {
  const [totalVolume, setTotalVolume] = useState(0);
  const [oldVolume, setOldVolume] = useState(0);
  const [percentchange, setPercentChange] = useState(0);
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
    description: "40%",
    content: "389",
  },
];
  const Volume = async()=> {
  const response = await getfivep2ptransaction(pageName)
  if(response.success){
    setTotalVolume(Number(response.totalVolume));
    setOldVolume(Number(response.oldtotalVolume));
  }
}

const calculatePercantageChange = (oldValue: number, newValue: number)=> {
  let change;
  if(oldValue === 0){
   change = newValue > 0 ? 100 : 0;
    return setPercentChange(Number(change));
  }else{
    change = ((newValue - oldValue) / oldValue * 100).toFixed(2)
  return setPercentChange(Number(change));
  }
  

}

useEffect(()=> {
  Volume();
    calculatePercantageChange(Number(oldVolume), Number(totalVolume));
}, [])
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
      <BarChart accessibilityLayer data={chartData}>
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
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>

    
   
   
    </div>
  );
}


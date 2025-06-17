"use client";
/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Make sure you have a Skeleton component
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
import { useRouter } from "next/navigation";

const monthTranslations: Record<string, { En: string; Chi: string }> = {
  January: { En: "January", Chi: "一月" },
  February: { En: "February", Chi: "二月" },
  March: { En: "March", Chi: "三月" },
  April: { En: "April", Chi: "四月" },
  May: { En: "May", Chi: "五月" },
  June: { En: "June", Chi: "六月" },
  July: { En: "July", Chi: "七月" },
  August: { En: "August", Chi: "八月" },
  September: { En: "September", Chi: "九月" },
  October: { En: "October", Chi: "十月" },
  November: { En: "November", Chi: "十一月" },
  December: { En: "December", Chi: "十二月" },
};


  
export default function PagePlaceholder({ pageName, barchartdata }: { pageName: string, barchartdata: any[] }) {
  const [Lang, setLang] = useState('En');
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
    const [loading, setLoading] = useState(true); // <-- Add loading state

  // const [totalearnings, settotalearnings] = useState(0);
  // const [oldearnings, setoldearnings] = useState(0);
  // const [earningspercent, setearningspercent] = useState(0);
  // const [totalTrades, setTotalTrades] = useState(0);
  // const [oldTrades, setOldTrades] = useState(0);
  // const [Tradespercent, setTradesPercent] =useState(0);
  const translatedData = barchartdata.map((item: any) => ({
  ...item,
  month: monthTranslations[item.month]?.[Lang as "En" | "Chi"] || item.month,
}));
  const chartConfig = {
  Buy: {
    label: Lang === "Chi" ? "買" :"Buy",
    color: "#2563eb",
  },
  Sell: {
    label: Lang === "Chi"? "賣":"Sell",
    color: "#60a5fa",
  },
} satisfies ChartConfig

  const cardData = [
  {
    title: Lang === "Chi"?"體積":"Volume",
    description: `${percentchange}%`,
    content: totalVolume,
  },
  {
    title: Lang === "Chi" ? "效益" :"Earnings",
    description: "35%",
    content: "200+",
  },
  {
    title: Lang === "Chi" ? "已完成的交易" :"Completed trades",
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
    setLoading(true);
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
    // Check if window is defined (i.e., we are on the client-side)
    if (typeof window !== 'undefined') {
      // Get data from local storage
      const storedValue = localStorage.getItem('userLanguage');
      if (storedValue) {
        setLang(storedValue);
      }
    }
          setLoading(false); // <-- Set loading to false after data is loaded

})
if (loading) {
    // Skeleton Loader
    return (
      <div className="flex flex-col gap-4 mt-10">
        <Skeleton className="h-10 w-1/3 mb-4" />
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {[1, 2, 3].map((_, idx) => (
            <Card className="w-full" key={idx}>
              <CardHeader>
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="min-h-[200px] w-full mt-6">
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  } else{
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
      <BarChart accessibilityLayer data={translatedData}>
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
  
}


"use client";
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useMediaQuery } from 'usehooks-ts'

export default function PagePlaceholder({ pageName }: { pageName: string }) {
  const isSmallDevice = useMediaQuery("(max-width : 767px)");
  return (
    <div className="flex flex-1 py-4 h-screen sm:h-fit flex-col space-y-2 px-4">
      <span className="font-bold text-3xl">{pageName}</span>
      <div className={isSmallDevice ? "" : "flex flex-row"}>
        <div className={isSmallDevice ? "" : "flex flex-col w-full lg:max-w-6xl"}>
      <Card>
  <CardHeader>
    <CardTitle>Pending Kyc</CardTitle>
    <CardDescription>200+</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
</Card>
</div>
<div className={isSmallDevice ? "" : "flex flex-col w-full lg:max-w-6xl"}>
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
</Card>
</div>
<div className={isSmallDevice ? "" : "flex flex-col w-full lg:max-w-6xl"}>
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
</Card>
</div>

</div>
<div className={isSmallDevice ? "" : "flex flex-row w-full lg:max-w-6xl"}>
        <div className={isSmallDevice ? "" : "flex flex-col w-full lg:max-w-6xl"}>
      <Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
</div>
<div className={isSmallDevice ? "" : "flex flex-col w-full lg:max-w-6xl"}>
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
</div>
<div className={isSmallDevice ? "" : "flex flex-col w-full lg:max-w-6xl"}>
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
</div>

</div>

    </div>
  );
}

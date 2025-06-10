/* eslint-disable */
import { auth } from "@/auth";
import { getAllAds, getUserads, getUserByEmail } from "@/functions/user";
import React from "react";
import AtokHolder from "@/components/atok_holder";
import { prisma } from "@/lib/db";
// import { useCopyToClipboard } from "@uidotdev/usehooks";

// const randomHash = crypto.randomUUID();

export default async function Profile() {
  const session= await auth()
  const profile = session?.user?.email as string
  const username = await getUserByEmail(profile);
  const data = await getAllAds()
  const userads = await getUserads(profile)
  if(!username){
    throw new Error("an unexpected error occurred can't get username")
  }
  const fetchadpriceatok = await prisma.adsTransaction.findFirst({
    where: {
      AND:[
        {
          status:"completed"
        },
      {
        coin:"atok",
      }
    ]
    },
    select: { price: true},
  })
  const fetchadpricesocio = await prisma.adsTransaction.findFirst({
    where: {
      AND:[
        {
          status:"completed"
        },
      {
        coin:"socio",
      }
    ]
    },
    select: { price: true},
  })
  const fetchadpricewow = await prisma.adsTransaction.findFirst({
    where:{
     AND:[
        {
          status:"completed"
        },
      {
        coin:"wow",
      }
    ]
    },
    select: { price: true},
  })
  const fetchadpricesidra = await prisma.adsTransaction.findFirst({
    where:{
      AND:[
        {
          status:"completed"
        },
      {
        coin:"sidra",
      }
    ]
    },
    select: { price: true},
  })
  const fetchadpriceruby = await prisma.adsTransaction.findFirst({
    where:{
      AND:[
        {
          status:"completed"
        },
      {
        coin:"ruby",
      }
    ]
    },
    select: { price: true},
  })
  const fetchadpriceopincur= await prisma.adsTransaction.findFirst({
    where:{
      AND:[
        {
          status:"completed"
        },
      {
        coin:"opincur",
      }
    ]
    },
    select: {price: true},
  })
  const fetchadpricestar = await prisma.adsTransaction.findFirst({
    where:{
      AND:[
        {
          status:"completed"
        },
      {
        coin:"star",
      }
    ]
    },
    select: { price: true},
  })


  
  return (
    <AtokHolder userads={userads.ads as any} data={data.ads as any} email={profile} name={username.userName as string} atokPrice={fetchadpriceatok?.price as string || "no data available"} wowPrice={fetchadpricewow?.price as string || "No data available"} sidraPrice={fetchadpricesidra?.price as string || "No data available"} rubyPrice={fetchadpriceruby?.price as string || "No data available"} opincurPrice={fetchadpriceopincur?.price as string || "No data available"} starPrice={fetchadpricestar?.price as string || "No data available"} socioPrice={fetchadpricesocio?.price as string || "no data available"}/>
    
  );
};

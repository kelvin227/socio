import { auth } from "@/auth";
import React from "react";
    import PendingTrades from "@/components/trade-holder";
import { prisma } from "@/lib/db";
// import { useCopyToClipboard } from "@uidotdev/usehooks";

// const randomHash = crypto.randomUUID();

export default async function Profile() {
  const session= await auth()
  const profile = session?.user?.email as string
  
  const user = await prisma.user.findUnique({
        where: { email: profile },
        select: { id: true }, // Select only the user ID
      });
      
  return (
    <PendingTrades email={profile} id={user?.id as string}/>
    
  );
};

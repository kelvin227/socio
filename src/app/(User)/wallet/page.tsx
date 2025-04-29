import React from "react";
//import { Payment } from "./columns";
//import { TransactionTable } from "./trans";
import { auth } from "@/auth";
import Wallet from "./wallet-holder";
import { prisma } from "@/lib/db";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       Date: 1678901234567,
//       Transaction_type: "Deposit",
//       asset: "USDT",
//       amount: 100,
//       description: "Deposit to wallet",
//     },
//     {
//       id: "728ed53f",
//       Date: 1678901234567,
//       Transaction_type: "Withdraw",
//       asset: "USDT",
//       amount: 100,
//       description: "Withdraw from wallet",
//     },
//     {
//       id: "728ed54f",
//       Date: 1678901234567,
//       Transaction_type: "Transfer",
//       asset: "USDT",
//       amount: 100,
//       description: "Transfer to another user",
//     },
//   ];
// }

export default async function Transaction() {
  ///const data = await getData();
  const session= await auth();
      const email = session?.user?.email as string;

      const user = await prisma.user.findUnique({
              where: { email },
              select: { id: true }
          });
          if (!user) {
              console.log(user)
          }
          console.log(user);
          
          const wallet = await prisma.wallets.findUnique({
              where: { userId: user?.id },
              select: { address: true},
          });
          if(wallet){
            console.log(wallet);
          }
          console.log(wallet);

 return (
<Wallet email={email} address={wallet?.address || "empty"}/>
 );
}


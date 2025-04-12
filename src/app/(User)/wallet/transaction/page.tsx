import React from "react";
import { Payment, columns } from "./columns";
import { TransactionTable } from "./trans";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      Date: 1678901234567,
      Transaction_type: "Deposit",
      asset: "USDT",
      amount: 100,
      description: "Deposit to wallet",
    },
    {
      id: "728ed53f",
      Date: 1678901234567,
      Transaction_type: "Withdraw",
      asset: "USDT",
      amount: 100,
      description: "Withdraw from wallet",
    },
    {
      id: "728ed54f",
      Date: 1678901234567,
      Transaction_type: "Transfer",
      asset: "USDT",
      amount: 100,
      description: "Transfer to another user",
    },
  ];
}

export default async function Transaction() {
  const data = await getData();

 return (
<TransactionTable data={data} />
 );
}

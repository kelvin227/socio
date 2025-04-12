"use client"
/* eslint-disable */
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React, { useState } from "react";

export const TransactionTable = ({data} : {data: any}) => {
   // State to manage the selected transaction type
   const [selectedType, setSelectedType] = useState<string | null>(null);

   // Filtered data based on the selected transaction type
   const filteredData = selectedType
     ? data.filter((transaction: any) => transaction.Transaction_type === selectedType)
     : data;
 
   return (
     <div className="">
       <div className="flex flex-col h-screen">
        <div className="items-center w-full">
        <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
        </div>
         
         {/* Dropdown Button */}
         <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 bg-blue-500 text-white rounded-md">
                 Filter by Transaction Type
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                 <DropdownMenuLabel>Transaction Types</DropdownMenuLabel>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={() => setSelectedType(null)}>All</DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setSelectedType("Deposit")}>Deposit</DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setSelectedType("Withdraw")}>Withdraw</DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setSelectedType("Transfer")}>Transfer</DropdownMenuItem>
         </DropdownMenuContent>
         </DropdownMenu>
         {/* Table */}
         <table className="min-w-full bg-white border border-gray-300 rounded-xl shadow-lg">
           <thead>
             <tr className="bg-gray-100">
               <th className="p-4 text-left">Date</th>
               <th className="p-4 text-left">Transaction Type</th>
               <th className="p-4 text-left">Asset</th>
               <th className="p-4 text-left">Amount</th>
               <th className="p-4 text-left">Description</th>
             </tr>
           </thead>
           <tbody>
             {filteredData.length > 0 ? (
               filteredData.map((transaction: any) => (
                 <tr key={transaction.id}>
                   <td className="p-4 border-b">
                     {new Date(transaction.Date).toLocaleDateString()}
                   </td>
                   <td className="p-4 border-b">{transaction.Transaction_type}</td>
                   <td className="p-4 border-b">{transaction.asset}</td>
                   <td className="p-4 border-b">{transaction.amount}</td>
                   <td className="p-4 border-b">{transaction.description}</td>
                 </tr>
               ))
             ) : (
               <tr>
                 <td colSpan={5} className="p-4 text-center">
                   <div className="flex flex-col items-center justify-center">
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       className="h-16 w-16 text-gray-400"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke="currentColor"
                       strokeWidth={2}
                     >
                       <path
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z"
                       />
                     </svg>
                     <p className="text-gray-500 mt-4">No transactions found</p>
                   </div>
                 </td>
               </tr>
             )}
           </tbody>
           {filteredData.length > 0 && (
             <tfoot>
               <tr className="bg-gray-100">
                 <td colSpan={5} className="p-4 text-center">
                   Total Transactions: {filteredData.length}
                 </td>
               </tr>
             </tfoot>
           )}
         </table>
       </div>
     </div>
   );
}

"use client"
/* eslint-disable */
import React, { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ethers } from "ethers";

export const TransactionTable = ({address} :{address: string}) => {
  const [transactions, setTransactions] = useState<any[]>([]); // State to store transaction data
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]); // State for filtered data
  const [selectedType, setSelectedType] = useState<string | null>(null); // State to manage the selected transaction type
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  console.log(address)
  // Function to fetch transaction data from the API
  const fetchTransactionData = async () => {

    try {
      setLoading(true);
      const response = await fetch(
        `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=KB4T4QZCQQBM4G5WDHHZRHV1RYAIDYXMBQ`
      );
      const data = await response.json();
      if (data.status === "1") {
        const formattedData = data.result.map((tx: any) => ({
          id: tx.hash,
          date: new Date(tx.timeStamp * 1000).toLocaleDateString(),
          transactionType: tx.to === address ? "withdraw" : "deposit",
          asset: "ETH",
          amount: ethers.formatEther(tx.value),
          description: tx.input === "0x" ? "Simple Transfer" : "Contract Interaction",
        }));
        setTransactions(formattedData);
        setFilteredTransactions(formattedData);
      }
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter transactions based on the selected type
  const filterTransactions = (type: string | null) => {
    setSelectedType(type);
    if (type) {
      const filtered = transactions.filter((tx) => tx.transactionType === type);
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  };

  // Fetch transaction data when the component mounts
  useEffect(() => {
    fetchTransactionData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

      {/* Dropdown Menu for Filtering */}
      <DropdownMenu>
        <DropdownMenuTrigger className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Filter by Transaction Type
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Transaction Types</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => filterTransactions(null)}>All</DropdownMenuItem>
          <DropdownMenuItem onClick={() => filterTransactions("Deposit")}>Deposit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => filterTransactions("Withdraw")}>Withdraw</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Transaction Table */}
      <div className="mt-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading transactions...</p>
        ) : filteredTransactions.length > 0 ? (
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
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="p-4 border-b">{transaction.date}</td>
                  <td className="p-4 border-b">{transaction.transactionType}</td>
                  <td className="p-4 border-b">{transaction.asset}</td>
                  <td className="p-4 border-b">{transaction.amount}</td>
                  <td className="p-4 border-b">{transaction.description}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100">
                <td colSpan={5} className="p-4 text-center">
                  Total Transactions: {filteredTransactions.length}
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p className="text-center text-gray-500">No transactions found</p>
        )}
      </div>
    </div>
  );
};

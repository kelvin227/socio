"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchTransaction } from "@/functions/user";

export default function TransactionLog() {
  const [transactions, setTransactions] = useState<{
    id: string | null,
  qty: number,
  transactionId: string,
  price: string,
  fee: string,
  orderId: string,
  coin: string,
  senderWalletAddress: string,
  receiverWalletAddress: string,
  transactionHash: string,
  userId: string,
  transactionType: string,
  amount: number,
  status: string,
  createdAt: Date,
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch transactions from the server
 
  // Handle search
  const handleSearch = async () => {
    setLoading(true);
    try {
      const responses = await searchTransaction(searchQuery);

      setTransactions(
          responses
      );
    } catch (error) {
      console.error("Error searching transactions:", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Transaction Logs</h1>

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by user or transaction ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Transaction ID</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>

            {transactions ? (
                <tr key={transactions.id}>
                  <td className="p-4 border-b">{transactions.id}</td>
                  <td className="p-4 border-b">{transactions.qty}</td>
                  <td className="p-4 border-b">${transactions.amount}</td>
                  <td className="p-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-md text-white ${
                        transactions.status === "completed"
                          ? "bg-green-500"
                          : transactions.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {transactions.status}
                    </span>
                  </td>
                  <td className="p-4 border-b">
                    {new Date(transactions.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

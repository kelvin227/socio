
"use client";
/* eslint-disable */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import { toast } from "react-hot-toast";

export default function ReferralPage({refer, refferedUsers}: { refer: string, refferedUsers: any[] }) {
  const [referralCode] = useState(refer); // Example referral code
  const [referredUsers] = useState(refferedUsers); // Example referred users data

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied to clipboard!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Referral Program</h1>

      {/* Referral Code Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Input
              value={referralCode}
              readOnly
              className="w-full bg-gray-100 cursor-not-allowed"
            />
            <Button onClick={handleCopy} className="bg-blue-500 text-white">
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referred Users Section */}
      <Card>
        <CardHeader>
          <CardTitle>Referred Users</CardTitle>
        </CardHeader>
        <CardContent>
          {referredUsers.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Date Referred</th>
                </tr>
              </thead>
              <tbody>
                {referredUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="p-4 border-b">{user.name}</td>
                    <td className="p-4 border-b">{user.email}</td>
                    <td className="p-4 border-b">{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No referred users yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
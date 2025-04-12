'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const OTC = () => {
  const [walletAddresses, setWalletAddresses] = useState<Record<string, string>>({});

  const handleWalletChange = (coin: string, address: string) => {
    setWalletAddresses((prev) => ({
      ...prev,
      [coin]: address,
    }));
  };

  const handleSaveWallet = (coin: string) => {
    const address = walletAddresses[coin];
    if (address) {
      alert(`Wallet address for ${coin} saved: ${address}`);
    } else {
      alert(`Please enter a wallet address for ${coin}`);
    }
  };

  const coins = [
    {
      name: "Atok/USDT",
      link: "/otc/advertisement/atok",
      image: "https://atok.ai/_next/image?url=%2Fatok-token%2Ftoken.png&w=1920&q=100",
    },
    {
      name: "WOW/USDT",
      link: "/otc/advertisement/wow",
      image: "https://school.codegator.com.ng/image/ajavyk7p.png",
    },
    {
      name: "SDA/USDT",
      link: "/otc/advertisement/sda",
      image: "https://play-lh.googleusercontent.com/NLwEmyxzTKqtR2bvRSugma35UBn-6x-zRNNwHykjV9wVDS3ACezJg-al6A-4W2oWnw",
    },
    {
      name: "RBL/USDT",
      link: "/otc/advertisement/rbl",
      image: "https://play-lh.googleusercontent.com/OVJjGaAQNzEBJXeqi8RLvDHKHb-be2bbF95iKsrhltNDSOAYXO-qJKJexTV-OT9h-A=w480-h960-rw",
    },
    {
      name: "Opincur/USDT",
      link: "/otc/advertisement/opin",
      image: "https://opincur.com/img/logo.png",
    },
    {
      name: "Star Network/USDT",
      link: "/otc/advertisement/star",
      image: "https://miro.medium.com/v2/resize:fit:394/1*dC5IusZmsnRzCxEVdN5Z_A.jpeg",
    },
  ];

  return (
    <div>
      {coins.map((coin) => (
        <div key={coin.name} className="pb-4">
          <Link href={coin.link}>
            <Card>
              <div className="flex flex-box w-full p-2">
                <CardContent>
                  <div>
                    <Avatar>
                      <AvatarImage src={coin.image} alt={coin.name} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>

                <div>
                  <CardContent>{coin.name}</CardContent>
                </div>

                <div className="absolute right-0">
                  <div className="grid grid-box">
                    <CardContent>Start Trading</CardContent>

                    <CardContent>
                      <div className="flex flex-box">
                        2% fee
                        <TrendingUp />
                      </div>
                    </CardContent>
                  </div>
                </div>
              </div>
            </Card>
          </Link>

          {/* Wallet Address Input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder={`Enter wallet address for ${coin.name}`}
              value={walletAddresses[coin.name] || ""}
              onChange={(e) => handleWalletChange(coin.name, e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <button
              onClick={() => handleSaveWallet(coin.name)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save Wallet Address
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OTC;
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react";

const OTC = () => {
  return (
    <div>
      <div className="pb-4">
        <Link href={"/otc/advertisement/PI"}>
        <Card>
          <div className="flex flex-box w-full p-2">
            <CardContent>
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://toptradingforex.com/wp-content/uploads/2022/01/pi-coin-1-2.jpg"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>

            <div>
              <CardContent>PI/USDT</CardContent>
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
        
      </div>

      <div className="pb-4">
        <Link href={"/otc/advertisement/wow"}>
        <Card>
          <div className="flex flex-box w-full p-2">
            <CardContent>
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://play-lh.googleusercontent.com/fC5wPMLnm-V-8YMi0jnPEb2kJHJomEs7HbfKlIqhv_i-T-T9hQNmbwwbsW2cw6Bnb14"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
        
            <div>
              <CardContent>WOW/USDT</CardContent>
            </div>
        
            <div className="absolute right-0">
              <div className="grid grid-box">
                <CardContent>start trading</CardContent>
        
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
        
        
      </div>

      <div className="pb-4">
        <Link href={"/otc/advertisement/sda"}>
        <Card>
          <div className="flex flex-box w-full p-2">
            <CardContent>
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://play-lh.googleusercontent.com/NLwEmyxzTKqtR2bvRSugma35UBn-6x-zRNNwHykjV9wVDS3ACezJg-al6A-4W2oWnw"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
        
            <div className="">
              <CardContent>SDA/USDT</CardContent>
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
        
      </div>

      <div className="pb-4">
        <Link href={"/otc/advertisement/rbl"}>
        <Card>
          <div className="flex flex-box w-full p-2">
            <CardContent>
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://play-lh.googleusercontent.com/OVJjGaAQNzEBJXeqi8RLvDHKHb-be2bbF95iKsrhltNDSOAYXO-qJKJexTV-OT9h-A=w480-h960-rw"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
        
            <div className="">
              <CardContent>RBL/USDT</CardContent>
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
        
      </div>

    </div>
  );
};

export default OTC;

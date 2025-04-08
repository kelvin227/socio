"use client";
import React, { useEffect, useState } from "react";
import { Ads, columns } from "../../columns";
import { DataTable } from "@/app/(User)/user_dashboard/data-table";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

async function getData(): Promise<Ads[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      username: "joh",
      price: 6777,
      quantity: 222,
      payment: "Wallet",
    },
    {
      id: "728ed52f",
      username: "joh",
      price: 18882,
      quantity: 222,
      payment: "Wallet",
    },
    {
      id: "728ed52f",
      username: "joh",
      price: 128888,
      quantity: 222,
      payment: "Wallet",
    },
    // ...
  ];
}

const table = [
  {
    id: "728ed52f",
    username: "joh",
    price: 18882,
    quantity: 222,
    payment: "Wallet",
  },
  {
    id: "728ed52f",
    username: "joh",
    price: 18882,
    quantity: 222,
    payment: "Wallet",
  },
];

export default function WOW() {
  const [data, setData] = useState<Ads[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);

  const [btn, setBtn] = useState(false);
  const handlesell = () => {
    setBtn(true);
  };
  const handlebuy = () => {
    setBtn(false);
  };
  return (
    <div>
      <Link href={"/otc"} className="flex flex-box">
        <ArrowBigLeft />
        Advertisement
      </Link>
      <DropdownMenuSeparator />
      <div className="grid grid-box sm:flex sm:flex-box lg:flex md:flex lg:flex-box md:flex-box  lg:gap-4 md:gap-4 sm:gap-6 w-full">
        <div className="flex flex-row w-full pb-3 gap-3">
          <div className="w-full">
            <Button
              className={btn ? "w-full" : "w-full bg-green-500"}
              onClick={handlebuy}
            >
              Buy
            </Button>
          </div>

          <div className="w-full">
            <Button
              className={btn ? "bg-red-500 w-full" : "w-full"}
              onClick={handlesell}
            >
              Sell
            </Button>
          </div>
        </div>
        <div className="w-full pb-3">
          <Button className="w-full">Create Ads</Button>
        </div>
        <div className="flex flex-box w-full gap-3">
          <div className="w-full">
            <Button className="w-full">My Ads</Button>
          </div>
          <div className="w-full">
            <Button className="w-full">Official Web</Button>
          </div>
        </div>
      </div>
      {btn ? (
        <div>
          <div className="block sm:hidden md:hidden lg:hidden xl:hidden">
            {table.map((col, index) => (
              <div key={index} className="pb-4">
                <div className="grid grid-flow-col grid-rows-1 gap-4">
                  <div className="col-span-2">
                    <div className="grid grid-rows-4">
                      <div className="row">{col.username}</div>
                      <div className="row">{col.price}</div>
                      <div className="row">{col.quantity}</div>
                      <div className="row">{col.payment}</div>
                    </div>
                  </div>
                  <div className=" relative">
                    <div className="grid grid-rows-4 absolute bottom-0 right-0 w-full">
                      <div className="row-span-4 w-full">
                        <Button asChild>
                          <Dialog>
                            <DialogTrigger className="bg-red-500 w-full rounded-md h-9">sell</DialogTrigger>
                            <DialogContent>
                                <DialogTitle>Announcement</DialogTitle>
                                The P2P has been Disabled From The Admin Panel Please contact admin to quickly resume
                            </DialogContent>
                          </Dialog>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="container mx-auto py-10 hidden lg:block md:block: sm:block">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      ) : (
        <div>
          <div className="block sm:hidden md:hidden lg:hidden xl:hidden">
            {table.map((col, index) => (
              <div key={index} className="pb-4">
                <div className="grid grid-flow-col grid-rows-1 gap-4">
                  <div className="col-span-2">
                    <div className="grid grid-rows-4">
                      <div className="row">{col.username}</div>
                      <div className="row">Price: {col.price} USDT</div>
                      <div className="row">Quantity:{col.quantity}</div>
                      <div className="row">{col.payment}</div>
                    </div>
                  </div>
                  <div className=" relative">
                    <div className="grid grid-rows-4 absolute bottom-0 right-0 w-full">
                      <div className="row-span-4 w-full">
                      <Button asChild>
                          <Dialog>
                            <DialogTrigger className="bg-green-500 w-full rounded-md h-9">Buy</DialogTrigger>
                            <DialogContent>
                                <DialogTitle>Announcement</DialogTitle>
                                The P2P has been Disabled From The Admin Panel Please contact admin to quickly resume
                            </DialogContent>
                          </Dialog>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="container mx-auto py-10 hidden lg:block md:block: sm:block">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      )}
    </div>
  );
}

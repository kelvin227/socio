"use client";

import React, { useState } from "react";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu, Wallet, BadgeCheck, Bell, ArrowDownToLine, ArrowUpToLine, RefreshCcw, History, ChevronsUpDown } from "lucide-react";
import { NavItems } from "./user_config";
import { LogOut } from "../../../actions/authactions";
import { SidebarTrigger } from "@/components/ui/sidebar";



export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          prefetch={false}
        >
          <span className="w-8 h-8 border bg-accent rounded-full" />
          <span>Socio</span>
        </Link>
      </div>

      <div className="ml-4 flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Bell size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>@prima has sent you 3.45 Usdt Check Your available Balance</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Your btc funds are running low</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu></DropdownMenu>

        <BadgeCheck className="text-red-500"></BadgeCheck>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Wallet />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/wallet"}>
            <DropdownMenuLabel className="hover:bg-gray-800">
              {/* <Dialog>
                  <DialogTrigger>Assets</DialogTrigger>
                    <DialogContent>
                    <DialogTitle>Your Balance</DialogTitle>
                        <DialogHeader>
                              <DialogTitle> $0</DialogTitle>
                              
                            </DialogHeader>
                            <div className="flex flex-box flex-col-4 justify-center w-full gap-2">
                              <div className="grid text-sm text-center">
                                <Button className="w-18 text-sm px-3 sm:w-18 sm:text-sm md:w-23 md:text-md"><ArrowDownToLine /></Button>
                                Deposit
                              </div>
                              
                              <div className="grid text-sm text-center">
                                <Button className="w-18 text-sm px-3 sm:w-18 sm:text-sm md:w-23 md:text-md"><ArrowUpToLine /></Button>
                                Withdraw
                              </div>
                            
                            <div className="grid text-sm text-center">
                                <Button className="w-18 text-sm px-3 sm:w-18 sm:text-sm md:w-23 md:text-md"><RefreshCcw/></Button>
                                  Convert
                              </div>
                            
                            <div className="grid text-sm text-center">
                                <Button className="w-18 text-sm px-3 sm:w-18 sm:text-sm md:w-23 md:text-md"><History/></Button>
                            History
                              </div>
                            </div>
                            <DropdownMenuSeparator />
                            <Table>
  <TableCaption>Coins.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]"><div className="flex flex-box items-center">Coins<ChevronsUpDown/></div></TableHead>
      <TableHead><div className="flex flex-box items-center">Available balance <ChevronsUpDown/></div></TableHead>
      <TableHead className="text-right"><div className="flex flex-box items-center">equivalent <ChevronsUpDown/></div></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">USDT</TableCell>
      <TableCell>0.25</TableCell>
      <TableCell className="text-right">$0.25</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Rubi</TableCell>
      <TableCell>5</TableCell>
      <TableCell className="text-right">$4.25</TableCell>
    </TableRow>
  </TableBody>
</Table>
                            </DialogContent>
                        </Dialog> */}
                        Assets
              </DropdownMenuLabel>
             
              </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={'/wallet/transaction'}>Transaction histroy</Link></DropdownMenuItem>
            <DropdownMenuItem>Payment settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/profile/overview">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem>kyc</DropdownMenuItem>
            <DropdownMenuItem>Task Center</DropdownMenuItem>
            <DropdownMenuItem>Security</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await LogOut();
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={() => setIsOpen(true)} className="block sm:hidden">
          <Menu size={24} />
        </Button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="right" className="block md:hidden">
            <div className="pt-4 overflow-y-auto h-fit w-full flex flex-col gap-1">
              {NavItems.map((navItem, idx) => (
                <Link
                  key={idx}
                  href={navItem.href}
                  onClick={() => setIsOpen(false)}
                  className={`h-full relative flex items-center whitespace-nowrap rounded-md ${"hover:bg-neutral-200  hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"}`}
                >
                  <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                    
                    <span>{navItem.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

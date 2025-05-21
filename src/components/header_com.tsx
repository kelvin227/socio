"use client";
import React, {useEffect, useState} from "react";
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
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu, Wallet, BadgeCheck, Bell} from "lucide-react";
import { NavItems } from "@/app/(User)/app/(User)/user_config";
import { LogOut } from "../../actions/authactions";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getKycStatus1 } from "@/functions/user";
import { toast } from "sonner";


export default function HeaderCom({email}: {email: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const [kyc, setkyc] = useState(false);

  const fetchkyc = async() => {
    const getkyc = await getKycStatus1(email);
    if(!getkyc.success){
      toast.error( "we encountered an unexpected error while kyc status please refresh the page")
    }else{
        if(getkyc.message){
        setkyc(true)
        }
    }
  }
 useEffect(() => {
    fetchkyc();
  }, []);
  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          prefetch={false}
        >
          <span className="w-8 h-8 border bg-accent rounded-full"><Avatar>
                            <AvatarImage
                              src="https://school.codegator.com.ng/image/logo2.png"
                              alt="Socio Logo"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar></span>
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

        <BadgeCheck className={kyc ?"text-green-500" : "text-red-500"}></BadgeCheck>
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
                        Assets
              </DropdownMenuLabel>
             
              </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={'/wallet/transaction'}>Transaction histroy</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href={"/wallet/payment/crypto"}>Payment settings</Link></DropdownMenuItem>
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
            <DropdownMenuItem asChild><Link href={"/profile/user_kyc"}>kyc</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href={"/profile/task"}>Task Center</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href={"/profile/security"}>Security</Link></DropdownMenuItem>
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

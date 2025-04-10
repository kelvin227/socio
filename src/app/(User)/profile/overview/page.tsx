import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  BadgeCheck,
  ChevronRight,
  LayoutList,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { getUserByEmail } from "@/functions/user";

export default async function Overview() {
  const session = await auth();
  const profile = await getUserByEmail(session?.user?.email as string)
  return (
    <div className="w-full">
      <div className="hover:shadow-lg hover:shadow-blue-500/50">
        <Link href={"/profile"}>
        <Card>
          <div className="flex flex box p-2">
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Avatar>
                <AvatarImage
                  src={"https://school.codegator.com.ng/image/" + profile?.image }
                  alt="@shadcn"
                />

                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
            <div className="grid grid-box">
              <CardContent>Profile</CardContent>
              <CardContent>{session?.user?.email}</CardContent>
            </div>
          </div>
        </Card>
        </Link>
        
      </div>

      <div className="flex flex-box pt-4 gap-6">
        <div className=" w-full relative hover:shadow-lg hover:shadow-blue-500/50">
          <Link href={"/profile/security"}>
            <Card className="w-full">
              <CardContent className="flex flex-box gap-2">
                <ShieldCheck />
                Security
                <div className="absolute right-0">
                  <ChevronRight className="justify-end" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="w-full relative hover:shadow-lg hover:shadow-blue-500/50">
          <Link href={"/profile/user_kyc"}>
            <Card className="w-full">
              <CardContent className="flex flex-box gap-2">
                <BadgeCheck />
                kyc
                <div className="absolute right-0">
                  <ChevronRight className="justify-end" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="w-full relative hover:shadow-lg hover:shadow-blue-500/50">
          <Link href={"/profile/task"}>
            <Card className="w-full">
              <CardContent className="flex flex-box gap-2 ">
                <LayoutList />
                Tasks center
                <div className="absolute right-0">
                  <ChevronRight className="justify-end" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

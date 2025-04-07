import { Button } from "@/components/ui/button";
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

const Overview = () => {
  return (
    <div className="w-full">
      <div>
        <Card>
          <div className="flex flex box p-2">
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
            <div className="grid grid-box">
              <CardContent>Profile</CardContent>
              <CardContent>Trustgain@gmail.com</CardContent>
            </div>
          </div>
        </Card>
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

export default Overview;

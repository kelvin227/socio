"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { IdCard, ScanFace, ScanQrCode, UserRound } from "lucide-react";
import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { useCopyToClipboard } from "@uidotdev/usehooks";

const randomHash = crypto.randomUUID();

const Profile = () => {
    const [copiedText, copyToClipboard] = useCopyToClipboard();
  const hasCopiedText = Boolean(copiedText);
  return (
    <div>
      <Card>
        <div className="flex flex-box">
          <CardContent>
            <IdCard size={50} />
          </CardContent>
          <div className="grid grid-box">
            <CardTitle>Username</CardTitle>
            <CardDescription>change your display user name</CardDescription>
          </div>
          <div className="absolute right-0">
            <CardContent>
            <Button>
                Edit
            </Button>
          </CardContent>
            </div> 
          
        </div>
      </Card>

      <Card>
        <div className="flex flex-box">
          <CardContent>
            <UserRound size={50} />
          </CardContent>
          <div className="grid grid-box">
            <CardTitle>Avater</CardTitle>
            <CardDescription>change your display avater</CardDescription>
          </div>

          <div className="absolute right-0">
            <CardContent>
            <Button>
                Edit
            </Button>
          </CardContent>
            </div> 
        </div>
      </Card>

      <Card>
        <div className="flex flex-box">
          <CardContent>
            <FaWhatsapp size={50} />
          </CardContent>
          <div className="grid grid-box">
            <CardTitle>Whatsapp number</CardTitle>
            <CardDescription>change your phone number</CardDescription>
          </div>
          <div className="absolute right-0">
            <CardContent>
            <Button>
                Edit
            </Button>
          </CardContent>
            </div> 
        </div>
      </Card>

        <div className="pt-6">
            <Card>
        <div className="flex flex-box">
          <CardContent>
            <ScanFace size={50} />
          </CardContent>
          <div className="grid grid-box">
            <CardTitle>Invitation Code
          <Button
            disabled={hasCopiedText}
            className="link"
            onClick={() => copyToClipboard(randomHash)}
          >
            {hasCopiedText ? "copiedText" : "copy"}
          </Button></CardTitle>
            <CardDescription>change your display user name</CardDescription>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-box">
          <CardContent>
            <ScanQrCode size={50} />
          </CardContent>
          <div className="grid grid-box">
            <CardTitle>Invitation Link</CardTitle>
            <CardDescription>change your display user name</CardDescription>
          </div>
        </div>
      </Card>
        </div>
      
    </div>
  );
};

export default Profile;

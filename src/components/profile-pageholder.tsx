"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { IdCard, ScanFace, ScanQrCode, UserRound } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { User } from '@prisma/client';
import UpdateForm from './Forms/updateForm';

export default function Profile_pageholder({user}:{user: User})  {

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
            <CardDescription>{user?.email}</CardDescription>
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
           <UpdateForm />
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
            <CardDescription>{user?.phoneNo || "You have not added a whatsapp number"}</CardDescription>
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
         </CardTitle>
            <CardDescription>Share your invitation Code to get rewards</CardDescription>
          </div>
          <div className="absolute right-0">
            <CardContent>
              <div className='border-solid border-2'>
                {user?.referralCode || "error"}
              </div>
            <Button 
            disabled={hasCopiedText}
            className="link"
            onClick={() => copyToClipboard(user?.referralCode  as string)}>
                {hasCopiedText ? "copiedText" : "copy"}
            </Button>
          </CardContent>
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
  )
}

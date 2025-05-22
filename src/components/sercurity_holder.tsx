"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { checkcode, sendcode } from "@/functions/user";
import { Key, Mail, RectangleEllipsis } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Security ({email}:{email: string}){
    const [codeDialog, setCodeDialog] = useState<boolean>(false);
    const [code] = useState<string>("")

    const sendCode = async() => {
        const sendVcode = await sendcode(email);
        if(sendVcode?.success){
            toast.success(sendVcode?.message);
            setCodeDialog(true);
        }else{
            toast.error(sendVcode?.message)
        }
    }
    const handleverify = async(code: string) =>{
        const verifyCode = await checkcode(email, code);
        if(verifyCode.success){
            toast.success(verifyCode.message);
        }else{
            toast.error(verifyCode?.message);
        }
    }
  return (
    <div>
        <div className={codeDialog ? "hidden": ""}>
      <Card>
        <div className="flex flex-box">
          <CardContent>
            <Mail size={50} />
          </CardContent>
          <div className="grid grid-box">
            <CardTitle>Email Address Verification</CardTitle>
            <CardDescription>verify your email address</CardDescription>
          </div>
          <div className="absolute right-0">
            <CardContent>
              <Button onClick={sendCode}>Edit</Button>
            </CardContent>
          </div>
        </div>
      </Card>

      <div className="pt-6">
        <Card>
          <div className="flex flex-box">
            <CardContent>
              <RectangleEllipsis size={50} />
            </CardContent>
            <div className="grid grid-box">
              <CardTitle>Login password</CardTitle>
              <CardDescription>change you login password</CardDescription>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-box">
            <CardContent>
              <Key size={50} />
            </CardContent>
            <div className="grid grid-box">
              <CardTitle>Pin Code</CardTitle>
              <CardDescription>change your pin code for transaction</CardDescription>
            </div>
          </div>
        </Card>
      </div>

      </div>

        {/* dialog for the email verfication process */}
      <div className={codeDialog ? "flex flex-col items-center justify-center min-h-[300px] light:bg-white rounded-lg shadow-lg p-8" : "hidden"}>
        <h2 className="text-xl font-bold mb-4">Enter Verification Code</h2>
        <p className="mb-4 text-gray-600 text-center">
          Please enter the 6-digit verification code sent to your email address.
        </p>
        <form
          className="flex flex-col items-center gap-4 w-full max-w-xs"
          onSubmit={async (e) => {
            e.preventDefault();
            // TODO: Call your verify code function here
            await handleverify(code);
            // Example:
            // const result = await verifyCode(email, code);
            // if (result.success) { ... }
          }}
        >
          <input
            type="text"
            name="code"
            value={code}
            maxLength={6}
            required
            autoFocus
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="------"
          />
          <Button type="submit" className="w-full bg-blue-600 text-white rounded-md">
            Verify
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setCodeDialog(false)}
          >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};


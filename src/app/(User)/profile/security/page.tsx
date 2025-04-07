"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Key, Mail, MapPin, RectangleEllipsis } from "lucide-react";
import React from "react";

const Security = () => {
  return (
    <div>
      <Card>
        <div className="flex flex-box">
          <CardContent>
            <Mail size={50} />
          </CardContent>
          <div className="grid grid-box">
            <CardTitle>Email Address Verification</CardTitle>
            <CardDescription>change your display user name</CardDescription>
          </div>
          <div className="absolute right-0">
            <CardContent>
              <Button>Edit</Button>
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
              <CardDescription>change your display user name</CardDescription>
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
              <CardDescription>change your display user name</CardDescription>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-box">
            <CardContent>
              <MapPin size={50} />
            </CardContent>
            <div className="grid grid-box">
              <CardTitle>IP Address Logs</CardTitle>
              <CardDescription>change your display user name</CardDescription>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Security;

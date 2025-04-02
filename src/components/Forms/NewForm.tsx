"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
// import { Button } from '../ui/button';
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaChevronDown, FaEarthAmericas } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";
import { Login } from "../../../actions/authactions";
import { useRouter } from "next/navigation";

const formData = [
  {
    name: "email",
    type: "email",
    placeHolder: "jondoe1982@gmail.com",
    label: "email",
  },
  {
    name: "password",
    type: "password",
    placeHolder: "*****",
    label: "Password",
  },
  {
    name: "referralCode",
    type: "text",
    placeHolder: "Enter referral code",
    label: "Referral Code",
  },
];

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  referralCode: z.string().min(8, "referral code must be 8 characters long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must not exceed 32 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

const signinFormData = [
  {
    name: "email",
    type: "email",
    placeHolder: "jondoe1982@gmail.com",
    label: "email",
  },
  {
    name: "password",
    type: "password",
    placeHolder: "*****",
    label: "Password",
  },
];

const SigninformSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

const NewForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      referralCode: "",
      password: "",
    },
  });

  const siginForm = useForm<z.infer<typeof SigninformSchema>>({
    resolver: zodResolver(SigninformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div>
      <Form {...siginForm}>
        <form
          onSubmit={siginForm.handleSubmit(handleSignInForm)}
          className="bg-white w-full flex flex-col gap-8 p-10"
        >
          <div className="flex w-full justify-between">
            <h1 className="text-4xl font-light">Sign In</h1>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-2 items-center">
                <FaEarthAmericas />
                <FaChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
                <DropdownMenuItem>Chinese</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {signinFormData.map((formField, index) => (
            <FormField
              key={index}
              control={form.control}
              name={(formField.name as "password") || "username"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs">
                    {formField.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-full text-md bg-gray-200/80 p-6"
                      type={formField.type}
                      placeholder={formField.placeHolder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            size={"lg"}
            className="rounded-full py-6 bg-linear-[135deg,#f75959_0%,#f35587_100%] cursor-pointer"
            type="submit"
          >
            Sign In
          </Button>
          <Label className="text-pink-500">
            <Checkbox className="bg-gray-100" id="agree" />
            <span>Remember Me</span>
          </Label>
        </form>
      </Form>
    </div>
  );
};

export default NewForm;

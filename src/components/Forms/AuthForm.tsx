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
import { createUser } from "../../../actions/authactions";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@uidotdev/usehooks";



const formData = [
  {
    name: "username",
    type: "text",
    placeHolder: "jondoe1982",
    label: "username",
  },
  {
    name: "password",
    type: "password",
    placeHolder: "*****",
    label: "Password",
  },
];

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .trim(),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .trim(),
  // agreeToTerms: z.boolean().refine((val) => val === true, {
  //   message: "You must agree to the terms and conditions.",
  // }),
});

const AuthForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [show, setShow] = useState(true)
  const [loadAni, setloadAni] = useState(false)

  const [isClicked, SetisClicked] = useState(false);
  const handleclicked = () => {
    SetisClicked(!isClicked)
    setShow(!show)
    setloadAni(!loadAni)
  }

  const handleSubmitForm = async (data: z.infer<typeof formSchema>) => {

    if (isClicked) {
      const response = await createUser(data.username, data.password);

    console.log("respons is ", response)

    if (response.success) {
        toast(response.message, {
            className: "bg-green-500 text-white"
        })
    }else {
        toast(response.message, {
            className: "bg-red-500 text-white"
        })
    }
    
    }
  };

  


  return (

    <div className="w-full max-w-xl flex flex-col-reverse lg:flex-row shadow-xl lg:max-w-6xl">
      {show && loadAni ? <Form {...form}>
      <motion.div
    initial={{ opacity: 1,  x : 0}} // Starting animation state
    animate={{ opacity: 1,  x : 580}} // End animation state
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 30,
      duration: 0.50, // Optional
    }}
    className="w-full max-w-xl flex flex-col-reverse lg:flex-row shadow-xl lg:max-w-6xl"
  >
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
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
          {formData.map((formField, index) => (
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
            className="rounded-full py-6 bg-linear-[135deg,#f75959_0%,#f35587_100%]"
            type="submit"
          >
            Sign In
          </Button>
          <Label className="text-pink-500">
            <Checkbox className="bg-gray-100" id="agree" />
            <span>Remember Me</span>
          </Label>
        </form>
        </motion.div>
      </Form> : show && !loadAni ? (
        <Form {...form}>
        <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
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
        {formData.map((formField, index) => (
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
          className="rounded-full py-6 bg-linear-[135deg,#f75959_0%,#f35587_100%]"
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
      ) : ( <Form {...form}>
            <motion.div
    initial={{ ...(isSmallDevice ? { opacity: 0 } : { opacity: 0 }) , x: -300 }} // Starting animation state
    animate={{ opacity: 1, ...(isSmallDevice ? { x: 0 } : { x: 580 })}} // End animation state
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 30,
      duration: 0.50, // Optional
    }}
    className="w-full max-w-xl flex flex-col-reverse lg:flex-row shadow-xl lg:max-w-6xl"
  >
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="bg-white w-full flex flex-col gap-8 p-10"
        >
          <div className="flex w-full justify-between">
            <h1 className="text-4xl font-light">Sign Up</h1>
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
          {formData.map((formField, index) => (
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
            className="rounded-full py-6 bg-linear-[135deg,#f75959_0%,#f35587_100%]"
            type="submit"
          >
            Sign Up
          </Button>
          <Label className="text-pink-500">
            <Checkbox className="bg-gray-100" id="agree" />
            <span>i agree to the terms and conditions</span>
          </Label>
        </form>
        </motion.div>
      </Form>)}

      {isClicked && loadAni ? 
      <motion.div
    initial={{ ...(isSmallDevice ? { opacity: 0 } : { opacity: 0 }) , x: -300 }} // Starting animation state
    animate={{ ...(isSmallDevice ? { opacity: 1 } : { opacity: 1 }) , ...(isSmallDevice ? { x: 0 } : { x: 0 }) }} // End animation state
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 30,
      duration: 0.50, // Optional
    }}
    className="w-full max-w-xl flex flex-col-reverse lg:flex-row shadow-xl lg:max-w-6xl"
  >
      <div className="flex text-white w-full gap-5 flex-col justify-center bg-linear-[135deg,#f75959_0%,#f35587_100%] p-10 items-center">
        <h1 className="text-3xl text-center font-bold">Welcome to Socio</h1>
        <p>Already have an account?</p>
        <Button
          size={"lg"}
          className="rounded-full bg-transparent hover:text-red-500"
          variant={"outline"}
          onClick={handleclicked}
        >Sign In
        </Button>
      </div>
      </motion.div>: !loadAni ?
      <div className="flex text-white w-full gap-5 flex-col justify-center bg-linear-[135deg,#f75959_0%,#f35587_100%] p-10 items-center">
      <h1 className="text-3xl text-center font-bold">Welcome to Socio</h1>
      <p>Don't have an account?</p>
      <Button
        size={"lg"}
        className="rounded-full bg-transparent hover:text-red-500"
        variant={"outline"}
        onClick={handleclicked}
      >Sign Up
      </Button>
    </div>:
      <motion.div
    initial={{ opacity: 1, x: 0 }} // Starting animation state
    animate={{ opacity: 1, x: 580 }} // End animation state
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 30,
      duration: 0.50, // Optional
    }}
    className="w-full max-w-xl flex flex-col-reverse lg:flex-row shadow-xl lg:max-w-6xl"
  >
      <div className="flex text-white w-full gap-5 flex-col justify-center bg-linear-[135deg,#f75959_0%,#f35587_100%] p-10 items-center">
        <h1 className="text-3xl text-center font-bold">Welcome to Socio</h1>
        <p>Don't have an account?</p>
        <Button
          size={"lg"}
          className="rounded-full bg-transparent hover:text-red-500"
          variant={"outline"}
          onClick={handleclicked}
        >Sign Up
        </Button>
      </div>
      
      </motion.div> }

    </div>
    
  );
};

export default AuthForm;

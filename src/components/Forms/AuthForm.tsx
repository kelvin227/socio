"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
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
import { Login, SignUp } from "../../../actions/authactions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
const formDataFr = [
  {
    name: "email",
    type: "email",
    placeHolder: "johndoe24@gmai.com",
    label: "E-mail",
  },  
  {
    name: "password",
    type: "password",
    placeHolder: "*****",
    label: "Mot de passe",
  },
  {
    name: "referralCode",
    type: "text",
    placeHolder: "Entrez le code de parrainage",
    label: "Code de parrainage",
  },
];
const formDataChi = [
  {
    name: "email",
    type: "email",
    placeHolder: "johndoe@gmail.com",
    label: "电子邮件",
  },
  {
    name: "password",
    type: "password",
    placeHolder: "*****",
    label: "密码",
  },
  {
    name: "referralCode",
    type: "text",
    placeHolder: "输入推荐码",
    label: "推荐码",
  },
];

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  referralCode: z
  .string().min(8, "referral code must be 8 characters long")
  .regex(/^\S+$/, "Spaces are not allowed"),
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
    placeHolder: "jondo982@gmail.com",
    label: "Email",
  },
  {
    name: "password",
    type: "password",
    placeHolder: "*****",
    label: "Password",
  },
];

const signinFormDataFr = [
  {
    name: "email",
    type: "email",
    placeHolder: "jondo982@gmail.com",
    label: "E-mail",
  },
  {
    name: "password",
    type: "password",
    placeHolder: "*****",
    label: "Mot de passe",
  }
]
const signinFormDataChi = [
  {
    name: "email",
    type: "email",
    placeHolder: "jondo982@gmail.com",
    label: "电子邮件",
  },
  {
    name: "password",
    type: "password",
    placeHolder: "*****",
    label: "密码",
  }
]
const sidemenudata = [
  {
    welcome: "Welcome to Socio",
    already: "Already have an account?",
    button: "Sign In",
  },
]
const sidemenudataFr = [
  {
    welcome: "Bienvenue sur Socio",
    already: "Vous avez déjà un compte?",
    button: "Se connecter",
  },
]
const sidemenudataChi = [
  {
    welcome: "欢迎来到 Socio",
    already: "已经有账户?",
    button: "登入",
  },
]

const sidemenudata2 = [
  {
    welcome: "Welcome to Socio",
    already: "Don't have an account?",
    button: "sign up",
  },
]
const sidemenudata2Fr = [
  {
    welcome: "Bienvenue sur Socio",
    already: "vous n'avez pas de compte ?",
    button: "s'inscrire",
  },
]

const sidemenudata2Chi = [
  {
    welcome: "歡迎來到 Socio",
    already: "沒有賬戶？",
    button: "報名",
  },
]
const SigninformSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z.string(),
});

// Skeleton Loader Component
const AuthSkeleton = () => (
  <div className="w-full max-w-xl flex flex-col gap-8 p-10 animate-pulse">
    <div className="flex w-full justify-between items-center">
      <div className="h-10 w-32 bg-gray-200 rounded-full" />
      <div className="h-8 w-20 bg-gray-200 rounded-full" />
    </div>
    <div className="flex flex-col gap-6">
      <div className="h-12 bg-gray-200 rounded-full" />
      <div className="h-12 bg-gray-200 rounded-full" />
      <div className="h-12 bg-gray-200 rounded-full" />
    </div>
    <div className="h-12 bg-gray-200 rounded-full" />
    <div className="flex items-center gap-2">
      <div className="h-5 w-32 bg-gray-200 rounded-full" />
    </div>
  </div>
);
const SideAuthSkeleton = () => (
  <div className="flex max-w-xl w-full gap-5 flex-col justify-center bg-linear-[135deg,#f75959_0%,#f35587_100%] p-10 items-center animate-pulse">
          <div className="w-24 h-24 bg-gray-200 rounded-full" />
            <div className="w-60 h-10 bg-gray-200 rounded-full" />
            <div className="w-40 h-8 bg-gray-200 rounded-full" />
            <div className=" w-24 h-12 bg-gray-200 rounded-full" />
          </div>
)


const AuthForm = () => {
   const [Lang, setLang] = useState('En');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      referralCode: "",
      password: "",
    },
  });

  const signinForm = useForm<z.infer<typeof SigninformSchema>>({
    resolver: zodResolver(SigninformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const [show, setShow] = useState(true);
  const [loadAni, setloadAni] = useState(false);

  const [isClicked, SetisClicked] = useState(false);
  const handleclicked = () => {
    SetisClicked(!isClicked);
    setShow(!show);
    setloadAni(!loadAni);
  };
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine the correct signin form data based on the current language
  const signdata =
    Lang === "En"
      ? signinFormData
      : Lang === "Fr"
      ? signinFormDataFr
      : Lang === "Chi"
      ? signinFormDataChi
      : signinFormData;

      const signupdata =
    Lang === "En"
      ? formData
      : Lang === "Fr"
      ? formDataFr
      : Lang === "Chi"
      ? formDataChi
      : formData;

    const sidemenudatalang =
    Lang === "En"
      ? sidemenudata
      : Lang === "Fr"
      ? sidemenudataFr
      : Lang === "Chi"
      ? sidemenudataChi
      : sidemenudata;

      const sidemenudata2lang =
    Lang === "En"
      ? sidemenudata2
      : Lang === "Fr"
      ? sidemenudata2Fr
      : Lang === "Chi"
      ? sidemenudata2Chi
      : sidemenudata2;

  useEffect(() => {
    // Check if window is defined (i.e., we are on the client-side)
    if (typeof window !== 'undefined') {
      // Get data from local storage
      const storedValue = localStorage.getItem('userLanguage');
      if (storedValue) {
        setLang(storedValue);
        router.refresh();
      }
      // Check if userLanguage is set in local storage
      console.log("Current Language:", storedValue);
    }

    // Simulate page loading
    const timer = setTimeout(() => setIsPageLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  const handleSubmitForm = async (data: z.infer<typeof formSchema>) => {
     setIsSubmitting(true);
    const response = await SignUp(
      data.email,
      data.password,
      data.referralCode as string
    );
      setIsSubmitting(false);
    if (response.success) {
      toast(response.message, {
        className: "bg-green-500 text-white",
      });

      router.replace("/user_dashboard");
    } else {
      toast(response.message, {
        className: "bg-red-500 text-white",
      });
    }
  };

  const handleSignInForm = async (data: z.infer<typeof SigninformSchema>) => {
    setIsSubmitting(true);
    const response = await Login(data.email, data.password, "user");
    setIsSubmitting(false);

    if (response.success) {
      toast.success(response.message);
      router.replace("/user_dashboard");
    } else {
      toast.error(response.message);
    }
  };
  const isSmallDevice = useMediaQuery("(max-width : 768px)");

  const handleLang =(lang: string) =>{
    setLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('userLanguage', lang);
      console.log("Language set to:", lang);
    }
    router.refresh();
    // You might want to trigger a page re-render or a context update here
    // to apply the language change across your application.
    // const signdata =
    // Lang === "En"
    //   ? signinFormData
    //   : Lang === "Fr"
    //   ? signinFormDataFr
    //   : Lang === "Chi"
    //   ? signinFormDataChi
    //   : signinFormData;
  }

  return (
    <div className="w-full max-w-xl flex flex-col-reverse lg:flex-row shadow-xl lg:max-w-6xl">
      {(isPageLoading || isSubmitting) ? (
        <AuthSkeleton />
      ) :show && !loadAni ? (
        // doesnt have a motion effect
        <Form {...signinForm}>
          <form
            onSubmit={signinForm.handleSubmit(handleSignInForm)}
            className="bg-white w-full flex flex-col gap-8 p-10"
          >
            <div className="flex w-full justify-between">
              <h1 className="text-4xl font-light">{Lang === "Fr" ? "Se connecter": Lang === "Chi"? "登入" :"Sign In"}</h1>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-2 items-center">
                  <FaEarthAmericas />
                  <FaChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleLang("En")}>English</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLang("Fr")}>French</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLang("Chi")}>Chinese</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {signdata.map((formField, index) => (
              <FormField
                key={index}
                control={signinForm.control}
                name={(formField.name as "password") || "email"}
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
              disabled={isSubmitting}
            >
               {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Loading...
                </span>
              ) : ( Lang === "Fr" ? "Se connecter" : Lang === "Chi" ? "登入" : "Sign In"
              )}
            </Button>
            <Label className="text-pink-500">
              <span><Link href={"/reset"}>{Lang === "Fr" ? "mot de passe oublié?" : Lang === "Chi" ? "忘密码" :"forgot Password"}</Link></span>
            </Label>
          </form>
        </Form>
      ) : (
        <Form {...form}>
          <motion.div
            initial={{
              ...(isSmallDevice ? { opacity: 0 } : { opacity: 1 }),
              ...(isSmallDevice ? { x: -300 } : { x: 0 }),
            }} // Starting animation state
            animate={{ opacity: 1, ...(isSmallDevice ? { x: 0 } : { x: 580 }) }} // End animation state
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 30,
              duration: 0.5, // Optional
            }}
            className="w-full max-w-xl flex flex-col-reverse lg:flex-row shadow-xl lg:max-w-6xl"
          >
            <form
              onSubmit={form.handleSubmit(handleSubmitForm)}
              className="bg-white w-full flex flex-col gap-8 p-10"
            >
              <div className="flex w-full justify-between">
                <h1 className="text-4xl font-light">{Lang === "Fr" ? "s'inscrire": Lang === "Chi"? "報名" :"Sign Up"}</h1>
                <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-2 items-center">
                  <FaEarthAmericas />
                  <FaChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleLang("En")}>English</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLang("Fr")}>French</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLang("Chi")}>Chinese</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
              {signupdata.map((formField, index) => (
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
                {Lang === "Fr" ? "s'inscrire": Lang === "Chi"? "報名" :"Sign Up"}
              </Button>
              <Label className="text-pink-500">
                <Checkbox className="bg-gray-100" id="agree" />
                <span>{Lang === "Fr" ? "j'accepte les termes et conditions": Lang === "Chi" ? "我同意條款和條件":"i agree to the terms and conditions"}</span>
              </Label>
            </form>
          </motion.div>
        </Form>
      )}

      {(isPageLoading || isSubmitting) ? (
        <SideAuthSkeleton />
      ) : isClicked && loadAni ? (
        <motion.div
          initial={{ opacity: 1, ...(isSmallDevice ? { x: -300 } : { x: 0 }) }} // Starting animation state
          animate={{ opacity: 1, ...(isSmallDevice ? { x: 0 } : { x: -580 }) }} // End animation state
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 30,
            duration: 0.5, // Optional
          }}
          className="w-full max-w-xl flex flex-col-reverse lg:flex-row shadow-xl lg:max-w-6xl"
        >
          <div className="flex text-white w-full gap-5 flex-col justify-center bg-linear-[135deg,#f75959_0%,#f35587_100%] p-10 items-center">
          <Image
                    src="https://kalajtomdzamxvkl.public.blob.vercel-storage.com/logo2-6X2L1QaE3Zc3GrRsCHvW0JY0kcA7bx.png"
                   className="w-24 h-24"
                   alt="Socio Logo"
                    width={24}
                    height={24}
                   />
                   {sidemenudatalang.map ((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                    <h1 className="text-3xl text-center font-bold">{item.welcome}</h1>
                    <p>{item.already}</p>
                     <Button
              size={"lg"}
              className="rounded-full bg-transparent hover:text-red-500"
              variant={"outline"}
              onClick={handleclicked}
            >
              {item.button}
            </Button>
                    </div>
                   ))}
            
           
          </div>
        </motion.div>
      ) : (
        <div className="flex text-white w-full gap-5 flex-col justify-center bg-linear-[135deg,#f75959_0%,#f35587_100%] p-10 items-center">
                  <Image
                  alt="Socio Logo"
                    src="https://kalajtomdzamxvkl.public.blob.vercel-storage.com/logo2-6X2L1QaE3Zc3GrRsCHvW0JY0kcA7bx.png"
                   className="w-24 h-24"
                    width={24}
                    height={24}
                  />
          {sidemenudata2lang.map ((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                    <h1 className="text-3xl text-center font-bold">{item.welcome}</h1>
                    <p>{item.already}</p>
                     <Button
              size={"lg"}
              className="rounded-full bg-transparent hover:text-red-500"
              variant={"outline"}
              onClick={handleclicked}
            >
              {item.button}
            </Button>
                    </div>
                   ))}
        </div>
      )}
    </div>
  );
};

export default AuthForm;

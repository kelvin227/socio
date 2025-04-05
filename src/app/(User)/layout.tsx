import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ContextProvider from "@/components/context-provider";

import "../../app/globals.css";

import Header from "./header";
import { NavItems } from "./user_config";
//import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "user Dashboard",
  description: "This is the Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={inter.className}>
        <ContextProvider>
          {/* <TooltipProvider> */}
            <SidebarProvider>
              <AppSidebar navItems={NavItems} />
              <main className="w-full">
                  <Header />
                {children}
              </main>
            </SidebarProvider>
          {/* </TooltipProvider> */}
        </ContextProvider>
      </body>
    </html>
  );
}

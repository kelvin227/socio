import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ContextProvider from '@/components/context-provider';

import '../../app/globals.css';

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import Header from './header';
import { NavItems } from './config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'This is the Admin Dashboard',
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
            <SidebarProvider>
            <AppSidebar navItems={NavItems} />
            <main className="w-full">
                  <Header />
                {children}
              </main>
            </SidebarProvider>
        </ContextProvider>
      </body>
    </html>
  );
}

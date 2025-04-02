import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ContextProvider from '@/components/context-provider';

import '../../app/globals.css';

import SideNav from '@/components/side-nav';

import Header from './header';
import { NavItems } from './user_config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'user Dashboard',
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
          <Header />
          <div className="flex">
            <SideNav navItems={NavItems} />
            <div className="w-full overflow-x-auto">
              <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
                <div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
                  <div className="w-full md:max-w-6xl">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from '@/components/sidebar';

import { Pacifico } from 'next/font/google';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});


export const metadata: Metadata = {
  title: "FleetMaster",
  description: "Revolutionizing fleet management for businesses worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pacifico.className}>
      <body>
        <div className="flex">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Poppins } from "next/font/google";
import { Nunito } from "next/font/google";
import Providers from "@/providers";
import { ToastContainer } from "react-toastify";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Nunito({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const rubik = Rubik({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rubik",
});
export const metadata: Metadata = {
  title: "Restaurant System",
  description: "Restaurant Management System to manage restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#221810] w-full font-rubik`}
      >
        <ToastContainer />
        <Providers>
          <div className="min-h-screen">
            <Sidebar />

            <main className="md:ml-50 min-w-0 px-3 pt-4 pb-20 sm:px-4 md:px-5 md:pb-5 md:pt-5">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

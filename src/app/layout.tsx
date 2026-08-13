import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import Providers from "@/providers";
import { ToastContainer } from "react-toastify";

const rubik = Rubik({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rubik",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Restaurant System",
  description: "Restaurant Management System to manage restaurant",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#221810] w-full font-poppins`}>
        <ToastContainer toastClassName="font-poppins font-bold" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

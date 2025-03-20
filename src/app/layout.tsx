import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import { Jost } from "next/font/google";
import { Raleway } from "next/font/google";

import "./globals.scss";
import Header from "@/shared/ui/Layout/Header";
import Footer from "@/shared/ui/Layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReduxProvider } from "@/shared/lib/redux/provider";
import { AuthProvider } from "@/shared/hook/AuthContext/ui/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIVENO",
  description: "Created by group Saeddd, Ilyas, Mikhail",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${jost.variable} ${raleway.variable} font-raleway antialiased`}>
        <ReduxProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <ToastContainer />
              <Header />
              {children}
              <Footer />
            </div>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

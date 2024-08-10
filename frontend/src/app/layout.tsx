import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "./components/theme-provider";
import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./login/page";

export const metadata: Metadata = {
  title: "SM Dash",
  description: "Complete E-Commerce Dashboard",
  openGraph: {
    title: "SM Dash",
    description: "NextJs Device friendly E-Commerce Admin Dashboard",
    url: "https://nextdashsm.netlify.app/",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/sm-dash.appspot.com/o/logo.png?alt=media&token=99de75e5-f892-4a86-a2d4-d10ec77e412b",
        width: 800,
        height: 600,
        alt: "SM-Devware logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/sm-dash.appspot.com/o/logo.png?alt=media&token=99de75e5-f892-4a86-a2d4-d10ec77e412b",
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen scroll-smooth w-full flex-col">
        <Theme>
          <ToastContainer position="top-center" />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {true ? <>{children}</> : <Auth />}
          </ThemeProvider>
        </Theme>
      </body>
      <Analytics />
    </html>
  );
}

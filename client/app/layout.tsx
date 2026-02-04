import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/providers/session-provider";
import { Toaster } from "react-hot-toast";
import ApolloWrapper from "@/providers/apollo-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Board",
  description: "Find and post jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider>
          <ApolloWrapper>
            {children}
            <Toaster />
          </ApolloWrapper>
        </AuthSessionProvider>
      </body>
    </html>
  );
}

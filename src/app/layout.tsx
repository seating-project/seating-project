import "@/app/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

import { TRPCReactProvider } from "@/trpc/react";
import { twMerge } from "tailwind-merge";
import { getServerAuthSession } from "@/server/auth";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Seats",
  description: "Create Seat Plans in no time",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body
        className={twMerge(
          " bg-background font-sans text-foreground",
          inter.variable,
        )}
      >
        <AuthProvider session={session}>
          <TRPCReactProvider headers={headers()}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </TRPCReactProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}

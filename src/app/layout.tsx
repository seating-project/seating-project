import "@/app/globals.css";

import {
  // Inter,
  Poppins,
} from "next/font/google";
import { twMerge } from "tailwind-merge";

import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/ui/theme";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/server/auth";
import { TRPCReactProvider } from "@/trpc/react";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={twMerge(
          "bg-background font-sans text-foreground",
          // inter.variable,
          poppins.className,
        )}
      >
        <AuthProvider session={session}>
          <TRPCReactProvider>
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

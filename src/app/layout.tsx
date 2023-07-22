import "@/app/globals.css";
import { getServerAuthSession } from "@/server/auth";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Toaster } from "@/components/ui/toaster"

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
          "dark bg-background font-sans text-foreground",
          inter.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

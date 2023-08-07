import "@/app/globals.css";
// import { getServerAuthSession } from "@/server/auth";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Seats",
  description: "Create Seat Plans in no time",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerAuthSession();
  return (
    <html lang="en">
      <body
        className={twMerge(
          " bg-background font-sans text-foreground",
          inter.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}

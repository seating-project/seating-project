import "@/app/globals.css";
import MainNav from "@/components/navbar/MainNav";
import { getServerAuthSession } from "@/server/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <div>
      <div className="sticky top-0">
        <MainNav session={session} />
      </div>
      {children}
    </div>
  );
}

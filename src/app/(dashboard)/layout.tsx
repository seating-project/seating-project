import "@/app/globals.css";
import MainNav from "@/components/navbar/MainNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="sticky top-0 z-10">
        <MainNav />
      </div>
      {children}
    </div>
  );
}

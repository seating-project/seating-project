import HeroSection from "@/components/client/HeroSection";
import RootNav from "@/components/navbar/RootNav";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div className="w-full ">
      <RootNav session={session} />
      <div className=" p-8">
        <HeroSection session={session} />
      </div>
    </div>
  );
}

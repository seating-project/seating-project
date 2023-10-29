import HeroSection from "@/components/client/HeroSection";
import RootNav from "@/components/navbar/RootNav";

export default function Home() {

  return (
    <div className="w-full ">
      <RootNav />
      <div className=" p-8">
        <HeroSection />
      </div>
    </div>
  );
}

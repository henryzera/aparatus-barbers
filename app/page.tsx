import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import Image from "next/image";
import bannerImage from "@/public/banner.png";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 space-y-4">
        <SearchInput />
        <Image src={bannerImage} alt="Banner" sizes="100vw" className="h-auto w-full"/>
      </div>
    </div>
  );
}

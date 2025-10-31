import Header from "@/components/Header";
import homeIcon from "@boring-icons/svg/dist/home.svg";
import { Search } from "@boring-icons/react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="mx-auto w-full p-6">
        <h1 className="text-2xl font-semibold mb-4">Test Icons</h1>
        <div className="flex gap-4">
          <img src={homeIcon} />
          <Search size={24} />
        </div>
      </main>
    </div>
  );
}

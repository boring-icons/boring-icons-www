import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="mx-auto w-full p-6">Hello. Welcome to the new app.</main>
    </div>
  );
}

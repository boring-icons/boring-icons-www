import { ThemeToggle } from "./ui/ThemeToggle";

export default function Header() {
  return(
    <header className="p-6 flex items-center justify-between">
      <h1 className="text-brand-base text-2xl font-semibold">HEADER</h1>
      <ThemeToggle />
    </header>
  );
}
import Logo from "./Logo";
import ThemeToggle from "./ui/ThemeToggle";


export default function Header() {
  return(
    <header className="px-6 py-10 gap-6 flex flex-col items-center bg-bg-brand-subtle rounded-b-3xl">
      <Logo/>
      <div>
        <h1 className="text-xl/6 text-fg-brand uppercase font-bold tracking-wide text-center mb-0.5">Boring Icons</h1>
        <h4 className="text-base text-fg-brand text-center">Icon set to create UI’s, like every other.</h4>
      </div>
      {/* <ThemeToggle/> */}
    </header>
  );
}
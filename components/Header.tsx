import Link from "next/link";

export default function Header() {
  return (
    <header className="max-w-6xl mx-auto w-full">
      <nav className="bg-gray-500 px-4 py-2 text-white">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
    </header>
  );
}

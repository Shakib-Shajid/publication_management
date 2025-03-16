"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname(); // Get the current route

  const navLinks = [
    { href: "/memo", label: "Create Memo" },
    { href: "/pending", label: "Pending Amount" },
    { href: "/list", label: "School List" },
    { href: "https://progressiveprokashony.com/order", label: "Our Books", external: true },
    { href: "/order", label: "Order List" },
    { href: "/calculator", label: "Calculator" },
  ];

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/"><h1 className="text-xl font-bold">Publication Management</h1></Link>
        <ul className="flex space-x-4">
          {navLinks.map(({ href, label, external }) => (
            <li key={href}>
              {external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {label}
                </a>
              ) : (
                <Link href={href} className={`hover:underline ${pathname === href ? "font-bold underline" : ""}`}>
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

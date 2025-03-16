"use client"; // This makes the component a client component

import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // Adjust path if needed

const NavbarWrapper = () => {
  const pathname = usePathname(); // Get the current route

  // Do not show navbar on the home page
  if (pathname === "/") return null;

  return <Navbar />;
};

export default NavbarWrapper;

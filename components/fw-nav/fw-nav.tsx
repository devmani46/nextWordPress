"use client";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Instrument_Sans as FontSans } from "next/font/google";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../motion-primitives/accordion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type WpMenuItem = {
  id: number;
  title: string;
  url: string;
  menu_item_parent: string;
  slug: string;
  children: WpMenuItem[];
};

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menus, setMenus] = useState<WpMenuItem[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function loadMenus() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v1/menu/primary`,
      );
      const data = await res.json();
      setMenus(data);
    }
    loadMenus();
  }, []);

  return (
    <section className={cn("navbar mb-8 w-full py-2 font-sans", font.variable)}>
      {/* Desktop Top Bar */}
      <nav className="absolute z-50 my-4 hidden w-full justify-center md:flex">
        <div className="p2-regular m-auto flex w-[70%] justify-between gap-44 text-gray">
          <p>+977-014511530, 014526005</p>
          <ul className="flex gap-2">
            <li>Africa</li>
            <li>America</li>
            <li>Asia Pacific</li>
            <li>Europe</li>
            <li>Middle East</li>
            <li>Oceania</li>
          </ul>
        </div>
      </nav>

      <div className="h-[100px]"></div>
      {/* Main Nav */}
      <nav
        className={`fixed left-0 top-0 z-40 flex w-full items-center justify-between bg-white px-10 transition-all lg:px-[15%] ${scrolled ? "bg-white bg-opacity-80 py-3 backdrop-blur-md" : "pt-3 lg:pt-11"}`}
      >
        {/* Logo */}
        <div className="logo-container flex items-center gap-4">
          <AnimatePresence>
            {!menuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="logo-image h-14 w-14 transition-all"
              >
                <img src="/logo.png" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hide logo text on mobile */}
          <div className="logo-text-container p2-semi-bold hidden text-violet-dark lg:block">
            <p className="mb-1 font-bold">Non-Residential Nepali</p>
            <p className="font-bold">गैरआवासीय नेपाली संघ</p>
          </div>
        </div>

        {/* Desktop Menu */}
        {/* Desktop Menu */}
        <ul className="p2-regular hidden items-center gap-4 text-gray md:flex">
          {menus.map((item) => (
            <li key={item.id} className="cursor-pointer">
              {item.children?.length > 0 ? (
                // Item has children → dropdown
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 focus-within:text-blue-normal hover:text-blue-normal focus:outline-none">
                    {item.title}
                    <span className="material-symbols-outlined">
                      keyboard_arrow_down
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.children.map((child) => (
                      <DropdownMenuItem
                        className={cn("font-sans", font.variable)}
                        key={child.id}
                      >
                        <Link href={`/${child.slug}`}>{child.title}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // No children → direct link
                <Link
                  href={`/${item.slug}`}
                  className="flex items-center gap-1 focus-within:text-blue-normal hover:text-blue-normal focus:outline-none"
                >
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Burger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="fixed left-0 top-14 z-50 h-screen w-full bg-white px-8 py-5 md:hidden"
          >
            {/* Header with Close Button */}
            {/* <div className="mb-4 flex w-full items-center justify-between">
              <p className="text-lg font-semibold">Menu</p>
              <button onClick={() => setMenuOpen(false)}>
                <X className="h-7 w-7" />
              </button>
            </div> */}

            {/* Language Dropdown */}
            {/* <motion.div>
              <button
                className="flex w-full justify-between rounded p-2"
                onClick={() => setLanguageOpen(!languageOpen)}
              >
                Region
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </button>

              <AnimatePresence>
                {languageOpen && (
                  <motion.ul
                    key="language"
                    initial={{ opacity: 1, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 1, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1 space-y-1 overflow-hidden rounded p-2"
                  >
                    <li>Africa</li>
                    <li>America</li>
                    <li>Asia Pacific</li>
                    <li>Europe</li>
                    <li>Middle East</li>
                    <li>Oceania</li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div> */}

            {/* Main Links */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.2 },
                },
              }}
              className="mt-4 space-y-2"
            >
              <Accordion
                className="flex w-full flex-col"
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                variants={{
                  expanded: {
                    opacity: 1,
                    scale: 1,
                  },
                  collapsed: {
                    opacity: 0,
                    scale: 0.7,
                  },
                }}
              >
                {menus.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger>
                      <motion.li
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.6 }}
                        className="flex cursor-pointer items-center justify-between rounded p-2 text-xl font-semibold transition-colors hover:text-blue-normal"
                      >
                        {item.title}
                        {item.children?.length > 0 && (
                          <span className="material-symbols-outlined">
                            keyboard_arrow_down
                          </span>
                        )}
                      </motion.li>
                    </AccordionTrigger>
                    <AccordionContent className="flex origin-left flex-col gap-2 pl-3">
                      <li className="hover:text-blue-normal">Submenu 1</li>
                      <li>Submenu 2</li>
                      <li>Submenu 3</li>
                      <li>Submenu 4</li>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

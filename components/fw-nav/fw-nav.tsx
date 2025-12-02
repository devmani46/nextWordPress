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

const decodeHtml = (html: string) => {
  if (typeof window === "undefined") return html;
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};


export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menus, setMenus] = useState<WpMenuItem[]>([]);

  const isPDF = (url: string) => url.endsWith(".pdf");
  const isInternal = (url: string) =>
    url.startsWith(process.env.NEXT_PUBLIC_WORDPRESS_URL!);

  const convertToNextSlug = (url: string) => {
    const base = process.env.NEXT_PUBLIC_WORDPRESS_URL!;
    return url.replace(base, "");
  };
  const getMenuLink = (url: string) => {
    if (isPDF(url)) return url; // Use direct PDF link
    if (isInternal(url)) return convertToNextSlug(url); // Use Next.js route
    return url; // External links remain external
  };

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
        <ul className="p2-regular hidden items-center gap-4 text-gray md:flex">
          {menus.map((item) => (
            <li key={item.id} className="cursor-pointer">
              {item.children?.length > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 focus-within:text-blue-normal hover:text-blue-normal focus:outline-none">
                    {decodeHtml(item.title)}
                    <span className="material-symbols-outlined">
                      keyboard_arrow_down
                    </span>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="w-64 rounded-xl border bg-white p-2 shadow-md"
                  >
                    {item.children.map((child) => (
                      <DropdownMenuItem
                        key={child.id}
                        className="w-full rounded-lg px-4 py-2 hover:bg-[#E8EDFF] focus:bg-[#E8EDFF]"
                      >
                        <Link
                          href={getMenuLink(child.url)}
                          className="block w-full"
                        >
                          {decodeHtml(child.title)}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={`/${item.slug}`}
                  className="flex items-center gap-1 focus-within:text-blue-normal hover:text-blue-normal focus:outline-none"
                >
                  {decodeHtml(item.title)}
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
      className="fixed left-0 top-14 z-50 h-screen w-full overflow-y-auto bg-white px-6 py-5 md:hidden"
    >
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.07, delayChildren: 0.1 },
          },
        }}
        className="mt-4 space-y-2"
      >
        {menus.map((item) => (
          <div key={item.id} className="w-full">
            {item.children?.length > 0 ? (
              <Accordion
                className="flex w-full flex-col"
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                variants={{
                  expanded: { opacity: 1, scale: 1 },
                  collapsed: { opacity: 0.9, scale: 0.98 },
                }}
              >
                <AccordionItem value={item.id} className="border-none">
                  <AccordionTrigger className="w-full">
                    <motion.li
                      variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.6 }}
                      className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-lg font-semibold transition-colors hover:bg-[#E8EDFF]"
                    >
                      {decodeHtml(item.title)}
                      <span className="material-symbols-outlined">
                        keyboard_arrow_down
                      </span>
                    </motion.li>
                  </AccordionTrigger>

                  <AccordionContent className="flex flex-col gap-1 pl-2 pt-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={getMenuLink(child.url)}
                        className="w-full rounded-lg px-4 py-2 text-base hover:bg-[#E8EDFF]"
                      >
                        {decodeHtml(child.title)}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                href={`/${item.slug}`}
                className="block w-full rounded-lg px-4 py-3 text-lg font-semibold hover:bg-[#E8EDFF]"
              >
                {decodeHtml(item.title)}
              </Link>
            )}
          </div>
        ))}
      </motion.ul>
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
}

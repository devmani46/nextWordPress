"use client";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <section className="navbar mb-8 w-full py-2">
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
        className={`fixed left-0 top-0 z-40 flex w-full items-center justify-between bg-white px-10 transition-all lg:px-[15%] ${scrolled ? "bg-white py-3" : "pt-3 lg:pt-11"}`}
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
                <img src="/logo.jpg" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hide logo text on mobile */}
          <div className="logo-text-container p2-semi-bold hidden text-violet-dark md:block">
            <p className="mb-1 font-bold">Non-Residential Nepali</p>
            <p className="font-bold">गैरआवासीय नेपाली संघ</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="p2-regular hidden items-center gap-4 text-gray md:flex">
          {[
            "About Us",
            "Resources",
            "Reports & Publications",
            "News & Events",
            "Projects",
            "Gallery",
          ].map((item) => (
            <li key={item} className="flex cursor-pointer items-center gap-1">
              {item}
              {item !== "Projects" && item !== "Gallery" && (
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
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
            <motion.div>
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
            </motion.div>

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
              {[
                "About Us",
                "Resources",
                "Reports & Publications",
                "News & Events",
                "Projects",
                "Gallery",
              ].map((item) => (
                <motion.li
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                  className="flex cursor-pointer items-center justify-between rounded p-2"
                >
                  {item}
                  {item !== "Projects" && item !== "Gallery" && (
                    <span className="material-symbols-outlined">
                      keyboard_arrow_down
                    </span>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

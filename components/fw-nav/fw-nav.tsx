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
          <div className="logo-image h-14 w-14">
            <img src="/logo.jpg" />
          </div>

          {/* Hide logo text on mobile */}
          <div className="logo-text-container p2-semi-bold hidden text-violet-dark md:block">
            <p>Non-Residential Nepali</p>
            <p>Gourawala something something</p>
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
          <button onClick={() => setMenuOpen(true)}>
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed left-0 top-0 z-50 h-screen w-full bg-white p-4 shadow-md md:hidden">
          {/* Header with Close Button */}
          <div className="mb-4 flex w-full items-center justify-between">
            <p className="text-lg font-semibold">Menu</p>
            <button onClick={() => setMenuOpen(false)}>
              <X className="h-7 w-7" />
            </button>
          </div>

          {/* Language Dropdown */}
          <div>
            <button
              className="flex w-full justify-between rounded p-2"
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              Language
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </button>

            {languageOpen && (
              <ul className="mt-1 space-y-1 rounded p-2">
                <li>Africa</li>
                <li>America</li>
                <li>Asia Pacific</li>
                <li>Europe</li>
                <li>Middle East</li>
                <li>Oceania</li>
              </ul>
            )}
          </div>

          {/* Main Links */}
          <ul className="mt-4 space-y-2">
            {[
              "About Us",
              "Resources",
              "Reports & Publications",
              "News & Events",
              "Projects",
              "Gallery",
            ].map((item) => (
              <li
                key={item}
                className="flex cursor-pointer items-center justify-between rounded p-2"
              >
                {item}
                {item !== "Projects" && item !== "Gallery" && (
                  <span className="material-symbols-outlined">
                    keyboard_arrow_down
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

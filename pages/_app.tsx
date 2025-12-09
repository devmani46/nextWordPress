import "@/styles/globals.css";
import "@/styles/home.css";
import "@/styles/whoweare.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@/components/theme/theme-provider";
import NavBar from "@/components/fw-nav/fw-nav";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";

import { Instrument_Sans as FontSans } from "next/font/google";
const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main
        className={cn(
          "!min-w-screen min-h-screen overflow-x-hidden font-sans",
          font.variable,
        )}
      >
        <NavBar />
        <Component {...pageProps} />
      </main>
      <Analytics />
    </ThemeProvider>
  );
}

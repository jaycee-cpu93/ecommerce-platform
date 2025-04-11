'use client'
import Head from "next/head";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { BiSun, BiMoon } from "react-icons/bi";
import { useEffect } from "react";
import { useDarkModeStore } from "@/store/darkMode";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { darkMode, toggleDarkMode } = useDarkModeStore();
  const setDarkMode = useDarkModeStore((state) => state.setDarkMode);

  useEffect(() =>{
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme) {
      setDarkMode(JSON.parse(storedTheme));
    }
  }, [setDarkMode])

  useEffect(() => {

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Only set if localStorage hasn't been set (optional logic)
    if (localStorage.getItem("darkMode") === null) {
      setDarkMode(mediaQuery.matches);
    }

     // Listen for changes
    const handler = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [setDarkMode]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>E - commerce app</title>
        <meta name="description" content="A modern e-commerce app" />
      </Head>
      <body className={darkMode ? "bg-black text-white" : "bg-white text-black"}>
        {/* Navbar component for navigation */}
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
        <div className="fixed bottom-4 right-4">
          <button 
            onClick={toggleDarkMode}
            className={`shadow-lg px-4 py-2 rounded-full ${
              darkMode ? "bg-white text-night" : "bg-night-50 text-white" 
            }`}
          >
            {darkMode ? <BiSun /> : <BiMoon />  }
          </button>
        </div>
      </body>
    </html>
  );
}
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

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme) useDarkModeStore.setState({ darkMode: JSON.parse(storedTheme) });
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>E - commerce app</title>
        <meta name="description" content="A modern e-commerce app" />
      </Head>
      <body className={darkMode ? "" : "bg-night"}>
        {/* Navbar component for navigation */}
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
        <div className="fixed bottom-4 right-4">
          <button 
            onClick={toggleDarkMode}
            className={`shadow-lg px-4 py-2 rounded-full ${
              darkMode ? "bg-night-50 text-white" : "bg-white text-night"
            }`}
          >
            {darkMode ? <BiMoon /> : <BiSun />}
          </button>
        </div>
      </body>
    </html>
  );
}
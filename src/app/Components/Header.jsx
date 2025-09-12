"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile nav menu
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Mobile search
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="flex items-center justify-between py-4">
          
          <Link href="/" className="flex items-center space-x-3">
            
            <span className="text-2xl font-semibold dark:text-white">
              KhaliBlog
            </span>
          </Link>

          {/* Desktop Search Bar (center) */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 bg-gray-50 
                  text-gray-900 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          {/* Desktop Nav + Sign In */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Services", path: "/services" },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-base font-medium transition-colors duration-300 ${
                  isActive(item.path)
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-gray-800 hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-400"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
                dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign In
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Mobile Search Icon */}
            <button
              onClick={toggleSearch}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle Search"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>

            {/* Hamburger Menu Icon */}
            <button
              onClick={toggleMenu}
              className="p-2 w-10 h-10 rounded-lg flex items-center justify-center
                text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <motion.div className="relative w-5 h-5">
                <span
                  className={`absolute h-0.5 w-5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${
                    isMenuOpen ? "top-2 rotate-45" : "top-0"
                  }`}
                ></span>
                <span
                  className={`absolute h-0.5 w-5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "top-2"
                  }`}
                ></span>
                <span
                  className={`absolute h-0.5 w-5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${
                    isMenuOpen ? "top-2 -rotate-45" : "top-4"
                  }`}
                ></span>
              </motion.div>
            </button>
          </div>
        </div>

        {/* === Mobile Search Dropdown === */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              key="mobile-search"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden pb-3"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 bg-gray-50 
                    text-gray-900 focus:ring-blue-500 focus:border-blue-500
                    dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* === Mobile Nav Menu === */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-inner border-t border-gray-200 dark:border-gray-700"
          >
            <div className="p-4 space-y-4">
              {/* Mobile Nav Links */}
              <ul className="flex flex-col space-y-3 text-base font-medium">
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" },
                  { name: "Services", path: "/services" },
                ].map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-2 rounded transition-colors duration-300 ${
                        isActive(item.path)
                          ? "bg-blue-700 text-white dark:bg-blue-600"
                          : "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile Sign In Button */}
              <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
                dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;

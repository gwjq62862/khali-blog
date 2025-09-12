"use client";
import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import {
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { dark } from "@clerk/themes";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { isLoaded, isSignedIn } = useUser();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          <span className="text-blue-600">Khali</span>Blog
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Desktop Nav + Auth */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6 text-gray-700 dark:text-gray-300">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
            <Link href="/services" className="hover:text-blue-600 dark:hover:text-blue-400">
              Services
            </Link>
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">
              About
            </Link>
          </nav>

          {isLoaded && isSignedIn ? (
            <UserButton appearance={{ theme: dark }} />
          ) : (
            <Link href="/sign-in">
              <button className="px-4 py-2 text-sm font-medium bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                Sign In
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden items-center space-x-4">
          {/* Search Icon */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="px-4 pb-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 w-72 h-full bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header with Close Button */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
                <Link href="/" className="text-lg font-bold text-gray-900 dark:text-white">
                  <span className="text-blue-600">Khali</span>Blog
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col flex-1 p-6 space-y-5 text-lg text-gray-700 dark:text-gray-300">
                <Link
                  href="/"
                  className="hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/about"
                  className="hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </nav>

              {/* User Section at Bottom */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                {isLoaded ? (
                  isSignedIn ? (
                    <div className="flex items-center justify-between">
                      <UserButton
                        appearance={{ theme: dark }}
                        afterSignOutUrl="/"
                      />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Account
                      </p>
                    </div>
                  ) : (
                    <Link href="/sign-in" className="block w-full">
                      <button className="w-full px-4 py-2 text-sm font-medium bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                        Sign In
                      </button>
                    </Link>
                  )
                ) : (
                  <p className="text-gray-500 text-sm">Loading...</p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

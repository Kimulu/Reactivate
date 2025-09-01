import React from "react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full px-6 py-4 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            {/* Replaced react-icons with an inline SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8"
            >
              <polygon points="12 2 22 24 2 24 12 2" />
              <line x1="12" y1="2" x2="12" y2="24" />
              <line x1="22" y1="24" x2="12" y2="2" />
              <line x1="2" y1="24" x2="12" y2="2" />
            </svg>
          </div>
          <span className="ml-2 text-xl font-semibold text-white">
            Reactivate
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/Login">
            <button className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Login
            </button>
          </Link>
          <Link href="Signup">
            <button className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Join
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

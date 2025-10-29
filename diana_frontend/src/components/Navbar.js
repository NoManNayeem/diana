"use client";

import { useState } from "react";
import Link from "next/link";
import { icons } from "@/config/icons";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ onMenuClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-all duration-200 group">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                <span className="text-primary-foreground font-bold text-lg">D</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">Diana</span>
                <span className="text-xs text-muted-foreground -mt-1">AI Assistant</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              href="/" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-all duration-200 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link 
              href="/chat" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-all duration-200 relative group"
            >
              Chat
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link 
              href="/history" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-all duration-200 relative group"
            >
              History
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link 
              href="/settings" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-all duration-200 relative group"
            >
              Settings
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link 
              href="/terms" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-all duration-200 relative group"
            >
              Terms
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-all duration-200 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-medium text-foreground bg-primary/10 hover:bg-primary/20 rounded-md transition-all duration-200"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-all duration-200"
            >
              Register
            </Link>
          </div>

          {/* Right side - Theme toggle and mobile menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
            >
              {isMobileMenuOpen ? (
                <icons.close className="w-5 h-5" />
              ) : (
                <icons.menu className="w-5 h-5" />
              )}
            </button>
            
            {/* Desktop sidebar toggle */}
            {onMenuClick && (
              <button 
                onClick={onMenuClick}
                className="hidden md:block p-2 rounded-md hover:bg-accent transition-colors"
              >
                <icons.menu className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col space-y-1">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 py-3 px-4 rounded-lg hover:bg-accent/50"
              >
                Home
              </Link>
              <Link 
                href="/chat" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 py-3 px-4 rounded-lg hover:bg-accent/50"
              >
                Chat
              </Link>
              <Link 
                href="/history" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 py-3 px-4 rounded-lg hover:bg-accent/50"
              >
                History
              </Link>
              <Link 
                href="/settings" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 py-3 px-4 rounded-lg hover:bg-accent/50"
              >
                Settings
              </Link>
              <Link 
                href="/terms" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 py-3 px-4 rounded-lg hover:bg-accent/50"
              >
                Terms
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 py-3 px-4 rounded-lg hover:bg-accent/50"
              >
                Contact
              </Link>
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground transition-all duration-200 py-3 px-4 rounded-lg bg-primary/10 hover:bg-primary/20"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold text-primary-foreground transition-all duration-200 py-3 px-4 rounded-lg bg-primary hover:bg-primary/90"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

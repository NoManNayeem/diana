import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand */}
          <div className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
              <span className="text-primary-foreground font-bold text-sm">D</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200">Diana</span>
              <span className="text-xs text-muted-foreground -mt-1">AI Assistant</span>
            </div>
          </div>
          
          {/* Links */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
            >
              Terms of Service
            </Link>
            <Link 
              href="/contact" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
            >
              Contact
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            &copy; 2024 Diana. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

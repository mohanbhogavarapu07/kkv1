import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const location = useLocation();
  const toolsDropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Insights", path: "/insights" },
    // Tools will be handled as a dropdown
  ];

  const toolsItems = [
    { name: "Assessments", path: "/tools/assessments" },
    { name: "Affirmations", path: "/tools/affirmations" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 10) {
        setShowNavbar(true);
      } else if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        toolsDropdownRef.current &&
        !toolsDropdownRef.current.contains(event.target as Node)
      ) {
        setToolsDropdownOpen(false);
      }
    }
    if (toolsDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toolsDropdownOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full bg-white z-50 border-b border-gray-200 py-4 px-4 md:px-8 transition-transform duration-300 ${showNavbar ? '' : '-translate-y-full'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-playfair font-medium tracking-tight">
          KRISHNA KUMAR YADLAPALLI
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "font-inter uppercase text-xs tracking-widest transition-all hover:text-gray-500 hover:underline underline-offset-4",
                location.pathname === item.path ? "font-medium" : "font-normal"
              )}
            >
              {item.name}
            </Link>
          ))}
          {/* Tools Dropdown (click to open/close) */}
          <div className="relative" ref={toolsDropdownRef}>
            <button
              className={cn(
                "font-inter uppercase text-xs tracking-widest transition-all hover:text-gray-500 hover:underline underline-offset-4 flex items-center gap-1",
                location.pathname.startsWith("/tools") ? "font-medium" : "font-normal"
              )}
              aria-haspopup="true"
              aria-expanded={toolsDropdownOpen}
              type="button"
              onClick={() => setToolsDropdownOpen((open) => !open)}
            >
              Tools <ChevronDown size={16} className={toolsDropdownOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
            {toolsDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                {toolsItems.map((tool) => (
                  <Link
                    key={tool.name}
                    to={tool.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setToolsDropdownOpen(false)}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/contact"
            className={cn(
              "font-inter uppercase text-xs tracking-widest transition-all hover:text-gray-500 hover:underline underline-offset-4",
              location.pathname === "/contact" ? "font-medium" : "font-normal"
            )}
          >
            Contact
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white pt-24 px-4 z-40 animate-fade-in">
          <div className="flex flex-col space-y-6 items-center">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "font-inter uppercase text-sm tracking-widest transition-all hover:underline underline-offset-4",
                  location.pathname === item.path ? "font-medium" : "font-normal"
                )}
              >
                {item.name}
              </Link>
            ))}
            {/* Tools Dropdown for Mobile */}
            <div className="w-full">
              <button
                className="w-full flex items-center justify-between font-inter uppercase text-sm tracking-widest py-2 border-b border-gray-200"
                onClick={() => setToolsDropdownOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={toolsDropdownOpen}
                type="button"
              >
                Tools <ChevronDown size={16} className={toolsDropdownOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>
              {toolsDropdownOpen && (
                <div className="bg-white border border-gray-200 rounded-md shadow-md mt-1">
                  {toolsItems.map((tool) => (
                    <Link
                      key={tool.name}
                      to={tool.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setToolsDropdownOpen(false);
                      }}
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "font-inter uppercase text-sm tracking-widest transition-all hover:underline underline-offset-4",
                location.pathname === "/contact" ? "font-medium" : "font-normal"
              )}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

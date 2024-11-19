import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const menuButton = document.getElementById('menu-button');
      
      if (isOpen && mobileMenu && menuButton) {
        if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-40 w-full
        transition-all duration-300 ease-in-out
        ${hasScrolled 
          ? 'bg-gray-900/80 backdrop-blur-lg border-b border-gray-800' 
          : 'bg-transparent'
        }
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text hover:from-indigo-300 hover:to-indigo-100 transition-all duration-300"
              >
                Partnership.top
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {[
                { to: "/how-it-works", label: "How it works?" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" }
              ].map((item) => (
                <Link 
                  key={item.to}
                  to={item.to} 
                  className="px-4 py-2 rounded-full text-gray-300 hover:text-white hover:bg-indigo-500/10 transition-all duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                id="menu-button"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full text-gray-300 hover:text-white hover:bg-indigo-500/10 transition-all duration-300"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation */}
      <div 
        id="mobile-menu"
        className={`
          fixed inset-y-0 right-0 z-40 w-64
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          bg-gray-900/95 backdrop-blur-lg border-l border-gray-800
          md:hidden
        `}
      >
        <div className="px-6 py-20 space-y-2">
          {[
            { to: "/how-it-works", label: "How it works?" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" }
          ].map((item) => (
            <Link 
              key={item.to}
              to={item.to} 
              className="group flex items-center justify-between w-full p-3 rounded-lg text-gray-300 hover:text-white hover:bg-indigo-500/10 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
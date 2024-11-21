import React from "react";
import { Link } from "react-router-dom";
import { Mail, Twitter, Linkedin, Github, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "How it works", path: "/how-it-works" },
      { label: "About Us", path: "/about" },
      { label: "Contact", path: "/contact" },
    ],
    legal: [{ label: "Terms & Conditions", path: "/terms" }],
    social: [
      {
        label: "Twitter",
        icon: <Twitter className="w-5 h-5" />,
        href: "https://twitter.com/muzairqureshi06",
      },
      {
        label: "LinkedIn",
        icon: <Linkedin className="w-5 h-5" />,
        href: "https://linkedin.com/in/muzairqureshi06",
      },
      {
        label: "Facebook",
        icon: <Facebook className="w-5 h-5" />,
        href: "https://facebook.com/muzairqureshi06",
      },
      {
        label: "Instagram",
        icon: <Instagram className="w-5 h-5" />,
        href: "https://instagram.com/muzairqureshi06",
      },
    ],
  };

  return (
    <footer className="relative z-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t border-gray-800">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link
              to="/"
              className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text"
            >
              Partnership.top
            </Link>
            <p className="text-gray-400 text-sm">
              Discover and invest in premium domain partnerships. Join our
              marketplace for digital assets today.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="flex items-center space-x-2 text-gray-400">
              <Mail className="w-5 h-5" />
              <a
                href="mailto:muzairqureshi06@gmail.com"
                className="hover:text-white transition-colors duration-300"
              >
                muzairqureshi06@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Partnership.top. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0">
              <p className="text-gray-400 text-sm">
                Made with ❤️ for the domain investment community by{" "}
                <a
                  href="https://najamulhassan.tech"
                  target="_blank"
                  className="text-indigo-400 hover:text-white transition-colors duration-300"
                >
                    Najam Ul Hassan
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

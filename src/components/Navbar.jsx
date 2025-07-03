import { useState } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Code,
  Book,
  Package,
  List,
  Github,
} from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";
import ReactCraftLogo from "../assets/reactcraft-logo.svg";

const navIcons = {
  Documentation: Book,
  Components: Package,
  Examples: List,
  GitHub: Github,
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const navItems = [
    { name: "Documentation", href: "#docs" },
    { name: "Components", href: "#components" },
    { name: "Examples", href: "#examples" },
    { name: "GitHub", href: "https://github.com/Ultron-18/ReactCraft-UI" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism background */}
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img
                src={ReactCraftLogo}
                alt="ReactCraft UI Logo"
                className="w-8 h-8"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ReactCraft
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = navIcons[item.name];
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                    target={item.name === "GitHub" ? "_blank" : undefined}
                    rel={
                      item.name === "GitHub" ? "noopener noreferrer" : undefined
                    }
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {item.name}
                  </a>
                );
              })}
            </div>

            {/* Right side - Star on GitHub button and mobile menu */}
            <div className="flex items-center space-x-4">
              {/* Star on GitHub button */}
              <a
                href="https://github.com/Ultron-18/ReactCraft-UI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold shadow hover:bg-gray-800 transition-colors duration-200 border border-gray-700"
                aria-label="Star on GitHub"
              >
                <Github className="w-5 h-5" />
                Star on GitHub
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg mt-2 border border-white/20 dark:border-gray-700/20">
                {navItems.map((item) => {
                  const Icon = navIcons[item.name];
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800/50 rounded-md transition-colors duration-200 font-medium"
                      target={item.name === "GitHub" ? "_blank" : undefined}
                      rel={
                        item.name === "GitHub"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

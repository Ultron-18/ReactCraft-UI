import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/Ultron-18", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com/isahigweimoh", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/isahigweimoh", label: "LinkedIn" },
    { icon: Mail, href: "mailto:isahigweimoh@gmail.com", label: "Email" },
  ];

  const footerLinks = [
    { name: "Documentation", href: "#docs" },
    { name: "Components", href: "#components" },
    { name: "Examples", href: "#examples" },
    { name: "Changelog", href: "#changelog" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
  ];

  return (
    <footer className="relative mt-20">
      {/* Glassmorphism background */}
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-t border-white/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ReactCraft
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
                A modern collection of reusable React components with
                glassmorphism effects, dark mode support, and beautiful
                animations. Built for developers who love clean, accessible, and
                performant UI components.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {footerLinks.slice(0, 3).map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                {footerLinks.slice(3).map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                © {currentYear} ReactCraft. Made with{" "}
                <Heart className="inline w-4 h-4 text-red-500" /> for the React
                community.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Built with React, Tailwind CSS, and Vite
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

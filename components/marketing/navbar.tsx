"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronDown, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const locales = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇲🇦" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/marketplace`, label: t("marketplace") },
    { href: `/${locale}#portfolio`, label: t("portfolio") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}#contact`, label: t("contact") },
  ];

  const currentLocale = locales.find((l) => l.code === locale);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-[hsl(var(--border))] shadow-[var(--shadow-md)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container-wedev flex items-center justify-between h-16">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-[var(--radius)] gradient-primary flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
            <Code2 size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight gradient-text font-[var(--font-display)]">
            WeDev
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[hsl(var(--foreground-2))] hover:text-[hsl(var(--primary))] rounded-[var(--radius-sm)] hover:bg-[hsl(var(--primary)/.06)] transition-all duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[hsl(var(--foreground-2))] hover:text-[hsl(var(--foreground))] rounded-[var(--radius)] hover:bg-[hsl(var(--surface-2))] transition-all border border-transparent hover:border-[hsl(var(--border))] cursor-pointer"
            >
              <Globe size={14} />
              <span>{currentLocale?.flag} {currentLocale?.code.toUpperCase()}</span>
              <ChevronDown size={12} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-40 card py-1.5 shadow-[var(--shadow-lg)]"
                  onMouseLeave={() => setLangOpen(false)}
                >
                  {locales.map((l) => (
                    <Link
                      key={l.code}
                      href={`/${l.code}`}
                      onClick={() => setLangOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-[hsl(var(--surface-2))] transition-colors ${
                        l.code === locale ? "text-[hsl(var(--primary))] font-semibold" : "text-[hsl(var(--foreground-2))]"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />

          <Button size="sm" asChild className="hidden md:inline-flex">
            <Link href={`/${locale}#contact`}>Me Contacter</Link>
          </Button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-[var(--radius)] hover:bg-[hsl(var(--surface-2))] text-[hsl(var(--foreground-2))] transition-colors cursor-pointer"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass border-t border-[hsl(var(--border))] overflow-hidden"
          >
            <div className="container-wedev py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-[hsl(var(--foreground-2))] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/.06)] rounded-[var(--radius-sm)] transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-[hsl(var(--border))]">
                {locales.map((l) => (
                  <Link key={l.code} href={`/${l.code}`} onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-1 px-2 py-1.5 text-xs rounded-[var(--radius-sm)] border transition-all ${
                      l.code === locale
                        ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/.1)] text-[hsl(var(--primary))]"
                        : "border-[hsl(var(--border))] text-[hsl(var(--foreground-muted))] hover:border-[hsl(var(--primary)/.4)]"
                    }`}
                  >
                    {l.flag} {l.code.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { Code2, MessageCircle, Mail, ExternalLink, ArrowUp } from "lucide-react";


const footerLinks = {
  Solutions: [
    { label: "Restaurant POS", href: "/marketplace/restaurant-pos-pro" },
    { label: "Café POS",       href: "/marketplace/cafe-pos-light" },
    { label: "Stock Manager",  href: "/marketplace/stock-manager-pro" },
    { label: "CRM Business",   href: "/marketplace/crm-business" },
    { label: "Voir tout",      href: "/marketplace" },
  ],
  Services: [
    { label: "Développement Web",   href: "/#services" },
    { label: "Marketing Digital",   href: "/#services" },
    { label: "Solutions SaaS",      href: "/#services" },
    { label: "Support & Formation", href: "/#services" },
  ],
  Ressources: [
    { label: "Blog",        href: "/blog" },
    { label: "Portfolio",   href: "/#portfolio" },
    { label: "FAQ",         href: "/#faq" },
    { label: "Contact",     href: "/#contact" },
  ],
};

const socials = [
  { icon: ExternalLink, href: "https://github.com/wedev-ma",   label: "GitHub",   text: "GH" },
  { icon: ExternalLink, href: "https://linkedin.com/in/wedev", label: "LinkedIn", text: "LI" },
  { icon: ExternalLink, href: "https://twitter.com/wedev_ma",  label: "Twitter",  text: "X"  },
];

export function Footer() {
  const locale = useLocale();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/.4)] to-transparent" />

      <div className="container-wedev py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-9 h-9 rounded-[var(--radius)] gradient-primary flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Code2 size={18} className="text-white" />
              </div>
              <span className="font-bold text-xl gradient-text font-[var(--font-display)]">WeDev</span>
            </Link>
            <p className="text-sm text-[hsl(var(--foreground-2))] leading-relaxed mb-6 max-w-xs">
              Solutions digitales premium pour entreprises marocaines. Développement, SaaS et marketing digital.
            </p>

            {/* Contact quick links */}
            <div className="flex flex-col gap-2 mb-6">
              <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[hsl(var(--foreground-2))] hover:text-[#25d366] transition-colors group w-fit">
                <MessageCircle size={15} className="group-hover:scale-110 transition-transform" />
                +212 600 000 000
              </a>
              <a href="mailto:contact@wedev.ma"
                className="flex items-center gap-2 text-sm text-[hsl(var(--foreground-2))] hover:text-[hsl(var(--primary))] transition-colors group w-fit">
                <Mail size={15} className="group-hover:scale-110 transition-transform" />
                contact@wedev.ma
              </a>
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-9 h-9 rounded-[var(--radius)] border border-[hsl(var(--border))] flex items-center justify-center text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/.4)] hover:bg-[hsl(var(--primary)/.06)] transition-all">
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm text-[hsl(var(--foreground))] mb-4">{category}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-sm text-[hsl(var(--foreground-2))] hover:text-[hsl(var(--primary))] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[hsl(var(--border))] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[hsl(var(--foreground-muted))] text-center">
            © {new Date().getFullYear()} WeDev. Tous droits réservés. Fait avec passion au Maroc 🇲🇦
          </p>

          <div className="flex items-center gap-4">
            <Link href={`/${locale}/privacy`} className="text-xs text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] transition-colors">
              Politique de confidentialité
            </Link>
            <Link href={`/${locale}/terms`} className="text-xs text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] transition-colors">
              CGU
            </Link>

            {/* Scroll to top */}
            <button
              onClick={scrollTop}
              className="w-8 h-8 rounded-[var(--radius-sm)] border border-[hsl(var(--border))] flex items-center justify-center text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/.4)] transition-all cursor-pointer"
              aria-label="Retour en haut"
            >
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

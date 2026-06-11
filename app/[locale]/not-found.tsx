"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Home, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function NotFound() {
  const locale = useLocale();

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6 pt-20 pb-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero opacity-50 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[hsl(var(--primary)/.06)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[hsl(var(--secondary)/.06)] blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-lg">
          {/* 404 number */}
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <p className="text-[9rem] font-black leading-none gradient-text select-none mb-2" style={{ letterSpacing: "-0.06em" }}>
              404
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h1 className="heading-md mb-3">Page introuvable</h1>
            <p className="text-subtle mb-8 leading-relaxed">
              Cette page n'existe pas ou a été déplacée. Revenez à l'accueil ou explorez nos solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link href={`/${locale}`}>
                  <Home size={18} /> Retour à l'accueil
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href={`/${locale}/marketplace`}>
                  <Search size={18} /> Explorer les solutions <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Floating dots decoration */}
          {[...Array(6)].map((_, i) => (
            <motion.div key={i}
              animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
              className="absolute w-2 h-2 rounded-full bg-[hsl(var(--primary)/.4)]"
              style={{ top: `${20 + i * 12}%`, left: `${5 + i * 15}%` }}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

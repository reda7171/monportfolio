"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ExternalLink, Clock, Shield, ChevronLeft, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

const DEMO_DATA: Record<string, {
  title: string;
  gradient: string;
  demoUrl: string;
  accounts: { role: string; email: string; password: string; note: string }[];
}> = {
  "restaurant-pos-pro": {
    title: "Restaurant POS Pro",
    gradient: "from-orange-400 via-red-400 to-pink-500",
    demoUrl: "https://demo.wedev.ma/restaurant",
    accounts: [
      { role: "Admin", email: "admin@demo-restaurant.com", password: "demo123", note: "Accès complet" },
      { role: "Caissier", email: "cashier@demo-restaurant.com", password: "demo123", note: "Caisse & commandes" },
      { role: "Manager", email: "manager@demo-restaurant.com", password: "demo123", note: "Rapports & stock" },
    ],
  },
  "cafe-pos-light": {
    title: "Café POS Light",
    gradient: "from-violet-400 via-purple-500 to-indigo-500",
    demoUrl: "https://demo.wedev.ma/cafe",
    accounts: [
      { role: "Admin", email: "admin@demo-cafe.com", password: "demo123", note: "Accès complet" },
      { role: "Caissier", email: "cashier@demo-cafe.com", password: "demo123", note: "Prise de commandes" },
    ],
  },
  "stock-manager-pro": {
    title: "Stock Manager Pro",
    gradient: "from-cyan-400 via-teal-400 to-emerald-500",
    demoUrl: "https://demo.wedev.ma/stock",
    accounts: [
      { role: "Admin", email: "admin@demo-stock.com", password: "demo123", note: "Accès complet" },
      { role: "Gestionnaire", email: "manager@demo-stock.com", password: "demo123", note: "Gestion inventaire" },
    ],
  },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="p-1.5 rounded-[var(--radius-sm)] hover:bg-[hsl(var(--surface-3))] transition-colors cursor-pointer text-muted hover:text-[hsl(var(--primary))]">
      {copied ? <Check size={13} className="text-[hsl(var(--success))]" /> : <Copy size={13} />}
    </button>
  );
}

export default function DemoPage({ params }: { params: { slug: string } }) {
  const locale = useLocale();
  const demo = DEMO_DATA[params.slug];
  const [timeLeft, setTimeLeft] = useState(7200); // 2h in seconds

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  if (!demo) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-3">😕</p>
          <p className="heading-sm mb-4">Démo non disponible</p>
          <Button asChild><Link href={`/${locale}/marketplace`}>Retour Marketplace</Link></Button>
        </div>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16">
        <div className="container-wedev max-w-3xl py-10">
          {/* Back */}
          <Link href={`/${locale}/marketplace/${params.slug}`} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-[hsl(var(--primary))] mb-6 transition-colors group">
            <ChevronLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Retour au produit
          </Link>

          {/* Header card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card overflow-hidden mb-6">
            <div className={`h-28 bg-gradient-to-br ${demo.gradient} relative`}>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <p className="text-xs font-medium mb-1 opacity-80">Mode Démonstration</p>
                <h1 className="text-xl font-bold">{demo.title}</h1>
              </div>
            </div>
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--success))] animate-pulse" />
                <span className="text-sm font-medium text-[hsl(var(--success))]">Session active</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Clock size={14} />
                <span>Expire dans <span className="font-bold text-[hsl(var(--foreground))] tabular-nums">{formatTime(timeLeft)}</span></span>
              </div>
            </div>
          </motion.div>

          {/* Accounts */}
          <div className="space-y-4 mb-6">
            <h2 className="heading-sm">Comptes de démonstration</h2>
            {demo.accounts.map((acc, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="default" className="text-xs">{acc.role}</Badge>
                  <span className="text-xs text-muted">{acc.note}</span>
                </div>
                <div className="space-y-2">
                  {[{ label: "Email", value: acc.email }, { label: "Mot de passe", value: acc.password }].map(field => (
                    <div key={field.label} className="flex items-center gap-3">
                      <span className="text-xs text-muted w-20 shrink-0">{field.label}</span>
                      <div className="flex items-center gap-1 flex-1 bg-[hsl(var(--surface-2))] rounded-[var(--radius-sm)] px-3 py-1.5">
                        <code className="text-xs font-mono flex-1">{field.value}</code>
                        <CopyButton text={field.value} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Launch demo */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="card p-6 text-center">
            <p className="text-sm text-muted mb-4">Copiez les identifiants ci-dessus, puis lancez la démo</p>
            <Button size="xl" className="w-full mb-3" asChild>
              <a href={demo.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={18} /> Lancer la Démo
              </a>
            </Button>
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted">
              <Shield size={12} />
              <span>Données réinitialisées toutes les 2h · Ne pas entrer de vraies données</span>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

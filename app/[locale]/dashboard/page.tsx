"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Package, MessageCircle, Star, ExternalLink, LogOut, User, Code2, ShoppingBag, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const MY_ORDERS = [
  { id: "#012", product: "Restaurant POS Pro", amount: 2500, status: "completed", date: "15 Mai 2024", gradient: "from-orange-400 to-red-500", version: "v2.0.0" },
  { id: "#007", product: "Stock Manager Pro",  amount: 1800, status: "pending",   date: "8 Juin 2024",  gradient: "from-cyan-400 to-teal-500",   version: "v1.3.0" },
];

const MY_DEMOS = [
  { product: "CRM Business", slug: "crm-business", gradient: "from-amber-400 to-orange-400", used: true },
  { product: "E-Learning",   slug: "elearning-platform", gradient: "from-green-400 to-teal-500", used: false },
];

export default function ClientDashboard() {
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[hsl(var(--surface))] border-b border-[hsl(var(--border))] shadow-[var(--shadow-sm)]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-[var(--radius)] flex items-center justify-center">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-bold gradient-text">WeDev</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href={`/${locale}/marketplace`} className="text-sm text-muted hover:text-[hsl(var(--primary))] transition-colors hidden sm:block">
              Marketplace
            </Link>
            <button className="text-sm text-[hsl(var(--error))] hover:underline flex items-center gap-1 cursor-pointer">
              <LogOut size={14} /> Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
            M
          </div>
          <div>
            <h1 className="heading-sm mb-0.5">Bonjour, Mohammed 👋</h1>
            <p className="text-sm text-muted">mohammed@exemple.ma</p>
          </div>
        </motion.div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Licences",   value: "2",  icon: Package,     color: "hsl(var(--primary))"   },
            { label: "Commandes",  value: "2",  icon: ShoppingBag, color: "hsl(var(--secondary))" },
            { label: "Démos testées", value: "1", icon: ExternalLink, color: "hsl(var(--accent))"  },
            { label: "Avis laissés",  value: "1", icon: Star,        color: "hsl(38 92% 50%)"      },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="card p-4 text-center">
                <div className="w-9 h-9 rounded-[var(--radius)] flex items-center justify-center mx-auto mb-2"
                  style={{ background: `${s.color}15` }}>
                  <Icon size={16} style={{ color: s.color }} />
                </div>
                <p className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[11px] text-muted">{s.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* My licenses/orders */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="heading-sm">Mes Licences & Commandes</h2>
            {MY_ORDERS.map((order, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                className="card p-5 flex gap-4">
                <div className={`w-12 h-12 rounded-[var(--radius-md)] bg-gradient-to-br ${order.gradient} flex items-center justify-center shrink-0`}>
                  <Package size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="font-semibold text-sm">{order.product}</p>
                      <p className="text-[10px] text-muted">{order.id} · {order.date}</p>
                    </div>
                    <p className="font-bold gradient-text shrink-0">{formatPrice(order.amount)}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      order.status === "completed"
                        ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                        : "text-amber-600 bg-amber-50 border-amber-200"
                    }`}>
                      {order.status === "completed" ? <CheckCircle2 size={9} /> : <Clock size={9} />}
                      {order.status === "completed" ? "Livré" : "En attente"}
                    </span>
                    <Badge variant="outline" className="text-[10px]">{order.version}</Badge>
                    {order.status === "completed" && (
                      <button className="text-[10px] text-[hsl(var(--primary))] hover:underline flex items-center gap-0.5 cursor-pointer">
                        <ExternalLink size={9} /> Accéder
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="text-center mt-4">
              <Link href={`/${locale}/marketplace`}>
                <Button variant="secondary" size="sm">
                  <Package size={14} /> Explorer d&apos;autres solutions
                </Button>
              </Link>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Démos */}
            <div className="card p-5">
              <h3 className="font-semibold text-sm mb-3">Démos Testées</h3>
              <div className="space-y-2">
                {MY_DEMOS.map((d, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[hsl(var(--surface-2))] rounded-[var(--radius)] border border-[hsl(var(--border))]">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${d.gradient} flex items-center justify-center`}>
                        <ExternalLink size={11} className="text-white" />
                      </div>
                      <span className="text-xs font-medium">{d.product}</span>
                    </div>
                    <Link href={`/${locale}/demo/${d.slug}`}
                      className="text-[10px] text-[hsl(var(--primary))] hover:underline flex items-center gap-0.5">
                      {d.used ? "Relancer" : "Tester"} <ChevronRight size={9} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="card p-5">
              <h3 className="font-semibold text-sm mb-3">Support Rapide</h3>
              <p className="text-xs text-muted mb-4">Une question sur votre licence ? Je réponds en moins de 30 minutes.</p>
              <Button variant="whatsapp" size="sm" className="w-full" asChild>
                <a href="https://wa.me/212600000000?text=Bonjour, j'ai besoin d'aide pour ma licence WeDev."
                  target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={14} /> Contacter le Support
                </a>
              </Button>
            </div>

            {/* Profile */}
            <div className="card p-5">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <User size={14} /> Mon Profil
              </h3>
              <div className="space-y-2 text-xs text-muted">
                <div className="flex justify-between"><span>Nom</span><span className="font-medium text-[hsl(var(--foreground))]">Mohammed</span></div>
                <div className="flex justify-between"><span>Email</span><span className="font-medium text-[hsl(var(--foreground))]">m@exemple.ma</span></div>
                <div className="flex justify-between"><span>Membre depuis</span><span className="font-medium text-[hsl(var(--foreground))]">Jan 2024</span></div>
              </div>
              <button className="mt-3 text-xs text-[hsl(var(--primary))] hover:underline cursor-pointer">
                Modifier le profil →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

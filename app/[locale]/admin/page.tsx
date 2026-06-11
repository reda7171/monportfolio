"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  LayoutDashboard, Package, Users, MessageSquare, FileText,
  TrendingUp, LogOut, Menu, X, Code2, ChevronRight,
  ShoppingBag, Star, Eye, Bell, Settings, ArrowUpRight,
  CheckCircle2, Clock, AlertCircle, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ─── Mock data ─────────────────────────────────────────────────────────────
const STATS = [
  { label: "Revenus ce mois",   value: "47,200 MAD", change: "+18%", up: true,  icon: TrendingUp,    color: "hsl(var(--primary))"   },
  { label: "Commandes",         value: "23",          change: "+5",   up: true,  icon: ShoppingBag,   color: "hsl(var(--secondary))" },
  { label: "Clients actifs",    value: "284",         change: "+12%", up: true,  icon: Users,         color: "hsl(142 71% 45%)"      },
  { label: "Messages non lus",  value: "7",           change: "–3",   up: false, icon: MessageSquare, color: "hsl(38 92% 50%)"       },
];

const RECENT_ORDERS = [
  { id: "#001", client: "Mohammed A.", product: "Restaurant POS Pro", amount: "2,500 MAD", status: "completed", date: "Aujourd'hui" },
  { id: "#002", client: "Fatima B.",   product: "Café POS Light",     amount: "1,200 MAD", status: "pending",   date: "Hier" },
  { id: "#003", client: "Youssef T.", product: "Stock Manager Pro",   amount: "1,800 MAD", status: "completed", date: "10 Juin" },
  { id: "#004", client: "Samira O.",  product: "CRM Business",        amount: "2,200 MAD", status: "cancelled", date: "9 Juin" },
  { id: "#005", client: "Karim M.",   product: "E-Learning Platform", amount: "3,500 MAD", status: "pending",   date: "8 Juin" },
];

const RECENT_CONTACTS = [
  { name: "Hassan El Idrissi", email: "hassan@example.ma", subject: "Devis POS Restaurant", date: "Il y a 2h" },
  { name: "Laila Bensouda",    email: "laila@example.ma",  subject: "Question Stock Manager", date: "Il y a 5h" },
  { name: "Omar Tazi",         email: "omar@example.ma",   subject: "Personnalisation CRM",  date: "Hier" },
];

const REVENUE_DATA = [38, 55, 42, 70, 60, 85, 72, 90, 78, 95, 82, 100];
const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

// ─── Status badge ────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
    completed: { label: "Complété",  icon: <CheckCircle2 size={10} />, cls: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800" },
    pending:   { label: "En attente", icon: <Clock size={10} />,       cls: "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800" },
    cancelled: { label: "Annulé",    icon: <AlertCircle size={10} />,  cls: "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" },
  };
  const s = map[status] || map.pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full border ${s.cls}`}>
      {s.icon} {s.label}
    </span>
  );
}

// ─── Sidebar nav items ────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard",   label: "Dashboard",    icon: LayoutDashboard },
  { id: "products",    label: "Produits",     icon: Package },
  { id: "orders",      label: "Commandes",    icon: ShoppingBag },
  { id: "contacts",    label: "Contacts",     icon: MessageSquare },
  { id: "users",       label: "Utilisateurs", icon: Users },
  { id: "blog",        label: "Blog",         icon: FileText },
  { id: "analytics",   label: "Analytics",    icon: BarChart3 },
];

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
export default function AdminDashboard() {
  const locale = useLocale();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const maxRevenue = Math.max(...REVENUE_DATA);

  return (
    <div className="min-h-screen flex bg-[hsl(var(--background))]">
      {/* ── Sidebar ── */}
      <AnimatePresence>
        {(sidebarOpen || true) && (
          <motion.aside
            initial={sidebarOpen ? { x: -280 } : false}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className={`
              fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col
              bg-[hsl(var(--surface))] border-r border-[hsl(var(--border))]
              ${sidebarOpen ? "shadow-xl" : "hidden lg:flex"}
            `}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-[hsl(var(--border))]">
              <div className="w-9 h-9 gradient-primary rounded-[var(--radius)] flex items-center justify-center shadow">
                <Code2 size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-[hsl(var(--foreground))]">WeDev</p>
                <p className="text-[10px] text-muted">Administration</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {NAV.map(item => {
                const Icon = item.icon;
                const active = activeNav === item.id;
                return (
                  <button key={item.id} onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] text-sm font-medium transition-all cursor-pointer group ${
                      active
                        ? "bg-[hsl(var(--primary))] text-white shadow-[0_4px_14px_hsl(var(--primary)/.3)]"
                        : "text-muted hover:bg-[hsl(var(--surface-2))] hover:text-[hsl(var(--foreground))]"
                    }`}
                  >
                    <Icon size={17} />
                    {item.label}
                    {active && <ChevronRight size={14} className="ml-auto" />}
                  </button>
                );
              })}
            </nav>

            {/* Bottom */}
            <div className="px-3 pb-4 space-y-1 border-t border-[hsl(var(--border))] pt-3">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] text-sm text-muted hover:bg-[hsl(var(--surface-2))] hover:text-[hsl(var(--foreground))] transition-all cursor-pointer">
                <Settings size={17} /> Paramètres
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] text-sm text-[hsl(var(--error))] hover:bg-[hsl(var(--error)/.06)] transition-all cursor-pointer">
                <LogOut size={17} /> Déconnexion
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-[hsl(var(--surface))] border-b border-[hsl(var(--border))] shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-[var(--radius-sm)] hover:bg-[hsl(var(--surface-2))] cursor-pointer">
              <Menu size={18} />
            </button>
            <div>
              <h1 className="font-semibold text-sm text-[hsl(var(--foreground))]">Tableau de bord Admin</h1>
              <p className="text-[10px] text-muted">Bienvenue, Admin · {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-[var(--radius)] hover:bg-[hsl(var(--surface-2))] flex items-center justify-center text-muted cursor-pointer transition-colors">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[hsl(var(--error))] rounded-full" />
            </button>
            <Link href={`/${locale}`} className="text-xs text-muted hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-1">
              <Eye size={13} /> Voir le site
            </Link>
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">A</div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-6 overflow-y-auto">

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3 }} className="card p-5 group cursor-default">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center"
                      style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}>
                      <Icon size={18} style={{ color: stat.color }} />
                    </div>
                    <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.up ? "text-emerald-500" : "text-red-400"}`}>
                      {stat.up ? "↑" : "↓"} {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-extrabold text-[hsl(var(--foreground))] mb-0.5">{stat.value}</p>
                  <p className="text-xs text-muted">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
            {/* Revenue chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="card p-5 xl:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-semibold text-sm text-[hsl(var(--foreground))]">Revenus 2024</h2>
                  <p className="text-xs text-muted">Évolution mensuelle en MAD</p>
                </div>
                <Badge variant="secondary">+24% vs 2023</Badge>
              </div>
              <div className="flex items-end gap-1.5 h-36">
                {REVENUE_DATA.map((v, i) => (
                  <motion.div key={i} className="flex-1 flex flex-col items-center gap-1 group cursor-default">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(v / maxRevenue) * 100}%` }}
                      transition={{ delay: 0.4 + i * 0.04, duration: 0.6, ease: "easeOut" }}
                      className="w-full rounded-t-[4px] transition-opacity group-hover:opacity-80"
                      style={{ background: `hsl(var(--primary) / ${0.3 + (v / maxRevenue) * 0.7})`, minHeight: "4px" }}
                    />
                    <span className="text-[9px] text-muted">{MONTHS[i]}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Top products */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="card p-5">
              <h2 className="font-semibold text-sm mb-4">Top Produits</h2>
              <div className="space-y-3">
                {[
                  { name: "Restaurant POS Pro", sales: 47, pct: 100, gradient: "from-orange-400 to-red-500" },
                  { name: "Café POS Light",     sales: 31, pct: 66,  gradient: "from-violet-400 to-purple-600" },
                  { name: "Stock Manager",      sales: 19, pct: 40,  gradient: "from-cyan-400 to-teal-500" },
                  { name: "E-Commerce",         sales: 21, pct: 45,  gradient: "from-indigo-400 to-violet-500" },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-[hsl(var(--foreground))] truncate">{p.name}</span>
                      <span className="text-muted shrink-0 ml-2">{p.sales} ventes</span>
                    </div>
                    <div className="h-1.5 bg-[hsl(var(--surface-2))] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${p.pct}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${p.gradient}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {/* Recent orders */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="card xl:col-span-2 overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-[hsl(var(--border))]">
                <h2 className="font-semibold text-sm">Commandes Récentes</h2>
                <button className="text-xs text-[hsl(var(--primary))] hover:underline flex items-center gap-1 cursor-pointer">
                  Voir tout <ArrowUpRight size={11} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[hsl(var(--surface-2))]">
                    <tr>
                      {["ID", "Client", "Produit", "Montant", "Statut", "Date"].map(h => (
                        <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-muted">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[hsl(var(--border))]">
                    {RECENT_ORDERS.map((order, i) => (
                      <tr key={i} className="hover:bg-[hsl(var(--surface-2))] transition-colors">
                        <td className="px-4 py-3 text-xs font-mono text-muted">{order.id}</td>
                        <td className="px-4 py-3 text-xs font-medium">{order.client}</td>
                        <td className="px-4 py-3 text-xs text-muted max-w-[140px] truncate">{order.product}</td>
                        <td className="px-4 py-3 text-xs font-semibold gradient-text">{order.amount}</td>
                        <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                        <td className="px-4 py-3 text-xs text-muted">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Recent contacts */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="card overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-[hsl(var(--border))]">
                <h2 className="font-semibold text-sm">Contacts Récents</h2>
                <span className="badge badge-primary text-[10px]">{RECENT_CONTACTS.length} nouveau{RECENT_CONTACTS.length > 1 ? "x" : ""}</span>
              </div>
              <div className="divide-y divide-[hsl(var(--border))]">
                {RECENT_CONTACTS.map((c, i) => (
                  <div key={i} className="p-4 hover:bg-[hsl(var(--surface-2))] transition-colors cursor-pointer group">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {c.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate group-hover:text-[hsl(var(--primary))] transition-colors">{c.name}</p>
                        <p className="text-[10px] text-muted truncate">{c.subject}</p>
                        <p className="text-[10px] text-muted mt-0.5">{c.date}</p>
                      </div>
                      <ChevronRight size={13} className="text-muted shrink-0 group-hover:text-[hsl(var(--primary))] transition-colors mt-1" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-[hsl(var(--border))]">
                <button className="w-full text-xs text-[hsl(var(--primary))] hover:underline cursor-pointer flex items-center justify-center gap-1">
                  Voir tous les contacts <ArrowUpRight size={11} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Quick actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="mt-5 card p-5">
            <h2 className="font-semibold text-sm mb-4">Actions Rapides</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Ajouter un Produit",   icon: Package,     color: "hsl(var(--primary))"   },
                { label: "Voir les Commandes",    icon: ShoppingBag, color: "hsl(var(--secondary))" },
                { label: "Gérer Témoignages",    icon: Star,        color: "hsl(38 92% 50%)"       },
                { label: "Nouveau Article Blog", icon: FileText,    color: "hsl(142 71% 45%)"      },
              ].map(action => {
                const Icon = action.icon;
                return (
                  <button key={action.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] hover:border-[hsl(var(--primary)/.4)] hover:bg-[hsl(var(--primary)/.04)] text-sm font-medium transition-all cursor-pointer group"
                  >
                    <Icon size={15} style={{ color: action.color }} className="group-hover:scale-110 transition-transform" />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

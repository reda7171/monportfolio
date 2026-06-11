"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";
import {
  ShoppingBag, Search, Eye, CheckCircle2, Clock, XCircle,
  Truck, Code2, LogOut, LayoutDashboard, Package, MessageSquare,
  Users, FileText, BarChart3, Settings, ChevronRight, Filter,
  Phone, Mail,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, getWhatsAppUrl } from "@/lib/utils";

const MOCK_ORDERS = [
  { id: "#047", customer: "Hassan El Idrissi",   email: "hassan@example.ma",   phone: "+212661234567", product: "Restaurant POS Pro",  amount: 2500, status: "DELIVERED",  createdAt: "10 Juin 2024",   gradient: "from-orange-400 to-red-500" },
  { id: "#046", customer: "Laila Bensouda",       email: "laila@example.ma",    phone: "+212698765432", product: "CRM Business",         amount: 2200, status: "CONFIRMED", createdAt: "9 Juin 2024",    gradient: "from-amber-400 to-orange-500" },
  { id: "#045", customer: "Omar Tazi",            email: "omar@example.ma",     phone: "+212677112233", product: "E-Learning Platform",  amount: 3500, status: "PENDING",   createdAt: "8 Juin 2024",    gradient: "from-green-400 to-teal-500" },
  { id: "#044", customer: "Asmae Berrada",        email: "asmae@example.ma",    phone: "+212644556677", product: "Stock Manager Pro",    amount: 1800, status: "DELIVERED",  createdAt: "7 Juin 2024",    gradient: "from-cyan-400 to-teal-500" },
  { id: "#043", customer: "Yassine Alaoui",       email: "yassine@example.ma",  phone: "+212655443322", product: "Café POS Light",       amount: 1200, status: "CANCELLED", createdAt: "5 Juin 2024",    gradient: "from-violet-400 to-purple-600" },
  { id: "#042", customer: "Nora Benali",          email: "nora@example.ma",     phone: "+212622334455", product: "E-Commerce Starter",   amount: 3000, status: "PENDING",   createdAt: "4 Juin 2024",    gradient: "from-indigo-400 to-violet-500" },
  { id: "#041", customer: "Karim Tahiri",         email: "karim@example.ma",    phone: "+212633221100", product: "RH & Paie Manager",    amount: 2800, status: "CONFIRMED", createdAt: "3 Juin 2024",    gradient: "from-pink-400 to-rose-500" },
  { id: "#040", customer: "Samira Chafai",        email: "samira@example.ma",   phone: "+212699887766", product: "Restaurant POS Pro",  amount: 2500, status: "DELIVERED",  createdAt: "1 Juin 2024",    gradient: "from-orange-400 to-red-500" },
];

const STATUS_MAP: Record<string, { label: string; icon: React.ReactNode; cls: string; next?: string; nextLabel?: string; nextIcon?: React.ReactNode }> = {
  PENDING:   { label: "En attente",  icon: <Clock size={10} />,        cls: "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800",  next: "CONFIRMED", nextLabel: "Confirmer", nextIcon: <CheckCircle2 size={11} /> },
  CONFIRMED: { label: "Confirmée",   icon: <CheckCircle2 size={10} />, cls: "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",        next: "DELIVERED", nextLabel: "Livrer",    nextIcon: <Truck size={11} /> },
  DELIVERED: { label: "Livrée",      icon: <Truck size={10} />,        cls: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800" },
  CANCELLED: { label: "Annulée",     icon: <XCircle size={10} />,      cls: "text-gray-500 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700" },
};

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "" },
  { id: "products",  label: "Produits",  icon: Package,         href: "/products" },
  { id: "orders",    label: "Commandes", icon: ShoppingBag,     href: "/orders" },
  { id: "contacts",  label: "Contacts",  icon: MessageSquare,   href: "/contacts" },
  { id: "users",     label: "Utilisateurs", icon: Users,        href: "/users" },
  { id: "blog",      label: "Blog",      icon: FileText,        href: "/blog" },
  { id: "analytics", label: "Analytics", icon: BarChart3,       href: "/analytics" },
];

function Sidebar({ active }: { active: string }) {
  const locale = useLocale();
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[hsl(var(--surface))] border-r border-[hsl(var(--border))] shrink-0">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[hsl(var(--border))]">
        <div className="w-9 h-9 gradient-primary rounded-[var(--radius)] flex items-center justify-center shadow"><Code2 size={18} className="text-white" /></div>
        <div><p className="font-bold text-sm">WeDev</p><p className="text-[10px] text-muted">Administration</p></div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(item => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <Link key={item.id} href={`/${locale}/admin${item.href}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] text-sm font-medium transition-all ${isActive ? "bg-[hsl(var(--primary))] text-white shadow-[0_4px_14px_hsl(var(--primary)/.3)]" : "text-muted hover:bg-[hsl(var(--surface-2))] hover:text-[hsl(var(--foreground))]"}`}>
              <Icon size={17} /> {item.label}
              {isActive && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pb-4 space-y-1 border-t border-[hsl(var(--border))] pt-3">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] text-sm text-muted hover:bg-[hsl(var(--surface-2))] transition-all cursor-pointer"><Settings size={17} /> Paramètres</button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] text-sm text-[hsl(var(--error))] hover:bg-[hsl(var(--error)/.06)] transition-all cursor-pointer"><LogOut size={17} /> Déconnexion</button>
      </div>
    </aside>
  );
}

function OrderDetail({ order, onClose, onStatusChange }: {
  order: typeof MOCK_ORDERS[0]; onClose: () => void;
  onStatusChange: (id: string, status: string) => void;
}) {
  const s = STATUS_MAP[order.status];
  const wa = getWhatsAppUrl(order.phone, `Bonjour ${order.customer.split(" ")[0]}, votre commande WeDev (${order.id}) — ${order.product} a été confirmée. Installation prévue sous 48h.`);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="card max-w-md w-full p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-xs text-muted mb-0.5">Commande {order.id}</p>
            <h3 className="font-bold">{order.customer}</h3>
            <p className="text-xs text-muted">{order.createdAt}</p>
          </div>
          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.cls}`}>{s.icon} {s.label}</span>
        </div>

        <div className="space-y-3 mb-5">
          <div className={`p-3 rounded-[var(--radius-md)] bg-gradient-to-br ${order.gradient} flex items-center gap-3`}>
            <Package size={18} className="text-white shrink-0" />
            <div><p className="text-white font-semibold text-sm">{order.product}</p>
              <p className="text-white/80 text-xs font-bold">{formatPrice(order.amount)}</p></div>
          </div>
          <div className="flex items-center gap-2 text-sm"><Mail size={13} className="text-muted" /><a href={`mailto:${order.email}`} className="hover:text-[hsl(var(--primary))] transition-colors">{order.email}</a></div>
          <div className="flex items-center gap-2 text-sm"><Phone size={13} className="text-muted" /><span>{order.phone}</span></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="whatsapp" size="sm" className="flex-1" asChild>
            <a href={wa} target="_blank" rel="noopener noreferrer"><Phone size={13} /> Contacter client</a>
          </Button>
          {s.next && (
            <Button variant="secondary" size="sm" className="flex-1"
              onClick={() => { onStatusChange(order.id, s.next!); onClose(); }}>
              {s.nextIcon} {s.nextLabel}
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onClose}>Fermer</Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selected, setSelected] = useState<typeof MOCK_ORDERS[0] | null>(null);

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filtered = orders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    const matchStatus = statusFilter === "ALL" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = orders.filter(o => o.status === "DELIVERED").reduce((a, o) => a + o.amount, 0);

  return (
    <div className="min-h-screen flex bg-[hsl(var(--background))]">
      <Sidebar active="orders" />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-[hsl(var(--surface))] border-b border-[hsl(var(--border))] shadow-[var(--shadow-sm)]">
          <div>
            <h1 className="font-semibold text-sm">Gestion des Commandes</h1>
            <p className="text-[10px] text-muted">{filtered.length} commande{filtered.length > 1 ? "s" : ""}</p>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "En attente",  value: orders.filter(o => o.status === "PENDING").length,   color: "hsl(38 92% 50%)"       },
              { label: "Confirmées",  value: orders.filter(o => o.status === "CONFIRMED").length,  color: "hsl(217 91% 60%)"      },
              { label: "Livrées",     value: orders.filter(o => o.status === "DELIVERED").length,  color: "hsl(142 71% 45%)"      },
              { label: "CA livré",    value: formatPrice(totalRevenue),                             color: "hsl(var(--primary))"   },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="card p-4 text-center">
                <p className={`text-xl font-extrabold mb-0.5 ${typeof s.value === "string" ? "text-sm" : ""}`} style={{ color: s.color }}>{s.value}</p>
                <p className="text-[11px] text-muted">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1 max-w-md">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              <input type="text" placeholder="Rechercher par client, produit ou #…" value={search} onChange={e => setSearch(e.target.value)} className="input pl-8 h-9 text-sm" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["ALL", "PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 text-xs rounded-[var(--radius)] font-medium cursor-pointer border transition-all ${statusFilter === s ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]" : "border-[hsl(var(--border))] text-muted hover:border-[hsl(var(--primary)/.4)]"}`}>
                  {s === "ALL" ? "Toutes" : STATUS_MAP[s]?.label ?? s}
                </button>
              ))}
            </div>
          </div>

          {/* Orders list */}
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((order, i) => {
                const s = STATUS_MAP[order.status];
                return (
                  <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}
                    onClick={() => setSelected(order)}
                    className="card p-4 flex items-center gap-4 cursor-pointer hover:border-[hsl(var(--primary)/.3)] transition-all group">
                    {/* Product color dot */}
                    <div className={`w-10 h-10 rounded-[var(--radius)] bg-gradient-to-br ${order.gradient} flex items-center justify-center shrink-0`}>
                      <ShoppingBag size={16} className="text-white" />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-xs font-bold text-muted">{order.id}</span>
                        <p className="font-semibold text-sm group-hover:text-[hsl(var(--primary))] transition-colors">{order.customer}</p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.cls}`}>{s.icon} {s.label}</span>
                      </div>
                      <p className="text-xs text-muted">{order.product}</p>
                    </div>
                    {/* Amount + date */}
                    <div className="text-right shrink-0">
                      <p className="font-bold gradient-text text-sm">{formatPrice(order.amount)}</p>
                      <p className="text-[10px] text-muted mt-0.5">{order.createdAt}</p>
                      {s.next && (
                        <button onClick={e => { e.stopPropagation(); handleStatusChange(order.id, s.next!); }}
                          className="mt-1.5 flex items-center gap-1 text-[10px] text-[hsl(var(--primary))] hover:underline cursor-pointer">
                          {s.nextIcon} {s.nextLabel}
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {filtered.length === 0 && (
              <div className="card p-12 text-center"><Filter size={32} className="mx-auto text-muted mb-3" /><p className="text-sm text-muted">Aucune commande trouvée</p></div>
            )}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {selected && <OrderDetail order={selected} onClose={() => setSelected(null)} onStatusChange={handleStatusChange} />}
      </AnimatePresence>
    </div>
  );
}

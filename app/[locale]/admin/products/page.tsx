"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";
import {
  Package, Plus, Search, Edit2, Trash2, Eye, Star,
  TrendingUp, Code2, LogOut, LayoutDashboard, ShoppingBag,
  MessageSquare, Users, FileText, BarChart3, Settings,
  ChevronRight, CheckCircle2, Clock, XCircle, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

// ─── Mock products (static for now — replace with DB calls) ─────────────────
const MOCK_PRODUCTS = [
  { id: "1", title: "Restaurant POS Pro", slug: "restaurant-pos-pro", price: 2500, status: "PUBLISHED", isFeatured: true,  salesCount: 47, rating: 4.8, category: "Restaurant POS", gradient: "from-orange-400 to-red-500",  updatedAt: "10 Juin 2024" },
  { id: "2", title: "Café POS Light",     slug: "cafe-pos-light",     price: 1200, status: "PUBLISHED", isFeatured: false, salesCount: 31, rating: 4.6, category: "Café POS",        gradient: "from-violet-400 to-purple-600", updatedAt: "8 Juin 2024" },
  { id: "3", title: "Stock Manager Pro",  slug: "stock-manager-pro",  price: 1800, status: "PUBLISHED", isFeatured: false, salesCount: 19, rating: 4.7, category: "Gestion Stock",   gradient: "from-cyan-400 to-teal-500",    updatedAt: "5 Juin 2024" },
  { id: "4", title: "CRM Business",       slug: "crm-business",       price: 2200, status: "DRAFT",     isFeatured: false, salesCount: 12, rating: 4.5, category: "CRM",             gradient: "from-amber-400 to-orange-500",  updatedAt: "1 Juin 2024" },
  { id: "5", title: "E-Learning Platform",slug: "elearning-platform", price: 3500, status: "PUBLISHED", isFeatured: true,  salesCount: 8,  rating: 4.9, category: "E-Learning",     gradient: "from-green-400 to-teal-500",   updatedAt: "28 Mai 2024" },
  { id: "6", title: "RH & Paie Manager",  slug: "rh-paie",           price: 2800, status: "DRAFT",     isFeatured: false, salesCount: 9,  rating: 4.6, category: "RH & Paie",      gradient: "from-pink-400 to-rose-500",    updatedAt: "20 Mai 2024" },
  { id: "7", title: "Système Réservation",slug: "reservation-system", price: 1500, status: "ARCHIVED",  isFeatured: false, salesCount: 14, rating: 4.4, category: "Réservation",    gradient: "from-blue-400 to-cyan-500",    updatedAt: "15 Mai 2024" },
  { id: "8", title: "E-Commerce Starter", slug: "ecommerce-starter",  price: 3000, status: "PUBLISHED", isFeatured: true,  salesCount: 21, rating: 4.7, category: "E-Commerce",     gradient: "from-indigo-400 to-violet-500", updatedAt: "10 Mai 2024" },
];

const STATUS_MAP: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
  PUBLISHED: { label: "Publié",  icon: <CheckCircle2 size={10} />, cls: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800" },
  DRAFT:     { label: "Brouillon",icon: <Clock size={10} />,       cls: "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800" },
  ARCHIVED:  { label: "Archivé", icon: <XCircle size={10} />,      cls: "text-gray-500 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700" },
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
        <div className="w-9 h-9 gradient-primary rounded-[var(--radius)] flex items-center justify-center shadow">
          <Code2 size={18} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-sm">WeDev</p>
          <p className="text-[10px] text-muted">Administration</p>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(item => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <Link key={item.id} href={`/${locale}/admin${item.href}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] text-sm font-medium transition-all ${
                isActive ? "bg-[hsl(var(--primary))] text-white shadow-[0_4px_14px_hsl(var(--primary)/.3)]" : "text-muted hover:bg-[hsl(var(--surface-2))] hover:text-[hsl(var(--foreground))]"
              }`}>
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

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteModal({ product, onConfirm, onCancel }: { product: typeof MOCK_PRODUCTS[0] | null; onConfirm: () => void; onCancel: () => void }) {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-6 max-w-sm w-full">
        <div className="w-12 h-12 rounded-full bg-[hsl(var(--error)/.1)] flex items-center justify-center mx-auto mb-4">
          <Trash2 size={22} className="text-[hsl(var(--error))]" />
        </div>
        <h3 className="font-bold text-center mb-1">Supprimer le produit ?</h3>
        <p className="text-sm text-subtle text-center mb-5">"{product.title}" sera supprimé définitivement.</p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel}>Annuler</Button>
          <Button variant="destructive" className="flex-1" onClick={onConfirm}>Supprimer</Button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Products Admin Page ─────────────────────────────────────────────────
export default function AdminProductsPage() {
  const locale = useLocale();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deleteTarget, setDeleteTarget] = useState<typeof MOCK_PRODUCTS[0] | null>(null);

  const filtered = products.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = () => {
    if (deleteTarget) {
      setProducts(prev => prev.filter(p => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const toggleFeatured = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));
  };

  return (
    <div className="min-h-screen flex bg-[hsl(var(--background))]">
      <Sidebar active="products" />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-[hsl(var(--surface))] border-b border-[hsl(var(--border))] shadow-[var(--shadow-sm)]">
          <div>
            <h1 className="font-semibold text-sm">Gestion des Produits</h1>
            <p className="text-[10px] text-muted">{filtered.length} produit{filtered.length > 1 ? "s" : ""}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/${locale}/admin`} className="text-xs text-muted hover:text-[hsl(var(--primary))] transition-colors">← Dashboard</Link>
            <Button size="sm" className="gap-1.5">
              <Plus size={14} /> Nouveau produit
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total",     value: products.length,                          color: "hsl(var(--primary))"   },
              { label: "Publiés",   value: products.filter(p => p.status === "PUBLISHED").length, color: "hsl(142 71% 45%)" },
              { label: "Brouillons",value: products.filter(p => p.status === "DRAFT").length,     color: "hsl(38 92% 50%)"  },
              { label: "Ventes total", value: products.reduce((a, p) => a + p.salesCount, 0),      color: "hsl(var(--secondary))" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="card p-4 text-center">
                <p className="text-2xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[11px] text-muted">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1 max-w-md">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              <input type="text" placeholder="Rechercher un produit…" value={search} onChange={e => setSearch(e.target.value)} className="input pl-8 h-9 text-sm" />
            </div>
            <div className="flex gap-2">
              {["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 text-xs rounded-[var(--radius)] font-medium transition-all cursor-pointer border ${
                    statusFilter === s ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]" : "border-[hsl(var(--border))] text-muted hover:border-[hsl(var(--primary)/.4)]"
                  }`}>
                  {s === "ALL" ? "Tous" : STATUS_MAP[s]?.label ?? s}
                </button>
              ))}
            </div>
          </div>

          {/* Products table */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[hsl(var(--surface-2))] border-b border-[hsl(var(--border))]">
                  <tr>
                    {["Produit", "Catégorie", "Prix", "Ventes", "Note", "Statut", "Vedette", "Actions"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  <AnimatePresence>
                    {filtered.map((product, i) => {
                      const status = STATUS_MAP[product.status];
                      return (
                        <motion.tr key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}
                          className="hover:bg-[hsl(var(--surface-2))] transition-colors">
                          {/* Product */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-[var(--radius)] bg-gradient-to-br ${product.gradient} flex items-center justify-center shrink-0`}>
                                <Package size={15} className="text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold">{product.title}</p>
                                <p className="text-[10px] text-muted">{product.updatedAt}</p>
                              </div>
                            </div>
                          </td>
                          {/* Category */}
                          <td className="px-4 py-3"><Badge variant="secondary" className="text-[10px]">{product.category}</Badge></td>
                          {/* Price */}
                          <td className="px-4 py-3 font-semibold text-sm gradient-text">{formatPrice(product.price)}</td>
                          {/* Sales */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-xs text-muted">
                              <TrendingUp size={11} /> {product.salesCount}
                            </div>
                          </td>
                          {/* Rating */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-xs">
                              <Star size={11} className="fill-amber-400 text-amber-400" />
                              <span className="font-semibold">{product.rating}</span>
                            </div>
                          </td>
                          {/* Status */}
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${status.cls}`}>
                              {status.icon} {status.label}
                            </span>
                          </td>
                          {/* Featured toggle */}
                          <td className="px-4 py-3">
                            <button onClick={() => toggleFeatured(product.id)}
                              className={`w-8 h-4 rounded-full relative transition-colors cursor-pointer ${product.isFeatured ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--surface-3))]"}`}>
                              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${product.isFeatured ? "translate-x-4" : "translate-x-0.5"}`} />
                            </button>
                          </td>
                          {/* Actions */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <Link href={`/${locale}/marketplace/${product.slug}`} target="_blank"
                                className="p-1.5 rounded hover:bg-[hsl(var(--surface-3))] text-muted hover:text-[hsl(var(--foreground))] transition-colors cursor-pointer">
                                <Eye size={14} />
                              </Link>
                              <button className="p-1.5 rounded hover:bg-[hsl(var(--surface-3))] text-muted hover:text-[hsl(var(--primary))] transition-colors cursor-pointer">
                                <Edit2 size={14} />
                              </button>
                              <button onClick={() => setDeleteTarget(product)}
                                className="p-1.5 rounded hover:bg-[hsl(var(--error)/.08)] text-muted hover:text-[hsl(var(--error))] transition-colors cursor-pointer">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="p-12 text-center">
                  <Filter size={32} className="mx-auto text-muted mb-3" />
                  <p className="text-sm text-muted">Aucun produit trouvé</p>
                </div>
              )}
            </div>
          </motion.div>
        </main>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteModal product={deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

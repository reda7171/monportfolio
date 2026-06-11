"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  Search, SlidersHorizontal, Star, TrendingUp, Play,
  MessageCircle, Grid3X3, List, X, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getWhatsAppUrl } from "@/lib/utils";

// ─── Static product data (will come from DB later) ───────────────────────────
const ALL_PRODUCTS = [
  {
    id: "1", slug: "restaurant-pos-pro", title: "Restaurant POS Pro",
    description: "Caisse complète pour restaurant : tables, commandes, cuisine, stocks, rapports temps réel.",
    price: 2500, rating: 4.8, reviewCount: 23, salesCount: 47,
    category: "restaurant-pos", categoryLabel: "Restaurant POS",
    techStack: ["Next.js", "PostgreSQL", "TypeScript"], isFeatured: true,
    gradient: "from-orange-400 via-red-400 to-pink-500", status: "PUBLISHED",
  },
  {
    id: "2", slug: "cafe-pos-light", title: "Café POS Light",
    description: "Interface rapide et intuitive pour cafés, snacks et fast-food.",
    price: 1200, rating: 4.6, reviewCount: 15, salesCount: 31,
    category: "cafe-pos", categoryLabel: "Café POS",
    techStack: ["React", "Node.js", "SQLite"], isFeatured: false,
    gradient: "from-violet-400 via-purple-500 to-indigo-500", status: "PUBLISHED",
  },
  {
    id: "3", slug: "stock-manager-pro", title: "Stock Manager Pro",
    description: "Gestion multi-entrepôts, alertes stock bas, fournisseurs, code-barres et rapports.",
    price: 1800, rating: 4.7, reviewCount: 9, salesCount: 19,
    category: "stock", categoryLabel: "Gestion Stock",
    techStack: ["Next.js", "PostgreSQL"], isFeatured: false,
    gradient: "from-cyan-400 via-teal-400 to-emerald-500", status: "PUBLISHED",
  },
  {
    id: "4", slug: "crm-business", title: "CRM Business",
    description: "CRM complet : pipeline commercial, devis automatiques, suivi emails, KPI dashboard.",
    price: 2200, rating: 4.5, reviewCount: 7, salesCount: 12,
    category: "crm", categoryLabel: "CRM",
    techStack: ["Next.js", "PostgreSQL", "Tailwind"], isFeatured: false,
    gradient: "from-amber-400 via-orange-400 to-red-400", status: "PUBLISHED",
  },
  {
    id: "5", slug: "elearning-platform", title: "E-Learning Platform",
    description: "Plateforme e-learning complète : cours vidéo, quiz, certificats, suivi apprenants.",
    price: 3500, rating: 4.9, reviewCount: 11, salesCount: 8,
    category: "elearning", categoryLabel: "E-Learning",
    techStack: ["Next.js", "PostgreSQL", "AWS S3"], isFeatured: true,
    gradient: "from-green-400 via-emerald-400 to-teal-500", status: "PUBLISHED",
  },
  {
    id: "6", slug: "rh-paie", title: "RH & Paie Manager",
    description: "Gestion des employés, congés, paie automatique, fiches de paie PDF.",
    price: 2800, rating: 4.6, reviewCount: 6, salesCount: 9,
    category: "rh", categoryLabel: "RH & Paie",
    techStack: ["Next.js", "PostgreSQL", "TypeScript"], isFeatured: false,
    gradient: "from-pink-400 via-rose-400 to-red-500", status: "PUBLISHED",
  },
  {
    id: "7", slug: "reservation-system", title: "Système de Réservation",
    description: "Réservation en ligne pour hôtels, restaurants, salons : agenda, confirmations, paiement.",
    price: 1500, rating: 4.4, reviewCount: 5, salesCount: 14,
    category: "reservation", categoryLabel: "Réservation",
    techStack: ["React", "Node.js", "MongoDB"], isFeatured: false,
    gradient: "from-blue-400 via-sky-400 to-cyan-500", status: "PUBLISHED",
  },
  {
    id: "8", slug: "ecommerce-starter", title: "E-Commerce Starter",
    description: "Boutique en ligne complète : catalogue, panier, paiement, livraison, admin.",
    price: 3000, rating: 4.7, reviewCount: 14, salesCount: 21,
    category: "ecommerce", categoryLabel: "E-Commerce",
    techStack: ["Next.js", "Stripe", "PostgreSQL"], isFeatured: true,
    gradient: "from-indigo-400 via-violet-400 to-purple-500", status: "PUBLISHED",
  },
];

const CATEGORIES = [
  { value: "all", label: "Toutes" },
  { value: "restaurant-pos", label: "Restaurant POS" },
  { value: "cafe-pos", label: "Café POS" },
  { value: "stock", label: "Gestion Stock" },
  { value: "crm", label: "CRM" },
  { value: "elearning", label: "E-Learning" },
  { value: "rh", label: "RH & Paie" },
  { value: "reservation", label: "Réservation" },
  { value: "ecommerce", label: "E-Commerce" },
];

const SORTS = [
  { value: "featured", label: "Vedettes" },
  { value: "rating",   label: "Mieux notés" },
  { value: "sales",    label: "Plus vendus" },
  { value: "price_asc", label: "Prix croissant" },
  { value: "price_desc", label: "Prix décroissant" },
];

// ─── ProductCard ─────────────────────────────────────────────────────────────
function ProductCard({ product, view }: { product: typeof ALL_PRODUCTS[0]; view: "grid" | "list" }) {
  const locale = useLocale();
  const whatsappUrl = getWhatsAppUrl(
    "+212600000000",
    `Bonjour, je suis intéressé par ${product.title}. Pouvez-vous me contacter?`
  );

  if (view === "list") {
    return (
      <motion.div layout className="card group flex gap-5 p-5 overflow-hidden">
        {/* Gradient thumbnail */}
        <div className={`w-28 h-28 rounded-[var(--radius-md)] bg-gradient-to-br ${product.gradient} shrink-0 flex items-center justify-center relative overflow-hidden`}>
          <div className="w-10 h-10 bg-white/25 rounded-xl flex items-center justify-center">
            <TrendingUp size={20} className="text-white" />
          </div>
          {product.isFeatured && (
            <div className="absolute top-1.5 left-1.5 text-[9px] font-bold bg-white/25 text-white px-1.5 py-0.5 rounded-full">⭐</div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <div>
              <Badge variant="secondary" className="text-[10px] mb-1">{product.categoryLabel}</Badge>
              <h3 className="heading-sm group-hover:text-[hsl(var(--primary))] transition-colors">{product.title}</h3>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] text-muted">À partir de</p>
              <p className="text-xl font-extrabold gradient-text">{formatPrice(product.price)}</p>
            </div>
          </div>
          <p className="text-sm text-subtle line-clamp-1 mb-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="flex items-center gap-1"><Star size={11} className="fill-amber-400 text-amber-400" />{product.rating} ({product.reviewCount})</span>
              <span>{product.salesCount} ventes</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" asChild><Link href={`/${locale}/demo/${product.slug}`}><Play size={11} className="fill-current" />Démo</Link></Button>
              <Button size="sm" variant="whatsapp" asChild><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={11} />Commander</a></Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div layout className="card group overflow-hidden flex flex-col">
      {/* Gradient header */}
      <div className={`relative h-44 bg-gradient-to-br ${product.gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-[var(--radius-lg)] border border-white/30 flex items-center justify-center shadow-lg">
            <TrendingUp size={28} className="text-white" />
          </motion.div>
        </div>
        {product.isFeatured && <div className="absolute top-3 left-3 text-[10px] font-bold bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full border border-white/30">⭐ Vedette</div>}
        <div className="absolute top-3 right-3 text-[10px] font-bold text-white px-2.5 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(8px)" }}>{product.categoryLabel}</div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="heading-sm mb-1 group-hover:text-[hsl(var(--primary))] transition-colors">{product.title}</h3>
          <p className="text-sm text-subtle line-clamp-2 leading-relaxed">{product.description}</p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" /><span className="font-semibold">{product.rating}</span><span className="text-muted">({product.reviewCount})</span></span>
          <span className="flex items-center gap-1 text-muted"><TrendingUp size={11} />{product.salesCount} ventes</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {product.techStack.map(t => <Badge key={t} variant="outline" className="text-[10px] py-0.5">{t}</Badge>)}
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[hsl(var(--border))]">
          <div>
            <p className="text-[10px] text-muted">À partir de</p>
            <p className="text-xl font-extrabold gradient-text">{formatPrice(product.price)}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild><Link href={`/${locale}/demo/${product.slug}`}><Play size={11} className="fill-current" />Démo</Link></Button>
            <Button size="sm" variant="whatsapp" asChild><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Commander</a></Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Marketplace Page ────────────────────────────────────────────────────
export default function MarketplacePage() {
  const t = useTranslations("marketplace");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS];
    if (search) list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
    if (category !== "all") list = list.filter(p => p.category === category);
    switch (sort) {
      case "rating":    list.sort((a, b) => b.rating - a.rating); break;
      case "sales":     list.sort((a, b) => b.salesCount - a.salesCount); break;
      case "price_asc": list.sort((a, b) => a.price - b.price); break;
      case "price_desc":list.sort((a, b) => b.price - a.price); break;
      default: list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    return list;
  }, [search, category, sort]);

  return (
    <main className="min-h-screen pt-20 pb-16">
      {/* Page header */}
      <section className="relative overflow-hidden py-14">
        <div className="absolute inset-0 gradient-hero opacity-70 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="container-wedev relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge badge-primary mb-4 inline-flex">Marketplace</span>
            <h1 className="heading-lg mb-3">{t("title")}</h1>
            <p className="text-subtle max-w-xl mx-auto">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <div className="container-wedev mt-8">
        {/* Search + Controls bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher une solution…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-9 h-10"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-[hsl(var(--foreground))] cursor-pointer">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input h-10 pr-8 appearance-none cursor-pointer min-w-[180px]"
            >
              {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          </div>

          {/* View toggle */}
          <div className="flex border border-[hsl(var(--border))] rounded-[var(--radius)] overflow-hidden">
            <button onClick={() => setView("grid")} className={`flex-1 px-3 py-2 flex items-center justify-center transition-all cursor-pointer ${view === "grid" ? "bg-[hsl(var(--primary))] text-white" : "bg-[hsl(var(--surface))] text-muted hover:bg-[hsl(var(--surface-2))]"}`}>
              <Grid3X3 size={15} />
            </button>
            <button onClick={() => setView("list")} className={`flex-1 px-3 py-2 flex items-center justify-center transition-all cursor-pointer ${view === "list" ? "bg-[hsl(var(--primary))] text-white" : "bg-[hsl(var(--surface))] text-muted hover:bg-[hsl(var(--surface-2))]"}`}>
              <List size={15} />
            </button>
          </div>

          <Button variant="secondary" onClick={() => setShowFilters(!showFilters)} className="gap-2 h-10">
            <SlidersHorizontal size={15} /> Filtres
          </Button>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-3 py-1.5 text-sm rounded-[var(--radius-full)] font-medium transition-all cursor-pointer border ${
                category === cat.value
                  ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))] shadow-[0_4px_14px_hsl(var(--primary)/.3)]"
                  : "border-[hsl(var(--border))] text-subtle hover:border-[hsl(var(--primary)/.4)] hover:text-[hsl(var(--primary))] bg-[hsl(var(--surface))]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-muted">
            <span className="font-semibold text-[hsl(var(--foreground))]">{filtered.length}</span> solution{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}
          </p>
          {(search || category !== "all") && (
            <button onClick={() => { setSearch(""); setCategory("all"); }} className="text-xs text-[hsl(var(--primary))] hover:underline cursor-pointer flex items-center gap-1">
              <X size={11} /> Réinitialiser
            </button>
          )}
        </div>

        {/* Products grid/list */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="card p-16 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="heading-sm mb-2">Aucun résultat</p>
              <p className="text-sm text-muted">Essayez d'autres mots-clés ou catégories</p>
            </motion.div>
          ) : (
            <motion.div
              key={`${view}-${category}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                : "flex flex-col gap-4"
              }
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <ProductCard product={product} view={view} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

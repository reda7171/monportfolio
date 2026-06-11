"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Star, ShoppingBag, Play, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getWhatsAppUrl } from "@/lib/utils";

const featuredProducts = [
  {
    id: "1",
    slug: "restaurant-pos-pro",
    title: "Restaurant POS Pro",
    titleAr: "نظام مطعم احترافي",
    description: "Caisse complète pour restaurant : tables, commandes, cuisine, stocks, rapports.",
    price: 2500,
    rating: 4.8,
    reviewCount: 23,
    salesCount: 47,
    category: "Restaurant POS",
    categoryColor: "#f97316",
    techStack: ["Next.js", "PostgreSQL", "TypeScript"],
    isFeatured: true,
    gradient: "from-orange-400 via-red-400 to-pink-500",
  },
  {
    id: "2",
    slug: "cafe-pos-light",
    title: "Café POS Light",
    description: "Interface rapide et intuitive pour cafés, snacks et fast-food.",
    price: 1200,
    rating: 4.6,
    reviewCount: 15,
    salesCount: 31,
    category: "Café POS",
    categoryColor: "#a78bfa",
    techStack: ["React", "Node.js", "SQLite"],
    isFeatured: false,
    gradient: "from-violet-400 via-purple-500 to-indigo-500",
  },
  {
    id: "3",
    slug: "stock-manager-pro",
    title: "Stock Manager Pro",
    description: "Gestion multi-entrepôts, alertes stock bas, fournisseurs et code-barres.",
    price: 1800,
    rating: 4.7,
    reviewCount: 9,
    salesCount: 19,
    category: "Gestion Stock",
    categoryColor: "#22d3ee",
    techStack: ["Next.js", "PostgreSQL"],
    isFeatured: false,
    gradient: "from-cyan-400 via-teal-400 to-emerald-500",
  },
];

function ProductCard({ product, index }: { product: typeof featuredProducts[0]; index: number }) {
  const locale = useLocale();
  const whatsappUrl = getWhatsAppUrl(
    "+212600000000",
    `Bonjour, je suis intéressé par ${product.title}. Pouvez-vous me contacter?`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className="card group overflow-hidden flex flex-col"
    >
      {/* Product image / gradient header */}
      <div className={`relative h-44 bg-gradient-to-br ${product.gradient} overflow-hidden`}>
        {/* Animated dots pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Floating product icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-[var(--radius-lg)] flex items-center justify-center border border-white/30 shadow-lg"
          >
            <ShoppingBag size={36} className="text-white" />
          </motion.div>
        </div>

        {/* Featured badge */}
        {product.isFeatured && (
          <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/30">
            ⭐ Vedette
          </div>
        )}

        {/* Category */}
        <div
          className="absolute top-3 right-3 text-white text-[10px] font-bold px-2.5 py-1 rounded-full"
          style={{ background: `${product.categoryColor}aa`, backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)" }}
        >
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="heading-sm mb-1.5 group-hover:text-[hsl(var(--primary))] transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-[hsl(var(--foreground-2))] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-[hsl(var(--foreground))]">{product.rating}</span>
            <span className="text-[hsl(var(--foreground-muted))]">({product.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-[hsl(var(--foreground-muted))]">
            <TrendingUp size={12} />
            <span>{product.salesCount} ventes</span>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {product.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-[10px] py-0.5">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Price + actions */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[hsl(var(--border))]">
          <div>
            <p className="text-[10px] text-[hsl(var(--foreground-muted))]">À partir de</p>
            <p className="text-xl font-extrabold gradient-text">{formatPrice(product.price)}</p>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link href={`/${locale}/demo/${product.slug}`}>
                <Play size={12} className="fill-current" />
                Démo
              </Link>
            </Button>
            <Button size="sm" variant="whatsapp" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Commander
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProductsSection() {
  const t = useTranslations("marketplace");
  const locale = useLocale();

  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero opacity-60 pointer-events-none" />

      <div className="container-wedev relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="badge badge-primary mb-3 inline-flex">{t("featured")}</span>
            <h2 className="heading-lg">{t("title")}</h2>
            <p className="text-[hsl(var(--foreground-2))] mt-2">{t("subtitle")}</p>
            <div className="divider-left mt-3" />
          </div>
          <Button variant="secondary" asChild className="shrink-0 group">
            <Link href={`/${locale}/marketplace`}>
              {t("featured")} →
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

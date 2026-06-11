"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Search, Clock, Tag, ArrowRight, Rss, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

import { ARTICLES, CATEGORIES } from "@/lib/blog-data";

// ─── Article Card ─────────────────────────────────────────────────────────────
function ArticleCard({ article, index, featured = false }: { article: typeof ARTICLES[0]; index: number; featured?: boolean }) {
  const locale = useLocale();
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className={`card group overflow-hidden flex flex-col ${featured ? "md:flex-row" : ""}`}
    >
      {/* Gradient thumbnail */}
      <div className={`${featured ? "md:w-2/5 h-52 md:h-auto" : "h-44"} bg-gradient-to-br ${article.gradient} relative overflow-hidden shrink-0`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
        <div className="absolute inset-4 flex items-end">
          <Badge className="bg-white/20 text-white border-white/30 text-[10px]">{article.categoryLabel}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-muted mb-3">
          <span className="flex items-center gap-1"><Clock size={11} />{article.readTime} min</span>
          <span>{article.date}</span>
        </div>
        <h2 className={`font-bold mb-2 group-hover:text-[hsl(var(--primary))] transition-colors leading-snug ${featured ? "text-lg" : "text-base"}`}>
          {article.title}
        </h2>
        <p className="text-sm text-subtle line-clamp-2 leading-relaxed mb-4 flex-1">{article.excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 text-[10px] text-muted bg-[hsl(var(--surface-2))] border border-[hsl(var(--border))] px-2 py-0.5 rounded-full">
              <Tag size={8} /> {tag}
            </span>
          ))}
        </div>

        <Link href={`/${locale}/blog/${article.slug}`} className="flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--primary))] hover:gap-2.5 transition-all group-hover:gap-2.5">
          Lire l'article <ArrowRight size={14} />
        </Link>
      </div>
    </motion.article>
  );
}

// ─── Blog List Page ───────────────────────────────────────────────────────────
export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    let list = [...ARTICLES];
    if (search) list = list.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase()));
    if (category !== "all") list = list.filter(a => a.category === category);
    return list;
  }, [search, category]);

  const featured = filtered.filter(a => a.featured).slice(0, 2);
  const rest = filtered.filter(a => !a.featured || filtered.filter(x => x.featured).indexOf(a) >= 2);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden py-14">
          <div className="absolute inset-0 gradient-hero opacity-70 pointer-events-none" />
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
          <div className="container-wedev relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="badge badge-primary mb-4 inline-flex"><Rss size={12} /> Blog & Ressources</span>
              <h1 className="heading-lg mb-3">Conseils & Guides Digitaux</h1>
              <p className="text-subtle max-w-xl mx-auto">Stratégies, tutoriels et actualités pour digitaliser votre business au Maroc.</p>
            </motion.div>
          </div>
        </section>

        <div className="container-wedev mt-10">
          {/* Search + filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              <input type="text" placeholder="Rechercher un article…" value={search} onChange={e => setSearch(e.target.value)} className="input pl-9 h-10" />
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map(cat => (
              <button key={cat.value} onClick={() => setCategory(cat.value)}
                className={`px-3 py-1.5 text-sm rounded-full font-medium transition-all cursor-pointer border ${
                  category === cat.value
                    ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))] shadow-[0_4px_14px_hsl(var(--primary)/.3)]"
                    : "border-[hsl(var(--border))] text-subtle hover:border-[hsl(var(--primary)/.4)] bg-[hsl(var(--surface))]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Featured articles */}
          {featured.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp size={16} className="text-[hsl(var(--primary))]" />
                <h2 className="font-semibold text-sm text-[hsl(var(--foreground))]">Articles à la une</h2>
              </div>
              <div className="grid grid-cols-1 gap-5">
                {featured.map((a, i) => <ArticleCard key={a.slug} article={a} index={i} featured />)}
              </div>
            </div>
          )}

          {/* All articles */}
          {rest.length > 0 && (
            <div>
              <h2 className="font-semibold text-sm mb-5 text-[hsl(var(--foreground))]">
                {filtered.length} article{filtered.length > 1 ? "s" : ""}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((a, i) => <ArticleCard key={a.slug} article={a} index={i} />)}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="card p-16 text-center">
              <p className="text-4xl mb-3">📝</p>
              <p className="heading-sm">Aucun article trouvé</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

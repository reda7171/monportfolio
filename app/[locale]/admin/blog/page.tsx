"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";
import {
  FileText, Plus, Search, Edit2, Trash2, Eye, Clock,
  CheckCircle2, XCircle, Code2, LogOut, LayoutDashboard,
  Package, ShoppingBag, MessageSquare, Users, BarChart3,
  Settings, ChevronRight, Rss, Filter, Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MOCK_POSTS = [
  { id: "1", title: "Comment choisir le bon logiciel POS pour votre restaurant ?", slug: "comment-choisir-pos-restaurant",   category: "guide",       readTime: 7, views: 342, isPublished: true,  publishedAt: "10 Juin 2024", tags: ["POS", "Restaurant"] },
  { id: "2", title: "Digitalisation des PME marocaines : état des lieux 2024",       slug: "digitalisation-pme-maroc-2024",   category: "tendances",   readTime: 5, views: 218, isPublished: true,  publishedAt: "3 Juin 2024",  tags: ["PME", "Maroc"] },
  { id: "3", title: "5 erreurs fatales dans la gestion des stocks",                   slug: "gestion-stock-erreurs-courantes", category: "conseils",    readTime: 6, views: 187, isPublished: true,  publishedAt: "28 Mai 2024",  tags: ["Stock", "PME"] },
  { id: "4", title: "Comment un CRM peut booster vos ventes de 40% ?",               slug: "crm-booster-ventes",             category: "conseils",    readTime: 8, views: 153, isPublished: true,  publishedAt: "20 Mai 2024",  tags: ["CRM", "Ventes"] },
  { id: "5", title: "Former vos équipes avec l'e-learning : guide pratique",          slug: "elearning-formation-equipe",     category: "guide",       readTime: 6, views: 94,  isPublished: true,  publishedAt: "12 Mai 2024",  tags: ["E-Learning"] },
  { id: "6", title: "Next.js 15 App Router : guide pour les développeurs marocains", slug: "next-js-15-guide-maroc",         category: "dev",         readTime: 10,views: 421, isPublished: true,  publishedAt: "5 Mai 2024",   tags: ["Next.js"] },
  { id: "7", title: "Comment déployer une app Next.js avec Docker en production",    slug: "deploy-nextjs-docker",           category: "dev",         readTime: 9, views: 0,   isPublished: false, publishedAt: "-",            tags: ["Docker", "Deploy"] },
  { id: "8", title: "Comparatif solutions POS au Maroc 2024",                        slug: "comparatif-pos-maroc",           category: "guide",       readTime: 12,views: 0,   isPublished: false, publishedAt: "-",            tags: ["POS", "Comparatif"] },
];

const CATEGORY_MAP: Record<string, { label: string; color: string }> = {
  guide:     { label: "Guide",         color: "hsl(217 91% 60%)" },
  tendances: { label: "Tendances",     color: "hsl(263 70% 60%)" },
  conseils:  { label: "Conseils",      color: "hsl(38 92% 50%)"  },
  dev:       { label: "Développement", color: "hsl(var(--primary))" },
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

export default function AdminBlogPage() {
  const locale = useLocale();
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [search, setSearch] = useState("");
  const [pubFilter, setPubFilter] = useState("ALL");

  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchPub = pubFilter === "ALL" || (pubFilter === "PUBLISHED" ? p.isPublished : !p.isPublished);
    return matchSearch && matchPub;
  });

  const togglePublish = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, isPublished: !p.isPublished, publishedAt: !p.isPublished ? new Date().toLocaleDateString("fr-MA", { day: "numeric", month: "long", year: "numeric" }) : "-" } : p));
  };

  const deletePost = (id: string) => setPosts(prev => prev.filter(p => p.id !== id));

  return (
    <div className="min-h-screen flex bg-[hsl(var(--background))]">
      <Sidebar active="blog" />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-[hsl(var(--surface))] border-b border-[hsl(var(--border))] shadow-[var(--shadow-sm)]">
          <div>
            <h1 className="font-semibold text-sm">Gestion du Blog</h1>
            <p className="text-[10px] text-muted">{filtered.length} article{filtered.length > 1 ? "s" : ""}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/${locale}/blog`} target="_blank" className="text-xs text-muted hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-1"><Eye size={12} /> Voir le blog</Link>
            <Button size="sm"><Plus size={14} /> Nouvel article</Button>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total",    value: posts.length,                             color: "hsl(var(--primary))"   },
              { label: "Publiés",  value: posts.filter(p => p.isPublished).length,  color: "hsl(142 71% 45%)"      },
              { label: "Brouillons",value: posts.filter(p => !p.isPublished).length,color: "hsl(38 92% 50%)"       },
              { label: "Vues total",value: posts.reduce((a, p) => a + p.views, 0),  color: "hsl(var(--secondary))" },
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
              <input type="text" placeholder="Rechercher un article…" value={search} onChange={e => setSearch(e.target.value)} className="input pl-8 h-9 text-sm" />
            </div>
            <div className="flex gap-2">
              {[["ALL", "Tous"], ["PUBLISHED", "Publiés"], ["DRAFT", "Brouillons"]].map(([v, l]) => (
                <button key={v} onClick={() => setPubFilter(v)}
                  className={`px-3 py-1.5 text-xs rounded-[var(--radius)] font-medium cursor-pointer border transition-all ${pubFilter === v ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]" : "border-[hsl(var(--border))] text-muted hover:border-[hsl(var(--primary)/.4)]"}`}>{l}</button>
              ))}
            </div>
          </div>

          {/* Posts table */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[hsl(var(--surface-2))] border-b border-[hsl(var(--border))]">
                  <tr>
                    {["Article", "Catégorie", "Vues", "Lecture", "Statut", "Publié le", "Actions"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  <AnimatePresence>
                    {filtered.map((post, i) => {
                      const cat = CATEGORY_MAP[post.category];
                      return (
                        <motion.tr key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}
                          className="hover:bg-[hsl(var(--surface-2))] transition-colors">
                          {/* Title */}
                          <td className="px-4 py-3 max-w-xs">
                            <div className="flex items-start gap-2.5">
                              <div className="w-7 h-7 rounded-[var(--radius)] flex items-center justify-center shrink-0 mt-0.5"
                                style={{ background: `${cat?.color}1a`, color: cat?.color }}>
                                <Rss size={13} />
                              </div>
                              <div>
                                <p className="text-xs font-semibold line-clamp-2 leading-snug">{post.title}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {post.tags.map(t => (
                                    <span key={t} className="inline-flex items-center gap-0.5 text-[9px] text-muted bg-[hsl(var(--surface-3))] border border-[hsl(var(--border))] px-1.5 py-px rounded">
                                      <Tag size={7} />{t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                          {/* Category */}
                          <td className="px-4 py-3"><Badge variant="secondary" className="text-[10px]">{cat?.label}</Badge></td>
                          {/* Views */}
                          <td className="px-4 py-3 text-sm font-semibold">{post.views > 0 ? post.views.toLocaleString("fr") : <span className="text-muted">—</span>}</td>
                          {/* Read time */}
                          <td className="px-4 py-3">
                            <span className="flex items-center gap-1 text-xs text-muted"><Clock size={10} />{post.readTime} min</span>
                          </td>
                          {/* Status */}
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              post.isPublished ? "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800" : "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
                            }`}>
                              {post.isPublished ? <><CheckCircle2 size={9} /> Publié</> : <><Clock size={9} /> Brouillon</>}
                            </span>
                          </td>
                          {/* Published at */}
                          <td className="px-4 py-3 text-xs text-muted">{post.publishedAt}</td>
                          {/* Actions */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              {post.isPublished && (
                                <Link href={`/${locale}/blog/${post.slug}`} target="_blank"
                                  className="p-1.5 rounded hover:bg-[hsl(var(--surface-3))] text-muted hover:text-[hsl(var(--foreground))] transition-colors">
                                  <Eye size={14} />
                                </Link>
                              )}
                              <button
                                onClick={() => togglePublish(post.id)}
                                className="p-1.5 rounded hover:bg-[hsl(var(--surface-3))] transition-colors cursor-pointer"
                                title={post.isPublished ? "Dépublier" : "Publier"}>
                                {post.isPublished ? <XCircle size={14} className="text-amber-500" /> : <CheckCircle2 size={14} className="text-emerald-500" />}
                              </button>
                              <button className="p-1.5 rounded hover:bg-[hsl(var(--surface-3))] text-muted hover:text-[hsl(var(--primary))] transition-colors cursor-pointer">
                                <Edit2 size={14} />
                              </button>
                              <button onClick={() => deletePost(post.id)}
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
                <div className="p-12 text-center"><Filter size={32} className="mx-auto text-muted mb-3" /><p className="text-sm text-muted">Aucun article trouvé</p></div>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

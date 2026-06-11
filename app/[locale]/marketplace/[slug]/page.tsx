"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";
import {
  Star, TrendingUp, Play, MessageCircle, CheckCircle2,
  Code2, ChevronLeft, Shield, Clock, Headphones, Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { formatPrice, getWhatsAppUrl } from "@/lib/utils";

// ─── Full product data ────────────────────────────────────────────────────────
const PRODUCTS: Record<string, {
  id: string; slug: string; title: string; description: string; longDescription: string;
  price: number; rating: number; reviewCount: number; salesCount: number;
  categoryLabel: string; techStack: string[]; isFeatured: boolean;
  gradient: string; features: string[]; changelog: { version: string; date: string; changes: string[] }[];
  faq: { q: string; a: string }[];
  demoAccounts: { role: string; email: string; password: string }[];
  reviews: { name: string; rating: number; body: string; date: string; initials: string; gradient: string }[];
}> = {
  "restaurant-pos-pro": {
    id: "1", slug: "restaurant-pos-pro", title: "Restaurant POS Pro",
    description: "Solution complète de caisse pour restaurant.",
    longDescription: "Restaurant POS Pro est la solution tout-en-un pour gérer votre restaurant avec efficacité. Gestion des tables en temps réel, prise de commandes tactile, interface cuisine, gestion des stocks automatique et rapports analytiques avancés. Conçu pour les restaurants marocains avec support de l'arabe.",
    price: 2500, rating: 4.8, reviewCount: 23, salesCount: 47,
    categoryLabel: "Restaurant POS", gradient: "from-orange-400 via-red-400 to-pink-500", isFeatured: true,
    techStack: ["Next.js 15", "Node.js", "PostgreSQL", "TypeScript", "Tailwind CSS", "Prisma"],
    features: [
      "Gestion des tables en temps réel avec plan de salle interactif",
      "Interface caissier tactile optimisée pour tablette",
      "Impression tickets cuisine sur imprimante thermique",
      "Gestion des stocks avec alertes automatiques",
      "Rapports & analytics avancés (CA, top produits, heures de pointe)",
      "Multi-utilisateurs avec rôles (Admin, Manager, Caissier, Cuisinier)",
      "Mode hors-ligne — synchronisation automatique",
      "Programme de fidélité clients intégré",
      "Multi-devises (MAD, EUR)",
      "Export données Excel & PDF",
    ],
    changelog: [
      { version: "2.0.0", date: "Déc 2024", changes: ["Interface redesignée", "Mode hors-ligne amélioré", "Nouveau module fidélité", "Performance +40%"] },
      { version: "1.5.0", date: "Sep 2024", changes: ["Rapports PDF", "Multi-imprimantes", "API externe"] },
      { version: "1.0.0", date: "Jan 2024", changes: ["Version initiale"] },
    ],
    faq: [
      { q: "Fonctionne-t-il hors ligne ?", a: "Oui, le système fonctionne en mode hors-ligne et se synchronise automatiquement dès que la connexion est rétablie." },
      { q: "Combien d'utilisateurs peut-on créer ?", a: "Illimité selon votre licence. Chaque utilisateur a des permissions spécifiques selon son rôle." },
      { q: "Compatible quelles imprimantes ?", a: "Compatible avec toutes les imprimantes thermiques Epson, Star, Bixolon (connexion USB, réseau ou Bluetooth)." },
      { q: "Le support est-il inclus ?", a: "Oui, support WhatsApp + email inclus. Installation complète sur votre matériel dans les 48h." },
    ],
    demoAccounts: [
      { role: "Admin", email: "admin@demo-restaurant.com", password: "demo123" },
      { role: "Caissier", email: "cashier@demo-restaurant.com", password: "demo123" },
      { role: "Manager", email: "manager@demo-restaurant.com", password: "demo123" },
    ],
    reviews: [
      { name: "Mohammed A.", rating: 5, body: "Excellent système ! Installation rapide, interface claire. Notre CA a augmenté de 20% grâce aux rapports.", date: "Jan 2025", initials: "MA", gradient: "from-orange-400 to-red-500" },
      { name: "Fatima B.", rating: 5, body: "Support réactif, toujours disponible. Le mode hors-ligne nous a sauvés lors d'une panne internet.", date: "Dec 2024", initials: "FB", gradient: "from-violet-400 to-purple-600" },
      { name: "Karim T.", rating: 4, body: "Très bon produit. J'aurais aimé une app mobile native mais l'interface web sur tablette est excellente.", date: "Nov 2024", initials: "KT", gradient: "from-cyan-400 to-blue-500" },
    ],
  },
  "cafe-pos-light": {
    id: "2", slug: "cafe-pos-light", title: "Café POS Light",
    description: "Interface rapide et intuitive pour cafés, snacks et fast-food.",
    longDescription: "Café POS Light est pensé pour les petits commerces qui ont besoin d'une caisse simple, rapide et efficace. Prise de commande en 2 clics, gestion des produits, rapports journaliers clairs.",
    price: 1200, rating: 4.6, reviewCount: 15, salesCount: 31,
    categoryLabel: "Café POS", gradient: "from-violet-400 via-purple-500 to-indigo-500", isFeatured: false,
    techStack: ["React", "Node.js", "SQLite", "Tailwind CSS"],
    features: [
      "Prise de commande ultra-rapide en 2 clics",
      "Gestion du catalogue produits (catégories, prix, images)",
      "Rapports journaliers et hebdomadaires",
      "Interface tactile optimisée",
      "Impression tickets clients",
      "Caisse avec rendu monnaie automatique",
    ],
    changelog: [
      { version: "1.2.0", date: "Nov 2024", changes: ["Nouveau design", "Rapports hebdomadaires"] },
      { version: "1.0.0", date: "Jun 2024", changes: ["Version initiale"] },
    ],
    faq: [
      { q: "Fonctionne sur iPad/tablette Android ?", a: "Oui, l'interface est optimisée pour tablettes iOS et Android." },
      { q: "Nombre de produits limité ?", a: "Non, catalogues de produits illimités." },
    ],
    demoAccounts: [
      { role: "Admin", email: "admin@demo-cafe.com", password: "demo123" },
      { role: "Caissier", email: "cashier@demo-cafe.com", password: "demo123" },
    ],
    reviews: [
      { name: "Samira O.", rating: 5, body: "Parfait pour mon café. Simple, rapide, efficace.", date: "Jan 2025", initials: "SO", gradient: "from-violet-400 to-purple-600" },
      { name: "Hassan M.", rating: 4, body: "Très bon rapport qualité-prix. Facile à apprendre.", date: "Dec 2024", initials: "HM", gradient: "from-blue-400 to-cyan-500" },
    ],
  },
  "stock-manager-pro": {
    id: "3", slug: "stock-manager-pro", title: "Stock Manager Pro",
    description: "Gestion multi-entrepôts, alertes stock bas, fournisseurs et rapports.",
    longDescription: "Stock Manager Pro vous permet de gérer votre inventaire avec précision. Multi-entrepôts, code-barres, alertes automatiques, gestion fournisseurs et rapports complets.",
    price: 1800, rating: 4.7, reviewCount: 9, salesCount: 19,
    categoryLabel: "Gestion Stock", gradient: "from-cyan-400 via-teal-400 to-emerald-500", isFeatured: false,
    techStack: ["Next.js", "PostgreSQL", "TypeScript", "Prisma"],
    features: [
      "Gestion multi-entrepôts centralisée",
      "Scan code-barres / QR code",
      "Alertes stock bas automatiques par email/SMS",
      "Gestion fournisseurs et bons de commande",
      "Historique mouvements de stock",
      "Rapports d'inventaire en PDF",
    ],
    changelog: [
      { version: "1.3.0", date: "Dec 2024", changes: ["QR code support", "Export Excel"] },
      { version: "1.0.0", date: "Aug 2024", changes: ["Version initiale"] },
    ],
    faq: [
      { q: "Combien d'entrepôts ?", a: "Illimité selon votre licence." },
      { q: "Compatible douchette code-barres ?", a: "Oui, compatible toutes douchettes USB et Bluetooth." },
    ],
    demoAccounts: [
      { role: "Admin", email: "admin@demo-stock.com", password: "demo123" },
      { role: "Gestionnaire", email: "manager@demo-stock.com", password: "demo123" },
    ],
    reviews: [
      { name: "Youssef T.", rating: 5, body: "Fin des ruptures de stock ! Les alertes automatiques sont vraiment pratiques.", date: "Jan 2025", initials: "YT", gradient: "from-cyan-400 to-teal-500" },
    ],
  },
};

// ─── Demo Modal ───────────────────────────────────────────────────────────────
function DemoModal({ open, onClose, accounts, productTitle }: {
  open: boolean; onClose: () => void;
  accounts: { role: string; email: string; password: string }[];
  productTitle: string;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>🚀 Accès Démo — {productTitle}</DialogTitle>
          <DialogDescription>Testez gratuitement pendant 2 heures. Les données sont réinitialisées automatiquement.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          {accounts.map((acc, i) => (
            <div key={i} className="bg-[hsl(var(--surface-2))] rounded-[var(--radius-md)] p-4 border border-[hsl(var(--border))]">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="text-xs">{acc.role}</Badge>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                {[
                  { label: "Email", value: acc.email },
                  { label: "Mot de passe", value: acc.password },
                ].map(field => (
                  <div key={field.label} className="flex items-center justify-between">
                    <span className="text-muted text-xs w-24 shrink-0">{field.label}</span>
                    <div className="flex items-center gap-2 flex-1">
                      <code className="text-xs bg-[hsl(var(--surface-3))] px-2 py-1 rounded flex-1 truncate font-mono">{field.value}</code>
                      <button
                        onClick={() => copy(field.value, `${i}-${field.label}`)}
                        className="text-xs text-[hsl(var(--primary))] hover:underline cursor-pointer shrink-0"
                      >
                        {copied === `${i}-${field.label}` ? "✓ Copié" : "Copier"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 p-3 bg-[hsl(var(--warning)/.08)] border border-[hsl(var(--warning)/.2)] rounded-[var(--radius)] text-xs text-[hsl(45_93%_35%)] dark:text-[hsl(var(--warning))]">
          ⚠️ Données de démo réinitialisées toutes les 2h. Ne pas entrer de vraies données.
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Product Page ─────────────────────────────────────────────────────────────
export default function ProductPage({ params }: { params: { slug: string } }) {
  const locale = useLocale();
  const product = PRODUCTS[params.slug];
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "changelog" | "faq">("overview");
  const [demoOpen, setDemoOpen] = useState(false);

  if (!product) notFound();

  const whatsappUrl = getWhatsAppUrl("+212600000000", `Bonjour, je suis intéressé par ${product.title}. Pouvez-vous me contacter ?`);

  const tabs = [
    { id: "overview", label: "Aperçu" },
    { id: "features", label: "Fonctionnalités" },
    { id: "changelog", label: "Changelog" },
    { id: "faq", label: "FAQ" },
  ] as const;

  const guarantees = [
    { icon: Shield, label: "Code source inclus" },
    { icon: Clock, label: "Installation 48h" },
    { icon: Headphones, label: "Support WhatsApp" },
    { icon: Package, label: "Mises à jour gratuites" },
  ];

  return (
    <main className="min-h-screen pt-20 pb-16">
        {/* Breadcrumb */}
        <div className="container-wedev py-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Link href={`/${locale}`} className="hover:text-[hsl(var(--primary))] transition-colors">Accueil</Link>
            <span>/</span>
            <Link href={`/${locale}/marketplace`} className="hover:text-[hsl(var(--primary))] transition-colors">Marketplace</Link>
            <span>/</span>
            <span className="text-[hsl(var(--foreground))] font-medium">{product.title}</span>
          </div>
        </div>

        <div className="container-wedev">
          {/* Back button */}
          <Link href={`/${locale}/marketplace`} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-[hsl(var(--primary))] mb-6 transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Retour à la Marketplace
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── Left: content ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card overflow-hidden">
                {/* Gradient banner */}
                <div className={`h-52 bg-gradient-to-br ${product.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                      className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-[var(--radius-xl)] border border-white/30 flex items-center justify-center shadow-xl">
                      <Code2 size={40} className="text-white" />
                    </motion.div>
                  </div>
                  {product.isFeatured && (
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                      ⭐ Solution Vedette
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.categoryLabel}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h1 className="heading-md mb-1">{product.title}</h1>
                      <p className="text-subtle">{product.description}</p>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={14} className={s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-[hsl(var(--border))]"} />)}
                      <span className="font-semibold ml-1">{product.rating}</span>
                      <span className="text-muted">({product.reviewCount} avis)</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted">
                      <TrendingUp size={14} />
                      <span>{product.salesCount} ventes</span>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {product.techStack.map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                  </div>
                </div>
              </motion.div>

              {/* Tabs */}
              <div className="card overflow-hidden">
                {/* Tab bar */}
                <div className="flex border-b border-[hsl(var(--border))] px-1 pt-1 bg-[hsl(var(--surface-2))]">
                  {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2.5 text-sm font-medium transition-all relative cursor-pointer ${
                        activeTab === tab.id
                          ? "text-[hsl(var(--primary))]"
                          : "text-muted hover:text-[hsl(var(--foreground))]"
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--primary))] rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                      <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <p className="text-subtle leading-relaxed">{product.longDescription}</p>
                      </motion.div>
                    )}

                    {activeTab === "features" && (
                      <motion.div key="features" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {product.features.map((f, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-2.5">
                            <CheckCircle2 size={16} className="text-[hsl(var(--success))] mt-0.5 shrink-0" />
                            <span className="text-sm text-subtle">{f}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === "changelog" && (
                      <motion.div key="changelog" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="space-y-5">
                        {product.changelog.map((log, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] mt-1.5" />
                              {i < product.changelog.length - 1 && <div className="w-px flex-1 bg-[hsl(var(--border))] mt-1" />}
                            </div>
                            <div className="pb-5 flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="default" className="text-xs">v{log.version}</Badge>
                                <span className="text-xs text-muted">{log.date}</span>
                              </div>
                              <ul className="space-y-1">
                                {log.changes.map((c, j) => <li key={j} className="text-sm text-subtle flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-muted inline-block" />{c}</li>)}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === "faq" && (
                      <motion.div key="faq" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <Accordion type="single" collapsible className="flex flex-col gap-2">
                          {product.faq.map((f, i) => (
                            <AccordionItem key={i} value={`faq-${i}`}>
                              <AccordionTrigger>{f.q}</AccordionTrigger>
                              <AccordionContent>{f.a}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Reviews */}
              <div className="card p-6">
                <h2 className="heading-sm mb-5">Avis clients ({product.reviews.length})</h2>
                <div className="space-y-4">
                  {product.reviews.map((rev, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="flex gap-4 p-4 bg-[hsl(var(--surface-2))] rounded-[var(--radius-md)] border border-[hsl(var(--border))]">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${rev.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                        {rev.initials}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold">{rev.name}</span>
                          <span className="text-xs text-muted">{rev.date}</span>
                        </div>
                        <div className="flex mb-2">{[1,2,3,4,5].map(s => <Star key={s} size={12} className={s <= rev.rating ? "fill-amber-400 text-amber-400" : "text-[hsl(var(--border))]"} />)}</div>
                        <p className="text-sm text-subtle">{rev.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: pricing sidebar ── */}
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="card p-6 lg:sticky lg:top-24">
                {/* Price */}
                <div className="mb-5">
                  <p className="text-xs text-muted mb-1">À partir de</p>
                  <p className="text-4xl font-extrabold gradient-text mb-1">{formatPrice(product.price)}</p>
                  <p className="text-xs text-muted">Licence commerciale incluse · Code source</p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3 mb-5">
                  <Button size="lg" variant="whatsapp" className="w-full text-base" asChild>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={18} /> Commander via WhatsApp
                    </a>
                  </Button>
                  <Button size="lg" variant="secondary" className="w-full" onClick={() => setDemoOpen(true)}>
                    <Play size={16} className="fill-current" /> Tester la Démo Gratuite
                  </Button>
                </div>

                {/* Guarantees */}
                <div className="border-t border-[hsl(var(--border))] pt-4 space-y-2.5">
                  {guarantees.map(g => {
                    const Icon = g.icon;
                    return (
                      <div key={g.label} className="flex items-center gap-2.5 text-sm text-subtle">
                        <Icon size={15} className="text-[hsl(var(--success))] shrink-0" />
                        {g.label}
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Contact sidebar */}
              <div className="card p-5 text-center">
                <p className="text-sm font-semibold mb-1">Une question ?</p>
                <p className="text-xs text-muted mb-3">Je réponds dans les 30 minutes</p>
                <Button size="sm" variant="whatsapp" className="w-full" asChild>
                  <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Modal */}
        <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} accounts={product.demoAccounts} productTitle={product.title} />
      </main>
  );
}

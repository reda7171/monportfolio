"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ExternalLink, GitBranch, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PROJECTS = [
  {
    title: "Restaurant POS Pro",
    desc: "Système de caisse complet pour restaurant — tables, commandes, cuisine, stocks, analytics.",
    gradient: "from-orange-400 via-red-400 to-pink-500",
    tags: ["Next.js", "PostgreSQL", "TypeScript"],
    slug: "restaurant-pos-pro",
    stars: 47,
    type: "SaaS",
  },
  {
    title: "E-Learning Platform",
    desc: "Plateforme e-learning avec cours vidéo, quiz, certificats et tableau de bord RH.",
    gradient: "from-green-400 via-emerald-400 to-teal-500",
    tags: ["Next.js", "PostgreSQL", "AWS"],
    slug: "elearning-platform",
    stars: 8,
    type: "SaaS",
  },
  {
    title: "CRM Business",
    desc: "CRM complet avec pipeline commercial, devis automatiques et analytics en temps réel.",
    gradient: "from-amber-400 via-orange-400 to-red-400",
    tags: ["React", "Node.js", "MongoDB"],
    slug: "crm-business",
    stars: 12,
    type: "SaaS",
  },
  {
    title: "Stock Manager Pro",
    desc: "Gestion multi-entrepôts avec code-barres, alertes automatiques et rapports d'inventaire.",
    gradient: "from-cyan-400 via-teal-400 to-emerald-500",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    slug: "stock-manager-pro",
    stars: 19,
    type: "SaaS",
  },
  {
    title: "E-Commerce Starter",
    desc: "Boutique en ligne complète — catalogue, panier, paiement, livraison et tableau de bord admin.",
    gradient: "from-indigo-400 via-violet-400 to-purple-500",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    slug: "ecommerce-starter",
    stars: 21,
    type: "SaaS",
  },
  {
    title: "WeDev Platform",
    desc: "Cette plateforme — portfolio développeur, marketplace SaaS et système de démos live.",
    gradient: "from-blue-400 via-sky-400 to-cyan-500",
    tags: ["Next.js 15", "i18n", "Docker"],
    slug: null,
    stars: null,
    type: "Personnel",
  },
];

export function PortfolioSection() {
  const locale = useLocale();

  return (
    <section id="portfolio" className="section-wedev relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="container-wedev relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <span className="badge badge-primary mb-4 inline-flex"><GitBranch size={12} /> Portfolio</span>
          <h2 className="heading-lg mb-4">
            Mes <span className="gradient-text">Réalisations</span>
          </h2>
          <p className="text-subtle max-w-xl mx-auto">
            Des projets concrets, livrés à de vrais clients. Chaque solution est testée, documentée et supportée.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PROJECTS.map((project, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="card group overflow-hidden flex flex-col"
            >
              {/* Gradient header */}
              <div className={`h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                {/* Mock window chrome */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                </div>
                {/* Mock UI lines */}
                <div className="absolute inset-x-4 top-10 space-y-2">
                  <div className="h-2 bg-white/30 rounded-full w-3/4" />
                  <div className="h-2 bg-white/20 rounded-full w-1/2" />
                  <div className="h-8 bg-white/15 rounded-[var(--radius)] mt-3" />
                </div>
                {/* Type badge */}
                <div className="absolute top-3 right-3 text-[9px] font-bold bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full border border-white/30">
                  {project.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-sm group-hover:text-[hsl(var(--primary))] transition-colors">{project.title}</h3>
                  {project.stars && (
                    <div className="flex items-center gap-1 text-xs text-amber-500 shrink-0">
                      <Star size={11} className="fill-amber-400" /> {project.stars}
                    </div>
                  )}
                </div>
                <p className="text-xs text-subtle leading-relaxed mb-4 flex-1">{project.desc}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map(t => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}
                </div>

                <div className="flex gap-2 pt-3 border-t border-[hsl(var(--border))]">
                  {project.slug ? (
                    <Button size="sm" variant="default" className="flex-1 text-xs" asChild>
                      <Link href={`/${locale}/marketplace/${project.slug}`}>
                        <ExternalLink size={12} /> Voir le produit
                      </Link>
                    </Button>
                  ) : (
                    <Button size="sm" variant="secondary" className="flex-1 text-xs" asChild>
                      <a href="https://github.com/reda7171/monportfolio" target="_blank" rel="noopener noreferrer">
                        <GitBranch size={12} /> Code source
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center">
          <Button size="xl" asChild>
            <Link href={`/${locale}/marketplace`}>
              Voir toutes les solutions <ExternalLink size={16} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

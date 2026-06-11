"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Code2, TrendingUp, Boxes, Headphones, ArrowRight } from "lucide-react";

const services = [
  {
    key: "dev",
    icon: Code2,
    gradient: "from-blue-500 to-cyan-500",
    glow: "hsl(220 90% 56%)",
    features: ["Next.js / React", "Node.js / API", "Mobile PWA", "PostgreSQL"],
  },
  {
    key: "smma",
    icon: TrendingUp,
    gradient: "from-violet-500 to-purple-600",
    glow: "hsl(262 83% 58%)",
    features: ["Social Media", "Google Ads", "SEO", "Lead Generation"],
    featured: true,
  },
  {
    key: "saas",
    icon: Boxes,
    gradient: "from-cyan-500 to-teal-500",
    glow: "hsl(199 89% 48%)",
    features: ["Restaurant POS", "CRM / ERP", "E-learning", "Gestion RH"],
  },
  {
    key: "support",
    icon: Headphones,
    gradient: "from-emerald-500 to-green-500",
    glow: "hsl(142 71% 45%)",
    features: ["Installation", "Formation équipe", "Maintenance", "WhatsApp 24/7"],
  },
];

export function ServicesSection() {
  const t = useTranslations("services");

  return (
    <section className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[hsl(var(--secondary)/.04)] blur-3xl pointer-events-none" />

      <div className="container-wedev relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-primary mb-4 inline-flex">{t("title")}</span>
          <h2 className="heading-lg mb-4">{t("subtitle")}</h2>
          <div className="divider" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`relative card p-6 flex flex-col gap-5 overflow-hidden group cursor-default ${
                  svc.featured ? "border-[hsl(var(--primary)/.4)] shadow-[0_8px_30px_hsl(var(--primary)/.15)]" : ""
                }`}
              >
                {svc.featured && (
                  <div className="absolute top-3 right-3 badge badge-primary text-[10px] py-0.5 px-2">
                    Populaire
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-[var(--radius-md)] bg-gradient-to-br ${svc.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className="text-white" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="heading-sm mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                    {t(`${svc.key}.title`)}
                  </h3>
                  <p className="text-sm text-[hsl(var(--foreground-2))] leading-relaxed">
                    {t(`${svc.key}.desc`)}
                  </p>
                </div>

                {/* Features list */}
                <ul className="flex flex-col gap-1.5 mt-auto">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[hsl(var(--foreground-muted))]">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: svc.glow }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Arrow on hover */}
                <div className="flex items-center gap-1 text-xs font-semibold text-[hsl(var(--primary))] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                  En savoir plus <ArrowRight size={12} />
                </div>

                {/* Gradient glow background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[var(--radius-md)]"
                  style={{ background: `radial-gradient(ellipse at bottom left, ${svc.glow}08, transparent 60%)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

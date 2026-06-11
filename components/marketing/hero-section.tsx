"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Play, MessageCircle, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingOrbs = [
  { top: "10%", left: "5%",  size: 320, color: "hsl(220 90% 56% / .12)", delay: 0   },
  { top: "60%", right: "5%", size: 400, color: "hsl(262 83% 58% / .1)",  delay: 0.5 },
  { top: "30%", left: "55%", size: 250, color: "hsl(199 89% 48% / .1)",  delay: 1   },
];

const techBadges = ["Next.js", "TypeScript", "PostgreSQL", "React", "Tailwind", "Node.js", "Prisma", "Docker"];

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Floating gradient orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
          style={{
            position: "absolute",
            top: orb.top,
            left: "left" in orb ? orb.left : undefined,
            right: "right" in orb ? orb.right : undefined,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            borderRadius: "50%",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background))_100%)] pointer-events-none" />

      <div className="container-wedev relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 badge badge-primary mb-6 text-sm py-1.5 px-4"
        >
          <Sparkles size={13} className="animate-pulse" />
          {t("badge")}
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="heading-xl mb-6 max-w-4xl mx-auto"
        >
          {t("title")}{" "}
          <span className="gradient-text">{t("titleHighlight")}</span>
          <br />
          <span className="text-[hsl(var(--foreground-2))]">{t("titleEnd")}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-[hsl(var(--foreground-2))] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <Button size="xl" asChild className="group shadow-[0_8px_30px_hsl(var(--primary)/.35)]">
            <Link href={`/${locale}/marketplace`}>
              {t("cta_primary")}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <Button size="xl" variant="secondary" asChild className="group">
            <Link href={`/${locale}/marketplace`}>
              <Play size={16} className="group-hover:scale-110 transition-transform fill-current" />
              {t("cta_secondary")}
            </Link>
          </Button>

          <Button size="xl" variant="whatsapp" asChild>
            <a
              href={`https://wa.me/212600000000?text=${encodeURIComponent("Bonjour, je souhaite discuter d'un projet avec WeDev.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} />
              {t("cta_contact")}
            </a>
          </Button>
        </motion.div>

        {/* Tech Stack badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-16"
        >
          <span className="text-xs text-[hsl(var(--foreground-muted))] mr-1">Stack :</span>
          {techBadges.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="badge badge-primary text-xs"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Hero card preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow behind card */}
          <div className="absolute inset-x-10 -top-4 h-20 bg-[hsl(var(--primary)/.2)] blur-3xl rounded-full" />

          <div className="card-glass p-1 rounded-[var(--radius-xl)] overflow-hidden">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[hsl(var(--surface-2))] rounded-t-[calc(var(--radius-xl)-4px)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[hsl(0_72%_65%)]" />
                <div className="w-3 h-3 rounded-full bg-[hsl(38_92%_60%)]" />
                <div className="w-3 h-3 rounded-full bg-[hsl(142_71%_55%)]" />
              </div>
              <div className="flex-1 mx-4 bg-[hsl(var(--surface))] rounded-[var(--radius-sm)] px-3 py-1 text-xs text-[hsl(var(--foreground-muted))] text-center border border-[hsl(var(--border))]">
                https://wedev.ma/marketplace
              </div>
            </div>

            {/* Dashboard preview mockup */}
            <div className="bg-[hsl(var(--surface))] rounded-b-[calc(var(--radius-xl)-4px)] p-6 grid grid-cols-3 gap-4">
              {[
                { label: "Ventes Aujourd'hui", value: "12,430 MAD", change: "+18%", color: "var(--primary)" },
                { label: "Commandes", value: "47", change: "+5", color: "var(--secondary)" },
                { label: "Clients Actifs", value: "284", change: "+12%", color: "var(--accent)" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="bg-[hsl(var(--surface-2))] rounded-[var(--radius-md)] p-4 border border-[hsl(var(--border))]"
                >
                  <p className="text-xs text-[hsl(var(--foreground-muted))] mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-[hsl(var(--foreground))]">{stat.value}</p>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: `hsl(${stat.color})` }}
                  >
                    {stat.change} vs hier
                  </span>
                </motion.div>
              ))}

              {/* Mini bar chart */}
              <div className="col-span-3 bg-[hsl(var(--surface-2))] rounded-[var(--radius-md)] p-4 border border-[hsl(var(--border))]">
                <p className="text-xs text-[hsl(var(--foreground-muted))] mb-3">Revenus — 7 derniers jours</p>
                <div className="flex items-end gap-1.5 h-16">
                  {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.9 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                      className="flex-1 rounded-t-[4px]"
                      style={{ background: `hsl(var(--primary) / ${0.4 + h / 200})` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-xs text-[hsl(var(--foreground-muted))]">{t("scroll")}</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={16} className="text-[hsl(var(--foreground-muted))]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

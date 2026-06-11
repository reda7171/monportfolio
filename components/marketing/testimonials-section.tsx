"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Mohammed Alami",
    role: "Gérant",
    company: "Restaurant Al Baraka",
    city: "Casablanca",
    body: "Le système POS a transformé notre gestion. Plus d'erreurs de commandes, rapports clairs, et l'équipe WeDev est très réactive. Je recommande vivement!",
    rating: 5,
    gradient: "from-orange-400 to-red-500",
    initials: "MA",
  },
  {
    name: "Fatima Benali",
    role: "Propriétaire",
    company: "Café Moka",
    city: "Rabat",
    body: "Interface simple, installation rapide. En 2 jours on était opérationnels. Support WhatsApp excellent, ils répondent même le week-end!",
    rating: 5,
    gradient: "from-violet-400 to-purple-600",
    initials: "FB",
  },
  {
    name: "Youssef Tahiri",
    role: "Directeur Commercial",
    company: "Import-Export Tahiri",
    city: "Marrakech",
    body: "Le CRM a centralisé tous nos contacts clients. Notre équipe commerciale est 40% plus productive. ROI atteint en moins de 3 mois.",
    rating: 5,
    gradient: "from-cyan-400 to-blue-500",
    initials: "YT",
  },
  {
    name: "Samira Oujda",
    role: "RH Manager",
    company: "Transport Atlas",
    city: "Fès",
    body: "Gestion des stocks simplifiée, alertes automatiques pour éviter les ruptures. Solution robuste et bien conçue.",
    rating: 4,
    gradient: "from-emerald-400 to-teal-500",
    initials: "SO",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= rating ? "fill-amber-400 text-amber-400" : "text-[hsl(var(--border))]"}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="section relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[hsl(var(--primary)/.06)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-[hsl(var(--secondary)/.06)] blur-3xl pointer-events-none" />

      <div className="container-wedev relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-primary mb-4 inline-flex">{t("title")}</span>
          <h2 className="heading-lg mb-2">{t("subtitle")}</h2>
          <div className="divider" />
        </motion.div>

        {/* Featured testimonial (large) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12 relative"
        >
          {/* Subtle animated glow behind the active card */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${testimonials[current].gradient} rounded-[var(--radius-lg)] blur-xl opacity-20 animate-pulse-glow transition-all duration-700 pointer-events-none`} />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="card p-8 md:p-12 relative overflow-hidden bg-[hsl(var(--surface))] border border-[hsl(var(--border))] z-10 shadow-xl"
            >
              {/* Noise overlay for premium feel */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

              {/* Quote icon */}
              <Quote
                size={120}
                strokeWidth={1}
                className="absolute -top-6 -right-6 text-[hsl(var(--primary)/.04)] rotate-180 pointer-events-none"
              />

              {/* Stars */}
              <StarRating rating={testimonials[current].rating} />

              {/* Body */}
              <p className="text-xl md:text-2xl text-[hsl(var(--foreground))] leading-relaxed font-medium mt-6 mb-8 italic relative z-10">
                "{testimonials[current].body}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[current].gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {testimonials[current].initials}
                </div>
                <div>
                  <p className="font-semibold text-[hsl(var(--foreground))]">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-[hsl(var(--foreground-muted))]">
                    {testimonials[current].role} — {testimonials[current].company}, {testimonials[current].city}
                  </p>
                </div>
              </div>

              {/* Left accent bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${testimonials[current].gradient} rounded-l-[var(--radius-md)]`} />
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current
                      ? "w-6 bg-[hsl(var(--primary))]"
                      : "w-2 bg-[hsl(var(--border-strong))]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Mini cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setCurrent(i)}
              className={`card p-4 text-left cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                i === current ? "border-[hsl(var(--primary)/.4)] shadow-md" : "hover:border-[hsl(var(--border-strong))] opacity-70 hover:opacity-100"
              }`}
            >
              {i === current && (
                <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} opacity-5 pointer-events-none`} />
              )}
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-bold mb-2`}>
                {t.initials}
              </div>
              <p className="text-xs font-semibold text-[hsl(var(--foreground))] truncate">{t.name}</p>
              <p className="text-[10px] text-[hsl(var(--foreground-muted))] truncate">{t.company}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

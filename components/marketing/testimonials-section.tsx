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
          className="max-w-3xl mx-auto mb-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="card p-8 md:p-10 relative overflow-hidden"
            >
              {/* Quote icon */}
              <Quote
                size={64}
                className="absolute top-4 right-6 text-[hsl(var(--primary)/.08)] rotate-180"
              />

              {/* Stars */}
              <StarRating rating={testimonials[current].rating} />

              {/* Body */}
              <p className="text-lg md:text-xl text-[hsl(var(--foreground))] leading-relaxed font-medium mt-4 mb-6 italic">
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
              className={`card p-4 text-left cursor-pointer transition-all duration-200 ${
                i === current ? "border-[hsl(var(--primary)/.5)] bg-[hsl(var(--primary)/.04)]" : "hover:border-[hsl(var(--border-strong))]"
              }`}
            >
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

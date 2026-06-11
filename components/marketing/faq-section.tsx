"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function FAQSection() {
  const t = useTranslations("faq");

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
  ];

  return (
    <section className="section relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="container-wedev relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <span className="badge badge-primary mb-4 inline-flex">
              <HelpCircle size={12} /> FAQ
            </span>
            <h2 className="heading-lg mb-4">{t("title")}</h2>
            <p className="text-[hsl(var(--foreground-2))] leading-relaxed mb-6">{t("subtitle")}</p>
            <div className="divider-left" />

            {/* Decorative card */}
            <div className="mt-10 card-glass p-6 rounded-[var(--radius-lg)] hidden lg:block">
              <p className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2">
                💬 Une autre question ?
              </p>
              <p className="text-sm text-[hsl(var(--foreground-2))] mb-4">
                Contactez-moi directement sur WhatsApp, je réponds dans les 5 minutes.
              </p>
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm w-full justify-center"
              >
                💬 Ouvrir WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <AccordionItem value={`faq-${i}`}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

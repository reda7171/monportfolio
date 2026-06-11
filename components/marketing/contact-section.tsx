"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export function ContactSection() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const contactInfo = [
    { icon: MessageCircle, label: "WhatsApp", value: "+212 600 000 000", color: "#25d366", href: "https://wa.me/212600000000" },
    { icon: Mail,          label: "Email",    value: "contact@wedev.ma",  color: "hsl(var(--primary))", href: "mailto:contact@wedev.ma" },
    { icon: MapPin,        label: "Ville",    value: "Maroc 🇲🇦",         color: "hsl(var(--secondary))", href: "#" },
  ];

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-hero opacity-80 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/.3)] to-transparent" />

      <div className="container-wedev relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-primary mb-4 inline-flex">Contact</span>
          <h2 className="heading-lg mb-2">{t("title")}</h2>
          <p className="text-[hsl(var(--foreground-2))]">{t("subtitle")}</p>
          <div className="divider" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-5 flex items-center gap-4 group hover:border-[hsl(var(--primary)/.4)]"
                >
                  <div
                    className="w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: `${info.color}18`, border: `1px solid ${info.color}28` }}
                  >
                    <Icon size={20} style={{ color: info.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--foreground-muted))] font-medium">{info.label}</p>
                    <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{info.value}</p>
                  </div>
                </a>
              );
            })}

            {/* WhatsApp CTA card */}
            <div className="card p-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#25d366]/10 to-[#128c7e]/10 pointer-events-none" />
              <p className="text-sm font-semibold mb-2">⚡ Réponse Rapide</p>
              <p className="text-xs text-[hsl(var(--foreground-2))] mb-4">Discutons de votre projet maintenant. Disponible 7j/7.</p>
              <a
                href="https://wa.me/212600000000?text=Bonjour%20WeDev,%20je%20souhaite%20discuter%20d'un%20projet."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm w-full justify-center"
              >
                <MessageCircle size={14} />
                {t("whatsapp")}
              </a>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="card p-7">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-10 text-center"
                >
                  <CheckCircle2 size={56} className="text-[hsl(var(--success))]" />
                  <p className="heading-sm">{t("success")}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={t("name")}
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Input
                      label={t("email")}
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={t("phone")}
                      type="tel"
                      icon={<Phone size={14} />}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    <Input
                      label={t("subject")}
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>
                  <Textarea
                    label={t("message")}
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  {status === "error" && (
                    <p className="text-sm text-[hsl(var(--error))] text-center">{t("error")}</p>
                  )}
                  <Button type="submit" size="lg" disabled={status === "loading"} className="w-full">
                    {status === "loading" ? (
                      <span className="animate-spin">⟳</span>
                    ) : (
                      <>
                        <Send size={16} />
                        {t("send")}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

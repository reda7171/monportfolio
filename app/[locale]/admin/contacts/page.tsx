"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import Link from "next/link";
import {
  MessageSquare, Search, Eye, CheckCircle2, Clock, Archive,
  Code2, LogOut, LayoutDashboard, Package, ShoppingBag, Users,
  FileText, BarChart3, Settings, ChevronRight, MessageCircle,
  Filter, Mail, Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/utils";

const MOCK_CONTACTS = [
  { id: "1", name: "Hassan El Idrissi", email: "hassan@example.ma", phone: "+212661234567", subject: "Devis POS Restaurant",    message: "Bonjour, je souhaite un devis pour le Restaurant POS Pro pour mon établissement de 30 tables.",  status: "NEW",        createdAt: "Aujourd'hui, 09:23" },
  { id: "2", name: "Laila Bensouda",    email: "laila@example.ma",  phone: "+212698765432", subject: "Question Stock Manager",   message: "Puis-je avoir plus d'informations sur le module multi-entrepôts ?",                           status: "INPROGRESS", createdAt: "Hier, 15:47" },
  { id: "3", name: "Omar Tazi",         email: "omar@example.ma",   phone: "+212677112233", subject: "Personnalisation CRM",     message: "Je voudrais personnaliser le CRM avec notre logo et adapter le pipeline à notre process.",      status: "NEW",        createdAt: "Hier, 11:02" },
  { id: "4", name: "Asmae Berrada",     email: "asmae@example.ma",  phone: "+212644556677", subject: "Installation E-Learning",  message: "Quel est le délai d'installation de la plateforme e-learning ?",                              status: "RESOLVED",   createdAt: "9 Juin, 14:30" },
  { id: "5", name: "Yassine Alaoui",    email: "yassine@example.ma",phone: "+212655443322", subject: "Bug RH Paie",             message: "Il y a une erreur dans le calcul des heures supplémentaires.",                                status: "CLOSED",     createdAt: "8 Juin, 10:15" },
  { id: "6", name: "Nora Benali",       email: "nora@example.ma",   phone: "+212622334455", subject: "Tarification E-Commerce", message: "Quel est le prix pour la licence e-commerce avec hébergement inclus ?",                        status: "NEW",        createdAt: "7 Juin, 16:55" },
];

const STATUS_MAP: Record<string, { label: string; icon: React.ReactNode; cls: string; next: string; nextLabel: string }> = {
  NEW:        { label: "Nouveau",      icon: <Clock size={10} />,       cls: "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",      next: "INPROGRESS", nextLabel: "Prendre en charge" },
  INPROGRESS: { label: "En cours",     icon: <MessageSquare size={10} />, cls: "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800", next: "RESOLVED",   nextLabel: "Marquer résolu" },
  RESOLVED:   { label: "Résolu",       icon: <CheckCircle2 size={10} />, cls: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800", next: "CLOSED", nextLabel: "Fermer" },
  CLOSED:     { label: "Fermé",        icon: <Archive size={10} />,      cls: "text-gray-500 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700",      next: "NEW",        nextLabel: "Réouvrir" },
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
        <div className="w-9 h-9 gradient-primary rounded-[var(--radius)] flex items-center justify-center shadow">
          <Code2 size={18} className="text-white" />
        </div>
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

function ContactDetail({ contact, onClose, onStatusChange }: {
  contact: typeof MOCK_CONTACTS[0]; onClose: () => void;
  onStatusChange: (id: string, status: string) => void;
}) {
  const s = STATUS_MAP[contact.status];
  const wa = getWhatsAppUrl(contact.phone, `Bonjour ${contact.name.split(" ")[0]}, je suis WeDev. Je reviens vers vous concernant : "${contact.subject}".`);
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
        className="card max-w-lg w-full p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="font-bold">{contact.name}</h3>
            <p className="text-xs text-muted">{contact.createdAt}</p>
          </div>
          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.cls}`}>{s.icon} {s.label}</span>
        </div>

        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-2 text-sm"><Mail size={13} className="text-muted" /><a href={`mailto:${contact.email}`} className="hover:text-[hsl(var(--primary))]">{contact.email}</a></div>
          <div className="flex items-center gap-2 text-sm"><Phone size={13} className="text-muted" /><span>{contact.phone}</span></div>
          <div className="p-3 bg-[hsl(var(--surface-2))] rounded-[var(--radius)] border border-[hsl(var(--border))]">
            <p className="text-xs font-semibold mb-1">{contact.subject}</p>
            <p className="text-sm text-subtle leading-relaxed">{contact.message}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="whatsapp" size="sm" className="flex-1" asChild>
            <a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} /> Répondre WhatsApp</a>
          </Button>
          {contact.status !== "CLOSED" && (
            <Button variant="secondary" size="sm" className="flex-1" onClick={() => { onStatusChange(contact.id, s.next); onClose(); }}>
              <CheckCircle2 size={13} /> {s.nextLabel}
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onClose}>Fermer</Button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Contacts Admin Page ─────────────────────────────────────────────────
export default function AdminContactsPage() {
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selected, setSelected] = useState<typeof MOCK_CONTACTS[0] | null>(null);

  const handleStatusChange = (id: string, newStatus: string) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const filtered = contacts.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const newCount = contacts.filter(c => c.status === "NEW").length;

  return (
    <div className="min-h-screen flex bg-[hsl(var(--background))]">
      <Sidebar active="contacts" />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-[hsl(var(--surface))] border-b border-[hsl(var(--border))] shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="font-semibold text-sm">Gestion des Contacts</h1>
              <p className="text-[10px] text-muted">{filtered.length} contact{filtered.length > 1 ? "s" : ""}</p>
            </div>
            {newCount > 0 && <Badge variant="default" className="text-[10px]">{newCount} nouveau{newCount > 1 ? "x" : ""}</Badge>}
          </div>
          <Link href="/fr/admin" className="text-xs text-muted hover:text-[hsl(var(--primary))] transition-colors">← Dashboard</Link>
        </header>

        <main className="flex-1 p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Nouveaux",  value: contacts.filter(c => c.status === "NEW").length,        color: "hsl(var(--primary))"   },
              { label: "En cours",  value: contacts.filter(c => c.status === "INPROGRESS").length,  color: "hsl(38 92% 50%)"       },
              { label: "Résolus",   value: contacts.filter(c => c.status === "RESOLVED").length,    color: "hsl(142 71% 45%)"      },
              { label: "Total",     value: contacts.length,                                          color: "hsl(var(--secondary))" },
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
              <input type="text" placeholder="Rechercher…" value={search} onChange={e => setSearch(e.target.value)} className="input pl-8 h-9 text-sm" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["ALL", "NEW", "INPROGRESS", "RESOLVED", "CLOSED"].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 text-xs rounded-[var(--radius)] font-medium transition-all cursor-pointer border ${statusFilter === s ? "bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]" : "border-[hsl(var(--border))] text-muted hover:border-[hsl(var(--primary)/.4)]"}`}>
                  {s === "ALL" ? "Tous" : STATUS_MAP[s]?.label ?? s}
                </button>
              ))}
            </div>
          </div>

          {/* Contacts list */}
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((contact, i) => {
                const s = STATUS_MAP[contact.status];
                return (
                  <motion.div key={contact.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}
                    onClick={() => setSelected(contact)}
                    className="card p-4 flex items-start gap-4 cursor-pointer hover:border-[hsl(var(--primary)/.3)] transition-all group">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {contact.name[0]}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <p className="font-semibold text-sm group-hover:text-[hsl(var(--primary))] transition-colors">{contact.name}</p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.cls}`}>{s.icon} {s.label}</span>
                      </div>
                      <p className="text-xs font-medium text-subtle mb-1">{contact.subject}</p>
                      <p className="text-xs text-muted line-clamp-1">{contact.message}</p>
                    </div>
                    {/* Meta */}
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-muted">{contact.createdAt}</p>
                      <div className="flex items-center gap-1 mt-2 justify-end">
                        <div className="flex items-center gap-0.5 text-[10px] text-muted"><Mail size={9} /><span className="hidden sm:block">{contact.email}</span></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="card p-12 text-center">
                <Filter size={32} className="mx-auto text-muted mb-3" />
                <p className="text-sm text-muted">Aucun contact trouvé</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Contact detail modal */}
      <AnimatePresence>
        {selected && (
          <ContactDetail contact={selected} onClose={() => setSelected(null)} onStatusChange={handleStatusChange} />
        )}
      </AnimatePresence>
    </div>
  );
}

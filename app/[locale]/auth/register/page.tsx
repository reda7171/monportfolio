"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Mail, Lock, Eye, EyeOff, User, Code2, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const locale = useLocale();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordStrength = (p: string) => {
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };
  const strength = passwordStrength(form.password);
  const strengthColors = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-emerald-400"];
  const strengthLabels = ["", "Faible", "Moyen", "Bon", "Excellent"];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    if (form.password.length < 8) { setError("Mot de passe trop court (8 caractères minimum)."); return; }
    setLoading(true); setError("");
    try {
      const { error: err } = await authClient.signUp.email({
        name: form.name, email: form.email, password: form.password,
      });
      if (err) { setError(err.message ?? "Erreur lors de l'inscription."); setLoading(false); return; }
      router.push(`/${locale}/dashboard`);
    } catch {
      setError("Une erreur est survenue. Réessayez.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[hsl(var(--background))]">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[hsl(var(--primary)/.08)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[hsl(var(--secondary)/.08)] blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 gradient-primary rounded-[var(--radius-lg)] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Code2 size={28} className="text-white" />
          </div>
          <h1 className="heading-md mb-1">Créer un compte</h1>
          <p className="text-subtle text-sm">Rejoignez la communauté WeDev</p>
        </div>

        <div className="card p-7">
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Nom complet</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input id="reg-name" type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Mohammed Alami" className="input pl-9 h-11" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input id="reg-email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="vous@exemple.ma" className="input pl-9 h-11" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input id="reg-password" type={showPass ? "text" : "password"} required value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 caractères" className="input pl-9 pr-10 h-11" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-[hsl(var(--foreground))] cursor-pointer">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {/* Strength meter */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : "bg-[hsl(var(--surface-3))]"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted">{strengthLabels[strength]}</p>
                </div>
              )}
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Confirmer le mot de passe</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input id="reg-confirm" type="password" required value={form.confirm}
                  onChange={e => setForm({ ...form, confirm: e.target.value })}
                  placeholder="Répéter le mot de passe" className="input pl-9 pr-10 h-11" />
                {form.confirm && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {form.confirm === form.password
                      ? <CheckCircle2 size={15} className="text-[hsl(var(--success))]" />
                      : <AlertCircle size={15} className="text-[hsl(var(--error))]" />}
                  </div>
                )}
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-[hsl(var(--error)/.08)] border border-[hsl(var(--error)/.2)] rounded-[var(--radius)] text-sm text-[hsl(var(--error))]">
                <AlertCircle size={14} className="shrink-0" /> {error}
              </motion.div>
            )}

            <Button type="submit" size="lg" disabled={loading} className="w-full mt-1 group">
              {loading ? <span className="animate-spin">⟳</span> : <>Créer mon compte <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" /></>}
            </Button>
          </form>

          <p className="text-center text-sm text-muted mt-5">
            Déjà un compte ?{" "}
            <Link href={`/${locale}/auth/login`} className="text-[hsl(var(--primary))] font-medium hover:underline">
              Se connecter
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted mt-4">
          <Link href={`/${locale}`} className="hover:text-[hsl(var(--primary))] transition-colors">
            ← Retour au site
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

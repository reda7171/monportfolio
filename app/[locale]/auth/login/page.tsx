"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Mail, Lock, Eye, EyeOff, Code2, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const locale = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data, error: err } = await authClient.signIn.email({ email, password });
      if (err) { setError(err.message ?? "Email ou mot de passe incorrect"); setLoading(false); return; }
      if (data?.user?.role === "admin") router.push(`/${locale}/admin`);
      else router.push(`/${locale}/dashboard`);
    } catch {
      setError("Une erreur est survenue. Réessayez.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[hsl(220_90%_56%)] via-[hsl(262_83%_58%)] to-[hsl(199_89%_48%)] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative z-10 text-center text-white px-12">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-[28px] flex items-center justify-center mx-auto mb-8 border border-white/30 shadow-xl">
            <Code2 size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">WeDev Platform</h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-sm mx-auto">
            Accédez à votre espace pour gérer vos licences, suivre vos commandes et accéder au support.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
            {["85+ Solutions", "60+ Clients", "5 ans d'expérience", "Support 24h"].map(stat => (
              <div key={stat} className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20">{stat}</div>
            ))}
          </div>
        </motion.div>
        {/* Floating orbs */}
        {[{ top: "10%", left: "5%", size: 200 }, { bottom: "10%", right: "5%", size: 150 }].map((orb, i) => (
          <motion.div key={i} animate={{ y: [0, -15, 0] }} transition={{ duration: 5 + i * 2, repeat: Infinity }}
            style={{ position: "absolute", width: orb.size, height: orb.size, background: "rgba(255,255,255,0.08)", borderRadius: "50%", filter: "blur(20px)", ...orb }} />
        ))}
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[hsl(var(--background))]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 gradient-primary rounded-[var(--radius)] flex items-center justify-center">
              <Code2 size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl gradient-text">WeDev</span>
          </div>

          <h1 className="heading-md mb-2">Connexion</h1>
          <p className="text-subtle mb-8">Accédez à votre espace WeDev</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input id="login-email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="vous@exemple.ma" className="input pl-9 h-11" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-[hsl(var(--foreground))]">Mot de passe</label>
                <Link href={`/${locale}/auth/forgot`} className="text-xs text-[hsl(var(--primary))] hover:underline">Oublié ?</Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input id="login-password" type={showPass ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" className="input pl-9 pr-10 h-11" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-[hsl(var(--foreground))] cursor-pointer transition-colors">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-[hsl(var(--error)/.08)] border border-[hsl(var(--error)/.2)] rounded-[var(--radius)] text-sm text-[hsl(var(--error))]">
                <AlertCircle size={15} className="shrink-0" /> {error}
              </motion.div>
            )}

            <Button type="submit" size="lg" disabled={loading} className="w-full mt-1 group">
              {loading ? <span className="animate-spin">⟳</span> : <>Se connecter <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" /></>}
            </Button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            Pas de compte ?{" "}
            <Link href={`/${locale}/auth/register`} className="text-[hsl(var(--primary))] font-medium hover:underline">
              Créer un compte
            </Link>
          </p>

          <p className="text-center text-xs text-muted mt-4">
            <Link href={`/${locale}`} className="hover:text-[hsl(var(--primary))] transition-colors">
              ← Retour au site
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

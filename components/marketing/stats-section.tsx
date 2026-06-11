"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Package, Users, Clock, HeadphonesIcon } from "lucide-react";

const stats = [
  { key: "projects",  value: 85,  suffix: "+", icon: Package,          color: "hsl(var(--primary))"   },
  { key: "clients",   value: 60,  suffix: "+", icon: Users,            color: "hsl(var(--secondary))" },
  { key: "years",     value: 5,   suffix: "",  icon: Clock,            color: "hsl(var(--accent))"    },
  { key: "support",   value: 24,  suffix: "h", icon: HeadphonesIcon,   color: "hsl(142 71% 45%)"      },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatsSection() {
  const t = useTranslations("stats");

  return (
    <section className="section-sm relative overflow-hidden">
      {/* Divider gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/.4)] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/.2)] to-transparent" />

      <div className="container-wedev">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="card p-6 text-center group cursor-default"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}28` }}
                >
                  <Icon size={22} style={{ color: stat.color }} />
                </div>

                {/* Counter */}
                <div
                  className="text-4xl font-extrabold mb-1 font-[var(--font-display)] tabular-nums"
                  style={{ color: stat.color }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-sm text-[hsl(var(--foreground-muted))] font-medium">
                  {t(stat.key)}
                </p>

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-[var(--radius-md)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at center, ${stat.color}08 0%, transparent 70%)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

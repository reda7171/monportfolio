import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Tag, ChevronLeft, Share2, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { ARTICLES } from "@/lib/blog-data";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: { slug: string; locale: string } }): Promise<Metadata> {
  const article = ARTICLES.find(a => a.slug === params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.dateISO,
      authors: ["WeDev"],
      tags: article.tags,
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt },
  };
}

export function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }));
}

// ─── Markdown-like renderer (simple) ─────────────────────────────────────────
function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="heading-sm mt-8 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-base font-semibold mt-5 mb-2 text-[hsl(var(--foreground))]">{line.slice(4)}</h3>);
    } else if (line.startsWith("**") && line.endsWith("**") && line.split("**").length === 3) {
      const text = line.slice(2, -2);
      elements.push(<p key={i} className="font-semibold text-[hsl(var(--foreground))] my-2">{text}</p>);
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-3 space-y-1.5">
          {listItems.map((item, j) => (
            <li key={j} className="flex items-start gap-2.5 text-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] mt-2 shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={`code-${i}`} className="my-4 p-4 bg-[hsl(var(--surface-2))] border border-[hsl(var(--border))] rounded-[var(--radius-md)] overflow-x-auto text-xs font-mono text-[hsl(var(--foreground))] leading-relaxed">
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
    } else {
      elements.push(
        <p key={i} className="text-subtle leading-relaxed my-3"
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong class='text-[hsl(var(--foreground))] font-semibold'>$1</strong>") }}
        />
      );
    }
    i++;
  }
  return elements;
}

// ─── Article Page ─────────────────────────────────────────────────────────────
export default function ArticlePage({ params }: { params: { slug: string; locale: string } }) {
  const article = ARTICLES.find(a => a.slug === params.slug);
  if (!article) notFound();

  const related = ARTICLES.filter(a => a.slug !== params.slug && (a.category === article.category || a.tags.some(t => article.tags.includes(t)))).slice(0, 2);

  const shareUrl = `https://wedev.ma/${params.locale}/blog/${params.slug}`;
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(`${article.title}\n${shareUrl}`)}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-20">
        {/* Article header */}
        <div className={`h-64 bg-gradient-to-br ${article.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
          <div className="absolute inset-0 bg-black/20" />
          <div className="container-wedev relative z-10 h-full flex flex-col justify-end pb-8">
            <Link href={`/${params.locale}/blog`} className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-4 transition-colors">
              <ChevronLeft size={15} /> Blog
            </Link>
            <span className="inline-flex items-center gap-1 text-xs bg-white/20 text-white px-3 py-1 rounded-full border border-white/30 w-fit mb-3">
              {article.categoryLabel}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug max-w-3xl">{article.title}</h1>
          </div>
        </div>

        <div className="container-wedev max-w-4xl py-10">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-8 pb-6 border-b border-[hsl(var(--border))]">
            <span className="flex items-center gap-1.5"><Clock size={14} />{article.readTime} min de lecture</span>
            <span>{article.date}</span>
            <span>Par <strong className="text-[hsl(var(--foreground))]">{article.author}</strong></span>
            <div className="ml-auto flex items-center gap-2">
              <a href={whatsappShare} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-[var(--radius)] border border-[hsl(var(--border))] hover:border-[#25d366] hover:text-[#25d366] transition-all">
                <Share2 size={12} /> Partager
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Content */}
            <article className="lg:col-span-3">
              <p className="text-base text-subtle leading-relaxed font-medium mb-6 p-4 bg-[hsl(var(--surface-2))] rounded-[var(--radius-md)] border-l-4 border-[hsl(var(--primary))]">
                {article.excerpt}
              </p>
              <div className="prose-wedev">
                {renderContent(article.content)}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-[hsl(var(--border))]">
                {article.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs text-muted bg-[hsl(var(--surface-2))] border border-[hsl(var(--border))] px-3 py-1 rounded-full">
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 card p-6 text-center">
                <p className="font-semibold mb-2">Vous avez aimé cet article ?</p>
                <p className="text-sm text-subtle mb-4">Discutons de votre projet de digitalisation. Je réponds dans les 30 minutes.</p>
                <Button variant="whatsapp" asChild>
                  <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={16} /> Contacter WeDev
                  </a>
                </Button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Related */}
              {related.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-semibold text-sm mb-4">Articles similaires</h3>
                  <div className="space-y-4">
                    {related.map(a => (
                      <Link key={a.slug} href={`/${params.locale}/blog/${a.slug}`}
                        className="group block">
                        <div className={`h-20 rounded-[var(--radius-md)] bg-gradient-to-br ${a.gradient} mb-2 relative overflow-hidden`}>
                          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
                        </div>
                        <p className="text-xs font-semibold group-hover:text-[hsl(var(--primary))] transition-colors leading-snug">{a.title}</p>
                        <p className="text-[10px] text-muted mt-1 flex items-center gap-1"><Clock size={9} />{a.readTime} min</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter / WA invite */}
              <div className="card p-5">
                <h3 className="font-semibold text-sm mb-2">Restez informé</h3>
                <p className="text-xs text-subtle mb-4">Suivez WeDev sur WhatsApp pour les derniers articles et offres.</p>
                <Button size="sm" variant="whatsapp" className="w-full" asChild>
                  <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={13} /> Suivre sur WhatsApp
                  </a>
                </Button>
              </div>

              {/* Back to blog */}
              <Link href={`/${params.locale}/blog`} className="flex items-center gap-2 text-sm text-muted hover:text-[hsl(var(--primary))] transition-colors">
                <ChevronLeft size={14} /> Tous les articles
              </Link>
            </aside>
          </div>

          {/* More articles */}
          {related.length > 0 && (
            <div className="mt-14 pt-8 border-t border-[hsl(var(--border))]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-sm">Lire ensuite</h2>
                <Link href={`/${params.locale}/blog`} className="text-sm text-[hsl(var(--primary))] hover:underline flex items-center gap-1">
                  Tous les articles <ArrowRight size={13} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {related.map(a => (
                  <Link key={a.slug} href={`/${params.locale}/blog/${a.slug}`}
                    className="card p-4 flex gap-4 group hover:border-[hsl(var(--primary)/.4)] transition-all">
                    <div className={`w-20 h-20 rounded-[var(--radius-md)] bg-gradient-to-br ${a.gradient} shrink-0`} />
                    <div>
                      <p className="text-sm font-semibold group-hover:text-[hsl(var(--primary))] transition-colors leading-snug mb-1">{a.title}</p>
                      <p className="text-xs text-muted flex items-center gap-1"><Clock size={10} />{a.readTime} min · {a.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

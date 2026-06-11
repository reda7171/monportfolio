"use client";

import { useEffect } from "react";

/**
 * Sets lang + dir on <html> dynamically for RTL support (Arabic).
 * Avoids redeclaring <html>/<body> in locale layout.
 */
export function DirectionProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", locale);
    html.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
  }, [locale]);

  return <>{children}</>;
}

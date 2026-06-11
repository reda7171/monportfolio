import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding WeDev database...");

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "restaurant-pos" },
      update: {},
      create: { name: "Restaurant POS", nameAr: "نظام مطعم", slug: "restaurant-pos", icon: "🍽️", color: "#f97316" },
    }),
    prisma.category.upsert({
      where: { slug: "cafe-pos" },
      update: {},
      create: { name: "Café POS", nameAr: "نظام مقهى", slug: "cafe-pos", icon: "☕", color: "#a78bfa" },
    }),
    prisma.category.upsert({
      where: { slug: "stock" },
      update: {},
      create: { name: "Gestion Stock", nameAr: "إدارة المخزون", slug: "stock", icon: "📦", color: "#22d3ee" },
    }),
    prisma.category.upsert({
      where: { slug: "elearning" },
      update: {},
      create: { name: "E-Learning", nameAr: "التعليم الإلكتروني", slug: "elearning", icon: "🎓", color: "#4ade80" },
    }),
    prisma.category.upsert({
      where: { slug: "rh" },
      update: {},
      create: { name: "RH & Paie", nameAr: "الموارد البشرية", slug: "rh", icon: "👥", color: "#fb7185" },
    }),
    prisma.category.upsert({
      where: { slug: "crm" },
      update: {},
      create: { name: "CRM", nameAr: "إدارة العملاء", slug: "crm", icon: "🤝", color: "#fbbf24" },
    }),
    prisma.category.upsert({
      where: { slug: "reservation" },
      update: {},
      create: { name: "Réservation", nameAr: "الحجز", slug: "reservation", icon: "📅", color: "#60a5fa" },
    }),
    prisma.category.upsert({
      where: { slug: "ecommerce" },
      update: {},
      create: { name: "E-Commerce", nameAr: "التجارة الإلكترونية", slug: "ecommerce", icon: "🛒", color: "#34d399" },
    }),
  ]);

  // Products
  const restaurantCat = categories.find((c) => c.slug === "restaurant-pos")!;
  const cafeCat = categories.find((c) => c.slug === "cafe-pos")!;
  const stockCat = categories.find((c) => c.slug === "stock")!;
  const crmCat = categories.find((c) => c.slug === "crm")!;

  const restaurantProduct = await prisma.product.upsert({
    where: { slug: "restaurant-pos-pro" },
    update: {},
    create: {
      title: "Restaurant POS Pro",
      titleAr: "نظام نقاط البيع للمطاعم",
      slug: "restaurant-pos-pro",
      description: "Solution complète de caisse pour restaurant. Gestion des tables, commandes, cuisine, stocks et rapports en temps réel.",
      descriptionAr: "حل متكامل لإدارة المطاعم. إدارة الطاولات والطلبات والمطبخ والمخزون والتقارير في الوقت الفعلي.",
      features: [
        "Gestion des tables en temps réel",
        "Interface caissier tactile",
        "Impression tickets cuisine",
        "Gestion des stocks automatique",
        "Rapports et analytics avancés",
        "Multi-utilisateurs avec rôles",
        "Mode hors-ligne",
        "Fidélité clients",
      ],
      featuresAr: [
        "إدارة الطاولات في الوقت الفعلي",
        "واجهة كاشير تعمل باللمس",
        "طباعة تذاكر المطبخ",
        "إدارة المخزون التلقائية",
        "تقارير وتحليلات متقدمة",
        "متعدد المستخدمين مع الأدوار",
      ],
      price: 2500,
      priceLabel: "À partir de 2500 MAD",
      categoryId: restaurantCat.id,
      techStack: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Tailwind CSS"],
      demoUrl: "/demo/restaurant-pos-pro",
      whatsappMsg: "Bonjour, je suis intéressé par Restaurant POS Pro. Pouvez-vous me contacter?",
      isFeatured: true,
      salesCount: 47,
      rating: 4.8,
      reviewCount: 23,
      status: "PUBLISHED",
      changelog: [
        { version: "2.0.0", date: "2024-12", changes: ["Interface redesignée", "Mode hors-ligne amélioré", "Nouveau module fidélité"] },
        { version: "1.5.0", date: "2024-09", changes: ["Rapports PDF", "Multi-imprimantes"] },
      ],
      faq: [
        { question: "Fonctionne-t-il hors ligne?", answer: "Oui, le système fonctionne en mode hors-ligne et se synchronise automatiquement." },
        { question: "Combien d'utilisateurs peut-on créer?", answer: "Illimité selon votre licence." },
      ],
    },
  });

  await prisma.demoAccount.createMany({
    data: [
      { productId: restaurantProduct.id, role: "Admin", email: "admin@demo-restaurant.com", password: "demo123" },
      { productId: restaurantProduct.id, role: "Caissier", email: "cashier@demo-restaurant.com", password: "demo123" },
      { productId: restaurantProduct.id, role: "Manager", email: "manager@demo-restaurant.com", password: "demo123" },
    ],
    skipDuplicates: true,
  });

  const cafeProduct = await prisma.product.upsert({
    where: { slug: "cafe-pos-light" },
    update: {},
    create: {
      title: "Café POS Light",
      titleAr: "نظام المقهى الخفيف",
      slug: "cafe-pos-light",
      description: "Solution légère et rapide pour cafés et snacks. Interface simple, gestion des commandes et caisse.",
      descriptionAr: "حل خفيف وسريع للمقاهي والوجبات الخفيفة.",
      features: ["Prise de commande rapide", "Gestion des produits", "Rapports journaliers", "Interface tactile", "Impression tickets"],
      featuresAr: ["أخذ الطلبات بسرعة", "إدارة المنتجات", "تقارير يومية"],
      price: 1200,
      priceLabel: "1200 MAD",
      categoryId: cafeCat.id,
      techStack: ["React", "Node.js", "SQLite"],
      demoUrl: "/demo/cafe-pos-light",
      whatsappMsg: "Bonjour, je suis intéressé par Café POS Light.",
      isFeatured: true,
      salesCount: 31,
      rating: 4.6,
      reviewCount: 15,
      status: "PUBLISHED",
    },
  });

  await prisma.demoAccount.createMany({
    data: [
      { productId: cafeProduct.id, role: "Admin", email: "admin@demo-cafe.com", password: "demo123" },
      { productId: cafeProduct.id, role: "Caissier", email: "cashier@demo-cafe.com", password: "demo123" },
    ],
    skipDuplicates: true,
  });

  await prisma.product.upsert({
    where: { slug: "stock-manager-pro" },
    update: {},
    create: {
      title: "Stock Manager Pro",
      titleAr: "مدير المخزون الاحترافي",
      slug: "stock-manager-pro",
      description: "Gestion complète des stocks avec alertes, historique, fournisseurs et rapports.",
      descriptionAr: "إدارة متكاملة للمخزون مع التنبيهات والتاريخ والموردين والتقارير.",
      features: ["Gestion multi-entrepôts", "Alertes stock bas", "Gestion fournisseurs", "Code-barres", "Rapports avancés"],
      featuresAr: ["إدارة مستودعات متعددة", "تنبيهات المخزون المنخفض"],
      price: 1800,
      priceLabel: "1800 MAD",
      categoryId: stockCat.id,
      techStack: ["Next.js", "PostgreSQL", "TypeScript"],
      isFeatured: true,
      salesCount: 19,
      rating: 4.7,
      reviewCount: 9,
      status: "PUBLISHED",
    },
  });

  await prisma.product.upsert({
    where: { slug: "crm-business" },
    update: {},
    create: {
      title: "CRM Business",
      titleAr: "نظام إدارة العملاء",
      slug: "crm-business",
      description: "CRM complet pour gérer vos clients, prospects, devis et suivi commercial.",
      descriptionAr: "نظام CRM متكامل لإدارة العملاء والمستهدفين والعروض والمتابعة التجارية.",
      features: ["Pipeline commercial", "Devis automatiques", "Suivi emails", "Tableau de bord KPI", "Import/Export Excel"],
      featuresAr: ["خط أنابيب المبيعات", "عروض أسعار تلقائية"],
      price: 2200,
      priceLabel: "2200 MAD",
      categoryId: crmCat.id,
      techStack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
      isFeatured: false,
      salesCount: 12,
      rating: 4.5,
      reviewCount: 7,
      status: "PUBLISHED",
    },
  });

  // Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Mohammed Alami",
        role: "Gérant",
        company: "Restaurant Al Baraka, Casablanca",
        body: "Le système POS a transformé notre gestion. Plus d'erreurs de commandes, rapports clairs, et l'équipe WeDev est très réactive.",
        bodyAr: "لقد غير نظام POS إدارتنا تمامًا. لا أخطاء في الطلبات، تقارير واضحة.",
        rating: 5,
      },
      {
        name: "Fatima Benali",
        role: "Propriétaire",
        company: "Café Moka, Rabat",
        body: "Interface simple, installation rapide. En 2 jours on était opérationnels. Excellent support.",
        bodyAr: "واجهة بسيطة، تثبيت سريع. في يومين كنا نعمل بشكل كامل.",
        rating: 5,
      },
      {
        name: "Youssef Tahiri",
        role: "Directeur Commercial",
        company: "Import-Export Tahiri, Marrakech",
        body: "Le CRM a centralisé tous nos contacts clients. Notre équipe commerciale est 40% plus productive.",
        bodyAr: "قام نظام CRM بتمركز جميع جهات اتصال عملائنا. فريقنا التجاري أصبح أكثر إنتاجية بنسبة 40٪.",
        rating: 5,
      },
      {
        name: "Samira Oujda",
        role: "RH Manager",
        company: "Transport Atlas, Fès",
        body: "Gestion des stocks simplifiée. Les alertes automatiques nous évitent les ruptures.",
        bodyAr: "تبسيط إدارة المخزون. التنبيهات التلقائية تمنع نفاد المخزون.",
        rating: 4,
      },
    ],
    skipDuplicates: true,
  });

  // Admin user
  await prisma.user.upsert({
    where: { email: "admin@wedev.ma" },
    update: {},
    create: {
      name: "WeDev Admin",
      email: "admin@wedev.ma",
      emailVerified: true,
      role: "ADMIN",
    },
  });

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

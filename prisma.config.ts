import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL ?? "postgresql://wedev:wedev_secret_2024@localhost:5432/wedev_db",
  },
});

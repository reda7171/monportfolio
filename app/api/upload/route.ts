import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join, extname } from "path";
import { randomBytes } from "crypto";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: `Type non supporté. Acceptés: ${ALLOWED_TYPES.join(", ")}` }, { status: 400 });
    }

    // Validate size
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Fichier trop grand (max 10MB)" }, { status: 400 });
    }

    // Generate unique filename
    const ext = extname(file.name) || ".bin";
    const uniqueName = `${randomBytes(12).toString("hex")}${ext}`;
    const subfolder = formData.get("folder") as string || "misc";
    const targetDir = join(UPLOAD_DIR, subfolder);

    // Ensure directory exists
    await mkdir(targetDir, { recursive: true });

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = join(targetDir, uniqueName);
    await writeFile(filePath, buffer);

    const url = `/uploads/${subfolder}/${uniqueName}`;

    return NextResponse.json({
      ok: true,
      url,
      name: file.name,
      size: file.size,
      type: file.type,
    }, { status: 201 });

  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export const config = { api: { bodyParser: false } };

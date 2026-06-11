"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, File, Image, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadedFile {
  name: string; url: string; size: number; type: string; status: "uploading" | "done" | "error"; error?: string;
}

interface FileDropzoneProps {
  folder?: string;
  accept?: string;
  onUpload?: (url: string, name: string) => void;
  multiple?: boolean;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileDropzone({ folder = "misc", accept = "image/*,application/pdf", onUpload, multiple = false }: FileDropzoneProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    const entry: UploadedFile = { name: file.name, url: "", size: file.size, type: file.type, status: "uploading" };
    setFiles(prev => [...prev, entry]);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload échoué");

      setFiles(prev => prev.map(f => f.name === file.name ? { ...f, status: "done", url: data.url } : f));
      onUpload?.(data.url, file.name);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      setFiles(prev => prev.map(f => f.name === file.name ? { ...f, status: "error", error: msg } : f));
    }
  }, [folder, onUpload]);

  const handleFiles = (fileList: FileList) => {
    const toUpload = multiple ? Array.from(fileList) : [fileList[0]];
    toUpload.forEach(uploadFile);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  };

  const removeFile = (name: string) => setFiles(prev => prev.filter(f => f.name !== name));

  return (
    <div className="space-y-3">
      {/* Dropzone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-[var(--radius-lg)] p-8 text-center cursor-pointer transition-all duration-200 ${
          dragging
            ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/.06)] scale-[1.01]"
            : "border-[hsl(var(--border-strong))] hover:border-[hsl(var(--primary)/.5)] hover:bg-[hsl(var(--surface-2))]"
        }`}
      >
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="sr-only"
          onChange={e => e.target.files && handleFiles(e.target.files)} />

        <motion.div animate={{ scale: dragging ? 1.1 : 1 }} transition={{ duration: 0.15 }}>
          <Upload size={36} className={`mx-auto mb-3 transition-colors ${dragging ? "text-[hsl(var(--primary))]" : "text-muted"}`} />
        </motion.div>
        <p className="font-semibold text-sm text-[hsl(var(--foreground))] mb-1">
          {dragging ? "Déposez ici" : "Glisser-déposer ou cliquer"}
        </p>
        <p className="text-xs text-muted">Images (JPG, PNG, WebP), PDF · Max 10 MB</p>
      </div>

      {/* File list */}
      <AnimatePresence>
        {files.map((file, i) => (
          <motion.div key={`${file.name}-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-3 p-3 bg-[hsl(var(--surface-2))] rounded-[var(--radius-md)] border border-[hsl(var(--border))]">
            {/* Icon */}
            <div className="w-9 h-9 rounded-[var(--radius)] bg-[hsl(var(--surface-3))] flex items-center justify-center shrink-0">
              {file.type.startsWith("image/") ? <Image size={16} className="text-[hsl(var(--primary))]" /> : <File size={16} className="text-muted" />}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{file.name}</p>
              <p className="text-[10px] text-muted">{formatBytes(file.size)}</p>

              {/* Progress / status */}
              {file.status === "uploading" && (
                <div className="flex items-center gap-1.5 mt-1">
                  <Loader2 size={10} className="animate-spin text-[hsl(var(--primary))]" />
                  <span className="text-[10px] text-[hsl(var(--primary))]">Envoi en cours…</span>
                </div>
              )}
              {file.status === "done" && (
                <div className="flex items-center gap-1.5 mt-1">
                  <CheckCircle2 size={10} className="text-[hsl(var(--success))]" />
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[hsl(var(--success))] hover:underline truncate">
                    {file.url}
                  </a>
                </div>
              )}
              {file.status === "error" && (
                <div className="flex items-center gap-1.5 mt-1">
                  <AlertCircle size={10} className="text-[hsl(var(--error))]" />
                  <span className="text-[10px] text-[hsl(var(--error))]">{file.error}</span>
                </div>
              )}
            </div>

            {/* Remove */}
            <button onClick={() => removeFile(file.name)}
              className="w-6 h-6 rounded flex items-center justify-center text-muted hover:text-[hsl(var(--error))] hover:bg-[hsl(var(--error)/.06)] transition-all cursor-pointer shrink-0">
              <X size={13} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {files.length > 0 && (
        <Button variant="ghost" size="sm" onClick={() => setFiles([])} className="text-xs text-muted">
          Tout effacer
        </Button>
      )}
    </div>
  );
}

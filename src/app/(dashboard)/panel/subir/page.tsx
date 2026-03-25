'use client';

import { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X } from 'lucide-react';
import { DOC_TYPES, MAX_FILE_SIZE, ACCEPTED_FILE_TYPES } from '@/lib/constants';
import { formatBytes } from '@/lib/utils';
import type { ApiResponse } from '@/types';

function UploadForm() {
  const searchParams = useSearchParams();
  const docType = searchParams.get('type') || 'nie_dni';
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(`El archivo es demasiado grande. Máximo ${formatBytes(MAX_FILE_SIZE)}`);
      return;
    }

    if (!ACCEPTED_FILE_TYPES.includes(selectedFile.type)) {
      setError('Formato no válido. Usa PDF, JPG o PNG');
      return;
    }

    setError(null);
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('doc_type', docType);

      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      const data: ApiResponse = await res.json();

      if (!data.success) {
        throw new Error(data.error?.message || 'Error al subir el documento');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/panel');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Error al subir el documento');
    } finally {
      setUploading(false);
    }
  };

  const docInfo = DOC_TYPES[docType as keyof typeof DOC_TYPES];

  return (
    <div className="max-w-2xl mx-auto space-y-[var(--space-6)]">
      <div>
        <h1 className="mb-[var(--space-2)]">Sube tu documento</h1>
        <p className="text-[var(--color-text-muted)]">
          {docInfo?.label || 'Documento'}
        </p>
      </div>

      <Card>
        <div className="space-y-[var(--space-6)]">
          <div>
            <label className="mb-[var(--space-2)] block text-sm font-medium">
              Tipo de documento
            </label>
            <select
              value={docType}
              onChange={(e) => router.push(`/panel/subir?type=${e.target.value}`)}
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-[var(--space-4)] py-[var(--space-3)]"
            >
              {Object.entries(DOC_TYPES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--color-border)] bg-[var(--color-cream-dark)] p-[var(--space-12)] text-center hover:border-[var(--color-coral)] transition-colors"
              >
                <Upload className="mx-auto h-12 w-12 text-[var(--color-text-muted)] mb-[var(--space-4)]" />
                <p className="text-sm text-[var(--color-text-light)]">
                  Arrastra tu archivo aquí o haz clic para seleccionar
                </p>
                <p className="mt-[var(--space-2)] text-xs text-[var(--color-text-muted)]">
                  PDF, JPG, PNG (máx. 10MB)
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cream-dark)] p-[var(--space-4)]">
                <div className="flex items-center gap-[var(--space-3)]">
                  <FileText className="h-6 w-6 text-[var(--color-navy)]" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="rounded-full p-1 hover:bg-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-[var(--radius-md)] border border-[var(--color-error)] p-[var(--space-3)] text-sm text-[var(--color-error)]" style={{ backgroundColor: "rgba(231, 76, 60, 0.08)" }}>
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-[var(--radius-md)] bg-[var(--color-success)] bg-opacity-10 p-[var(--space-3)] text-sm text-[var(--color-success)]">
              Documento recibido. Lo estamos verificando. Redirigiendo...
            </div>
          )}

          <div className="flex gap-[var(--space-3)]">
            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="flex-1"
            >
              {uploading ? 'Subiendo...' : 'Subir documento'}
            </Button>
            <Button
              onClick={() => router.push('/panel')}
              variant="secondary"
            >
              Volver al panel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <UploadForm />
    </Suspense>
  );
}

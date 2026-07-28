import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Upload, Trash2, Download } from 'lucide-react';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { toast } from 'sonner';

interface DocumentFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

interface PropertyDocumentUploaderProps {
  onDocumentsChange: (documents: Array<{ id: string; url: string; name: string }>) => void;
  existingDocuments?: Array<{ id: string; url: string; name: string }>;
  maxDocuments?: number;
  maxSize?: number; // in bytes
  propertyId?: string;
  className?: string;
}

export function PropertyDocumentUploader({
  onDocumentsChange,
  existingDocuments = [],
  maxDocuments = 10,
  maxSize = 25 * 1024 * 1024, // 25MB
  propertyId,
  className,
}: PropertyDocumentUploaderProps) {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const validateDocument = useCallback((file: File): { valid: boolean; error?: string } => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    
    if (!validTypes.includes(file.type)) {
      return { valid: false, error: 'Invalid file type. Please upload PDF, Word, or Excel files.' };
    }
    
    if (file.size > maxSize) {
      return { valid: false, error: `File too large. Maximum size is ${maxSize / 1024 / 1024}MB.` };
    }
    
    return { valid: true };
  }, [maxSize]);

  const handleDocumentUpload = useCallback(async (files: FileList) => {
    if (documents.length + files.length > maxDocuments) {
      toast.error('Too many documents', {
        description: `Maximum ${maxDocuments} documents allowed`,
      });
      return;
    }

    const newDocuments: DocumentFile[] = [];

    for (const file of Array.from(files)) {
      const validation = validateDocument(file);
      if (!validation.valid) {
        toast.error('Invalid document', { description: validation.error });
        continue;
      }

      const documentFile: DocumentFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        progress: 0,
        status: 'uploading',
      };

      newDocuments.push(documentFile);
    }

    if (newDocuments.length > 0) {
      setDocuments((prev) => [...prev, ...newDocuments]);

      // Upload each document
      for (const documentFile of newDocuments) {
        try {
          const formData = new FormData();
          formData.append('file', documentFile.file);
          formData.append('type', 'property-document');
          if (propertyId) formData.append('propertyId', propertyId);

          const response = await apiClient.post(API_ENDPOINTS.STORAGE_UPLOAD, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
              setDocuments((prev) =>
                prev.map((d) =>
                  d.id === documentFile.id ? { ...d, progress, status: 'uploading' } : d
                )
              );
            },
          });

          setDocuments((prev) =>
            prev.map((d) =>
              d.id === documentFile.id
                ? { ...d, progress: 100, status: 'completed', url: response.data.url }
                : d
            )
          );
        } catch {
          setDocuments((prev) =>
            prev.map((d) =>
              d.id === documentFile.id
                ? { ...d, status: 'error', error: 'Upload failed' }
                : d
            )
          );
        }
      }

      // Update parent with completed documents
      const completedDocuments = documents
        .concat(newDocuments)
        .filter((d) => d.status === 'completed' && d.url)
        .map((d) => ({ id: d.id, url: d.url!, name: d.file.name }));

      onDocumentsChange([...existingDocuments, ...completedDocuments]);
    }
  }, [maxDocuments, propertyId, existingDocuments, documents, validateDocument, onDocumentsChange]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleDocumentUpload(e.dataTransfer.files);
    },
    [handleDocumentUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleDocumentUpload(e.target.files);
    }
  };

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    const updatedExisting = existingDocuments.filter((d) => d.id !== id);
    onDocumentsChange(updatedExisting);
  };

  const removeExistingDocument = async (id: string) => {
    try {
      await apiClient.delete(API_ENDPOINTS.STORAGE_DELETE(id));
      const updated = existingDocuments.filter((d) => d.id !== id);
      onDocumentsChange(updated);
      toast.success('Document removed');
    } catch {
      toast.error('Failed to remove document');
    }
  };

  const downloadDocument = (url: string, name: string | undefined) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name || 'document';
    link.click();
  };

  const allDocuments: Array<DocumentFile | { id: string; url: string; name: string; status: 'completed'; progress: number }> = [
    ...existingDocuments.map((d) => ({ ...d, status: 'completed' as const, progress: 100 })),
    ...documents,
  ];

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      default:
        return '📁';
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      {allDocuments.length < maxDocuments && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center transition-colors',
            isDragging
              ? 'border-forest-900 bg-forest-50 dark:bg-forest-900/20'
              : 'border-border-default hover:border-forest-900 dark:hover:border-forest-400'
          )}
        >
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={handleFileSelect}
            className="hidden"
            id="document-upload"
          />
          <label htmlFor="document-upload" className="cursor-pointer flex flex-col items-center">
            <div
              className={cn(
                'flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-colors',
                isDragging
                  ? 'bg-forest-900 text-white'
                  : 'bg-forest-100 dark:bg-forest-700 text-forest-600 dark:text-forest-400'
              )}
            >
              <Upload className="h-8 w-8" />
            </div>
            <p className="body-md font-medium text-forest-900 dark:text-forest-50 mb-2">
              Drag and drop documents here
            </p>
            <p className="body-sm text-forest-600 dark:text-forest-400 mb-4">
              or click to browse
            </p>
            <p className="body-xs text-forest-500 dark:text-forest-500">
              Max {maxDocuments} documents • PDF, Word, Excel • Max {maxSize / 1024 / 1024}MB each
            </p>
          </label>
        </div>
      )}

      {/* Document List */}
      {allDocuments.length > 0 && (
        <div className="space-y-3">
          <h3 className="heading-sm text-forest-900 dark:text-forest-50">
            Documents ({allDocuments.length}/{maxDocuments})
          </h3>
          <div className="space-y-2">
            {allDocuments.map((document) => (
              <div
                key={document.id}
                className="relative bg-surface-secondary dark:bg-forest-700 rounded-lg p-4 flex items-center gap-4 group"
              >
                {/* File Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-forest-100 dark:bg-forest-600 rounded-lg flex items-center justify-center text-2xl">
                  {getFileIcon('file' in document ? document.file?.name || '' : document.name || document.url || '')}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="body-sm font-medium text-forest-900 dark:text-forest-50 truncate">
                    {'file' in document ? document.file?.name : document.name || document.url?.split('/').pop()}
                  </p>
                  <div className="flex items-center gap-2">
                    {document.status === 'uploading' && (
                      <div className="flex-1 h-1.5 bg-forest-200 dark:bg-forest-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-forest-900 transition-all duration-300"
                          style={{ width: `${document.progress}%` }}
                        />
                      </div>
                    )}
                    {document.status === 'error' && 'error' in document && (
                      <p className="body-xs text-red-600 dark:text-red-400">
                        {document.error || 'Upload failed'}
                      </p>
                    )}
                    {document.status === 'completed' && 'file' in document && document.file && (
                      <p className="body-xs text-forest-600 dark:text-forest-400">
                        {(document.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {document.status === 'completed' && document.url && (
                    <button
                      onClick={() => {
                        const filename: string = 'file' in document 
                          ? (document.file?.name ?? 'document')
                          : (document.name ?? 'document');
                        // @ts-expect-error - TypeScript cannot narrow the type properly with nullish coalescing
                        downloadDocument(document.url, filename);
                      }}
                      className="p-2 hover:bg-surface-primary dark:hover:bg-forest-600 rounded-lg transition-colors"
                      aria-label="Download document"
                    >
                      <Download className="h-4 w-4 text-forest-600 dark:text-forest-400" />
                    </button>
                  )}
                  <button
                    onClick={() => document.status === 'completed' && document.url && !('file' in document) ? removeExistingDocument(document.id) : removeDocument(document.id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    aria-label="Remove document"
                  >
                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

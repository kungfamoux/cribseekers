import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Video, FileText, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video' | 'document';
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

interface MediaUploaderProps {
  onUpload: (files: File[]) => Promise<void>;
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  className?: string;
}

export function MediaUploader({
  onUpload,
  accept = 'image/*,video/*,.pdf',
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB
  className,
}: MediaUploaderProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const getMediaType = (file: File): 'image' | 'video' | 'document' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return 'document';
  };

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        resolve('');
      }
    });
  };

  const handleFiles = useCallback(async (files: FileList) => {
    const newFiles: MediaFile[] = [];

    for (const file of Array.from(files)) {
      if (mediaFiles.length + newFiles.length >= maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        break;
      }

      if (file.size > maxSize) {
        alert(`File ${file.name} is too large (max ${maxSize / 1024 / 1024}MB)`);
        continue;
      }

      const preview = await createPreview(file);
      const mediaFile: MediaFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview,
        type: getMediaType(file),
        progress: 0,
        status: 'uploading',
      };

      newFiles.push(mediaFile);
    }

    setMediaFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    for (const mediaFile of newFiles) {
      try {
        await onUpload([mediaFile.file]);
        setMediaFiles((prev) =>
          prev.map((f) =>
            f.id === mediaFile.id ? { ...f, progress: 100, status: 'completed' } : f
          )
        );
      } catch {
        setMediaFiles((prev) =>
          prev.map((f) =>
            f.id === mediaFile.id
              ? { ...f, status: 'error', error: 'Upload failed' }
              : f
          )
        );
      }
    }
  }, [mediaFiles.length, maxFiles, maxSize, onUpload]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setMediaFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getIcon = (type: 'image' | 'video' | 'document') => {
    switch (type) {
      case 'image':
        return ImageIcon;
      case 'video':
        return Video;
      case 'document':
        return FileText;
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
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
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
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
            Drag and drop files here
          </p>
          <p className="body-sm text-forest-600 dark:text-forest-400 mb-4">
            or click to browse
          </p>
          <p className="body-xs text-forest-500 dark:text-forest-500">
            Max {maxFiles} files • Max {maxSize / 1024 / 1024}MB per file
          </p>
        </label>
      </div>

      {/* File List */}
      {mediaFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="heading-sm text-forest-900 dark:text-forest-50">
            Uploaded Files ({mediaFiles.length}/{maxFiles})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaFiles.map((mediaFile) => {
              const Icon = getIcon(mediaFile.type);
              return (
                <div
                  key={mediaFile.id}
                  className="relative group bg-surface-secondary dark:bg-forest-700 rounded-lg overflow-hidden"
                >
                  {/* Preview */}
                  {mediaFile.preview ? (
                    <div className="aspect-video relative">
                      {mediaFile.type === 'image' ? (
                        <img
                          src={mediaFile.preview}
                          alt={mediaFile.file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-forest-100 dark:bg-forest-600">
                          <Icon className="h-8 w-8 text-forest-600 dark:text-forest-400" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-video flex items-center justify-center bg-forest-100 dark:bg-forest-600">
                      <Icon className="h-8 w-8 text-forest-600 dark:text-forest-400" />
                    </div>
                  )}

                  {/* Progress Bar */}
                  {mediaFile.status === 'uploading' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest-200 dark:bg-forest-600">
                      <div
                        className="h-full bg-forest-900 transition-all duration-300"
                        style={{ width: `${mediaFile.progress}%` }}
                      />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    {mediaFile.status === 'completed' && (
                      <div className="bg-green-500 text-white p-1.5 rounded-full">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                    {mediaFile.status === 'error' && (
                      <div className="bg-red-500 text-white p-1.5 rounded-full">
                        <AlertCircle className="h-3 w-3" />
                      </div>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFile(mediaFile.id)}
                    className="absolute top-2 left-2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>

                  {/* File Name */}
                  <div className="p-2">
                    <p className="body-xs text-forest-900 dark:text-forest-50 truncate">
                      {mediaFile.file.name}
                    </p>
                    <p className="body-xs text-forest-600 dark:text-forest-400">
                      {(mediaFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

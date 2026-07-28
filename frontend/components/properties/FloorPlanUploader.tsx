import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Upload, FileText, Trash2, AlertCircle, ZoomIn } from 'lucide-react';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { toast } from 'sonner';

interface FloorPlanFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

interface FloorPlanUploaderProps {
  onFloorPlansChange: (floorPlans: Array<{ id: string; url: string }>) => void;
  existingFloorPlans?: Array<{ id: string; url: string }>;
  maxFloorPlans?: number;
  maxSize?: number; // in bytes
  propertyId?: string;
  className?: string;
}

export function FloorPlanUploader({
  onFloorPlansChange,
  existingFloorPlans = [],
  maxFloorPlans = 10,
  maxSize = 20 * 1024 * 1024, // 20MB
  propertyId,
  className,
}: FloorPlanUploaderProps) {
  const [floorPlans, setFloorPlans] = useState<FloorPlanFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const validateFloorPlan = useCallback((file: File): { valid: boolean; error?: string } => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    
    if (!validTypes.includes(file.type)) {
      return { valid: false, error: 'Invalid file type. Please upload images (JPEG, PNG, WebP) or PDF files.' };
    }
    
    if (file.size > maxSize) {
      return { valid: false, error: `File too large. Maximum size is ${maxSize / 1024 / 1024}MB.` };
    }
    
    return { valid: true };
  }, [maxSize]);

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } else {
        resolve(''); // PDFs don't have previews
      }
    });
  };

  const handleFloorPlanUpload = useCallback(async (files: FileList) => {
    if (floorPlans.length + files.length > maxFloorPlans) {
      toast.error('Too many floor plans', {
        description: `Maximum ${maxFloorPlans} floor plans allowed`,
      });
      return;
    }

    const newFloorPlans: FloorPlanFile[] = [];

    for (const file of Array.from(files)) {
      const validation = validateFloorPlan(file);
      if (!validation.valid) {
        toast.error('Invalid floor plan', { description: validation.error });
        continue;
      }

      try {
        const preview = await createPreview(file);
        const floorPlanFile: FloorPlanFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview,
          progress: 0,
          status: 'uploading',
        };

        newFloorPlans.push(floorPlanFile);
      } catch {
        toast.error('Failed to process floor plan');
      }
    }

    if (newFloorPlans.length > 0) {
      setFloorPlans((prev) => [...prev, ...newFloorPlans]);

      // Upload each floor plan
      for (const floorPlanFile of newFloorPlans) {
        try {
          const formData = new FormData();
          formData.append('file', floorPlanFile.file);
          formData.append('type', 'property-floorplan');
          if (propertyId) formData.append('propertyId', propertyId);

          const response = await apiClient.post(API_ENDPOINTS.STORAGE_UPLOAD, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
              setFloorPlans((prev) =>
                prev.map((f) =>
                  f.id === floorPlanFile.id ? { ...f, progress, status: 'uploading' } : f
                )
              );
            },
          });

          setFloorPlans((prev) =>
            prev.map((f) =>
              f.id === floorPlanFile.id
                ? { ...f, progress: 100, status: 'completed', url: response.data.url }
                : f
            )
          );

          if (floorPlanFile.preview) {
            URL.revokeObjectURL(floorPlanFile.preview);
          }
        } catch {
          setFloorPlans((prev) =>
            prev.map((f) =>
              f.id === floorPlanFile.id
                ? { ...f, status: 'error', error: 'Upload failed' }
                : f
            )
          );
        }
      }

      // Update parent with completed floor plans
      const completedFloorPlans = floorPlans
        .concat(newFloorPlans)
        .filter((f) => f.status === 'completed' && f.url)
        .map((f) => ({ id: f.id, url: f.url! }));

      onFloorPlansChange([...existingFloorPlans, ...completedFloorPlans]);
    }
  }, [maxFloorPlans, propertyId, existingFloorPlans, floorPlans, validateFloorPlan, onFloorPlansChange]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleFloorPlanUpload(e.dataTransfer.files);
    },
    [handleFloorPlanUpload]
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
      handleFloorPlanUpload(e.target.files);
    }
  };

  const removeFloorPlan = (id: string) => {
    setFloorPlans((prev) => {
      const floorPlan = prev.find((f) => f.id === id);
      if (floorPlan?.preview) {
        URL.revokeObjectURL(floorPlan.preview);
      }
      return prev.filter((f) => f.id !== id);
    });

    const updatedExisting = existingFloorPlans.filter((f) => f.id !== id);
    onFloorPlansChange(updatedExisting);
  };

  const removeExistingFloorPlan = async (id: string) => {
    try {
      await apiClient.delete(API_ENDPOINTS.STORAGE_DELETE(id));
      const updated = existingFloorPlans.filter((f) => f.id !== id);
      onFloorPlansChange(updated);
      toast.success('Floor plan removed');
    } catch {
      toast.error('Failed to remove floor plan');
    }
  };

  const allFloorPlans = [
    ...existingFloorPlans.map((f) => ({ ...f, status: 'completed' as const, progress: 100 })),
    ...floorPlans,
  ];

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      {allFloorPlans.length < maxFloorPlans && (
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
            accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
            id="floorplan-upload"
          />
          <label htmlFor="floorplan-upload" className="cursor-pointer flex flex-col items-center">
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
              Drag and drop floor plans here
            </p>
            <p className="body-sm text-forest-600 dark:text-forest-400 mb-4">
              or click to browse
            </p>
            <p className="body-xs text-forest-500 dark:text-forest-500">
              Max {maxFloorPlans} files • Images or PDF • Max {maxSize / 1024 / 1024}MB each
            </p>
          </label>
        </div>
      )}

      {/* Floor Plan List */}
      {allFloorPlans.length > 0 && (
        <div className="space-y-3">
          <h3 className="heading-sm text-forest-900 dark:text-forest-50">
            Floor Plans ({allFloorPlans.length}/{maxFloorPlans})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allFloorPlans.map((floorPlan) => (
              <div
                key={floorPlan.id}
                className="relative bg-surface-secondary dark:bg-forest-700 rounded-lg overflow-hidden group"
              >
                {/* Preview */}
                <div className="aspect-[3/4] relative bg-forest-100 dark:bg-forest-600">
                  {floorPlan.status === 'uploading' ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="h-8 w-8 text-forest-400 mx-auto mb-2 animate-pulse" />
                        <p className="body-sm text-forest-400">Uploading... {floorPlan.progress}%</p>
                      </div>
                    </div>
                  ) : floorPlan.status === 'error' ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                        <p className="body-sm text-red-400">{floorPlan.error || 'Upload failed'}</p>
                      </div>
                    </div>
                  ) : 'preview' in floorPlan && floorPlan.preview ? (
                    <img
                      src={'preview' in floorPlan ? floorPlan.preview : ''}
                      alt="Floor plan"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-forest-400" />
                    </div>
                  )}

                  {/* Progress Bar */}
                  {floorPlan.status === 'uploading' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest-200 dark:bg-forest-600">
                      <div
                        className="h-full bg-forest-900 transition-all duration-300"
                        style={{ width: `${floorPlan.progress}%` }}
                      />
                    </div>
                  )}

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                      aria-label="Preview floor plan"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => floorPlan.status === 'completed' && floorPlan.url ? removeExistingFloorPlan(floorPlan.id) : removeFloorPlan(floorPlan.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      aria-label="Remove floor plan"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* File Name */}
                <div className="p-2">
                  <p className="body-xs text-forest-900 dark:text-forest-50 truncate">
                    {'file' in floorPlan ? floorPlan.file?.name : floorPlan.url?.split('/').pop()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Upload, GripVertical, Star, Trash2, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { toast } from 'sonner';

interface GalleryImage {
  id: string;
  url: string;
  isThumbnail: boolean;
  order: number;
}

interface ImageGalleryManagerProps {
  images: GalleryImage[];
  onImagesChange: (images: GalleryImage[]) => void;
  maxImages?: number;
  propertyId?: string;
  className?: string;
}

export function ImageGalleryManager({
  images,
  onImagesChange,
  maxImages = 20,
  propertyId,
  className,
}: ImageGalleryManagerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const validateImage = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type', {
        description: 'Please upload JPEG, PNG, or WebP images',
      });
      return false;
    }
    
    if (file.size > maxSize) {
      toast.error('File too large', {
        description: 'Maximum file size is 10MB',
      });
      return false;
    }
    
    return true;
  };

  const handleImageUpload = useCallback(async (files: FileList) => {
    if (images.length + files.length > maxImages) {
      toast.error('Too many images', {
        description: `Maximum ${maxImages} images allowed`,
      });
      return;
    }

    setUploading(true);
    const newImages: GalleryImage[] = [];

    for (const file of Array.from(files)) {
      if (!validateImage(file)) continue;

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'property-image');
        if (propertyId) formData.append('propertyId', propertyId);

        const response = await apiClient.post(API_ENDPOINTS.STORAGE_UPLOAD, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
            // Could show progress indicator here
          },
        });

        newImages.push({
          id: response.data.id,
          url: response.data.url,
          isThumbnail: images.length === 0 && newImages.length === 0,
          order: images.length + newImages.length,
        });
      } catch {
        toast.error('Failed to upload image', {
          description: 'Please try again',
        });
      }
    }

    if (newImages.length > 0) {
      onImagesChange([...images, ...newImages]);
      toast.success(`${newImages.length} image(s) uploaded successfully`);
    }

    setUploading(false);
  }, [maxImages, propertyId, images, onImagesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      handleImageUpload(e.dataTransfer.files);
    }
  }, [handleImageUpload]);

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
      handleImageUpload(e.target.files);
    }
  };

  const setAsThumbnail = (imageId: string) => {
    onImagesChange(
      images.map((img) => ({
        ...img,
        isThumbnail: img.id === imageId,
      }))
    );
    toast.success('Thumbnail updated');
  };

  const removeImage = async (imageId: string) => {
    try {
      await apiClient.delete(API_ENDPOINTS.STORAGE_DELETE(imageId));
      onImagesChange(images.filter((img) => img.id !== imageId));
      
      // If removing thumbnail, set first remaining image as thumbnail
      const remaining = images.filter((img) => img.id !== imageId);
      if (remaining.length > 0 && !remaining.some((img) => img.isThumbnail)) {
        onImagesChange(
          remaining.map((img, index) => ({
            ...img,
            isThumbnail: index === 0,
            order: index,
          }))
        );
      }
      
      toast.success('Image removed');
    } catch {
      toast.error('Failed to remove image');
    }
  };


  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      {images.length < maxImages && (
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
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className={cn('cursor-pointer flex flex-col items-center', uploading && 'opacity-50 pointer-events-none')}
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
              {uploading ? 'Uploading...' : 'Drag and drop images here'}
            </p>
            <p className="body-sm text-forest-600 dark:text-forest-400 mb-4">
              or click to browse
            </p>
            <p className="body-xs text-forest-500 dark:text-forest-500">
              Max {maxImages} images • JPEG, PNG, WebP • Max 10MB each
            </p>
          </label>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="heading-sm text-forest-900 dark:text-forest-50">
              Gallery ({images.length}/{maxImages})
            </h3>
            <p className="body-xs text-forest-600 dark:text-forest-400">
              Drag to reorder • Click star to set thumbnail
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images
              .sort((a, b) => a.order - b.order)
              .map((image, index) => (
                <div
                  key={image.id}
                  className="relative group bg-surface-secondary dark:bg-forest-700 rounded-lg overflow-hidden aspect-square"
                >
                  {/* Image */}
                  <img
                    src={image.url}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Thumbnail Badge */}
                  {image.isThumbnail && (
                    <div className="absolute top-2 left-2 bg-forest-900 text-white px-2 py-1 rounded-full body-xs font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Thumbnail
                    </div>
                  )}

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setAsThumbnail(image.id)}
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                      aria-label="Set as thumbnail"
                      title="Set as thumbnail"
                    >
                      <Star className={cn('h-4 w-4', image.isThumbnail && 'fill-yellow-500 text-yellow-500')} />
                    </button>
                    <button
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                      aria-label="Preview image"
                      title="Preview"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      aria-label="Remove image"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Drag Handle */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-1 bg-white/90 rounded hover:bg-white"
                      aria-label="Drag to reorder"
                    >
                      <GripVertical className="h-4 w-4 text-forest-900" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 text-forest-300 dark:text-forest-600 mx-auto mb-4" />
          <p className="body-sm text-forest-600 dark:text-forest-400">No images uploaded yet</p>
        </div>
      )}
    </div>
  );
}

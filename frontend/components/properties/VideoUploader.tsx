import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Upload, Video as VideoIcon, Play, Trash2, AlertCircle } from 'lucide-react';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { toast } from 'sonner';

interface VideoFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

interface VideoUploaderProps {
  onVideosChange: (videos: Array<{ id: string; url: string }>) => void;
  existingVideos?: Array<{ id: string; url: string }>;
  maxVideos?: number;
  maxDuration?: number; // in seconds
  maxSize?: number; // in bytes
  propertyId?: string;
  className?: string;
}

export function VideoUploader({
  onVideosChange,
  existingVideos = [],
  maxVideos = 5,
  maxDuration = 300, // 5 minutes
  maxSize = 100 * 1024 * 1024, // 100MB
  propertyId,
  className,
}: VideoUploaderProps) {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const validateVideo = useCallback((file: File): { valid: boolean; error?: string } => {
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    
    if (!validTypes.includes(file.type)) {
      return { valid: false, error: 'Invalid file type. Please upload MP4, WebM, or MOV files.' };
    }
    
    if (file.size > maxSize) {
      return { valid: false, error: `File too large. Maximum size is ${maxSize / 1024 / 1024}MB.` };
    }
    
    return { valid: true };
  }, [maxSize]);

  const checkVideoDuration = useCallback((file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      
      video.onerror = () => {
        reject(new Error('Failed to load video metadata'));
      };
      
      video.src = URL.createObjectURL(file);
    });
  }, []);

  const handleVideoUpload = useCallback(async (files: FileList) => {
    if (videos.length + files.length > maxVideos) {
      toast.error('Too many videos', {
        description: `Maximum ${maxVideos} videos allowed`,
      });
      return;
    }

    const newVideos: VideoFile[] = [];

    for (const file of Array.from(files)) {
      const validation = validateVideo(file);
      if (!validation.valid) {
        toast.error('Invalid video', { description: validation.error });
        continue;
      }

      try {
        const duration = await checkVideoDuration(file);
        if (duration > maxDuration) {
          toast.error('Video too long', {
            description: `Maximum duration is ${maxDuration / 60} minutes`,
          });
          continue;
        }

        const preview = URL.createObjectURL(file);
        const videoFile: VideoFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview,
          progress: 0,
          status: 'uploading',
        };

        newVideos.push(videoFile);
      } catch {
        toast.error('Failed to process video', {
          description: 'Could not read video metadata',
        });
      }
    }

    if (newVideos.length > 0) {
      setVideos((prev) => [...prev, ...newVideos]);

      // Upload each video
      for (const videoFile of newVideos) {
        try {
          const formData = new FormData();
          formData.append('file', videoFile.file);
          formData.append('type', 'property-video');
          if (propertyId) formData.append('propertyId', propertyId);

          const response = await apiClient.post(API_ENDPOINTS.STORAGE_UPLOAD, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
              setVideos((prev) =>
                prev.map((v) =>
                  v.id === videoFile.id ? { ...v, progress, status: 'uploading' } : v
                )
              );
            },
          });

          setVideos((prev) =>
            prev.map((v) =>
              v.id === videoFile.id
                ? { ...v, progress: 100, status: 'completed', url: response.data.url }
                : v
            )
          );

          URL.revokeObjectURL(videoFile.preview);
        } catch {
          setVideos((prev) =>
            prev.map((v) =>
              v.id === videoFile.id
                ? { ...v, status: 'error', error: 'Upload failed' }
                : v
            )
          );
        }
      }

      // Update parent with completed videos
      const completedVideos = videos
        .concat(newVideos)
        .filter((v) => v.status === 'completed' && v.url)
        .map((v) => ({ id: v.id, url: v.url! }));

      onVideosChange([...existingVideos, ...completedVideos]);
    }
  }, [maxVideos, propertyId, existingVideos, maxDuration, validateVideo, checkVideoDuration, videos, onVideosChange]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleVideoUpload(e.dataTransfer.files);
    },
    [handleVideoUpload]
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
      handleVideoUpload(e.target.files);
    }
  };

  const removeVideo = (id: string) => {
    setVideos((prev) => {
      const video = prev.find((v) => v.id === id);
      if (video?.preview) {
        URL.revokeObjectURL(video.preview);
      }
      return prev.filter((v) => v.id !== id);
    });

    // Also remove from existing videos if it was uploaded
    const updatedExisting = existingVideos.filter((v) => v.id !== id);
    onVideosChange(updatedExisting);
  };

  const removeExistingVideo = async (id: string) => {
    try {
      await apiClient.delete(API_ENDPOINTS.STORAGE_DELETE(id));
      const updated = existingVideos.filter((v) => v.id !== id);
      onVideosChange(updated);
      toast.success('Video removed');
    } catch {
      toast.error('Failed to remove video');
    }
  };

  const allVideos = [
    ...existingVideos.map((v) => ({ ...v, status: 'completed' as const, progress: 100 })),
    ...videos,
  ];

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      {allVideos.length < maxVideos && (
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
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleFileSelect}
            className="hidden"
            id="video-upload"
          />
          <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center">
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
              Drag and drop videos here
            </p>
            <p className="body-sm text-forest-600 dark:text-forest-400 mb-4">
              or click to browse
            </p>
            <p className="body-xs text-forest-500 dark:text-forest-500">
              Max {maxVideos} videos • MP4, WebM, MOV • Max {maxSize / 1024 / 1024}MB • Max {maxDuration / 60}min
            </p>
          </label>
        </div>
      )}

      {/* Video List */}
      {allVideos.length > 0 && (
        <div className="space-y-3">
          <h3 className="heading-sm text-forest-900 dark:text-forest-50">
            Videos ({allVideos.length}/{maxVideos})
          </h3>
          <div className="space-y-3">
            {allVideos.map((video) => (
              <div
                key={video.id}
                className="relative bg-surface-secondary dark:bg-forest-700 rounded-lg overflow-hidden"
              >
                {/* Video Preview */}
                <div className="aspect-video relative bg-black">
                  {video.status === 'uploading' ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <VideoIcon className="h-8 w-8 text-forest-400 mx-auto mb-2 animate-pulse" />
                        <p className="body-sm text-forest-400">Uploading... {video.progress}%</p>
                      </div>
                    </div>
                  ) : video.status === 'error' ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                        <p className="body-sm text-red-400">{video.error || 'Upload failed'}</p>
                      </div>
                    </div>
                  ) : (
                    <video
                      ref={videoRef}
                      src={'preview' in video ? video.preview : video.url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}
                </div>

                {/* Progress Bar */}
                {video.status === 'uploading' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest-200 dark:bg-forest-600">
                    <div
                      className="h-full bg-forest-900 transition-all duration-300"
                      style={{ width: `${video.progress}%` }}
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  {video.status === 'completed' && (
                    <button
                      className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Play video"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => video.status === 'completed' && video.url ? removeExistingVideo(video.id) : removeVideo(video.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    aria-label="Remove video"
                  >
                    <Trash2 className="h-4 w-4" />
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

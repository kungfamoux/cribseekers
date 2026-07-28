import { cn } from '@/lib/utils';
import { QrCode, Download, Share2 } from 'lucide-react';

interface InspectionQRCodeProps {
  inspectionId: string;
  qrCodeUrl?: string;
  onDownload?: () => void;
  onShare?: () => void;
  className?: string;
}

export function InspectionQRCode({
  inspectionId,
  qrCodeUrl,
  onDownload,
  onShare,
  className,
}: InspectionQRCodeProps) {
  return (
    <div className={cn('bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6 text-center', className)}>
      {/* QR Code */}
      <div className="inline-flex items-center justify-center w-48 h-48 bg-white border-2 border-border-default rounded-lg mb-4">
        {qrCodeUrl ? (
          <img
            src={qrCodeUrl}
            alt="Inspection QR Code"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <QrCode className="h-16 w-16 text-forest-300 dark:text-forest-600 mb-2" />
            <p className="body-xs text-forest-400">QR Code</p>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="space-y-2 mb-4">
        <p className="body-sm text-forest-900 dark:text-forest-50 font-medium">
          Scan to check in
        </p>
        <p className="body-xs text-forest-600 dark:text-forest-400">
          Show this QR code to the agent when you arrive for your inspection
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-2">
        {onDownload && (
          <button
            onClick={onDownload}
            className="inline-flex items-center px-3 py-2 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors body-sm font-medium text-forest-900 dark:text-forest-50"
          >
            <Download className="h-4 w-4 mr-1.5" />
            Download
          </button>
        )}
        {onShare && (
          <button
            onClick={onShare}
            className="inline-flex items-center px-3 py-2 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors body-sm font-medium text-forest-900 dark:text-forest-50"
          >
            <Share2 className="h-4 w-4 mr-1.5" />
            Share
          </button>
        )}
      </div>

      {/* Reference */}
      <div className="mt-4 pt-4 border-t border-border-default">
        <p className="body-xs text-forest-500 dark:text-forest-500">
          Reference: {inspectionId}
        </p>
      </div>
    </div>
  );
}

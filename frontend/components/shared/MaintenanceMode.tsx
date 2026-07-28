'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface MaintenanceModeProps {
  message?: string;
  estimatedDowntime?: string;
}

export function MaintenanceMode({ 
  message = 'We are currently performing scheduled maintenance. Please check back soon.',
  estimatedDowntime 
}: MaintenanceModeProps) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  useEffect(() => {
    // Check if maintenance mode is enabled via environment variable
    const maintenanceEnabled = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
    setIsMaintenanceMode(maintenanceEnabled);
  }, []);

  if (!isMaintenanceMode) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-primary">
      <div className="max-w-md w-full mx-4 p-8 bg-surface-secondary rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-warning/10 rounded-full">
            <AlertCircle className="w-12 h-12 text-warning" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Under Maintenance</h1>
        
        <p className="text-text-secondary mb-6">
          {message}
        </p>

        {estimatedDowntime && (
          <div className="mb-6 p-4 bg-surface-primary rounded-lg">
            <p className="text-sm text-text-secondary">
              <span className="font-medium">Estimated downtime:</span> {estimatedDowntime}
            </p>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>We'll be back shortly</span>
        </div>
      </div>
    </div>
  );
}

// Hook to check maintenance mode
export function useMaintenanceMode() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  useEffect(() => {
    const maintenanceEnabled = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
    setIsMaintenanceMode(maintenanceEnabled);
  }, []);

  return isMaintenanceMode;
}

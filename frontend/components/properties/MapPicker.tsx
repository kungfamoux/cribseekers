'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Search, Navigation, X, Crosshair } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
  lga?: string;
  estate?: string;
}

interface MapPickerProps {
  onLocationChange: (location: Location) => void;
  initialLocation?: Partial<Location>;
  className?: string;
}

export function MapPicker({
  onLocationChange,
  initialLocation,
  className,
}: MapPickerProps) {
  const [location, setLocation] = useState<Location>({
    lat: initialLocation?.lat || 6.5244, // Default: Lagos
    lng: initialLocation?.lng || 3.3792,
    address: initialLocation?.address || '',
    city: initialLocation?.city || 'Lagos',
    state: initialLocation?.state || 'Lagos',
    lga: initialLocation?.lga,
    estate: initialLocation?.estate,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [predictions, setPredictions] = useState<Array<{ description: string; place_id: string }>>([]);
  const [isLocating, setIsLocating] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    if (!geocoderRef.current) return;

    try {
      const response = await geocoderRef.current.geocode({
        location: { lat, lng },
      });

      if (response.results && response.results[0]) {
        const addressComponents = response.results[0].address_components;
        const newLocation = parseAddressComponents(addressComponents, lat, lng);
        setLocation(newLocation);
        onLocationChange(newLocation);
      }
    } catch {
      // Geocoding failed silently
    }
  }, [onLocationChange]);

  // Initialize Google Maps
  useEffect(() => {
    if (typeof window === 'undefined' || !window.google) return;

    const map = new google.maps.Map(mapRef.current!, {
      center: { lat: location.lat, lng: location.lng },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    });

    mapInstanceRef.current = map;

    const marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    markerRef.current = marker;

    // Initialize services
    autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
    geocoderRef.current = new google.maps.Geocoder();

    // Handle marker drag
    marker.addListener('dragend', async (event: google.maps.MapMouseEvent) => {
      const lat = event.latLng!.lat();
      const lng = event.latLng!.lng();
      
      await reverseGeocode(lat, lng);
    });

    // Handle map click
    map.addListener('click', async (event: google.maps.MapMouseEvent) => {
      const lat = event.latLng!.lat();
      const lng = event.latLng!.lng();
      
      marker.setPosition({ lat, lng });
      await reverseGeocode(lat, lng);
    });

    return () => {
      // Cleanup
    };
  }, [location.lat, location.lng, reverseGeocode]);

  // Update marker when location changes externally
  useEffect(() => {
    if (markerRef.current && mapInstanceRef.current) {
      markerRef.current.setPosition({ lat: location.lat, lng: location.lng });
      mapInstanceRef.current.panTo({ lat: location.lat, lng: location.lng });
    }
  }, [location.lat, location.lng]);

  const parseAddressComponents = (
    components: google.maps.GeocoderAddressComponent[],
    lat: number,
    lng: number
  ): Location => {
    let address = '';
    let city = '';
    let state = '';
    let lga = '';
    let estate = '';

    components.forEach((component) => {
      const types = component.types;
      
      if (types.includes('street_address') || types.includes('route')) {
        address = component.long_name;
      }
      
      if (types.includes('locality')) {
        city = component.long_name;
      }
      
      if (types.includes('administrative_area_level_1')) {
        state = component.long_name;
      }
      
      if (types.includes('administrative_area_level_2')) {
        lga = component.long_name;
      }
      
      if (types.includes('sublocality') || types.includes('neighborhood')) {
        estate = component.long_name;
      }
    });

    return {
      lat,
      lng,
      address: address || '',
      city: city || 'Unknown',
      state: state || 'Unknown',
      lga,
      estate,
    };
  };

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim() || !autocompleteServiceRef.current) {
      setPredictions([]);
      return;
    }

    try {
      const response = await autocompleteServiceRef.current.getPlacePredictions({
        input: query,
        componentRestrictions: { country: 'NG' },
      });

      setPredictions((response.predictions || []).map((p: { description: string; place_id: string }) => ({ description: p.description, place_id: p.place_id })));
    } catch {
      setPredictions([]);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, handleSearch]);

  const selectPrediction = async (prediction: { description: string; place_id: string }) => {
    if (!geocoderRef.current || !mapInstanceRef.current) return;

    try {
      const response = await geocoderRef.current.geocode({ placeId: prediction.place_id });

      if (response.results && response.results[0]) {
        const { lat, lng } = response.results[0].geometry.location;
        const addressComponents = response.results[0].address_components;
        const newLocation = parseAddressComponents(addressComponents, lat(), lng());

        setLocation(newLocation);
        setSearchQuery(prediction.description);
        setPredictions([]);
        onLocationChange(newLocation);

        // Update map and marker
        mapInstanceRef.current.panTo({ lat: lat(), lng: lng() });
        markerRef.current?.setPosition({ lat: lat(), lng: lng() });
      }
    } catch {
      // Failed to select prediction silently
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await reverseGeocode(latitude, longitude);
        setIsLocating(false);
      },
      () => {
        alert('Unable to retrieve your location');
        setIsLocating(false);
      }
    );
  };

  const validateCoordinates = (lat: number, lng: number): boolean => {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search address..."
            className="w-full pl-10 pr-10 py-2 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setPredictions([]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-600 dark:hover:text-forest-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Predictions Dropdown */}
        {predictions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-surface-primary dark:bg-forest-800 border border-border-default rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {predictions.map((prediction) => (
              <button
                key={prediction.place_id}
                onClick={() => selectPrediction({ description: prediction.description, place_id: prediction.place_id })}
                className="w-full text-left px-4 py-3 hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors body-sm text-forest-900 dark:text-forest-50"
              >
                {prediction.description}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Current Location Button */}
      <button
        onClick={handleGetCurrentLocation}
        disabled={isLocating}
        className="inline-flex items-center gap-2 px-4 py-2 border border-border-default rounded-lg body-sm font-medium text-forest-900 dark:text-forest-50 hover:bg-surface-secondary dark:hover:bg-forest-700 disabled:opacity-50 transition-colors"
      >
        <Crosshair className={cn('h-4 w-4', isLocating && 'animate-spin')} />
        {isLocating ? 'Locating...' : 'Use Current Location'}
      </button>

      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full h-[400px] rounded-lg border border-border-default bg-forest-100 dark:bg-forest-700"
        aria-label="Property location map"
      />

      {/* Location Details */}
      <div className="space-y-3 p-4 bg-surface-secondary dark:bg-forest-700 rounded-lg">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-forest-600 dark:text-forest-400" />
          <p className="body-sm text-forest-900 dark:text-forest-50 font-medium">
            {location.address || 'No address selected'}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 body-xs text-forest-600 dark:text-forest-400">
          <div>
            <span className="font-medium">City:</span> {location.city}
          </div>
          <div>
            <span className="font-medium">State:</span> {location.state}
          </div>
          {location.lga && (
            <div>
              <span className="font-medium">LGA:</span> {location.lga}
            </div>
          )}
          {location.estate && (
            <div>
              <span className="font-medium">Estate:</span> {location.estate}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 body-xs text-forest-600 dark:text-forest-400">
          <Navigation className="h-3 w-3" />
          <span>
            Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
          </span>
        </div>

        {!validateCoordinates(location.lat, location.lng) && (
          <p className="body-xs text-red-600 dark:text-red-400">
            Invalid coordinates selected
          </p>
        )}
      </div>
    </div>
  );
}

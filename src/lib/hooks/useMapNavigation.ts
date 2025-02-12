"use client";

import { useCallback } from "react";
import { useMap } from "@vis.gl/react-maplibre";
import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM, PROPERTY_ZOOM } from "@/lib/schema";
import { type Property } from "@/lib/schema";

interface UseMapNavigationOptions {
  duration?: number;
  essential?: boolean;
}

/**
 * Custom hook for map navigation
 */
export function useMapNavigation() {
  const { current: map } = useMap();

  const flyTo = useCallback(
    (coordinates: { lat: number; lng: number }, options: UseMapNavigationOptions = {}) => {
      if (!map) return;

      map.flyTo({
        center: [coordinates.lng, coordinates.lat],
        zoom: 18,
        duration: options.duration ?? 1000,
        essential: options.essential ?? true,
      });
    },
    [map]
  );

  const resetMap = useCallback(
    (options: UseMapNavigationOptions = {}) => {
      if (!map) return;

      map.flyTo({
        center: [DEFAULT_LNG, DEFAULT_LAT],
        zoom: DEFAULT_ZOOM,
        duration: options.duration ?? 1000,
        essential: options.essential ?? true,
      });
    },
    [map]
  );

  const focusProperty = useCallback(
    (property: Property, options: UseMapNavigationOptions = {}) => {
      if (!map) return;

      map.flyTo({
        center: [property.coordinates.lng, property.coordinates.lat],
        zoom: PROPERTY_ZOOM,
        duration: options.duration ?? 1000,
        essential: options.essential ?? true,
      });
    },
    [map]
  );

  return {
    flyTo,
    resetMap,
    focusProperty,
  };
}

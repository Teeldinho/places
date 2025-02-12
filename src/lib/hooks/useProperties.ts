import { useCallback, useMemo } from "react";
import { type Property } from "@/lib/schema";

/**
 * Custom hook for managing property data
 *
 * @remarks
 * Provides utilities for working with property data
 *
 * @param properties - Array of Property objects to be managed
 *
 * @returns An object containing property management utilities
 */
export function useProperties(properties: Property[]) {
  const mappedProperties = useMemo(() => properties.filter((p) => p.isMapped), [properties]);

  const unmappedProperties = useMemo(() => properties.filter((p) => !p.isMapped), [properties]);

  const getPropertyById = useCallback((id: string) => properties.find((p) => p.id === id), [properties]);

  return {
    mappedProperties,
    unmappedProperties,
    getPropertyById,
  };
}

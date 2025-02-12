import { useMemo } from "react";
import { type Property } from "@/lib/schema";

/**
 * Custom hook for managing property data
 *
 * @remarks
 * Provides utilities for working with property data
 *
 * @param properties - Array of Property objects to be managed
 * @param sort - Optional sorting parameters
 * @param query - Optional search query
 *
 * @returns An object containing property management utilities
 */
export function useProperties(properties: Property[], sort?: { field?: string; direction: string }, query?: string) {
  return useMemo(() => {
    const filtered = properties.filter((p) => {
      const search = query?.toLowerCase() || "";
      return (
        p.property?.toLowerCase().includes(search) || p.community?.toLowerCase().includes(search) || p.subcommunity?.toLowerCase().includes(search)
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      if (!sort?.field) return 0;
      const valueA = a[sort.field as keyof Property]?.toString().toLowerCase() || "";
      const valueB = b[sort.field as keyof Property]?.toString().toLowerCase() || "";
      return sort.direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });

    return {
      mappedProperties: sorted.filter((p) => p.isMapped),
      unmappedProperties: sorted.filter((p) => !p.isMapped),
      getPropertyById: (id: string) => sorted.find((p) => p.id === id),
    };
  }, [properties, sort, query]);
}

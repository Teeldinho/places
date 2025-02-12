import { z } from "zod";
import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM, isWithinGeofence, MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG } from "@/lib/geofence";
import { determineIsMapped, getCoordinates, getPropertyImage } from "@/lib/helpers";

export const MapParamsSchema = z.object({
  lat: z.number().min(MIN_LAT).max(MAX_LAT).default(DEFAULT_LAT),
  lng: z.number().min(MIN_LNG).max(MAX_LNG).default(DEFAULT_LNG),
  zoom: z.number().min(1).max(30).default(DEFAULT_ZOOM),
  selectedId: z.string().uuid().optional(),
  activeTab: z.enum(["mapped", "unmapped"]).default("mapped"),
});

export type MapParams = z.infer<typeof MapParamsSchema>;

export const SortParamsSchema = z.object({
  field: z.enum(["property", "community", "subcommunity"]).optional(),
  direction: z.enum(["asc", "desc"]).default("asc"),
});

export type SortParams = z.infer<typeof SortParamsSchema>;

export const PropertySchema = z.object({
  id: z.string().uuid(),
  city: z.string().optional().default("Dubai"),
  community: z.string().min(2).optional(),
  subcommunity: z.string().min(2).optional(),
  property: z.string().min(2).optional(),
});

export type Property = z.infer<typeof PropertySchema>;

export interface PropertyRto {
  id: string;
  city: string | null;
  community: string | null;
  subcommunity: string | null;
  property: string | null;
  image: string;
  isMapped: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const mapPropertyDtoToRto = (property: Property): PropertyRto => {
  return {
    id: property.id,
    city: property.city ?? null,
    community: property.community ?? null,
    subcommunity: property.subcommunity ?? null,
    property: property.property ?? null,
    image: getPropertyImage(),
    isMapped: determineIsMapped(property),
    coordinates: getCoordinates(property),
  };
};

export const AddPropertySchema = z
  .object({
    property: z.string().min(2),
    coordinates: z.object({
      lat: z.number().min(MIN_LAT).max(MAX_LAT),
      lng: z.number().min(MIN_LNG).max(MAX_LNG),
    }),
    isMapped: z.boolean().default(false),
  })
  .refine((data) => isWithinGeofence(data.coordinates.lng, data.coordinates.lat), {
    message: `Coordinates must be within Dubai area (Lat: ${MIN_LAT.toFixed(4)}-${MAX_LAT.toFixed(4)}, Lng: ${MIN_LNG.toFixed(4)}-${MAX_LNG.toFixed(
      4
    )})`,
    path: ["coordinates"],
  });

export type AddPropertyData = z.infer<typeof AddPropertySchema>;

export const EditPropertySchema = z
  .object({
    property: z.string().min(2),
    coordinates: z.object({
      lat: z.number().min(MIN_LAT).max(MAX_LAT),
      lng: z.number().min(MIN_LNG).max(MAX_LNG),
    }),
    isMapped: z.boolean().default(false),
  })
  .extend({ id: z.string().uuid() })
  .refine((data) => isWithinGeofence(data.coordinates.lng, data.coordinates.lat), {
    message: `Coordinates must be within Dubai area (Lat: ${MIN_LAT.toFixed(4)}-${MAX_LAT.toFixed(4)}, Lng: ${MIN_LNG.toFixed(4)}-${MAX_LNG.toFixed(
      4
    )})`,
    path: ["coordinates"],
  });

export type EditPropertyData = z.infer<typeof EditPropertySchema>;

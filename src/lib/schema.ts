import { z } from "zod";

export const DEFAULT_LAT = 25.2048; // Dubai
export const DEFAULT_LNG = 55.2708; // Dubai
export const DEFAULT_ZOOM = 14; // 14 is the default zoom level for the map
export const PROPERTY_ZOOM = 18; // Zoom level when focusing on a property

export const MapParamsSchema = z.object({
  lat: z.number().min(-90).max(90).default(DEFAULT_LAT),
  lng: z.number().min(-180).max(180).default(DEFAULT_LNG),
  zoom: z.number().min(1).max(30).default(DEFAULT_ZOOM),
  selectedId: z.string().uuid().optional(),
  activeTab: z.enum(["mapped", "unmapped"]).default("mapped"),
});

export type MapParams = z.infer<typeof MapParamsSchema>;

export const PropertySchema = z.object({
  id: z.string().uuid(),
  city: z.enum(["Dubai", "Abu Dhabi", "Sharjah"]),
  community: z.string().min(2),
  subcommunity: z.string().min(2),
  property: z.string().min(2).optional(),
  description: z.string().min(2).optional(),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  status: z.enum(["mapped", "unmapped"]).default("unmapped"),
  image: z.string().url().default("https://placehold.co/600x400"),
  lastUpdated: z.date().default(new Date()),
});

export type Property = z.infer<typeof PropertySchema>;
